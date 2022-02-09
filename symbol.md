# Symbol相关知识点

## Symbol这种数据类型到底有什么作用呢？



**通过Symbol创建的值一定是一个唯一的值。**

它存在的主要目的是解决全局变量冲突的问题。例如我们定义了一个全局对象，用来缓存数据，我们现在有两个js文件需要往这个对象中添加键名，由于js文件在不同模块，我们可能会添加相同的键名，于是就出现了冲突的问题。故`Symbol数据类型的主要作用就是为对象添加独一无二的属性名。`

```javascript
//Symbol的基本类型
let s1 = Symbol()
typeof s1 // 'symbol'

//基本使用
const role = {};
role[Symbol()] = '等级1';
role[Symbol()] = '经验0'
console.log(role) // {Symbol():'等级1', Symbol():'经验0'}*
```

在调用`Symbol()`的时候，传入一端字符串。该字符串相当于Symbol实例的描述

```javascript
const role = {};
role[Symbol('该人物的等级')] = '等级1';
role[Symbol('该人物的经验值')] = '经验0'
console.log(role) // {Symbol():'等级1', Symbol():'经验0'}*
```

### symbol可以用来作为对象名

symbol可以用来当做属性名，当symbol作为属性的时候不会被枚举出来。也就是说**JSON.stringfy(obj)**的时候不会转换相对应的symbol属性。

```javascript
const level = Symbol('level')
const chensy = {
    name:'chensy',
    action:'cike',
    [level]:'99',
};
console.log(chensy[level]);

```

那如何获取Symbol属性呢？这里补充一下获取Object相关键值的知识:

```javascript
const level = Symbol('level')
const chensy = {
    name:'chensy',
    action:'cike',
    [level]:'99',
};
//获取对象的键值，包括__proto__的键值, 不包括不可枚举，symbol
for (x in chensy) {
    console.log(x+':"'+chensy[x]+'"')
}
//获取对象所有可枚举的键值，不包括symbol，不可枚举，原型
console.log(Object.keys(chensy)) // ["name", "age", "address","getName"]
//获取对象所有的键值，不包括symbol，原型
console.log(Object.getOwnPropertyNames(chensy))
//获取对象键值为symbol
console.log(Object.getOwnPropertySymbols(chensy));    
//获取对象键值，包括symbol，不可枚举，不包括原型
console.log(Reflect.ownKeys(chensy));    
```

### 使用Symbol来替代常量

是自己定义的常量具有唯一性。

```javascript
    const warrior = Symbol()
    const assassin = Symbol()
    const master = Symbol()
    function jundgeProfession(profession){
        switch (profession) {
            case warrior:
                console.log('恭喜你获得了战士职业')
                break
            case assassin:
                console.log('恭喜你获得了刺客职业')
                break
            case master:
                console.log('恭喜你获得了法师职业')
                break
            default:
                throw new Error('Unknown type of resource')
        }
    }
	jundgeProfession(assassin)
```

### 使用Symbol定义类的私有属性

使用symbol运用于以下例子中，可以让模块里面的属性和方法变成私有。

```javascript
class role {
	constructor(name,sex,race,power){
		const mypower = Symbol()
		this.name = name
		this.sex = sex
		this.race = race
		this[mypower] = power
        this.damage = race + this[mypower]
	}
}
const chensy = new role('chensy','man','human','99999')
for (x in chensy) {
    console.log(x+':"'+chensy[x]+'"')
}
```

