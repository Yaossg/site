---
date: 2025-03-24
tags: 
  - pl
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RAII

本文总结了不同语言实现 RAII 的方式。

## 构造器-析构器

<Tabs>
<TabItem label="C++" value="cpp">

```cpp
#include <cstdio>

struct Locker {
    Locker() {
        puts("lock");
    }
    ~Locker() {
        puts("unlock");
    }
};

int main() {
    Locker locker;
}
```

</TabItem>
<TabItem label="Rust" value="rust">

```rust
struct Locker {}

impl Locker {
    pub fn new() -> Self {
        println!("lock");
        Locker {}
    }
}

impl Drop for Locker {
    fn drop(&mut self) {
        println!("unlock")
    }
}


pub fn main() {
    let locker = Locker::new();
}
```

</TabItem>
</Tabs>


## 控制块

<Tabs>
<TabItem label="Java" value="java">

```java
class Locker implements AutoCloseable {
    public Locker() {
        System.out.println("lock");
    }

    @Override
    public void close() {
        System.out.println("unlock");
    }

    public static void main(String[] args) {
        try (Locker locker = new Locker()) {
            
        }
    }
}
```

</TabItem>
<TabItem label="C#" value="cs">

```cs
using System;

class Locker : IDisposable
{
    public Locker()
    {
        Console.WriteLine("lock");
    }

    public void Dispose()
    {
        Console.WriteLine("unlock");
    }
    
    static void Main(string[] args)
    {
        using var locker = new Locker();
    }
}
```

</TabItem>
<TabItem label="Python" value="python">

```python
class Locker:
    def __enter__(self):
        print("lock")

    def __exit__(self, *args):
        print("unlock")

with Locker():
    pass
```

</TabItem>
</Tabs>

## defer 语句

<Tabs>
<TabItem label="Go" value="go">

```go
import "fmt"

func main() {
	defer fmt.Println("unlock")
	fmt.Println("lock")
}
```

</TabItem>
<TabItem label="Swift" value="swift">


```swift
defer {
    print("unlock")
}
print("lock")
```
</TabItem>
</Tabs>


## 思考题

这样写实现 RAII 有什么问题：

<Tabs groupId="quiz">
<TabItem label="Java" value="java">


```java
var r1 = open("r1");
var r2 = open("r2");
try {
    // ...
} finally {
    r1.close();
    r2.close();
}
```


</TabItem>
<TabItem label="C#" value="cs">

```cs
var r1 = open("r1");
var r2 = open("r2");
try {
    // ...
} finally {
    r1.close();
    r2.close();
}
```

</TabItem>
<TabItem label="Python" value="python">

```python
r1 = open("r1")
r2 = open("r2")
try:
    # ...
finally:
    r1.close()
    r2.close()
```

</TabItem>
</Tabs>

正确的写法应该是：

<Tabs groupId="quiz">
<TabItem label="Java" value="java">

```java
try (var r1 = open("r1"); var r2 = open("r2")) {
    // ...
}
```

</TabItem>
<TabItem label="C#" value="cs">

```cs
using var r1 = open("r1");
using var r2 = open("r2");
// ...
```

</TabItem>
<TabItem label="Python" value="python">


```python
with open("r1") as r1, open("r2") as r2:
    # ...
```

</TabItem>
</Tabs>

这种写法语前面的写法不同，而是等价于下面的写法：

<Tabs groupId="quiz">
<TabItem label="Java" value="java">

```java
var r1 = open("r1");
try {
    var r2 = open("r2");
    try {
        // ...
    } finally {
        r2.close();
    }
} finally {
    r1.close();
}
```

</TabItem>
<TabItem label="C#" value="cs">

```cs
var r1 = open("r1");
try {
    var r2 = open("r2");
    try {
        // ...
    } finally {
        r2.close();
    }
} finally {
    r1.close();
}
```

</TabItem>
<TabItem label="Python" value="python">

```python
r1 = open("r1")
try:
    r2 = open("r2")
    try:
        # ...
    finally:
        r2.close()
finally:
    r1.close()
```

</TabItem>
</Tabs>

因此这个语法糖相当于是把嵌套结构变成并列结构了，大大简化了代码编写。
