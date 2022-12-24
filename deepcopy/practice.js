function getType (target){
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
    let toString = Object.prototype.toString
    if(dataType.has(toString.call(target))){
        return dataType.get(toString.call(target))
    }else{
        return 'unknown type'
    }
}
function deepClone(source,map = new WeakMap()){
    const iterations = ['[object Object]','[object Array]','object [Map]','[object Set]']
    if(source === null) return source
    const type = Object.prototype.toString.call(source)
    //处理不可遍历对象
    if(!iterations.includes(type)){
         // 处理日期
      if (type === 'date') return new Date(source)
  
      // 处理正则
      if (type === 'regexp') return new RegExp(source)
  
      // 处理 Symbol
      if (type === '[object Symbol]') return Symbol(source.description)
        
      return source
    }
    //处理可遍历对象
        // 处理循环引用，防止死循环
        if (map.get(source)) {
            return source // 如果已经处理过，则直接返回，不再遍历
        } else {
            map.set(source, target)
        }
        // 处理 Map
        if (type === '[object Map]') {
            let target = new Map() // {} | [] | Map(0) | Set(0)
            source.forEach((value, key) => {
                target.set(key, deepClone(value))
            })
            return target
        }
        // 处理 Set
        if (type === '[object Set]') {
            let target = new Set()
            source.forEach(value => {
                target.add(deepClone(value))
            })
            return target
        }
        //处理对象和数组
        if(type === '[object Array]'){
            let target = []
            source[key].forEach(element => {
                target.push(deepcopy(element))
            });
            return target
        }
        if(type === '[object Object]'){
            let target = {}
            for (const key in source) {
                target[key] = deepcopy(source[key])
            }
            return target 
        }
    //处理基本值类型
    return target
}