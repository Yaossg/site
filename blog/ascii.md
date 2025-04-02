---
date: 2024-06-23
tags:
  - encoding
---

# ASCII 和它的朋友们

<!--truncate-->

ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）想必大家都很熟悉了。在远古时期，字符集和编码还没有分的那么开（这也是为什么如今很多人分不清的原因），ASCII 既是字符集，也是编码。

- 作为字符集，它包含了 33 个控制字符和 95 个可打印（printable）字符，对应 0~127 共 128 个码位。
- 作为编码，它使用字节的低七位表示字符的码位，因此 ASCII 编码的字节序列中每个字节都与一个字符对应。

需要注意的是，字符的分类从实际的性质和区块（block）的划分上是有所不同的：

- ASCII 的码位 0~31 是控制字符没错，但不要忘了 127 DEL 也是控制字符。32 空格是不是控制字符存在争议。

- 码位 0-31 的字符被划分为 C0 Controls（C0 控制字符），码位 32-127 的字符被划分为 Basic Latin（基本拉丁字母）。

可以发现 C0 并没有包含 ASCII 所有控制字符，Basic Latin 下除了拉丁字母还有数字、标点符号等，但区块就是这么分的。

## ISO 646

ISO 646 是 ASCII 的国际标准版本。但是考虑到不是所有国家都使用美国的标点符号，因此规定，各个国家可以根据自己的需要，将下面这些符号替换为其它的字符。下表列出中日英德的四个变体：（其中中国的国家标准即 GB 1988）

| ASCII-US | !    | "    | #    | $    | &    | :    | ?    | @    | [    | \    | ]    | ^    | _    | `    | \{   | \|   | }    | ~    |
| -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| CN       | !    | "    | #    | ¥    | &    | :    | ?    | @    | [    | \    | ]    | ^    | _    | `    | \{   | \|   | }    | ‾    |
| JP       | !    | "    | #    | $    | &    | :    | ?    | @    | [    | ¥    | ]    | ^    | _    | `    | \{   | \|   | }    | ‾    |
| GB       | !    | "    | £    | $    | &    | :    | ?    | @    | [    | \    | ]    | ^    | _    | `    | \{   | \|   | }    | ‾    |
| DE       | !    | "    | #    | $    | &    | :    | ?    | §    | Ä    | Ö    | Ü    | ^    | _    | `    | ä    | ö    | ü    | ß    |

不要觉得德国的看上去很魔幻，实际上大部分欧洲国家皆是如此，只是这里不便列出更多。这也揭示了 C 语言的双字符、三字符还有头文件`<iso646.h>`的由来，参见[这里](https://yaossg.com/site/docs/cripplec/text)。

*时至今日，你仍然能看到不少日本的计算机的反斜杠被显示为日元符号——不过比起软盘和传真机，这倒也不是不可以接受就是了。*

## 扩展 ASCII

ISO 646 推荐的直接修改已分配的 ASCII 码位的字符的做法似乎确实不妥。因此我们逐渐转向扩展 ASCII——毕竟 0x80~0xFF 的码位还未分配嘛。

扩展 ASCII 编码一共讨论、公布了 15 种方案，并被标准化为了 ISO 8859-n，其中 n 为数字 1、2、3、4、5、6、7、8、9、10、11、13、14、15、16 中的一个。（别看了，缺的是 12）

0x80~0xFF 是如何被分配的呢？为了跟 0x00-0x7F 长得像一点，它也分为两个区块：

- 0x80-0x9F 是 C1 Controls（C1 控制字符）。C0 和 C1 Controls 由 ISO 6429 标准规定。

- 剩下的码位 0xA0~0xFF 为一个区块，如下表所示：

| ISO 8859-n  | 区块名称 | 说明         |
| ----------- | -------- | ------------ |
| ISO 8859-1  | Latin-1  | 西欧语言     |
| ISO 8859-2  | Latin-2  | 中欧语言     |
| ISO 8859-3  | Latin-3  | 南欧语言     |
| ISO 8859-4  | Latin-4  | 北欧语言     |
| ISO 8859-5  | Cyrillic | 斯拉夫语言   |
| ISO 8859-6  | Arabic   | 阿拉伯语     |
| ISO 8859-7  | Greek    | 希腊语       |
| ISO 8859-8  | Hebrew   | 希伯来语     |
| ISO 8859-9  | Latin-5  | 土耳其语     |
| ISO 8859-10 | Latin-6  | 北日耳曼语族 |
| ISO 8859-11 | Thai     | 泰语         |
| ISO 8859-13 | Latin-7  | 波罗的语族   |
| ISO 8859-14 | Latin-8  | 凯尔特语族   |
| ISO 8859-15 | Latin-9  | 芬兰语       |
| ISO 8859-16 | Latin-10 | 罗马尼亚语   |

别担心，我们不关心上面所有的方案——被运用的最广泛的方案，毫无疑问的，便是 ISO 8859-1。后来它也成为了 Unicode 的一部分。

## 番外：EBCDIC

ASCII 并非没有竞争者。在那个勃勃生机万物竟发的年代，ASCII 只是众多字符集中的一个。

EBCDIC（Extended Binary Coded Decimal Interchange Code，扩展二进制编码十进制交换代码）是 IBM 推出的一套字符编码，起源于 BCD 码和穿孔卡片（punched cards），在当时也有一定的影响力。

然而它的缺点很明显：拉丁字母不是连续排列的，中间间断了多次，这给使用带来了极大地不便；默认支持的可打印字符较少，且被松散地排列在 0x40 到 0xFF 之间，剩下不连续的空位留给扩展字符，使得扩展与非扩展字符混杂在一起；互不兼容的诸多扩展版本让本就凌乱的标准雪上加霜；混乱的设计更是让与 ASCII 的兼容无从谈起。

>Professor: "So the American government went to IBM to come up with an encryption standard, and they came up with—"
>
>Student: "EBCDIC!"
>
>
>教授：“美国政府造访 IBM，让他们提出一套加密标准，他们提出了——”
>
>学生：“EBCDIC！”
>
>—— the Unix fortune file of 4.3BSD Reno (1990)

最终 ASCII 获胜了，则而 EBCDIC 消失在了历史的长河之中。


## 参考资料

- https://en.wikipedia.org/wiki/ASCII
- https://en.wikipedia.org/wiki/ISO/IEC_646
- https://en.wikipedia.org/wiki/ISO/IEC_8859
- https://en.wikipedia.org/wiki/C0_and_C1_control_codes
- https://en.wikipedia.org/wiki/EBCDIC
