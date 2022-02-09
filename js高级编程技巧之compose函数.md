# js高级编程技巧之compose函数

在函数式编程当中有一个很重要的概念就是**函数组合**， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。

简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)

给定一个输入值x，先给这个值加10，然后结果乘以10

## 普通实现

```javascript
const cal = x=>(x+10)*10
const res = cal(10)
console.log(res)
```

## 函数式编程实现

```javascript
const add = x=>x+10
const multiply = x=>x*10
const res = multiply(add(10))
console.log(res)
```

## compose实现

```javascript
const space = (str) => str.split(' ')
const len = (arr) => arr.length


// 普通写法
console.log(len(space('i am linsanxin'))) // 3
console.log(len(space('i am 23 year old'))) // 6
console.log(len(space('i am a author in juejin'))) // 7


// compose写法
const compose = (...fn) => value => {
  return fn.reduce((value, fn) => {
    return fn(value)
  }, value)
}
const computedWord = compose(space, len)
console.log(computedWord('i am linsanxin')) // 3
console.log(computedWord('i am 23 year old')) // 6
console.log(computedWord('i am a author in juejin')) // 7

```

