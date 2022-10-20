class myPromise{
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
   //需要在类的构造函数constructor里面添加一个参数，这里就用func来做形参，并且执行一下这个参数
    constructor(func){
        this.PromiseState = myPromise.PENDING//初始的时候是pending状态
        this.PromiseResult = null;
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
        // func(this.resolve.bind(this),this.reject.bind(this));
        //增加异常捕获,异常捕获走reject流程
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result){
        //那么在执行resolve()的时候就需要判断状态是否为 待定 pending，如果是 待定 pending的话就			把状态改为 成功 fulfilled:
        if(this.PromiseState === myPromise.PENDING){
           this.PromiseState = myPromise.FULFILLED;
           // resolve()添加参数，并且把参数赋值给实例的PromiseResult属性
           this.PromiseResult = result; 
           this.onFulfilledCallbacks.forEach((func)=>{
                setTimeout(() => {
                    func(result)
                })
            })
        }
    }
    reject(reason){
      	//为给reject添加参数，并且把参数赋值给实例的PromiseResult属性:
        if (this.PromiseState === myPromise.PENDING) {
          this.PromiseState = myPromise.REJECTED;
          //为给reject()添加参数，并且把参数赋值给实例的PromiseResult属性
          this.PromiseResult = reason;
          this.onRejectedCallbacks.forEach((func)=>{
            setTimeout(() => {
                func(reason)
            })
        })
        }
    }
	then(onFulfilled,onRejected){
        //增加入参的类型判断
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        };
        if (this.PromiseState === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled)
            this.onRejectedCallbacks.push(onRejected)
        }
        if(this.PromiseState === myPromise.FULFILLED){
            //宏任务
            setTimeout(()=>{
             onFulfilled(this.PromiseResult)//最后执行
            },)
        }
        if (this.PromiseState === myPromise.REJECTED) {
            setTimeout(()=>{
                onRejected(this.PromiseResult);
            },)
        }
    }
}
// 测试代码
// console.log(1);

// let promise = new Promise((resolve, reject) => {
//     console.log(2);
//     resolve('这次一定');
// })

// promise.then(
//     result => {
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )

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
