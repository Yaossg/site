---
date: 2023-11-06
tags: 
  - db
  - algo
---

# 表连接算法概览

<!--truncate-->

## 一般连接

### 形式语言与 SQL

连接两个表

$$
R \bowtie_\theta S
$$

```sql
select *
from R, S
where theta
```

```sql
select *
from R
join S on theta
```

连接多个表

$$
\Large \bowtie_\theta \normalsize(R_1, R_2, \cdots, R_n)
$$

```sql
select *
from R1, R2, ... Rn
where theta
```

$$
R_1 \bowtie_{\theta_2} R_2 \cdots  \bowtie_{\theta_{n}} R_n
$$


```sql
select *
from R1
join R2 on theta2
...
join Rn on thetan
```

$$
\theta=\bigwedge_{i=2}^n\theta_i
$$

### Nested Loop Join

对于一般情况，多重循环是最朴素的算法

```python
for r in R.tuples():
    for s in S.tuples():
        if predicate(r, s):
            yield join(r, s)
```

可以通过分块遍历降低 IO 的性能损失

```python
for rb in R.blocks():
    for sb in S.blocks():
        for r in rb:
            for s in sb:
                if predicate(r, s):
                    yield join(r, s)
```


## 等值连接

### 形式语言与 SQL

一种常见的连接是等值连接

关于一个属性的等值连接

$$
R(id, \cdots), S(id, \cdots)\\
R \bowtie_{R.id=S.id} S
$$

```sql
select *
from R, S
where R.id = S.id
```

```sql
select *
from R
join S on R.id = S.id
```

```sql
select *
from R
join S using (id)
```

```sql
select *
from R
natural join S
```

关于多个属性的等值连接

$$
R(id1, id2, \cdots), S(id1, id2, \cdots)\\
R \bowtie_{R.id1=S.id1 \land R.id2=S.id2 \land \cdots} S
$$

```sql
select *
from R, S
where R.id1 = S.id1 and R.id2 = S.id2 and ...
```

```sql
select *
from R
join S on R.id1 = S.id1 and R.id2 = S.id2 and ...
```

```sql
select *
from R
join S using (id1, id2, ...)
```

```sql
select *
from R
natural join S
```

涉及等值查询问题，呼之欲出的就是两种方法：

- 排序方法
- 哈希方法

这两种方法在关联容器（即有序和无序的 `set` 和 `dict`）的构造中相当有用，在表连接中也是如此。

如果其中一个关系在连接键上有索引，则可以直接采取 Index Nested Loop Join，否则则需要进行下面两种额外的工作。

### Sort-Merge Join

对 $R$ 和 $S$ 按照等值连接所需键排序，随后分别遍历两个关系；当遇到左右等值时，将等值的区间取出求笛卡尔积。

```python
import functools
import itertools


def join(p):
    r, s = p
    return *r, *s


def smj(R, S, cmp):
    R.sort(key=functools.cmp_to_key(cmp))
    S.sort(key=functools.cmp_to_key(cmp))
    ri = iter(R)
    si = iter(S)
    r = next(ri, None)
    s = next(si, None)
    while True:
        if r is None or s is None:
            return
        while (c := cmp(r, s)) != 0:
            if c < 0:
                if (r := next(ri, None)) is None:
                    return
            else:
                if (s := next(si, None)) is None:
                    return

        rc = [r]
        sc = [s]

        while (r := next(ri, None)) is not None and cmp(rc[0], r) == 0:
            rc.append(r)

        while (s := next(si, None)) is not None and cmp(sc[0], s) == 0:
            sc.append(s)

        yield from map(join, itertools.product(rc, sc))
```

如果连接的键是唯一的，则可以更进一步省去笛卡尔积的部分：

```python
def join(r, s):
    return *r, *s


def smj(R, S, cmp):
    ri = iter(R)
    si = iter(S)
    while True:
        if (r := next(ri, None)) is None or (s := next(si, None)) is None:
            return
        while (c := cmp(r, s)) != 0:
            if c < 0:
                if (r := next(ri, None)) is None:
                    return
            else:
                if (s := next(si, None)) is None:
                    return

        yield join(r, s)
```

如果不想编写笛卡尔积的代码，又需要考虑到键不唯一的情况，可以考虑使用迭代器标记恢复之前的过程，但需要谨慎处理其中的边界条件：

```cpp
struct iterator {
    int *p = nullptr, *q = nullptr;
    operator bool() const {
        return p < q;
    }
    int operator*() const {
        return *p;
    }
    iterator& operator++() {
        ++p;
        return *this;
    }
};

void smj(iterator r, iterator s) {
    iterator mark;
    while (r and s) {
        if (!mark) {
            while (*r != *s) {
                if (*r < *s) {
                    ++r; 
                    if (!r) return;
                } else {
                    ++s;
                    if (!s) return;
                }
            }
            mark = s;
        }
        if (*r == *s) {
            emit(*r, *s);
            ++s;
            if (s) {
                continue;
            }
        } 
        s = mark;
        ++r;
        mark = {};
    }
}
```

### Hash Join

用等值连接所需的键的哈希值建立 $R$ 的哈希表，再用 $S$ 等值连接的键去查询这个哈希表，得到的相同的行进行连接。 

```python
def join(r, s):
    return *r, *s


def hj(R, S, hsh, eq):
    build = {}
    for s in S:
        build.setdefault(hsh(s), []).append(s)
    for r in R:
        for s in build.get(hsh(r), []):
            if eq(r, s):
                yield join(r, s)
```

