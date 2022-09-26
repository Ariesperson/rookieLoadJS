# 数组去重的方法

## set去重

```javascript
let arr = [1,2,2,4,5,6,7,7,10]
let newarr = [...new Set(arr)]
```

## filter去重

```javascript
let arr = [1,2,2,4,5,6,7,7,10]
let newarr = arr.fillter((item,index,arr)=>{
      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item,0)===index
})
```

## Map去重

```javascript
let arr = [1,2,2,4,5,6,7,7,10]
let map = new Map()
let newarr = []
for(let i = 0;i<arr.length;i++){
    if(map.has(arr[i])){
    }else{
        map.set(arr[i],true)
        newarr.push(arr[i])
    }
}

```

