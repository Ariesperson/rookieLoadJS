class  myPromise{
    //定义状态
    static PENDING = 'pending'
    static FULLFILED = 'fullfiled'
    static REJECT = 'rejected'
    
    //constructor
    constructor(func){
        this.PromiseState = myPromise.PENDING//初始的时候是pending状态
        // func(this.resolve.bind(this),this.reject.bind(this));; //使用Bind绑定
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }

    }
    reslove(result){
        if(this.promiseState==myPromise.PENDING){
            this.promiseState = myPromise.FULLFILED
            this.PromiseResult = result
        }
    }
    reject(reason){
        if(this.promiseState==myPromise.PENDING){
            this.promiseState = myPromise.REJECT
            this.PromiseResult = reason
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        };
        if(this.promiseState==FULLFILED){
            onFulfilled(this.PromiseResult)
        }else if(this.promiseState==REJECT){
            onRejected(this.PromiseResult)
        }
    }
}