# 🦜 [E] 无道翻译官

## 题目

用任意语言写一个编译器，你可以把任何你想要的语言（你甚至可以自己造一个，但是 [Esolang](https://esolangs.org/wiki/Main_Page) 除外。点名批评 Brainf**k）编译为字节码。当然，不要求你编译出来的程序真的可以直接运行，你只需要再额外模拟一个可以执行字节码的虚拟机就可以了。

不得使用第三方库（比如说，你不能在 C 里 import 一个 CPython 或者 lua，然后说你写完了）

- `100%`：你完成了一个编译器（`60%`），并且能够用你的语言实现以下功能：
  1. `10%`：求出八皇后问题的可行解
  2. `30%`：还记得「梦开始的地方」那题吧，把那个实现一下

## 题解

https://github.com/Yaossg/Porkchop

### 八皇后

```
{
    fn output(a: [int]): none = {
        let i = 1
        while i <= 8 {
            let j = 1
            while j <= 8 {
                print(if a[i] == j {"x"} else {"-"})
                ++j
            }
            println("")
            ++i
        }
        println("")
    }
    fn ok(a: [int], x: int, y: int) = {
        let i = 1
        while i <= x - 1 {
            if a[i] == y || a[i] - i == y - x || a[i] + i == y + x {
                return false
            }
            ++i
        }
        return true
    }
    fn queen(a: [int], x: int, c: [int]): none = {
        if x > 8 {
            output(a)
            ++c[0]
            return {}
        }
        let y = 1
        while y <= 8 {
            if ok(a, x, y) {
                a[x] = y
                queen(a, x + 1, c);
                a[x] = 0
            }
            ++y
        }
    }
    let c = [0]

    queen([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, c)
    println("solutions: " + i2s(c[0]))
}
```

### 🌏 梦开始的地方

```
{
    fn withdraw(balance: int) = {
        let balance = [balance] # shadowing
        $ balance (amount: int) = {
            if (balance[0] >= amount) {
                balance[0] -= amount
                if (amount >= 0) {
                    println(i2s(balance[0]))
                }
            } else {
                println("v50")
            }
        }
    }
    fn v50(account: (int): none) = account(-50)
    let w1 = withdraw(100)
    let w2 = withdraw(100)
    w1(50)
    w2(50)
    w1(70)
    v50(w1)
    w1(70)
}
```

### 九九乘法表

```
{
    let i = 1
    let j = 1
    while i <= 9 {
        j = 1
        while j <= i {
            print(i2s(i) + "*" + i2s(j) + "=" + i2s(i * j) + " ")
            ++j
        }
        println("")
        ++i
    }
}
```

