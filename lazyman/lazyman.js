// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。
class _LazyMan{
    constructor(name){
        this.tasks = []
        const task = ()=>{
            console.log(`Hi! This is ${name}!`)
            this.next()
        }
        this.tasks.push(task)
        setTimeout(() => {               // 把 this.next() 放到调用栈清空之后执行
            this.next();
        }, 0);
    }
    next(){
        const task = this.tasks.shift()//出栈
        task && task()
    }
    sleep(){
        this.sleepaction(timer)
        return this
    }
    eat(name){
        const task = ()=>{
            console.log(`Eat ${name}~`) 
        }
        this.tasks.push(task);  
        return this
    }
    sleepFirst(timer){
        this.sleepaction(timer,true)
        return this
    }
    sleepaction(timer,isfirst=false){
        const task = ()=>{
            setTimeout(()=>{
                console.log(`Wake up after ${timer}`)
                this.next()
            },timer*1000)
        }
        if(isfirst){
            this.tasks.unshift(task);  
        }else{
            this.tasks.push(task);  
        }
    }

}
function LazyMan(name) {
    return new _LazyMan(name)
}
