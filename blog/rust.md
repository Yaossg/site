---
date: 2025-3-30
tags: 
  - pl
  - fp
  - type
---

# [翻译] Rust in Perspective

<!--truncate-->

# Rust 走在正确的道路上[^title]

[^title]: in perspective 本意是“符合透视法的、在正确的比例关系中”，引申含义为“恰当的、合理的、正确的”。结合本文的主旨（赞美 Rust）和记叙方式（历史回顾），故作此翻译。

:::info

原文：https://people.kernel.org/linusw/rust-in-perspective

原作者：Linus Walleij

原文发布时间：2022 年 7 月 14 日

:::


:::note

所有脚注都是译者注。

出于一致性考虑，所有的人名都保留英文原名。但对于一些中文名特别有辨识度的名人，会在脚注中进行标注和说明。

:::

我们正在讨论并推动 Rust 成为 Linux 内核开发的第二种语言。一年前，Jake Edge 为当时关于 Rust for Linux 内核的讨论作了一个[很好的总结](https://lwn.net/Articles/862018/)。我们（确切地说是 Miguel 和 Wedson）在此基础上取得了更大的进展。可以明确地说，我认为这个方向总体上是正确的，值得尝试。我想为此补充一些从[内核峰会的邮箱讨论中](https://lore.kernel.org/ksummit/CANiq72nNKvFqQs9Euy=_McfcHf0-dC_oPB3r8ZJii2L3sfVjaw@mail.gmail.com/)勾勒出的背景故事。

[^rust-for-linux]: 参见 [https://github.com/Rust-for-Linux](https://github.com/Rust-for-Linux)。

太长不看：我断言，Rust 是想要**提升**编程语言的**抽象**，使之最终将**计算机科学**和**软件工程**学科合二为一，这是一个自这两个学科被创造以来一直有人想要追求的目标。

## 从 ALGOL 说起

第一个通用高级语言是 FORTRAN，现在仍在一些数值分析的任务中发挥作用。然后就是 ALGOL，它拥有更广的受众。

据我所知，第一个“真正的”操作系统（使用[虚拟内存](https://en.wikipedia.org/wiki/Virtual_memory)等）是 1962 年为 [the Atlas Machine](https://en.wikipedia.org/wiki/Atlas_(computer)) 编写的监督程序。该程序用 **ALGOL** 的一个方言 *Atlas autocode* 编写。在当时，ALGOL 可以说是一门通用语言[^lingua-franca]。标准的 ALGOL 没法用，因为 ALGOL 60 没有定义输入输出原语，所以每个用于真实世界的 ALGOL 应用程序（即不仅依赖于编译时就固定的常量的应用程序）都需要添加自定义的输入输出原语。

[^lingua-franca]: 通用语（lingua franca），本意是指在跨越不同语言和文化的交流中，作为一种共同语言使用的语言。这里比喻几乎所有程序员都能读写的语言。Unix 兴起之后，C 语言凭借其广泛影响力，已经成为了新一代的通用语言。

:::note[插图]

![](https://dflund.se/~triad/images/Algol-first-copies.jpg)

*ALGOL 60 第一版规范的副本。曾归隆德大学的 Carl-Erik Fröberg 所有。*

:::

[ALGOL](https://en.wikipedia.org/wiki/ALGOL) 启发了 [CPL 语言](https://en.wikipedia.org/wiki/CPL_(programming_language)) 启发了 [BCPL 语言](https://en.wikipedia.org/wiki/BCPL) 启发了 [B 语言](https://en.wikipedia.org/wiki/B_(programming_language)) 启发了 [C 语言](https://en.wikipedia.org/wiki/C_(programming_language))，最终我们用 C 语言实现了 Linux 内核。

在 1958 到 1968 年间，有许多将计算机语言与形式逻辑结合起来的尝试，而 ALGOL 正是这一探索的纽带。十年间，我们见证了 ALGOL 58、ALGOL 60、ALGOL 68 的版本迭代。与此同时，**计算机科学（computer science）** 作为一门学科被建立起来，学者们得以以此为业，开启学术生涯。这一时期的重要突破是，人们开始用 [BNF 范式](https://en.wikipedia.org/wiki/Backus–Naur_form)来描述语言的语法。也正是在这些事件前后，Donald Knuths[^knuths] 所著的《计算机程序设计艺术》前三卷出版——从各种意义上来说，这部巨著都对计算机科学的发展产生了深远的影响。

[^knuths]: 高德纳（[Donald Ervin Knuth](https://en.wikipedia.org/wiki/Donald_Knuth)），现代计算机科学的先驱人物，创造了算法分析的领域，是多个理论计算机科学的分支的奠基人；发表了多部具广泛影响的论文和著作，如《计算机程序设计艺术》（The Art of Computer Programming）。

在 Unix 诞生之初，ALGOL 仍占据主导地位而 C 还未得到普及。为了让你充分了解这一点，不妨来看看这段 [Bourne Shell](https://en.wikipedia.org/wiki/Bourne_shell) 的早期[源码片段](https://minnie.tuhs.org/cgi-bin/utree.pl?file=V7/usr/src/cmd/sh)。

```c
setlist(arg,xp)
	REG ARGPTR	arg;
	INT		xp;
{
	WHILE arg
	DO REG STRING	s=mactrim(arg->argval);
	   setname(s, xp);
	   arg=arg->argnxt;
	   IF flags&execpr
	   THEN prs(s);
		IF arg THEN blank(); ELSE newline(); FI
	   FI
	OD
}
```

这看上去不太像我们认识的那个 C 语言，反而是更像 ALGOL 68。ALGOL 68 相比 ALGOL 60 增加了诸如 IF/FI，DO/OD 之类的构造。写成这样的原因是，Stephen Bourne 是一位很有影响力的 ALGOL 68 贡献者。他创造了[一套宏](https://minnie.tuhs.org/cgi-bin/utree.pl?file=V7/usr/src/cmd/sh/mac.h)，这样 C 预处理器就可以把他自制的 ALGOL 方言转换成 C。我想这就是有人在 Reddit 上建议提名 *bash* 参加混乱 C 语言大赛[^ioccc]的原因。

[^ioccc]: 国际Ｃ语言混乱代码大赛（IOCCC, The International Obfuscated C Code Contest）是一项国际程序设计赛事，目标是写出最有创意和最让人难以理解的 C 语言代码。

C 语言在当时还未被广泛接受，这仅是诸多例子中的一个。我们如今都喜欢用的 Bourne Shell 脚本语言，其实也与 ALGOL 68 非常接近。因此 ALGOL 的后继者在当今的应用比我们想象的更加广泛。

在 1970 年前后，Niklaus Wirth 致力于改进 ALGOL 68 并称改版为 ALGOL W。后来他厌倦了语言委员会进程的迟缓，fork 了 ALGOL 并创造了 [Pascal 编程语言](https://en.wikipedia.org/wiki/Pascal_(programming_language))，并大获成功。Wirth 教授在他所著的 IEEE 文章[《软件工程简史》](https://people.inf.ethz.ch/wirth/Miscellaneous/IEEE-Annals.pdf)中发表了对当时时事的看法：举世闻名的[1968 年北约软件工程大会](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF)[^conference]在德国加米施胜利召开，标志着**软件工程（software engineering）** 成为一门独立的学科。而为了解决所谓的[*软件危机*](https://en.wikipedia.org/wiki/Software_crisis)（software crisis）——由新兴的巨大复杂系统带来的问题——他建议**提升**新语言的**抽象**。

[^conference]: 原文中，后文对此有许多别称，如加米施大会、加米施北约大会等；译文中，后文统一译作为北约软件工程大会。

所谓**提升抽象（raise the abstraction）**，就是要在语言中使用更数学，更机器无关的构造。首先要考虑的是低级和高级语言之间的差别：例如 `x = x + 1` 这样简单的操作就算不上高级，它就是一个花哨的汇编指令而已。因为我们可以确信在编译后目标代码里，它会变成某种 *ADD* 指令。然而 `a[i] = x + 1` 就把抽象提升到了*高级语言*的水平。这是因为索引数组需要目标机器的特定知识：如基地址、内存布局等等。这让这条指令更加高级，从而提升了语言的抽象。这里我们不妨假设有许多更高级的抽象存在，我们会在后面的小节中研究这些语言。

北约软件工程大会在 Unix 圈子里很出名，因为 [Douglas McIlroy](https://en.wikipedia.org/wiki/Douglas_McIlroy) 出席并提出了把软件组件化来缓解其日益增长的复杂性。这个想法后来通过 Unix 的管道和过滤器机制得以实现。D-Bus 和类似的组件之间的合作机制都是软件组件化的现代案例——而另一种解决复杂性的方式是让软件不那么脆弱，但这不是本文的重点。

关于北约软件工程大会，Wirth 有一个非常具体又非常重要的看法：

> 分析验证和正确性证明终将替代测试。

这就是说：经过形式验证编程语言，所有的特性和构造应该被形式化的证明为无须测试的。软件工程因宣传[测试驱动开发（TDD）](https://en.wikipedia.org/wiki/Test-driven_development) 而闻名，而他想追求的目标是让大段大段的 TDD 不再必要。软件测试在北约软件工程大会的报告中有专门一章，作者 A.I. Llewelyn 和 R.F. Wickens 总结道：

> 有两种最基本的方法判断一个产品是否符合规范。一种方法详尽地分析产品并检查它与规范是否一致。另一种方法通过实验测量他的性能，看结果是否符合规范。结果的置信度因实验的数量和复杂度而异。

这段话的前半部分，也就是“详尽地分析”，也就是 Wirth 所说的分析验证，现在被叫做形式验证。而后半部分就是我们所谓的测试驱动开发，TDD。同时，前者是一个计算机科学的问题，而后者是一个软件工程问题。所以这就成了一个岔路口。

Wirth 也表示在北约软件工程大会上的讨论对 Pascal 有深刻的影响。这一点从 Pascal 的字符串中便不难发现，这是 Pascal 相较于 ALGOL 最重要的提升之一：Pascal 的字符串是*字符*的数组，但不像 *C 语言的字符*，*Pascal 的字符*不等于一个字节。相反，它被定义为属于一个“有序字符集”，可以是 ISO 8859-1[^ascii] 或者 Unicode，可以容纳小于，大于或等于 255 个字符。内存中，字符串的开头有一个正整数，表示字符串的长度。但程序员无须自己管理，长度字段是由语言的运行时而不是手写的代码来处理的。因此，字符串索引越界是不可能的，它们可以在编译时和运行时轻松禁止。这提升了字符串的抽象：它们一个个整体，它们有明确的边界，它们需要特殊的支持代码来处理内存中的长度字段。进一步说，Pascal 还有**集合**类型，例如：

[^ascii]: 一种 ASCII 码的拓展，参加我的[另一篇博客](./ascii.md)。

```pascal
var
    JanuaryDays : set of 1..31;
```

也许 Pascal 在真实世界中的应用没有如预期般成功。因而它后来也定义了 *PChar*，即一个以 NULL[^NULL] 结尾的指向字符序列的指针，类似于 C 字符串。然而需要注意的是，Pascal 的指针类型是永恒不变、不能被转换的：在 Pascal 中，指向整数的指针*总是*指向整数的指针。

[^NULL]: 原文有误，应该是以 NUL 结尾（NUL-terminated）而不是 NULL。前者是空字符，后者是空字符。

从 Wirth 的角度来看，C 语言 “是一次巨大的倒退”[^leap]，他表示“它揭示了大部分人几乎没有掌握‘高级语言’这个术语的真正含义，使之变成了一个被误解的黑话”。他将问题归咎于 Unix，他说 Unix “像一个特洛伊木马[^trojan]一样引入了 C 语言”。他进一步详细说明了 C 的实际技术问题：

[^leap]: 原文是 great leap backward，直译为“大跃退”，Google 可知该词有特殊含义本该直译，但这里为了和谐仍然意译。

[^trojan]: 特洛伊木马是著名的希腊神话故事。大致为内容为，希腊人打造了一只巨大的木马，里面躲著伏兵并佯装撒退，让特洛伊人将其当作战利品带回城内，借此攻入特洛伊城。这里是比喻 C 语言是藏身在 Unix 这个特洛伊木马中的希腊人，“攻陷”了高级语言这座“城池”。

> C 语言看上去提供了一些抽象，实际上却并没有：数组没有索引检查，数据类型没有一致性检查，指针仅仅是可以进行加法和减法的地址。人们或许会把 C 语言归类为误导性的，甚至是危险的语言。

他的有关 C 语言缺乏索引检查的观点尤其重要：这可以上升到 C 语言是否真的是一门高级语言的问题上来。它并没有完全抽象掉处理数组的机器细节。语言理论家有时会把 C 称为“一个巨大的宏汇编器”，唯一抽象掉的就是原始指令集而已。

然而 Wirth 也承认 C 语言吸引人的方面：

> 大多数人——尤其是学术界——认为 C 语言既引人入胜，又“比汇编代码更胜一筹”[^better]。（...）它的规则可以被轻易地打破，而这正是许多程序员所珍视的。通过它，程序员能操控计算机的所有底层特性，尤其是那些被高级语言妥善隐藏起来的细节。C 语言赋予程序员自由，而高级语言的教条则被视为强加且多余的“紧身衣”。这无异于是在鼓励开发者沿用早期计算机时代为追求效率而不得不采用的底层技巧。

[^better]: 原文是 found it intriguing and “better than assembly code”，根据上下文，我推测是指 C 语言能让人接近底层，但是又没有汇编语言那么底层。

我们能理解为何面向效率的操作系统内核（如 Linux）会倾向于使用 C 语言。

然而这些技巧并没有随着计算机科学的成熟而消失。就在前几天，我为 Linux 写[补丁](https://lore.kernel.org/lkml/20220725085822.2360234-1-linus.walleij@linaro.org/)时写出了两段相似的代码——其实只需要把其中一个 `(const void *)` 强制转换为 `(void *)` 就能消除。后来我在[修订版的补丁](https://lore.kernel.org/lkml/20220725141036.2399822-1-linus.walleij@linaro.org/)的提交消息中还调侃了此事。在这种情况下，之所以要违反规则，其实是这是两害相权取其轻——到底是选形式正确还是选代码复用？我选择了代码复用。C 语言允许这种选择。后面介绍的语言*绝对不允许*这种选择，而 C 语言的强制转换则被视为一种可憎的行为。

包括 C 语言和 Pascal 在内的语言家族被称为[*命令式编程语言*](https://en.wikipedia.org/wiki/Imperative_programming)（imperative programming language）。它们决定性的特征是让程序员“像计算机一样思考”，或者更确切地说，想象自己就是程序计数器。“首先我做这个，接着我做这个，然后我做这个”——一系列顺序执行的语句，在脑海中保持着计算机的*状态*（例如寄存器、内存位置和堆栈）。

这对操作系统程序员最直接的吸引力不言而喻：这种语言几乎完美契合了系统开发者需要时刻关注的所有要素——寄存器、堆栈、缓存帧、内存管理单元（MMU）表、硬件状态转换等等。我们甚至可以将整个命令式语言家族视为专为操作系统开发而设计的[*领域特定语言*](https://en.wikipedia.org/wiki/Domain-specific_language)（DSL），就像 OpenGL 之于计算机图形软件开发者的地位一般。

## 用 Lambda 演算[^lambda]定义语言

[^lambda]: 参见我的[另一篇博客](https://yaossg.com/site/docs/lambda)。

1966 年，ALGOL 最早的使用者和贡献者之一（与 Peter Naur、Tony Hoare、Niklaus Wirth 有相同地位的）[Peter Landin](https://en.wikipedia.org/wiki/Peter_Landin)，发布了两篇 ACM 期刊的文章，题为《ALGOL 60 与 Church 的 Lambda 记号之间的关联》 [第一部分](https://fi.ort.edu.uy/innovaportal/file/20124/1/22-landin_correspondence-between-algol-60-and-churchs-lambda-notation.pdf) 和 [第二部分](https://dl.acm.org/doi/10.1145/363791.363804)。其中第一篇文章以风趣的冷笑话开头：

> 任何同时熟悉 ALGOL 60 和 Church 的 λ 记号的人都会注意到，
>
> 在一堆 λ 表达式中，变量与 λ 的绑定方式 
>
> 与 
> 
> 在一堆过程和代码块中，标识符与标题的绑定方式[^algol]
>
> 有着浅显的相似之处。

[^algol]: ALGOL 语言中的过程（procedure）和标题（heading）相当于现代语言中所说的函数（function）和函数声明（function declaration）。

当然，他心里其实很清楚，这世上除了他自己，再没人能看透这一点：既精通 [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) 的 λ 演算*又*熟悉 ALGOL 60 的人，全球*惊人地*仅此一人。更令人惊讶的是，居然真的存在这么个人。

Alonzo Church 是一个数理逻辑和可计算性方面的学者，他是 Alan Turing[^turing] 博士论文的导师，并且与 Kurt Gödel[^godel] 活跃于同一领域（这几位大佬在各自的文章中互相引用）。lambda 演算与 Bertrand Russell[^russell] 创建的类型集合论以及“逻辑—数学纲领”[^LMP]密切相关，这是另一个领域的历史，这里我们就不展开讨论了。

[^turing]: 阿兰·图灵（[Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing)）是英国数学家、逻辑学家和密码学家，被誉为计算机科学之父。他提出了图灵机的概念，并在二战期间成功破解了德国的恩尼格玛密码。图灵测试是他提出的一个用于判断机器是否具有人类智能的标准。

[^godel]: 库尔特·哥德尔（[Kurt Gödel](https://en.wikipedia.org/wiki/Kurt_G%C3%B6del)）是奥地利数学家和逻辑学家，以其在数理逻辑和集合论方面的贡献而闻名。他最著名的成就是哥德尔不完备性定理，证明了在任何足够强大的公理系统中，总存在无法被证明或反驳的命题。

[^russell]: 伯特兰·罗素（[Bertrand Russell](https://en.wikipedia.org/wiki/Bertrand_Russell)）是英国著名的哲学家、逻辑学家和数学家，因其在数理逻辑和集合论方面的贡献而闻名。以他名字命名的罗素悖论是他在集合论方面的一个重要贡献，揭示了某些集合的自指性问题。

[^LMP]: 逻辑—数学纲领（原文：logical-mathematical programme），是指一种试图将数学和逻辑结合起来的理论框架，旨在通过形式化的方法来理解和解决数学问题。

λ 演算（Lambda 演算）之于编程语言定义，就好比正则表达式之于语言*语法*（syntax）一样，不过定义的是*语义*（semantics）。正则表达式可以用正则的语法表达如何解析一段文本，λ 演算的表达式在抽象语法树（AST）的基础上更进一步，表示什么是加法、什么是减法，或什么是按位或。这样的练习在诸如编译器构造的课程中很少得到实践，但其实定义语义才是编程语言定义的内在部分。

也许在 Landin 的论文中，最为人所熟知的是幽默的[*语法糖*](https://en.wikipedia.org/wiki/Syntactic_sugar)一词——指那些不提供任何基础特性无法表达的语义，却可以让程序员生活更轻松的语言特性。话又说回来，语言最基础的数学特性，不正是 λ 演算最擅长表达的吗？

在 Landin 的第一篇用 λ 演算来定义 ALGOL 的文章中，有一个值得注意的发明，那就是 `let` 和 `where` 关键字，它们用来表示 λ 演算的*应用表达式*[^applicable]。这两个关键字在 ALGOL 中并不存在，它们是用来描述语言的语言，或者用一个更拽的词：*元语言（meta-language）*。我们见证了从 λ 演算衍生出新语言的第一步。Landin 在这篇文章中并没有给这个语言起名字，只是称之为“AE”。AE 在一个叫 SECD 的理论机器上执行，这又是一个像 Alan Turing 的“图灵机”一样的把戏：就像数学家说的“假设我们有...”一样。用 λ 演算定义 ALGOL 的完整框架叫做 AE/SECD。

[^applicable]: *应用表达式*（原文：*Applicable Expressions*）应该指的是 λ 演算中的应用（Application），即一个函数应用于一个参数的表达式（可以近似理解为像 `f(x)` 这样的表达式）。

## 函数式编程[^fp]

[^fp]: functional programming 也译作泛函编程，这里采用更广为接受的“函数式编程”。

接着，[函数式编程语言](https://en.wikipedia.org/wiki/Functional_programming)*实现*了 lambda 演算。总结了多年来使用 lambda 演算来定义 ALGOL 等语言的经验，得出的核心思想是：只要让语言的语法看起来像 lambda 演算表达式，就算是开了个好头，语义的验证就会很简单明了。

1966 年，Peter Landin 在他的文章[《The Next 700 Programming Languages》](https://www.cs.cmu.edu/~crary/819-f09/Landin66.pdf)中，继续使用 λ 演算来描述 ALGOL 的语法和语义。文中他借由他提出的一种名为 ISWIM（If You See What I Mean）的语言，发明了函数式编程的概念。如你所见，又是经典的冷笑话。ISWIM 是一种带有一些“语法糖”的 λ 演算，因此可以在这个框架的基础上创建出许多不同的语言。Landin 的文章引起了广泛关注，人们的确创造了许多语言，也许没有 700 种，至少目前没有。

他在文章的第十节《消除显式序列化》中开始推测，称可以用 ALGOL 语言玩一种游戏：删除所有 `goto` 语句和标签，让程序变得不那么序列化，即程序计数器只是进入下一行或迭代一个循环。他打趣道：

> 还有什么其它类似的特征？之所以考虑这个问题，是因为事实证明，强调用其它事物来描述事物，与强调不明确的序列化，会毫不意外的导向同样的要求。

他接着展示了如何将 ALGOL 程序转换为纯函数式的 ISWIM 程序，并总结道：

> ISWlM[^iswlm] 的特殊之处在于，它将过程性的概念嫁接到一个纯粹的函数式基底上，而没有破坏许多理想的性质。 (...) 本论文能做的不过是迈出解释它们在实践中的重要性的第一步。

[^iswlm]: 原文有误，应该是 ISWIM。

这段话是在发起号召：我们需要创造出类似于 ISWIM 的函数式编程语言，并且我们需要去掉 J 操作符（程序控制流操作符）[^jop]。Landin 没能自己做到这一点。

[^jop]: J 操作符在 ALGOL 语言中用于控制程序的执行流。它可以暂存程序的执行状态，并在需要时恢复到该状态（这种状态现在一般称为延续体 Continuation）。

## 元语言 ML

若干年后，1974 年，计算机科学家 [Robin Milner](https://en.wikipedia.org/wiki/Robin_Milner)，受 ISWIM 启发并响应 Landin 的挑战，创建了语言 [**ML**](https://en.wikipedia.org/wiki/ML_(programming_language))，即 **Meta Language**（元语言）的缩写。这是 700 种后续语言中的一种，并明确承认 Landin 关于定义语言的语言、定义语法的语法的想法：一个有着*元语法*的*元语言*。

在 Malcolm Newey、Lockwood Morris、Mike Gordon 和 Chris Wadswort 的帮助下，他在 DEC10 计算机上实现了这个语言，并在后来移植到了 VAX 架构上。

这个语言基于 ISWIM，但去掉了所谓的[*J 操作符*](https://en.wikipedia.org/wiki/J_operator) （程序点操作符）。它是一个领域特定（domain-specific）语言，目的是为了编写[一个叫 LCF 的定理证明工具](https://en.wikipedia.org/wiki/Logic_for_Computable_Functions)。标准 ML 已经被[完全语义规范化](https://smlfamily.github.io/sml97-defn.pdf)并且经过形式验证，在学术界和工业界都很流行。

移除 J 操作符让 ML 成为了一种[声明式语言](https://en.wikipedia.org/wiki/Declarative_programming)，即它不指定语句的执行顺序，而是成为了类似于 Prolog 或者说 Makefile 一类的语言：Makefile 中没有控制流，只有一系列需要求解的条件，以实现到一个完整的目标。

ML 仍然有一个命令式语言的特性：赋值。此时，一些学者认为 J 操作符和赋值都是不必要的，并开始定义[纯函数式语言](https://en.wikipedia.org/wiki/Purely_functional_programming)，例如 Haskell。我们在这里不考虑它们，它们超出了本文的范围。ML 和我们讨论的其它语言都可以标记为*非纯*：由喜欢纯函数式语言的人发明的一个贬义词。这些人不仅不喜欢命令式语言的序列化秉性，还不喜欢赋值（例如使用关键字 `let`），倾向于用求解抽象实体之间的关系的方式来思考。

ML 可以凭直觉理解。例如下面的表达式在 ML 中计算出整数 64：

```ocaml
let
    val m : int = 4
    val n : int = m*m
in
    m*n
end
```

这里我们仍能够看出很显著的 AE/SECD，ISIWM 特征，例如关键字 `let` 用于绑定变量，或者说将名称与整数和函数等元素关联（类似于某些语言中的 `:=` 赋值）。接下来[^the]可以看到 `in` 引导的实现区域。我们可以在 ML 中定义函数，例如计算五倍 `x` 的平方根：

[^the]: 原文这里是 the，应该是个笔误，这里按 then 翻译。

```ocaml
val rootfivex : real -> real =
    fn x : real => Math.sqrt (5.0 * x)
```

注意到 ML 没有使用 `BEGIN` 和 `END` 这样的构造，或者分号，这与 Python 等使用空白字符来确定基本块的开始和结束的语言一致。`real -> real` 的记号清晰地说明了这个函数接受一个实数作为输入，并产生一个实数作为输出。`real` 的名称反映了一种数学上的雄心。这个语言不能处理数学意义上的实数集——ML 的 `real` 就是其它语言所称的 `float`。

ML 有更多的语法糖，所以下面的写法与上面是等价的，其中使用了 `fun` 关键字（fun-记号[^fun]）:

```ocaml
fun rootfivex (x:real):real = Math.sqrt (5.0 * x)
```

[^fun]: `fun` 可以认为是一个双关语，既是函数的意思（取 function 的前三个字母），又有“有趣”的意思。很多编程语言都选用 `fun` 作为函数的关键字可能都出于这个原因。

ML 的语法应该是可以直观理解的。ML 和其它函数式语言的另一个特性是它们可以轻松地操作*元组*，即有序的变量序列，元组也可以从函数返回。例如，你可以用下面这样的函数来计算平面中原点和指定 XY 坐标之间的距离：

```ocaml
fun dist (x:real, y:real):real = Math.sqrt (x*x + y*y)
```

这个函数可以在其它地方被这样调用：

```ocaml
val coor (x:real, y:real)
val d = dist(coor)
```

其中 `d` 的类型是 `real`，这一点会从 `dist()` 函数的返回值的类型是 `real` 中推断出来。

ML 远比上面的例子复杂得多。

ML 语言有一个广受赞誉的优点，那就是它编写的程序像大多数函数式语言编写的程序一样，可以在计算意义上*被证明正确*。这可以在某些限制条件下完成：例如输入/输出操作需要被精确指定，哪些值会是输入，哪些值会导致未定义行为发生。

## CAML 和 OCaml

1987 年，Ascánder Suárez 在法国国家信息与自动化研究所（INRIA）[用 LISP 重新实现了一个 ML 的编译器和运行时系统](https://caml.inria.fr/about/history.en.html)，并称之为 **CAML**，即 *Categorical Abstract Machine Language*，这是一个双关语，因为它运行在一个虚拟机（Category Abstract Machine）上，并且是 ML 的后裔。它使用的抽象机器是 LLM3 抽象 LISP 机器[^machine]，而它本身又运行在另一台计算机上。它的速度不快。

[^machine]: 这里提到的“LLM3 抽象 LISP 机器”是一种虚拟机，用于执行 Lisp 方言 Le_Lisp 用 LLM3 编译器生成的程序（[参考资料](https://www.dreamsongs.com/Files/HOPL2-Uncut.pdf)）。这里的 LLM 与大语言模型无关。

从 1990 到 1991 年，Xavier Leroy 用 C 语言重新实现了 CAML，并称之为 *Caml Light*。它比 CAML 快，因为它不是在运行虚拟机的虚拟机中编写的[^vv]。Caml Light 更像 Java，使用一个[字节码解释器](https://en.wikipedia.org/wiki/Bytecode)作为它的虚拟机。

[^vv]: 原文如此（because it was not written in a virtual machine running a virtual machine）。合理推断作者本意是指 CAML 的虚拟机运行在 LLM3 抽象 LISP 机器上，有两层虚拟机；而 Caml Light 的虚拟机直接运行在 C 语言编写的虚拟机上，只有一层虚拟机。

1995 年，native 编译器 Caml Special Light 横空出世，从此 Caml 编译器生成的字节码可以被编译为目标代码，借助 [native *运行时环境*](http://github.com/ocaml/ocaml/tree/trunk/runtime)，在没有虚拟机开销的情况下执行。Didier Rémy、Jérôme Vouillon 和 Jacques Garrigue 继续维护 Caml 的开发。

1996 年，Objective Caml 为 Caml 增加了一些面向对象的特性。2011 年，扩展 Caml Special Light 编译器和 ML 的衍生语言（方言）被重新命名为 **OCaml**。从本质上讲，编译器和语言有着共生关系。OCaml 没有第二个实现。

1990 年代起，现代意义上的 [OCaml 语言和实现](https://github.com/ocaml/ocaml)开始获得关注。它是一种非常流行的函数式编程语言，或者说，在函数式编程语言中算很流行的那种。它有针对大多数架构的[优化实现](https://github.com/ocaml/ocaml/tree/trunk/asmcomp)。编译器本身现在主要是用 OCaml 编写的，但运行时仍然使用 C 语言，以便与最终运行程序的各个操作系统连接。OCaml 语言和编译器已经被用于各种应用程序。每个主要的 Linux 发行版都携带 OCaml 编译器和库的包。甚至还有[一个 GTK+ 3 的 OCaml 库绑定](https://garrigue.github.io/lablgtk/)，所以可以创建 OCaml GUI 程序。

OCaml 简化了绑定标签到数字等操作，这是用 OCaml 实现的冒泡排序：

```ocaml
(* Bubblesort in OCaml, Linus Walleij 2022 *)
let sort v =
  let newv = Array.make (Array.length v) 0 in
  for i = 1 to (Array.length v) - 1 do
    if v.(i - 1) > v.(i) then begin
      newv.(i - 1) <- v.(i);
      newv.(i) <- v.(i - 1);
      (* Copy back so we are working on the same thing *)
      v.(i - 1) <- newv.(i - 1);
      v.(i) <- newv.(i);
    end else begin
      newv.(i - 1) <- v.(i - 1);
      newv.(i) <- v.(i);
    end
  done;
  newv

let rec ordered v =
  if Array.length v = 0 then true
  else if Array.length v = 1 then true
  (* ... or if the rest of the array is ordered *)
  else if v.(0) < v.(1) && ordered (Array.sub v 1 (Array.length v - 1)) then true
  else false;;

let plist v =
  print_string "V = ";
  for i = 0 to (Array.length v) - 1 do begin
    print_int v.(i);
    if i < (Array.length v - 1) then print_string ",";
    end
  done;
  print_endline "";;

let rec sortme v =
  if ordered v then v
  else sortme (sort v);;

let v = [| 14 ; 4 ; 55 ; 100 ; 11 ; 29 ; 76 ; 19 ; 6 ; 82 ; 99 ; 0 ; 57 ; 36 ; 61 ; 30 |];;
plist v;;
plist (sortme v);;
```

我编写这个例子带来的感受是，OCaml 对于通过索引来修改数组内容有点“抵触”。它“不喜欢”任何命令式的构造，并且有点像在肘你[^nudge]向着纯逻辑的构造方向前进，比如上面的 `ordered` 函数。这只是我个人的看法。

[^nudge]: 原文是 nudge，意为“轻推、肘击”。

OCaml 仍然是 ML 的一个方言。所有文件的后缀名都是 `.ml`。OCaml 和 Python 的 *pip* 或 Perl 的 *CPAN* 一样，有自己的包管理系统和库，叫做 [**opam**](https://opam.ocaml.org/)。OCaml 的主要应用仍然是 [OCaml Ergo Library](https://opam.ocaml.org/packages/alt-ergo-lib-free/)，一个自动定理证明的库。如果你使用计算机的首要目的就是定理证明，那么自 1974 年以来 ML 和 OCaml 一直都在提供这个功能。近年来广受欢迎的 [Coq 定理证明器](https://en.wikipedia.org/wiki/Coq) 也是用 OCaml 编写的。

## 接下来是 Rust

Rust 最初是 Graydon Hoare 2006 年时在 Mozilla 工作期间的一个业余爱好项目。[（Rust 官网）[^mention]提到](https://doc.rust-lang.org/reference/influences.html) OCaml 和 ML 是除了 C/C++ 之外，对 Rust 影响最大的语言。一个经典的例证是 [Rust 的第一个编译器](https://github.com/graydon/rust-prehistory/tree/master/src/boot/fe)是用 OCaml 编写的。除了 Hoare 之外，[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)[^brendan] 是这个代码库的一个著名贡献者，他是 Mozilla 项目的创始人之一，也是 JavaScript 的发明者。尽管 Brendan 没有贡献太多代码，但他当时是 Mozilla 的 CTO，这表明当 Mozilla 在 2009 年开始支持该项目时，Rust 已经在该组织中扎根，Eich 的早期贡献是应该被注意到的。（也许中型公司的 CTO 亲自向复杂代码库提交代码其实不是什么新鲜事？谁知道呢？）[^humor]

[^mention]: 原文是被动语态，主语省略，直译成汉语略显生硬，遂改成主动语态，补出主语。主语 Rust 官网是根据原文提供的链接推测的。Rust 官网实际上把 OCaml 放在了 C++ 之上，重要性可见一斑。

[^brendan]: Brendan Eich 在后文被作者用 Brendan 和 Eich 分别称呼了一次，请注意这是同一个人。

[^humor]: 括号里这句话是作者的幽默。即在强调作为 CTO 亲自去贡献代码的情况应该是很少见的，以此来说明 Brendan 对 Rust 的重视。

尽管当时 Rust 的编译器是 OCaml 代码库，但 Rust 的[第一个文档](https://doc.rust-lang.org/reference/influences.html)提到的更多的却是其它函数式或声明式语言，例如 NIL、Hermes、Erlang、Sather、Newsqueak、Limbo 和 Napier。这些起源的介绍，连同大量对诸如 Joe Armstrong（Erlang 的发明者）等人的引用，在当今的 Rust 文档中已经被淡化了。然而，显而易见的是，Graydon 对历史上的计算机语言有着深厚的兴趣，并坚信它们有东西可以教给我们，他显露出借鉴这些语言，挑选出最好的部分的雄心。用他自己的话说：

> 我一直以来都是一位语言多元主义者——想象一下，我对语言的态度，就像一个孩子喜欢各种各样的积木、乐器或塑料恐龙一样——我认为传教士式的单一语言主义尤其没有益处。[^ironic]

[^ironic]: 讽刺的是，如今的 Rust 语言社区似乎与 Graydon 的这种多元主义态度背道而驰，反而表现出一种单一语言主义的倾向。

Rust 的独特之处在于它将“非纯”函数式编程与命令式编程融合在一起，将许多来自 ML 和 OCaml 的概念引入到语言中。

Rust 的另一个特色在于它从一开始就编译为目标机器代码，而不是像 Peter Landin 的 ISWIM、ML 和 OCaml 语言那样使用任何类型的虚拟机（Java 或 Python 也是如此）。Graydon 可能是出于直觉做到了这一点，但他在 [2019 年的一篇文章](https://graydon2.dreamwidth.org/264181.html) 中强调了这一点：虚拟机，即使作为中间步骤，也是糟糕的语言工程，通常来说是个*坏主意*。

2013 年，因个人原因，Graydon 辞去了 Rust 的主要负责人职务，他在 [Reddit 上的帖子](https://www.reddit.com/r/rust/comments/7qels2/i_wonder_why_graydon_hoare_the_author_of_rust/)中进行了详细的说明。

与 OCaml 一样，Rust 曾经与单一的编译器[^llvm]有着共生关系。但这种关系正在发生变化，因为现在有第二个基于 GCC 的实现正在开发中。

[^llvm]: 这里指的是 Rust 官方的 LLVM 实现。作者在这里行文非常跳跃，前面一直在讲 Rust 编译器早期的 OCaml 实现，这里突然“跳过”了长期以来唯一存在的 LLVM 的官方实现（正文中甚至没有出现过 LLVM 的名字），直接提到 GCC 的社区实现。

这是用 Rust 实现的冒泡排序：

```rust
/* Bubblesort in Rust, Linus Walleij 2022 */
fn sort(array : &mut [i32]) {
   let mut x : i32;
   if array.len() == 1 {
      return;
   }
   for i in 1..array.len() {
      if array[i - 1] > array[i] {
      	 x = array[i - 1];
	 array[i - 1] = array[i];
	 array[i] = x;
      }
   }
}

fn is_ordered(array : &[i32]) -> bool {
   if array.len() <= 1 {
     return true;
   }
   for i in 1..array.len() {
     if array[i - 1] > array[i] {
       return false;
     }
   }
   return true;
}

fn parray(array : &[i32]) {
   let mut x : i32;
   print!("V = ");
   for i in 0..array.len() {
       x = array[i];
       print!("{x}");
       if i != (array.len() - 1) {
       	  print!(",");
       }
   }
   println!("");
}

fn main() {
   let mut array: [i32; 16] = [14, 4, 55, 100, 11, 29, 76, 19, 6, 82, 99, 0, 57, 36, 61, 30];
   parray(&array);
   while !is_ordered(&array) {
     sort(&mut array);
   }
   parray(&array);
}
```

Rust 让自己成为了一个比 OCaml 更容易进行命令式编程的语言：在这个例子中，关键字 `mut` 和 C 语言的 [*const 正确性标记*](https://en.wikipedia.org/wiki/Const_(computer_programming)) 非常相似。由于 `is_ordered` 和 `parray` 不会改变数组的内容，所以这些函数不需要标记为 `mut`。你可以看到 Pascal 的一些熟悉的优点：数组“知道”它们的长度，我们使用一个方法来获取它：`array.len()`。

Rust 既定目标是提高内存安全性、数据竞争安全性（并发）和类型安全性。文章 [《Safe Systems Programming in Rust》](https://iris-project.org/pdfs/2021-rustbelt-cacm-final.pdf) 坚定而直截了当地展示了这个雄心。Graydon 还在 [2016 年的一篇博文](https://graydon2.dreamwidth.org/247406.html) 中强调了对内存和并发安全性的关注。

但*别搞错了*。当前这些目标，其底层逻辑*完全*与 1958 年到 1968 年 ALGOL 委员会的雄心一致：通过*将计算机编程与形式逻辑结合起来*，来*提升语言的抽象性*。这来自于学术界对该语言的强大支持。

这种雄心的一个典型迹象是[资金充足的 RustBelt 项目](https://plv.mpi-sws.org/rustbelt/)，涉及大量学术研究人员，他们都熟悉形式逻辑，并产生了诸如 Ralf Jung 的博士论文 [《Understanding and Evolving the Rust Programming Language》](https://research.ralfj.de/phd/thesis-screen.pdf) 这样的成果。下面，用 Rust Belt 和 Coq 证明助手中的形式逻辑可以得出结论（来自摘要）：

> 这些证明共同构建出一个结论：只要 λRust 程序中仅存的不安全的代码被限制在满足其验证条件的库中，该程序就可以安全地执行。

所谓“可以安全地执行”是指没有释放后使用（use-after-free）、悬空指针、过期引用、空指针异常等问题，因为它们在形式逻辑中被证明了：QED[^qed]。然而，这并不能阻止你除以零，这个问题超出了这项工作的范畴[^analysis]。

[^qed]: QED 是拉丁语“quod erat demonstrandum”的缩写，意为“这就是要证明的”。放在证明的最后，表示证明已经完成。这里是强调形式逻辑的严谨性可以确保 Rust 代码的安全性。
[^analysis]: 类似的问题同样可以通过静态分析等方法来解决，但这里指的是不通过 Rust 的强制编译检查来解决。类似的，Rust 也不把常被视为缺陷的内存泄漏视为不安全的行为，同样也没有这方面的强制检查。

对我个人而言，Jung 的论文中最令人惊讶的是，它设法多次引用和参考计算机科学家 Tony Hoare，而竟一次也没有引用 Rust 语言的发明者 Graydon Hoare。这在某种程度上证实了 Graydon 自己的说法，即从语言的角度来看，Rust “没有什么新东西”。

C 语言无法像 Rust 那样接受同样严格的审查，仅仅是因为它允许各种用法（或滥用），正如 Wirth 从历史的角度出发提到的那样：如果一个类型可以通过强制转换来改变，并且数组索引甚至不是语言的一部分，那么就没有什么好证明的。学者们感兴趣的是 C 的一个定义良好的子集，例如 [eBPF 子集](https://www.kernel.org/doc/html/latest/bpf/index.html)，这也部分解释了对 eBPF 的强烈兴趣：与 Rust 一样，构建环境和语言运行时已经在更严格的约束下定义，因此可以进行形式验证。

在我看来，无论推动它的人是否意识到这一点，Rust 的雄心是完成 ALGOL 委员会作为*首要动力*于 1958 年开始的工作，而 1968 年北约软件工程大会中得出的结论是有必要的：开发一种依赖形式逻辑证明的系统编程语言，来实现 ALGOL 无法实现、Pascal 无法实现、以及所有“也许没有 700 种”[^maybe-not-700]的函数式编程语言所无法实现的目标：将**计算机科学**学科和**软件工程**学科结合成**统一**的学科，让两个学科的学者可以共同解决问题。

[^maybe-not-700]: 原文是 maybe-not-700。这是对前文提到的 Landin 的《The Next 700 Programming Languages》一文，作者打趣说 “也许没有 700 种” 的一种 callback。

这是 Rust 作为 Linux 等操作系统的实现语言的雄心：提供一种由当前最前沿的计算机科学研究作为支持语言，以便立即应用于开发最前沿的操作系统的软件工程。

它提供给 Linux 的就是**提升抽象**，以应对 1968 年北约软件工程大会上提出的复杂性问题（如今这些问题由于频繁发生的安全事件而变得愈发显著），从而使 Linux 工程项目更接近计算机科学。

其它提升 Linux（内存、并发）安全性的方式也是可能的：显著增加测试，这是工程学的灵丹妙药。自动化测试在近几年确实有了大幅提升。提升实现语言的抽象性和形式验证则是为了让测试变得*不那么*重要。

## 后记

:::note[原文后记]
Mathieu Poirer 和 Jesper Jansson 帮我审阅了这篇博客，我对此感激不尽。剩下的错误、漏洞、偏见都是我自己的。
:::

:::note[译者后记]
译者一直以来都希望能够系统性的梳理一下编程语言的发展史，这篇博客正好提供了一个视角。

译者水平有限，翻译过程中难免出现错误和不当之处，欢迎读者指正。
:::
