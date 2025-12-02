---
date: 2025-12-03
tags: 
  - pl
---

# 如何判断变量在一个范围内

### C 家族语言：上界和下界的合取式
```c
if (x >= 0 && x <= 10) {
    // x is in range of [0, 10]
}
```

### Python：不等式串
```python
if 0 <= x <= 10:
    # x is in range of [0, 10]
```

### SQL：英语介词

```sql
select x from table where x between 0 and 10
```

### Kotlin：英语介词。。
```kotlin
if (x in 0..10) {
    // x is in range of [0, 10]
}
```

### Swift：初学者的模式匹配
```swift
if 0...10 ~= x {
    // x is in range of [0, 10]
}
```

### C\#：模式匹配的合取式

```csharp
if (x is >= 0 and <= 10) {
    // x is in range of [0, 10]
}
```

### Rust & Swift：模式匹配 Pro

```rust
if let 0..=10 = x {
    // x is in range of [0, 10]
}
```

```swift
if case 0...10 = x {
    // x is in range of [0, 10]
}
```





