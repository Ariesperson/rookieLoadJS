
function fn(age, sex) {
    console.log(this.name, age, sex);
}
  
let obj = {
    name: "微信公众号: Code程序人",
};
//1.定义symboe 切换this 处理参数  执行函数  返回结果
Function.prototype.mycall = function(context=window){
	let fn  = Symbol()
	context[fn] = this; //切换this指向的作用。 让传进来的对象的fn属性指向当前this所指向的函数
    let args= [...arguments].splice(1); //正常处理传进来的参数，把第一个参数上下文隔离出去
    let result = context[fn](...args);//执行函数
    delete context[fn];//删除该属性，还原对象
    return result;//返回执行结果
}
fn.mycall(obj, 22, '男');  
Function.prototype.myapply = function(context=window){
	let fn  = Symbol()  //定义Symbol
	context[fn] = this; //切换this指向的作用。 让传进来的对象的fn属性指向当前this所指向的函数
    if (arguments[1]) { //判断是否存在第二个参数，apply只允许传一个参数
        result = context[fn](...arguments[1]);//有则拿出来再执行
    } else {
        result = context[fn]();//没有直接执行
    }
    delete context[fn];//删除属性
    
    return result;//返回执行结果
}   
// Function.prototype.mybind = function(context=window){
//     ctx = ctx || window;
//     let self = this;
//     let args = [...arguments].splice(1);
//     let fn = function() {};//定义一个空函数
//     let _fn = function() {//使用app
//         return self.apply(this instanceof _fn ? this : ctx, args);
//     }
//     fn.prototype = this.prototype;
//     _fn.prototype = new fn();
//     return _fn;

// }   