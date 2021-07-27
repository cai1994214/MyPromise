const promise = require('./myPromise');


let promise1 = new promise((resolve, reject) => {
    resolve('promise1');
})

let promise2 = promise1.then((value) => {
    // return Promise.resolve(value + '-> then -> promise2')
    return value + ' -> then -> promise2';
}).then((value) => {
    console.log(value)
})