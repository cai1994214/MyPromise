const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

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
        //同步
        if(this.status === PENDING){
            //订阅
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }

        if(this.status === FULFILLED){
            onFulfilled(this.value);
        }

        if(this.status === REJECTED){
            onRejected(this.reason);
        }
    }

    catch () {
       
    }
}

module.exports = MyPromise