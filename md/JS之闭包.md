## 前言

在掘进上看到太多关于闭包的学习帖子了，大佬们门境界太高我理解得异常困难，刚看懂一点点就被接下来的深入讲解给整的一头雾水。所以对于我这种菜鸟来说，大多数都晦涩难懂，要不就是刚懂一点点就立马忘了。直到我找到了这位大佬的这篇文章才豁然开朗[《JS 闭包经典使用场景和含闭包必刷题》](https://juejin.cn/user/3984285872165176)

## 闭包是什么

闭包是指有权访问另一个函数作用域中变量的函数或者说闭包是指那些能够访问自由变量的函数。

这里的自由变量是外部函数作用域中的变量。闭包中的变量存储的位置是堆内存。所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。

## 怎样会诞生闭包

​	**内部的函数存在外部作用域的引用就会导致闭包。**如下面的代码中getAll方法中引用了get函数作用域内的**RMB**和全局作用域中的变量**money**，所以就形成了闭包。

```javascript
var money = 100
function get(){
	var RMB = 200
	function getAll(){
        const sum = RMB+money
		console.log('我的财产总共有'+sum)
	}
	getAll()
}
get(); // 
```

## **闭包的作用**

- 保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
- 保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化。

## 闭包经典实用场景

基于上述所说的闭包的两个作用，所以在实际编码过程中就有了应用场景

- return 回一个函数。

```js
//如下所示就运用了闭包的**不销毁的栈内存**，是num在调用完toAdd后并没有销毁。同时toAdd内的num是私有的并不会收到外部num的影响。
var num = 10
function math(){
    var num =20
    function add() {
       n++;
       console.log(num)
     }
    return add
}
var toAdd = math()
toAdd() // 21
toAdd() // 22
toAdd() // 23
```

- 函数作为参数

```js
//使用 return add 返回的是add函数，math()就是闭包，f(math())的参数就是函数 math，因为 math() 中的 add 的上级作用域就是函数math()，所以输出就是math
var num = 10
function math(){
    var num =20
    function add() {
       num++;
       console.log(num)
     }
    return add
}
function f(p){
    var num = 200
    p()
}
f(math()) //21
```

- IIFE（自执行函数）

```js
//同样也是产生了闭包p()，存在 window下的引用n。
var n = '林一一';
(function p(){
    console.log(n)
})()

```

- 循环赋值

```js
for(var i = 0; i<5; i++){
        setTimeout(function() {
            console.log(new Date, i);
        }, 1000);
} 
console.log(new Date, i);
// Thu Feb 10 2022 17:12:12 GMT+0800 (中国标准时间) 5
// Thu Feb 10 2022 17:12:22 GMT+0800 (中国标准时间) 5
// Thu Feb 10 2022 17:12:22 GMT+0800 (中国标准时间) 5
// Thu Feb 10 2022 17:12:22 GMT+0800 (中国标准时间) 5
// Thu Feb 10 2022 17:12:22 GMT+0800 (中国标准时间) 5
// Thu Feb 10 2022 17:12:22 GMT+0800 (中国标准时间) 5

//闭包形成了5个互不干扰的私有作用域
for(var i = 0; i<5; i++){
  ((j)=>{  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000);
  })(i);
} 
// 0
// 1
// 2
// 3
// 4
```

- 节流防抖

```js
// 节流  单位时间内多次触发函数，也只有第一次生效。
function throttle(fn, delay) {
    let timer = null
    return function (...arg) {
        if(timer) return
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
        }, delay)
    }
}

// 防抖  一定时间内触发多次以最后一次触发为准
function debounce(fn, delay){
    let timer = null
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}
```

- 柯里化实现

```js
//：把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
function curry(fn, len = fn.length) {
    return _curry(fn, len)
}

function _curry(fn, len, ...arg) {
    return function (...params) {
        let _arg = [...arg, ...params]
        if (_arg.length >= len) {
            return fn.apply(this, _arg)
        } else {
            return _curry.call(this, fn, len, ..._arg)
        }
    }
}
let fn = curry(function (a, b, c, d, e) {
    console.log(a + b + c + d + e)
})
fn(1, 2, 3, 4, 5)  // 15
fn(1, 2)(3, 4, 5)
fn(1, 2)(3)(4)(5)
fn(1)(2)(3)(4)(5)
```