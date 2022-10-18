# this、apply、call、bind

## this

**this永远指向最后调用它的那个对象。**

**匿名函数的 this 永远指向 window**。

改变this指向的方法：

1. 使用箭头函数
2. 定义变量获取想获取的this 
3. new一个实例化对象 
4. 使用apply、call、bind

apply与call之间的区别是支持参数传递不同：apply是支持传递一个参数数组，多个参数以数组的形式进行传递。call支持传递多个参数。

bind与apply和call的区别是它本身是创建一个新的函数，需要手动去调用。

改变this指向的方法：

```javascript
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        },100);
    }
};
a.func2()             // this.func1 is not a function
```

## apply

使用apply让this指向特定的对象

```javascript
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.apply(a),100);
    }
};
a.func2()            // Cherry
```

## call

使用call让this指向特定的对象

```javascript
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.call(a),100);
    }
};
a.func2()            // Cherry

```

## bind

使用call让this指向特定的对象

```javascript
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.bind(a)(),100);
    }
};
a.func2()            // Cherry

```

