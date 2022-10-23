# 🖼️ [C] 禅与计算机维修艺术

## 题目

### 📒 先行题目

在你的 wp 开始，请你先回答以下问题。

这四道问题的回答不占总分，但是答错一道以上的题目将会直接打回 wp。请认真作答。

1. 观察以下代码在 Racket v8.3 中的运行结果：

   ```scheme
   > cons
   #<procedure:cons>
   > if
   ; stdin:1:0: if: bad syntax
   ;   in: if
   ; [,bt for context]
   ```

   从上述代码可以看出，`cons` 是一个内置过程，而 `if` **不是**内置过程。试分析在 Scheme 中为什么**不应该**将 `if` 定义为一个过程。你需要在分析中安插适当的举例论证。

   顺便说说什么“过程”不能内置，以及为什么。

2. 观察以下代码：

   ```scheme
   (define (square-list items)
       (define (iter things answer)
       (if (null? things)
           answer
           (iter (cdr things)
               (cons (square (car things)) answer))))
       (iter items '()))
   ```

   在本例中，函数 `(square-list x)` 应与 `(map (lambda (x) (* x x)) x)` 具有一样的效果，实际上，`square-list` 返回的结果刚好是预期结果的 `reverse`。即便更改 `cons` 的两参数顺序，也不能得到预期结果。试分析，有没有办法修改上述代码，在保持其为**迭代计算过程**的同时**在相同的时间复杂度下**得到预期答案？若能，请附上代码与说明；若不能，请说明理由。

3. 请你利用序对，写一个前端插入删除和后端插入删除时间复杂度均为 \Theta(1)Θ(1) 的双端队列。如果不能直接输出的话，请自行定义用于输出的函数。

4. 请你在不使用 `define`、`let` 等定义、赋值语句的前提下，实现一个递归求模 998244353998244353 意义下快速幂的程序。

------

> amb 求值器是一种用于解决非确定性计算问题的求值器。
>
> ```scheme
> (let ((a (amb 1 2)) 
>       (b (amb 1 2))) 
>   (require (< a b)) 
>   (list a b)) ; (1 2) 
> ```
>
> 这里，`(amb args...)` 表示的是这个变量有 `args...` 这么多种取值，`(require fun)` 表示的是要求 `fun` 必须成立。随着 `require` 越来越多，每个变量的取值可能会越来越少，最终收束于若干个解中。
> `amb` 求值器是可以求多解问题的，也有遍历方法，例如：
>
> ```scheme
> (amb-possibility-list (+ (amb 1 2) (amb 3 4))) ; (4 5 5 6)
> ```
>
> `ramb` 是 `amb`求值的随机版本。相比于 `amb`，`ramb` 随机选择一个分支执行。

### 📒 正式题目

XuKaFy 想要利用 `amb` 求值器求解八皇后问题，你能帮帮他吗？

请用 Lisp 的某种方言完成本题。在本题中，你需要实现 `amb`、`ramb`、`require` 和 `amb-possibility-list` 四个函数，并且利用这个 `amb` 求值器求解八皇后问题。注意，你提交的代码要能够单独运行，不能只写一部分。

## 题解

### 📒 先行题目

#### 1

因为 Scheme 对过程的所有参数都会求值，但是 if 只会对其中一个分支求值。这可以看做一种广义的短路求值。

也就是说，影响求值与否、求值顺序的过程不能内置。

#### 2

```scheme
#lang racket

(define (entry node) (mcar node))
(define (prev node) (mcar (mcdr node)))
(define (next node) (mcdr (mcdr node)))
(define (set-prev! node new) (set-mcar! (mcdr node) new))
(define (set-next! node new) (set-mcdr! (mcdr node) new))
(define (make-node entry prev next) (mcons entry (mcons prev next)))
(define (make-deque entry) (let ((node (make-node entry '() '()))) (mcons node node)))
(define (push-front deque entry)
  (let* (
        (first-node (mcar deque))
        (new-node (make-node entry '() first-node))
        )
    (set-prev! first-node new-node)
    (set-mcar! deque new-node)
    )
  )
(define (pop-back deque)
  (let* (
        (last-node (mcdr deque))
        (new-node (prev last-node))
        )
    (set-next! new-node '())
    (set-mcdr! deque new-node)
    )
  )
(define (square x) (* x x))
(define (square-list items)
  (define d (make-deque 0))
  (define (iter things)
    (unless (null? things)
      (begin (push-front d (square (car things))) (iter (cdr things)))))
  (iter items)
  (pop-back d)
  (define (deque->list d ans)
    (if (null? d) ans (deque->list (next d) (cons (entry d) ans)))
    )
  (deque->list (mcar d) '())
  )
```

