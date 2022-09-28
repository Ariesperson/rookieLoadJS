# 浅谈JavaScript的执行机制

## 问题背景

分享开始我们先来看一段代码。

```javascript
console.log(foo);
bar();
var foo = "foo";
function bar() {
  console.log("bar");
}
```

这段代码很不符合正常人的思路，为什么foo变量和bar函数还没有声明就可以使用了，这不科学。
所以这就引出了一个JavaScript的特性，变量提升。
而变量提升就是今天分享的主题，JavaScript的执行机制中的一个特性。

## 正文内容

### 变量提升

想要了解变量提升，我们得了解另外两个概念，声明和赋值。

```javascript
var foo = "foo"; // 声明 + 赋值

var foo; // 声明语句
foo = "foo"; // 赋值语句

function foo(){ // 完整的函数声明，没有赋值操作
    console.log('foo')；
}
```

变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的行为。变量被提升后，会给变量设置默认值undefined。所以开头的那段代码就类似于下面这段代码。
```javascript
var foo = undefined;
function bar() {
  console.log("bar");
}

console.log(foo);
bar();
foo = "foo";

PS：函数提升会优先于变量提升，也就是说同名的变量声明和函数声明，函数声明会覆盖变量声明。
console.log(foo);

function foo() {
  console.log("foo");
};
var foo = 'foo';
// [Function: foo]
```
为什么会有变量提升这种反直觉的设计呢？
因为当初设计这门语言的时候，并没有想到 JavaScript 会火起来，所以只是按照最简单的方式来设计。去掉块级作用域，再把作用域内部的变量统一提升无疑是最快速、最简单的设计。
let和const有没有变量提升？
我们都知道，let和const命令声明的变量是不能在声明之前使用的。那我们再来思考一个问题，let和const命令声明的变量有没有变量提升呢。

```javascript
console.log(foo);

let foo = "foo";
```

![](D:\frontEnd\rookieLoadJS\basic\img\ccc5ff94-2511-4ffe-b873-6c95b61490d3.png)

https://es6.ruanyifeng.com/?search=%E5%B0%BE%E8%B0%83%E7%94%A8&x=0&y=0#docs/let#let-%E5%91%BD%E4%BB%A4
文档显示是没有变量提升的，但是实际操作中显示好像又是有的，那究竟有没有变量提升呢？
这里又要提到两个概念，变量环境和词法环境。变量环境和词法环境又依赖执行上下文这个概念，所以我们先来了解下执行上下文。
思考：为什么内存中明明已经有了变量定义但是访问的时候却会报错？
答案：这主要是因为JS引擎做了限制，虽然变量foo在内存中，但是当你在let foo之前访问foo时，根据ECMAScript定义，虚拟机会阻止这次访问，这就是"暂时性死区"。

### 执行上下文

JavaScript代码分为编译阶段和执行阶段，一段代码经过编译后，会生成两部分内容：执行上下文和可执行代码。执行上下文是 JavaScript 执行一段代码时的运行环境。
执行上下文一般来说有三种情况：
1、全局执行上下文。
2、函数执行上下文。
3、eval执行上下文。
让我们看下面这段代码。

```javascript
var a = 2;
function add(b, c) {
  return b + c;
}
function addAll(b, c) {
  var d = 10;
  var result = add(b, c);
  return a + result + d;
}
addAll(3, 6);
```

![](D:\frontEnd\rookieLoadJS\basic\img\63c41ddb-42dd-4304-a38c-0ff1bc0ce7ab.png)

当我们执行到add函数时，执行上下文栈，也就是调用栈如上图所示，我们可以看到每个执行上下文中都维护着一个变量环境和词法环境。而JavaScript 引擎就是通过变量环境来实现函数级作用域的。那词法作用域又有什么用呢？
思考：下面的代码会有什么问题，如何去解决？

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```
https://es6.ruanyifeng.com/?search=%E5%B0%BE%E8%B0%83%E7%94%A8&x=0&y=0#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96

### 作用域

作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。

#### 块级作用域

我们都知道，ES6之前JavaScript是没有块级作用域的，只有全局作用域和函数作用域。而词法环境的目的就是实现块级作用域。
让我们看下面这段代码。

```javascript
function foo() {
  var a = 1;
  let b = 2;
  {
    debugger;
    let b = 3;
    var c = 4;
    let d = 5;
    console.log(a);
    console.log(b);
  }
  console.log(b);
  console.log(c);
  console.log(d);
}
foo();
```

![](D:\frontEnd\rookieLoadJS\basic\img\75f087bd-a5ff-43db-9803-106125364d0f.png)

当执行到debugger的时候我们可以看到当前执行上下文中变量环境和词法环境中的情况。

![](D:\frontEnd\rookieLoadJS\basic\img\77f15809-aa35-4b7e-987a-72563c14fb7d.png)

根据上图我们可以知道当执行到console.log(a)的时候的变量查找路径。
总结一下，块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。
思考：块级作用域有没有自己的编译阶段？
进入块级作用域不会有编译过程，只不过通过let或者const声明的变量会在进入块级作用域的时被创建。

#### 作用域链

让我们看下面的代码。

```javascript
function bar() {
  console.log(myName);
}
function foo() {
  var myName = "极客邦";
  bar();
}
var myName = "极客时间";
foo();
```
其实在每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，如果在当前的变量环境中没有查找到，那么 JavaScript 引擎会继续在 outer 所指向的执行上下文中查找。这个查找的链条就被称为作用域链。

![](D:\frontEnd\rookieLoadJS\basic\img\6d037c97-3273-478a-9e72-5ec387572ee2.png)

那现在有一个疑问了，是foo 函数调用的 bar 函数，那为什么 bar 函数的外部引用是全局执行上下文，而不是 foo 函数的执行上下文呢？要回答这个问题，又要提到一个词法作用域的概念。在 JavaScript 执行过程中，其作用域链是由词法作用域决定的。

#### 词法作用域

词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。
闭包
根据红宝书的定义，闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现。让我们看下面这段代码。

```javascript
function foo() {
  var myName = "zhaotao";
  let test1 = 1;
  var innerBar = {
    getName: function () {
      console.log(test1);
      return myName;
    },
    setName: function (newName) {
      myName = newName;
    },
  };
  return innerBar;
}
var bar = foo();
bar.setName("zhaoyouxiu");
console.log(bar.getName());
```
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。