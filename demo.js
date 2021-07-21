const MyPromise = require("./MyPromise");

// var promise = new Promise((resolve, reject) => {
//     resolve('success');
// })

// promise.then(res => {
//     console.log(res);
// },(reason) => {
//     console.log(reason)
// })


var myPromise = new MyPromise((resolve, reject) => {
    // resolve('success');
    // reject('error')
    // throw new Error('报错');

    setTimeout(() => {
        resolve(123)
    }, 2000);
})

myPromise.then(res => {
    console.log('fulfilled1', res);
},(reason) => {
    console.log('reject', reason)
})

myPromise.then(res => {
    console.log('fulfilled2', res);
},(reason) => {
    console.log('reject', reason)
})