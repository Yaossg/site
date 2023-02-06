---
title: 速通统计学
date: 2023-02-06 18:13:45
tags: 
  - math
---

本文为 UESTC 《概率论与数理统计》课程统计学部分（6-10章）期末考试复习速通笔记，旨在背多分。


## 四个统计学分布

### 正态分布

$$
X\sim N(\mu, \sigma^2)\\
$$

### 卡方分布

$$
\chi^2=\sum_{i=1}^n X_i^2\sim\chi^2(n)\\
\text{ 其中 } X \sim N(0, 1)
$$

### t 分布

又叫学生分布
$$
T=\dfrac{X}{\sqrt{Y/n}} \sim t(n)\\
\text{ 其中 } X \sim N(0, 1), Y\sim\chi^2(n)
$$

### F 分布

又叫费舍尔（Fisher）分布
$$
F=\dfrac{X/n_1}{Y/n_2}\\
\text{ 其中 } X\sim\chi^2(n_1), Y\sim\chi^2(n_2)
$$

## 参数估计与假设检验

### 距估计

$$
\hat{\mu}=\overline{X}\\
\hat{\sigma}^2=\dfrac{n-1}nS^2
$$

### 极大似然估计

核心思想是使似然函数 $L$ 取极大值。即求出一个 $\theta$，使取出这个样本的概率最大。
$$
L=\prod_{i=1}^nP(X_i=x_i)\\
\ln L=\sum_{i=1}^n \ln P(X_i=x_i)\\
\dfrac{\partial \ln L}{\partial\theta}=0
$$

### 区间估计和假设检验

- 估计或检验 $\mu$，$\sigma$ 已知

$$
U=\dfrac{\overline{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)
$$

- 估计或检验 $\mu$，$\sigma$ 未知

$$
T=\dfrac{\overline{X}-\mu}{S/\sqrt{n}}\sim t(n-1)
$$

- 估计或检验 $\sigma$，$\mu$ 已知

$$
\chi^2=\dfrac{n-1}{\sigma^2}S^2\sim\chi^2(n-1)
$$

第一类错误：弃真（犯错概率为 $\alpha$）

第二类错误：纳伪

## 线性回归

$$
l_{xy}=\sum_{i=1}^nx_iy_i-n\bar{x}\bar{y}\\
l_{xx}=\sum_{i=1}^nx_i^2-n\bar{x}^2\\
l_{yy}=\sum_{i=1}^ny_i^2-n\bar{y}^2\\
\hat{b}=\dfrac{l_{xy}}{l_{xx}}, \hat{a}=\bar{y}-\hat{b}\bar{x}\\
\hat{\sigma}^2=\dfrac{l_{yy}-\hat{b}^2l_{xx}}{n-2}\\
R=\dfrac{l_{xy}}{\sqrt{l_{xx}l_{yy}}}>R_\alpha(n-2)
$$



