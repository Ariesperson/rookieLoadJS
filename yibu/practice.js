class  myPromise{
    //定义状态
    static PENDING = 'pending'
    static FULLFILED = 'fullfiled'
    static REJECT = 'rejected'
    constructor(func){
        //状态初始化
        this.PromiseState=myPromise.PENDING
        this.PromiseResult=null
        this.onFulfilledCB = []
        this.onRejectedCB = []
        //改变this指向 抛出异常
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch(error){
            this.reject(error)
        }
    }
    resolve(result){
        //控制状态的更改
        if(this.PromiseState==myPromise.PENDING){
            this.PromiseState=myPromise.FULLFILED
            this.PromiseResult=result
            this.onFulfilledCB.forEach((callback)=>{
                setTimeout(()=>{
                    callback(result)
                })
            })
        }
    }
    reject(reason){
        //控制状态的更改
        if(this.PromiseState==myPromise.PENDING){
            this.PromiseState=myPromise.REJECT
            this.PromiseResult=reason
            this.onRejectedCB.forEach((callback)=>{
                setTimeout(()=>{
                    callback(reason)
                })
            })
        }
    }
    then(onFulfilled,onRejected){
        //判断then方法的参数类型
        onFulfilled = typeof onFulfilled === 'function'? onFulfilled : value=>value
        onRejected = typeof onRejected === 'function'? onRejected : reason=>{ throw reason} //直接抛出异常？
        if(this.PromiseState==myPromise.PENDING){
            this.onFulfilledCB.push(onFulfilled)
            this.onRejectedCB.push(onRejected)
        }
        if(this.PromiseState==myPromise.FULLFILED){
            setTimeout(()=>{
                onFulfilled(this.PromiseResult)
            })
        }
        else if(this.PromiseState==myPromise.REJECT){
            setTimeout(()=>{
                onRejected(this.PromiseState)
            })
        }
    }
}
console.log(1);

let mypromise = new myPromise((resolve, reject) => {
    console.log(2);
       setTimeout(() => {
        // console.log('A',mypromise.PromiseState);
        resolve('这次一定');
        // console.log('B',mypromise.PromiseState);
        console.log(4);
      });
})

mypromise.then(
    result => {
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason)
    }
)

console.log(3);