#### 3

```scheme
#lang racket

(define (entry node) (mcar node))
(define (prev node) (mcar (mcdr node)))
(define (next node) (mcdr (mcdr node)))
(define (set-prev! node new) (set-mcar! (mcdr node) new))
(define (set-next! node new) (set-mcdr! (mcdr node) new))
(define (make-node entry prev next) (mcons entry (mcons prev next)))
(define (make-deque entry) (let ((node (make-node entry '() '()))) (mcons node node)))
(define (print-deque deque)
  (define (print-node node)
    (unless (null? node) (begin (printf " ~a" (entry node)) (print-node (next node))))
    )
  (display "(deque")
  (print-node (mcar deque))
  (display ")\n")
  )
(define (push-back deque entry)
  (let* (
        (last-node (mcdr deque))
        (new-node (make-node entry last-node '()))
        )
    (set-next! last-node new-node)
    (set-mcdr! deque new-node)
    )
  )
(define (push-front deque entry)
  (let* (
        (first-node (mcar deque))
        (new-node (make-node entry '() first-node))
        )
    (set-prev! first-node new-node)
    (set-mcar! deque new-node)
    )
  )
(define (pop-back deque)
  (let* (
        (last-node (mcdr deque))
        (new-node (prev last-node))
        )
    (set-next! new-node '())
    (set-mcdr! deque new-node)
    )
  )
(define (pop-front deque)
  (let* (
        (first-node (mcar deque))
        (new-node (next first-node))
        )
    (set-prev! new-node '())
    (set-mcar! deque new-node)
    )
  )
(define d (make-deque 1))
(print-deque d)
(push-front d 2)
(print-deque d)
(push-back d 3)
(print-deque d)
(push-front d 4)
(print-deque d)
(pop-back d)
(print-deque d)
(pop-front d)
(print-deque d)
```

#### 4

```scheme
#lang racket

(
 (lambda (f a n) (f f a n))
 (lambda (f a n)
  (remainder (cond ((= n 0) 1)
        ((= n 1) a)
        ((= (remainder n 2) 1) (* a (f f a (- n 1))))
        (else (f f (* a a) (/ n 2)))
        ) 998244353)
  )
2 100
)
```

### 📒 正式题目

