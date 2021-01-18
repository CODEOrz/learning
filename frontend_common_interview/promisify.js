// promisify
// 有的时候，我们需要将 callback 语法的 API 改造成 Promise 语法，为此我们需要一个 promisify 的方法。
// 因为 callback 语法传参比较明确，最后一个参数传入回调函数，回调函数的第一个参数是一个错误信息，如果没有错误，就是 null，所以我们可以直接写出一个简单的 promisify 方法：

function promisify(original) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err)
                }
                return resolve(...values)
            })
            original.call(this, ...args)
        })
    }
}

// request(
//     url,
//     function (err, res) {
//         console.log(res)
//     }
// )

// promisify(request)

// const PEIJIANG_RATING_DESC_MAP = {
//     Perfect: '确实可',
//     Excellent: '可',
//     Good: '还行',
//     Bad: '一般',
//     Awful: '不太行',
//     Horrible: '啥狗鸡儿东西',
// }