export const multiPromise = (promiseArr) => {

const promiseArray = promiseArr.map((promise) => {
    if (promise && typeof promise.then === 'function') {
        return (new Promise((resolve, reject) => {
            promise.then(resolve).catch(resolve);
        }));
    }
    return null;
}).filter(item => item !== null);
return Promise.all(promiseArray);
}