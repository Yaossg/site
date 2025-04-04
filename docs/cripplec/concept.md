---
sidebar_position: 0
---

# 基本概念

> _当你在凝视深渊的时候，深渊也正在凝视着你 ——尼采_

## 行为

开始之前，我先介绍几个概念。即使你没有详细了解过，也一定对下面三个名词早有耳闻。对于编译器来说，

- 未定义行为（Undefined Behavior，简称 UB）：标准没有规定这个行为，生成的程序在这里允许做任何事情。

- 未指定行为（Unspecified Behavior）：在几种允许的行为中选一个，而且并不需要明确告诉你它选了哪个。

- 实现定义行为（Implementation-defined Behavior）：在未指定行为的基础上，要求明确告诉你采用哪个行为。

正是它们，为 C 语言增添了一抹亮色（大嘘）。之后的文章我们还会提到他们。

原则上可以粗略地认为，它们危险程度逐级递减。这当然也取决于实际情况，不能一概而论。

好在如今大多数的编译器和智能 IDE 都能够较为敏锐（或者说，过于敏锐）地捕捉到这些可能出现的问题，我们没必要自找麻烦，但也不可掉以轻心。

最后也是最重要的，不要把所有的错误都归于它们头上。它们只是 C 语言各种陷阱的冰山一角。

## 历史

下面非常简要的叙述一下 C 语言的历史。同时也是为了说明本书的适用范围。

- 1969 年，B 语言在 BCPL 基础上问世。
- 1971 年，NB（new B）语言问世。
- 1972 年，NB 被重命名为 C 语言。
- 1973 年，Unix 被用 C 语言重写。
- 1978 年，The C Programming Language 第一版问世。

这本书为什么重要呢？这本书的作者是 Brian W. Kernighan 和 Dennis M. Ritchie，正是 C 语言的主要创立者。以他们的名字命名的 C 语言叫 K&R C。你看的一些经典书籍里面反复提到的 K&R C，就出自这里。

- 1983 年，ANSI X3J11 委员会成立，C 语言开始标准化之路。
- 1989 年，C 语言第一个正式标准 ANSI C 发布，即为 C89，
- 1990 年，标准被 ISO 收录（ISO/IEC 9899:1990），即为 C90。

这之后的，经过标准化的 C 语言，被称为 ANSI C 或者 ISO C。C 语言进入了崭新的时代。K&R C 与 ISO C 差别巨大，以至于这个差别本身都能造成许多的问题。但由于时移世易，这些问题已经早早地不应该在我们的讨论范围之中了。本文展开的讨论，都是基于 ISO C 的。

- 1995 年，C95 发布。
- 1999 年，C99 发布。
- 2011 年，C11 发布。
- 2017 年，C17 发布。
- 2023 年，C23 发布。

你可能感到惊讶，C 语言问世已经有五十年了，却仍长盛不衰！让我们 _穿越时空的迷雾_，一起探寻这古老而神秘的语言吧。