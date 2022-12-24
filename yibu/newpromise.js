class newPromise{
    // 先定义三个常量表示状态
    static PENDING = 'pending'
    static FULLFILED = 'fullfiled'
    static REJECT = 'rejected'
    constructor(executor){
        //状态初始化
        this.PromiseState = newPromise.PENDING
        this.PromiseResult = null
        this.onFulfilledCB = null
        this.onRejectedCB = null
        //改变this指向 抛出异常
        try{
            executor(this.resolve.bind(this),this.reject.bind(this))
        }catch(error){
            this.reject(error)
        }
    }
    resolve(result){
        if(this.PromiseState === newPromise.PENDING){
            this.PromiseState = newPromise.FULLFILED
            this.PromiseResult = result
            while (this.onFulfilledCB.length) {
                // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                setTimeout(()=>{
                    this.onFulfilledCB.shift()(result)
                })
            }
        }
    }
    reject(reason){
        if(this.PromiseState === newPromise.PENDING){
            this.PromiseState = newPromise.REJECT
            this.PromiseResult = reason
            while (this.onRejectedCB.length) {
                // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                setTimeout(()=>{
                    this.onRejectedCB.shift()(reason)
                })
            }
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        const promise2 = new myPromise((resolve, reject) => {
            if (this.PromiseState === myPromise.FULFILLED) {
                setTimeout(() => {
                   let x = onFulfilled(this.PromiseResult);
                   resolvePromise(promise2, x, resolve, reject);
                });
            } else if (this.PromiseState === myPromise.REJECTED) {
                setTimeout(() => {
                   let x = onRejected(this.PromiseResult);
                   resolvePromise(promise2, x, resolve, reject);
                });
            } else if (this.PromiseState === myPromise.PENDING) {
                this.onFulfilledCB.push(() => {
                    setTimeout(() => {
                        onFulfilled(this.PromiseResult);
                    });
                });
                this.onRejectedCB.push(() => {
                    setTimeout(() => {
                        onRejected(this.PromiseResult);
                    });
                });
            }
        })

        return promise2

        if(this.PromiseState==myPromise.PENDING){
            this.onFulfilledCB.push(onFulfilled);
            this.onRejectedCB.push(onRejected);
        }
        if(this.PromiseState==myPromise.FULLFILED){
            setTimeout(()=>{
                onFulfilled(this.PromiseResult)
            })
        }else if(this.PromiseState==myPromise.REJECT){
            setTimeout(()=>{
                onRejected(this.PromiseState)
            })
        }
    }
}
function resolvePromise(promise2, x, resolve, reject) {}
