import { userStore } from '../storage'
onmessage = (evt) => {
    console.log('woker procedure received a message', evt.data)
    if (evt.data.type == 'storage') {
        readSth()
    }
}

onerror = (err) => {
    console.log('worker procedure occured an error', err)
}

async function readSth() {
    const userInfo = await userStore.getItem('user_info')
    postMessage(userInfo)
}