//深拷贝  深度优先的列子
let obj = {
    node:'test1',
    data:{
        date:new Date(),
        regrxp:new RegExp()
    },
    props:{
        title:{
            type:'String'
        }
    },
    methods: {
        clickme(){
            alert('请点击我')
        }
    },
    children:[
        {
            node:'div',
            props:{
                
            }
        },
        {

        }
    ]
}
//普通的递归
const deepcopy=(source)=>{
    let result = {}
    for (const key in source) {
        if(typeof source[key]=='object'){
            if(source[key] instanceof Array){
                result[key] = []
                source[key].forEach(element => {
                    result[key].push(deepcopy(element))
                });
            }else{
                result[key] = deepcopy(source[key])
            }
        }else{
            result[key] = source[key]
        }
    }
    return result
}
let copyobject = deepcopy(obj)
console.log(copyobject)
//考虑循环引用的情况

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
        ['[object Error]' , 'error'],
        ['[object Symbol]' , 'error']
    ]);
    let toString = Object.prototype.toString;
    if(dataType.has(toString.call(source))){
       return dataType.get(toString.call(source))
    }else{
        return 'unknown type';
    }
}
function deepClone(source, map = new WeakMap()) {
    
    const iterations = [
        '[object Object]',
        '[object Array]',
        '[object Map]',
        '[object Set]',
    ]

    // 处理 null
    if (source === null) return source
  
    // 获取对象类型
    const type = Object.prototype.toString.call(source)
  
    // 处理不可遍历对象
    if (!iterations.includes(type)) {
      // 处理日期
      if (type === 'date') return new Date(source)
  
      // 处理正则
      if (type === 'regexp') return new RegExp(source)
  
      // 处理 Symbol
      if (type === '[object Symbol]') return Symbol(source.description)
  
      // 其他未处理的类型，一般是原始类型或函数，直接返回
      return source
    }
  
    // 处理可遍历对象
    // 创建 target 实例
    let target = new source.constructor() // {} | [] | Map(0) | Set(0)
  
    // 处理循环引用，防止死循环
    if (map.get(source)) {
      return source // 如果已经处理过，则直接返回，不再遍历
    } else {
      map.set(source, target)
    }
  
    // 处理 Map
    if (type === '[object Map]') {
      source.forEach((value, key) => {
        target.set(key, deepClone(value))
      })
      return target
    }
  
    // 处理 Set
    if (type === '[object Set]') {
      source.forEach(value => {
        target.add(deepClone(value))
      })
      return target
    }
  
    // 处理对象和数组
    for (const key in source) {
      target[key] = deepClone(source[key])
    }
    return target
  }