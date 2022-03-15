数组去重 set 和 reduce 

```javascript
//

let arr = [1,1,2,3,3,4,5]
let newArr = new Set(arr)
console.log(newArr)

let arr = [1,1,2,3,3,4,5]
let result = []
arr.reduce((pre,next)=>{
   if(!pre.get(next)){
       pre.set(next,1)
       result.push(next)
   }
    return pre
},new Map())
console.log(result)
```

promise对象的 pedding resolve reject三种状态  promise返回的仍然是一个promise对象支持链式调用

all方法是promise数组当有一个失败状态都会只返回失败状态下的东西，失败优先原则   race方法是取第一个返回结果的

```javascript
//
//
let myPromise = new Promise((resolve,reject)=>{
   resolve(1)
   reject(2)
   throw(3)
}).then(res=>{
    console.log('成功')
}).catch(res=>{
    console.log('失败')
}).
```

可选链和空位运算符

```javascript
//可选链
let obj = {
    info:{
        name:'陈思言'
    }
}
if(obj?.info?.name){
	console.log('存在名字陈思言')   
}
//空位运算符不同于||运算符的区别是他只会把undefined和null当成false
const a = 0??'陈思言'
const b = ''??'陈思言'
const c = false??'陈思言'
const d = undefined??'陈思言'
const e = null??'陈思言'
```

async await是为了把异步的调用变为同步调用同时提高代码可读性，解决回调地狱。

let var const关键字

```javascript
//var 会出现变量提升的情况，如
console.log(a) //1
var a = 1
//let 是块级作用域  
if(true){
	let b = 2   
}
console.log(b) //b is not defined
//const多用于定义常量 当定义引用类型时，可以改变他们内部属性的值但是不能让他们指向一个新的引用类型
const c = 1
c = 2 //Assignment to constant variable


```

