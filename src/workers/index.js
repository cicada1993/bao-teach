import TestWorker from './test.worker'

let testWorker = new TestWorker()

testWorker.onmessage = (evt) => {
    console.log("main procedure received a message", evt.data);
};
testWorker.onerror = (err) => {
    console.log("main procedure occured an error", err);
};

export {
    testWorker
}