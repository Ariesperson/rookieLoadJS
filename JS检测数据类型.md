# JS中检测数据类型的优缺点

## typeof运算符

局限性在于不能判断null、数组、正则（均是对象）。

```javascript
console.log(typeof ('1')) //string
console.log(typeof (1))  //number
console.log(typeof (true)) //boolean
console.log(typeof (null))  //object
console.log(typeof ({}))  //object  
console.log(typeof ([1,2])) //object  
console.log(typeof (undefined))  //undefined
console.log(typeof (()=>{}))  //function
```

## instanceof/constructor

检测某一个实例是否属于某一个类
使用instanceof/constructor可以检测数组和正则

```javascript
console.log([1,2] instanceof Array) //->true
console.log(/^$/ instanceof RegExp) //->true
console.log({} instanceof Object) //->true
//constructor可以避免instanceof检测数组的时候,用Object也是true的问题
console.log([].constructor === Array); //->true
```
instanceof的局限性:如果被检测对象的原型链上有可以找到，则检测出来结果都是true
```javascript
var oDiv = document.getElementById("div1");
//HTMLDivElement->HTMLElement->Element->Node->EventTarget->Object
console.log(oDiv instanceof HTMLDivElement);//->true
console.log(oDiv instanceof Node);//->true
console.log(oDiv instanceof Object);//->true　　
```
2)基本数据类型的值是不能用instanceof来检测的
```javascript
console.log(1 instanceof Number);//->false
```

## Object.prototype.toString.call(value)

```javascript
//定义toString变量是为了简便书写，同时降低作用域链检索的性能损耗
var toString = Object.prototype.toString;
console.log(toString.call(1));//[object Number]
console.log(toString.call(undefined));//[object Undefined]
console.log(toString.call(null));//[object Null]
console.log(toString.call(false));//[object Boolean]
console.log(toString.call("s"));//[object String]
console.log(toString.call({}));//[object Object]
console.log(toString.call(/[a]/g));//[object RegExp]
console.log(toString.call(function(){}));//[object Function]
```



根据以上已知，实现一个类型检测方法

```javascript
//使用Map
function getvaribleType(source){
    var dataType = {
        '[object Null]' : 'null',
        '[object Undefined]' : 'undefiend',
        '[object Boolean]' : 'boolean',
        '[object Number]' : 'number',
        '[object String]' : 'string',
        '[object Function]' : 'function',
        '[object Array]' : 'array',
        '[object Date]' : 'date',
        '[object RegExp]' : 'regexp',
        '[object Object]' : 'object',
        '[object Error]' : 'error'
    };
    let toString = Object.prototype.toString;
    let type = ''
    for (const key in dataType) {
        if(toString.call(source)==key){
            return dataType[key]
        }
    }
    return 'unknown type';
}
//使用Map
function getvaribleTypeUseMap(source){
    var dataType = new Map([
        ['[object Null]' , 'null'],
        ['[object Undefined]' , 'undefiend'],
        ['[object Boolean]' , 'boolean'],
        ['[object Number]' , 'number'],
        ['[object String]' , 'string'],
        ['[object Function]' , 'function'],
        ['[object Array]' , 'array'],
        ['[object Date]' ,'date'],
        ['[object RegExp]' , 'regexp'],
        ['[object Object]' , 'object'],
        ['[object Error]' , 'error']
    ]);
    let toString = Object.prototype.toString;
    if(dataType.has(toString.call(source))){
       return dataType.get(toString.call(source))
    }else{
        return 'unknown type';
    }
}
```

