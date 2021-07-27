const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    console.log(promise2, x)
}

class MyPromise {
    constructor(executor){
        this.status = PENDING;//状态
        this.value = undefined;//成功返回的值
        this.reason = undefined;//失败返回值

        this.onFulfilledCallbacks = []; //pending 收集 多个then的 容器
        this.onRejectedCallbacks = []; //pending 收集 多个 catch的 容器

        //resolve 不属于原型链上的
        const resolve = (value) => {
            if(this.status === PENDING){
                console.log(PENDING)
                this.status = FULFILLED;
                this.value = value;
                //发布
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
           
        }

        const reject = (reason) => {
            if(this.status === PENDING){
                console.log(PENDING)
                this.status = REJECTED;
                this.reason = reason;
                //发布
                this.onRejectedCallbacks.forEach(fn => fn())
            }
           
        }
        try{
            executor(resolve, reject);//执行函数
        }catch(e){
            reject(e);
        }
       
    }

    then (onFulfilled, onRejected) {
        let promise2 = new MyPromise((resolve, reject) => {
         
            if(this.status === FULFILLED){
                setTimeout(() => {//宏任务 处理异步 为了让promise2 命名完成 再调用 x 同理
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                }, 0);
            }

            if(this.status === REJECTED){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                }, 0);
               
            }

            //同步
            if(this.status === PENDING){
                //订阅
                this.onFulfilledCallbacks.push(() => {
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                })
            }
        });
       

        return promise2
    }

    catch () {
       
    }
}



module.exports = MyPromise