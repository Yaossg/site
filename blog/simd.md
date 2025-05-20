---
date: 2023-05-09
tags: 
  - cpp
  - type
---

# `<experimental/simd>` 初体验

[之前用非标准的 simd 写过矩阵乘法加速](https://yaossg.com/site/docs/cnss/2#向量化)，近期注意到 C++ 新的 Technical specifications——[Parallelism library extensions v2](https://en.cppreference.com/w/cpp/experimental/parallelism_2) 加入了 [`<experimental/simd>`](https://en.cppreference.com/w/cpp/experimental/simd)。于是我尝试用它重写了一下。


<!--truncate-->

```cpp
#include <iostream>
#include <string>
#include <functional>
#include <chrono>
#include <vector>
#include <cstring>
using namespace std;


double timeit(std::function<void()> test) {
    auto start = std::chrono::system_clock::now();
    test();
    auto stop = std::chrono::system_clock::now();
    std::chrono::duration<double, std::milli> time = stop - start;
    return time.count();
}

#include <experimental/simd>
namespace stdx = std::experimental;

struct vec {
    constexpr static int N = 256;

    stdx::fixed_size_simd<double, 4> a[N];
    double& operator[](int x) {
        return ((double*) a)[x];
    }
    const double& operator[](int x) const {
        return ((double*) a)[x];
    }
    double dot(const vec& x) const {
        stdx::fixed_size_simd<double, 4> sum = 0;
        for (int i = 0; i < N; i++)
            sum += a[i] * x.a[i];
        return stdx::reduce(sum);
    }
};

class matrix {
    constexpr static size_t m = 1024, n = 1024;
    vector<double> e;
public:
    explicit matrix(): e(m * n) {}
    void random() {
        for (size_t i = 0; i < m; ++i)
            for (size_t j = 0; j < n; ++j)
                at(i, j) = rand();
    }
    matrix(matrix const& that) = default;
    matrix(matrix&&) = default;
    matrix& operator=(matrix const& that) = default;
    matrix& operator=(matrix&& that) = default;
    double& at(size_t i, size_t j) { return e[i * m + j]; }
    double const& at(size_t i, size_t j) const { return e[i * m + j]; }

    matrix mul_plain(matrix const& that) const {
        size_t p = that.m;
        matrix product;
        for (size_t i = 0; i < m; ++i)
            for (size_t j = 0; j < n; ++j) {
                for (size_t k = 0; k < p; ++k)
                    product.at(i, j) += at(i, k) * that.at(k, j);
            }
        return product;
    }

    matrix mul_simd(matrix const& that) const {
        vector<vec> lines(m), columns(n);
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                lines[i][j] = at(i, j);
                columns[j][i] = that.at(i, j);
            }
        }
        matrix r;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                r.at(i, j) = lines[i].dot(columns[j]);
            }
        }
        return r;
    }
};

double timeit(matrix (matrix::* test)(matrix const&) const, int times, const char* impl, double base = 0) {
    double time = timeit([=] {
        srand(1);
        for (int i = 0; i < times; ++i) {
            matrix m1, m2;
            m1.random(); m2.random();
            (m1.*test)(m2);
        }
    });
    printf("'%5s' took %.2f ms to complete %d times 1024 x 1024 matrices multiplication", impl, time, times);
    if (base && base != time) {
        printf(", %.2f%% ", abs(base - time) / base * 100);
        if (base > time) printf("faster");
        else printf("slower");
    }
    puts("");
    return time;
}


int main() {
    double base = timeit(&matrix::mul_plain, 1, "plain");
    timeit(&matrix::mul_simd, 1, "simd", base);
}
```

输出：

```text
'plain' took 5458.48 ms to complete 1 times 1024 x 1024 matrices multiplication
' simd' took 232.27 ms to complete 1 times 1024 x 1024 matrices multiplication, 95.74% faster
```