```scheme
#lang sicp

; algorithm

(define (shuffle x)
  (do ((v (list->vector x)) (n (length x) (- n 1)))
      ((zero? n) (vector->list v))
    (let* ((r (random n)) (t (vector-ref v r)))
      (vector-set! v r (vector-ref v (- n 1)))
      (vector-set! v (- n 1) t))))

; infrastructure

(define apply-in-underlying-scheme apply)

(define (tagged-list? exp tag)
  (and (pair? exp) (eq? (car exp) tag)))

(define (self-evaluating? exp)
  (or (number? exp) (string? exp)))

(define (variable? exp)
  (symbol? exp))

(define (quoted? exp)
  (tagged-list? exp 'quote))

(define (text-of-quotation exp)
  (cadr exp))

(define (assignment? exp)
  (tagged-list? exp 'set!))

(define (assignment-variable)
  (cadr exp))

(define (assignment-value)
  (caddr exp))

(define (definition? exp)
  (tagged-list? exp 'define))

(define (definition-variable exp)
  (if (symbol? (cadr exp))
      (cadr exp)
      (caadr exp)))

(define (definition-value exp)
  (if (symbol? (cadr exp))
      (caddr exp)
      (make-lambda (cdadr exp)
                   (cddr exp))))

(define (lambda? exp)
  (tagged-list? exp 'lambda))

(define (lambda-parameters exp)
  (cadr exp))

(define (lambda-body exp)
  (cddr exp))

(define (make-lambda parameters body)
  (cons 'lambda (cons parameters body)))

(define (if? exp)
  (tagged-list? exp 'if))

(define (if-cond exp)
  (cadr exp))

(define (if-then exp)
  (caddr exp))

(define (if-else exp)
  (cadddr exp))

(define (make-if cond then else)
  (list 'if cond then else))

(define (begin? exp)
  (tagged-list? exp 'begin))

(define (begin-actions exp)
  (cdr exp))

(define (application? exp)
  (pair? exp))

(define (operator exp)
  (car exp))

(define (operands exp)
  (cdr exp))

(define (true? exp)
  (not (eq? exp #f)))

(define (make-procedure parameters body env)
  (list 'procedure parameters body env))

(define (compound-procedure? p)
  (tagged-list? p 'procedure))

(define (procedure-parameters p)
  (cadr p))

(define (procedure-body p)
  (caddr p))

(define (procedure-environment p)
  (cadddr p))

; syntactic sugar: let

(define (let? exp)
  (tagged-list? exp 'let))

(define (let-pairs exp)
  (cadr exp))

(define (let-variables exp)
  (map car (let-pairs exp)))

(define (let-exps exp)
  (map cadr (let-pairs exp)))

(define (let-body exp)
  (cddr exp))

(define (let->combination exp)
  (cons (make-lambda (let-variables exp) (let-body exp)) (let-exps exp)))

; amb

(define (amb? exp)
  (tagged-list? exp 'amb))

(define (ramb? exp)
  (tagged-list? exp 'ramb))

(define (amb-choices exp)
  (cdr exp))

; analyze

(define (analyze-self-evaluating exp)
  (lambda (env succeed fail)
    (succeed exp fail)))

(define (analyze-quoted exp)
  (let ((qval (text-of-quotation exp)))
    (lambda (env succeed fail)
      (succeed qval fail))))

(define (analyze-variable exp)
  (lambda (env succeed fail)
    (succeed (lookup-variable-value exp env) fail)))

(define (analyze-assignment exp)
  (let ((var (assignment-variable exp))
        (vproc (analyze (assignment-value exp))))
    (lambda (env succeed fail)
      (vproc env
             (lambda (val fail)
               (let ((old-value
                      (lookup-variable-value var env)))
                 (set-variable-value! var val env)
                 (succeed 'ok
                          ; backtracking point
                          (lambda ()
                            ; recover previous state
                            (set-variable-value! var old-value env)
                            ; recurse previous fail
                            (fail)))))
             fail))))

(define (analyze-definition exp)
  (let ((var (definition-variable exp))
        (vproc (analyze (definition-value exp))))
    (lambda (env succeed fail)
      (vproc env
             (lambda (val fail)
               (define-variable! var val env)
               (succeed 'ok fail))
             fail))))

(define (analyze-if exp)
  (let ((cproc (analyze (if-cond exp)))
        (tproc (analyze (if-then exp)))
        (eproc (analyze (if-else exp))))
    (lambda (env succeed fail)
      (cproc env
             (lambda (cond-value fail)
               (if (true? cond-value)
                   (tproc env succeed fail)
                   (eproc env succeed fail)))
             fail))))

(define (analyze-lambda exp)
  (let ((vars (lambda-parameters exp))
        (bproc (analyze-sequence (lambda-body exp))))
    (lambda (env succeed fail)
      (succeed (make-procedure vars bproc env) fail))))

(define (analyze-sequence exps)
  (define (sequentially proc1 proc2)
    (lambda (env succeed fail)
      (proc1 env
             (lambda (proc1-value fail)
               (proc2 env succeed fail))
             fail)))
  (define (loop first-proc rest-procs)
    (if (null? rest-procs)
        first-proc
        (loop (sequentially first-proc (car rest-procs))
              (cdr rest-procs))))
  (let ((procs (map analyze exps)))
    (if (null? procs)
        (display "Empty sequence"))
    (loop (car procs) (cdr procs))))

(define (analyze-application exp)
  (let ((fproc (analyze (operator exp)))
        (aprocs (map analyze (operands exp))))
    (lambda (env succeed fail)
      (fproc env
             (lambda (proc fail)
               (get-args aprocs
                         env
                         (lambda (args fail)
                           (execute-application
                            proc args succeed fail))
                         fail))
             fail))))

(define (get-args aprocs env succeed fail)
  (if (null? aprocs)
      (succeed '() fail)
      ((car aprocs) env
                    (lambda (arg fail)
                      (get-args (cdr aprocs)
                                env
                                (lambda (args fail)
                                  (succeed (cons arg args)
                                           fail))
                                fail))
                    fail)))

(define (execute-application proc args succeed fail)
  (cond ((primitive-procedure? proc)
         (succeed (apply-primitive-procedure proc args)
                  fail))
        ((compound-procedure? proc)
         ((procedure-body proc)
          (extend-environment (procedure-parameters proc)
                              args
                              (procedure-environment proc))
          succeed
          fail))))


(define (analyze-amb exp)
  (let ((cprocs (map analyze (amb-choices exp))))
    (lambda (env succeed fail)
      (define (try-next choices)
        (if (null? choices)
            (fail)
            ((car choices) env succeed
                           (lambda () (try-next (cdr choices))))))
      (try-next cprocs))))

(define (analyze exp)
  (cond ((self-evaluating? exp) (analyze-self-evaluating exp))
        ((variable? exp) (analyze-variable exp))
        ((quoted? exp) (analyze-quoted exp))
        ((assignment? exp) (analyze-assignment exp))
        ((definition? exp) (analyze-definition exp))
        ((if? exp) (analyze-if exp))
        ((lambda? exp) (analyze-lambda exp))
        ((begin? exp) (analyze-sequence (begin-actions exp)))
        ((let? exp) (analyze-application (let->combination exp)))
        ((amb? exp) (analyze-amb exp))
        ((ramb? exp) (analyze-amb (cons 'amb (shuffle (cdr exp)))))
        ((application? exp) (analyze-application exp))
        (else (display "cond is not implemented for I'm lazy lol" exp))))

(define (ambeval exp env succeed fail)
  ((analyze exp) env succeed fail))

; runtime

(define (enclosing-environment env)
  (cdr env))

(define (first-frame env)
  (car env))

(define the-empty-environment '())

(define (make-frame variables values)
  (cons variables values))

(define (frame-variables frame)
  (car frame))

(define (frame-values frame)
  (cdr frame))

(define (add-binding-to-frame! var val frame)
  (set-car! frame (cons var (car frame)))
  (set-cdr! frame (cons val (cdr frame))))


(define (extend-environment vars vals base-env)
  (if (= (length vars) (length vals))
      (cons (make-frame vars vals) base-env)
      (display "Mismatched arguments supplied" vars vals)))


(define (lookup-variable-value var env)
  (define (env-loop env)
    (define (scan vars vals)
      (cond ((null? vars)
             (env-loop (enclosing-environment env)))
            ((eq? var (car vars))
             (car vals))
            (else (scan (cdr vars) (cdr vals)))))
    (if (eq? env the-empty-environment)
        (display "Unbound variable" var)
        (let ((frame (first-frame env)))
          (scan (frame-variables frame)
                (frame-values frame)))))
  (env-loop env))

(define (set-variable-value! var val env)
  (define (env-loop env)
    (define (scan vars vals)
      (cond ((null? vars)
             (env-loop (enclosing-environment env)))
            ((eq? var (car vars))
             (set-car! vals val))
            (else (scan (cdr vars) (cdr vals)))))
    (if (eq? env the-empty-environment)
        (display "Unbound variable" var)
        (let ((frame (first-frame env)))
          (scan (frame-variables frame)
                (frame-values frame)))))
  (env-loop env))

(define (define-variable! var val env)
  (let ((frame (first-frame env)))
    (define (scan vars vals)
      (cond ((null? vars)
             (add-binding-to-frame! var val frame))
            ((eq? var (car vars))
             (set-car! vals val))
            (else (scan (cdr vars) (cdr vals)))))
    (scan (frame-variables frame)
          (frame-values frame))))


(define (primitive-procedure? proc)
  (tagged-list? proc 'primitive))

(define (primitive-implementation proc)
  (cadr proc))

(define primitive-procedures
  (list (list 'car car)
        (list 'cdr cdr)
        (list 'cons cons)
        (list 'list list)
        (list 'null? null?)
        (list 'not not)
        (list '+ +)
        (list '- -)
        (list '* *)
        (list '/ /)
        (list '= =)
        (list '< <)
        (list '> >)
        ))

(define (primitive-procedure-names)
  (map car primitive-procedures))

(define (primitive-procedure-objects)
  (map (lambda (proc) (list 'primitive (cadr proc)))
       primitive-procedures))


(define (apply-primitive-procedure proc args)
  (apply-in-underlying-scheme
   (primitive-implementation proc) args))

(define (setup-environment)
  (let ((initial-env
         (extend-environment (primitive-procedure-names)
                             (primitive-procedure-objects)
                             the-empty-environment)))
    (define-variable! 'true #t initial-env)
    (define-variable! 'false #f initial-env)
    initial-env))

(define the-global-environment (setup-environment))


; amb-possibility-list can be used outside
(define (amb-possibility-list exp env)
  (let ((result '()))
    (ambeval exp env
             ; success
             (lambda (val next-alternative)
               (set! result (cons val result))
               (next-alternative))
             ; failure
             (lambda () 'ok))
    (reverse result)))

(amb-possibility-list '(+ (amb 1 2) (amb 3 4)) the-global-environment)



; require can be used in ambeavl
(ambeval '(define (require p) (if (not p) (amb) 'ok))
         the-global-environment
         (lambda (env fail) 'ok)
         (lambda () 'ok))

; extension: require-not
(ambeval '(define (require-not p) (if p (amb) 'ok))
         the-global-environment
         (lambda (env fail) 'ok)
         (lambda () 'ok))

; extension: require-queen
(ambeval '(define (require-queen A B D) (require-not (= A B)) (require-not (= A (+ B D))) (require-not (= A (- B D))))
          the-global-environment
         (lambda (env fail) 'ok)
         (lambda () 'ok))

; 8-queen

(define result (amb-possibility-list 
'(let ((L1 (amb 1 2 3 4 5 6 7 8)))
   (let ((L2 (amb 1 2 3 4 5 6 7 8)))
     (require-queen L1 L2 1)
     (let ((L3 (amb 1 2 3 4 5 6 7 8)))
       (require-queen L1 L3 2)
       (require-queen L2 L3 1)
       (let ((L4 (amb 1 2 3 4 5 6 7 8)))
         (require-queen L1 L4 3)
         (require-queen L2 L4 2)
         (require-queen L3 L4 1)
         (let ((L5 (amb 1 2 3 4 5 6 7 8)))
           (require-queen L1 L5 4)
           (require-queen L2 L5 3)
           (require-queen L3 L5 2)
           (require-queen L4 L5 1)
           (let ((L6 (amb 1 2 3 4 5 6 7 8)))
             (require-queen L1 L6 5)
             (require-queen L2 L6 4)
             (require-queen L3 L6 3)
             (require-queen L4 L6 2)
             (require-queen L5 L6 1)
             (let ((L7 (amb 1 2 3 4 5 6 7 8)))
               (require-queen L1 L7 6)
               (require-queen L2 L7 5)
               (require-queen L3 L7 4)
               (require-queen L4 L7 3)
               (require-queen L5 L7 2)
               (require-queen L6 L7 1)
               (let ((L8 (amb 1 2 3 4 5 6 7 8)))
                 (require-queen L1 L8 7)
                 (require-queen L2 L8 6)
                 (require-queen L3 L8 5)
                 (require-queen L4 L8 4)
                 (require-queen L5 L8 3)
                 (require-queen L6 L8 2)
                 (require-queen L7 L8 1)
                 (list L1 L2 L3 L4 L5 L6 L7 L8)))))))))
 the-global-environment))

result
(length result)

; REPL

(define (repl)
  (define (internal-loop try-again)
    (let ((input (read)))
      (if (eq? input 'try-again)
          (try-again)
          (begin
            (display "; Starting a new problem")
            (newline)
            (ambeval input the-global-environment
                     ; success
                     (lambda (val next-alternative)
                       (display val)
                       (newline)
                       (internal-loop next-alternative))
                     ; failure
                     (lambda ()
                       (display "; There are no more values of ")
                       (display input)
                       (newline)
                       (repl)))))))
  (internal-loop
   (lambda ()
     (display "; There is no current problem")
     (newline)
     (repl))))

(repl)
```

