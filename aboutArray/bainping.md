# 数组扁平化的方法

##  ES6 flat

[flat(depth)](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2Fflat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**参数:**

`depth`(可选) 指定要提取嵌套数组的结构深度,默认值为 1

**返回值:**

返回一个新数组,包含数组与提取嵌套数组的所有元素的新数组

使用 `Infinity`，可展开任意深度的嵌套数组

封装思路: 使用 es6 自带 API 处理

```javascript
 const arr = [1, [2, [3, [4, 5]]], 6]

 function flatten(params) {
   return params.flat(Infinity)
 }
 console.log(flatten(arr));
 // 输出: [1,2,3,4,5,6]

```

## toString

如果数组的项全为数字，可以使用join()，toString()可以利用数组toString() 转为字符串

```javascript
 const arr = [1, [2, [3, [4, 5]]], 6]
 let newarr = arr.toString().split(',').map(item=>parseFloat(item))

```

## 使用正则方法进行替换

看到嵌套的数组,如果在字符串的角度上看就是多了很多`[` 和`]`,如果把它们替换就可以实现简单的扁平化

```javascript
function flatten (arr) {
  console.log('JSON.stringify(arr)', typeof JSON.stringify(arr))
  let str= JSON.stringify(arr).replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  arr = JSON.parse(str);
  return arr
}
console.log(flatten(arr))
```

## 循环递归

```javascript
//当只有一层嵌套数组使用concat直接全部链接在一起
let arr2 = [1, [2, 3,4,5,6]]
let result = [];
for (let i = 0; i < arr2.length; i++) {
     result = result.concat((arr2[i]));
}
console.log(result);
[ 1, 2, 3, 4, 5, 6 ]
//当有多层的时候的纯数字的时候
function flatter (arr){
    let result = []
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i]){
          result =result.concat(flatter(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
   return result
}

```

