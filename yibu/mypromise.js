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
        let newpromise = new myPromise((resolve, reject) => {
            if (this.PromiseState === myPromise.PENDING) {
                this.onFulfilledCallbacks.push(onFulfilled)
                this.onRejectedCallbacks.push(onRejected)
            }
            if(this.PromiseState === myPromise.FULFILLED){
                //宏任务
                setTimeout(()=>{
                    let x = onFulfilled(this.PromiseResult);
                    resolvePromise(newpromise, x, resolve, reject);
                },)
            }
            if (this.PromiseState === myPromise.REJECTED) {
                setTimeout(()=>{
                    let x = onRejected(this.PromiseResult);
                    resolvePromise(newpromise, x, resolve, reject);
                },)
            }
        })
        return newpromise
    }
}
/**
+ * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
+ * @param  {promise} promise2 promise1.then方法返回的新的promise对象
+ * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
+ * @param  {[type]} resolve   promise2的resolve方法
+ * @param  {[type]} reject    promise2的reject方法
+ */
 function resolvePromise(promise2, x, resolve, reject) {
 // 2.3.1规范 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
        if (x === promise2) {
            throw new TypeError('Chaining cycle detected for promise');
        }

        if (x instanceof myPromise) {
            /**
             * 2.3.2 如果 x 为 Promise ，则使 promise2 接受 x 的状态
             *       也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
             */
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reject);
        } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
            // 2.3.3 如果 x 为对象或函数
            try {
                // 2.3.3.1 把 x.then 赋值给 then
                var then = x.then;
            } catch (e) {
                // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
                return reject(e);
            }

            /**
             * 2.3.3.3 
             * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
             * 传递两个回调函数作为参数，
             * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
             */
            if (typeof then === 'function') {
                // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                let called = false; // 避免多次调用
                try {
                    then.call(
                        x,
                        // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                        y => {
                            if (called) return;
                            called = true;
                            resolvePromise(promise2, y, resolve, reject);
                        },
                        // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                        r => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    )
                } catch (e) {
                    /**
                     * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
                     * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                     */
                    if (called) return;
                    called = true;

                    // 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
                    reject(e);
                }
            } else {
                // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
                resolve(x);
            }
        } else {
            // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
            return resolve(x);
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

// console.log(1);

// let mypromise = new myPromise((resolve, reject) => {
//     console.log(2);
//        setTimeout(() => {
//         // console.log('A',mypromise.PromiseState);
//         resolve('这次一定');
//         // console.log('B',mypromise.PromiseState);
//         console.log(4);
//       });
// })

// mypromise.then(

//     result => {
//         let mypromise = new myPromise((resolve, reject) => {
//             console.log(2);
//             //    setTimeout(() => {
//             //     // console.log('A',mypromise.PromiseState);
//             //     resolve('这次一定');
//             //     // console.log('B',mypromise.PromiseState);
//             //     console.log(4);
//             //   });
//         }).then()
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )
let p1 = new myPromise((resolve, reject) => {
    resolve(10)
})
p1.then(res => {
    console.log('fulfilled', res);
    return 2 * res
}).then(res => {
    console.log('fulfilled', res)
}) 
