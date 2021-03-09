import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.common["X-Requested-With"] = "xmlhttprequest"
axios.defaults.timeout = 30000
let source = axios.CancelToken.source()
// 添加请求拦截器
let reqInterceptor = axios.interceptors.request.use(
    async (config) => {
        config.headers["Authorization"] = 'this is token'
        return config;
    }, (error) => {
        // 对请求错误做些什么
        console.log(error)
        return Promise.resolve({
            success: false,
            msg: error?.message || '请求发送失败'
        })
    });

// 添加响应拦截器
let resInterceptor = axios.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return {
            success: true,
            result: response.data
        }
    },
    (error) => {
        // 对响应错误做点什么
        if (axios.isCancel(error)) {
            return Promise.resolve({
                success: false,
                isCancel: true,
                msg: error?.message || '请求已取消'
            })
        } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            return Promise.resolve({
                success: false,
                isCancel: true,
                isTimeOut: true,
                msg: error?.message || '请求超时'
            })
        }
        const errData = error.response?.data
        const errorMessage = errData?.msg || errData?.message || error?.message
        console.log('请求失败', errData)
        return Promise.resolve({
            success: false,
            msg: errorMessage || '请求响应失败'
        })
    }
)

// 对三种post方式拆分

// Content-Type: application/json
function jsonPost(url, params, options) {
    return axios.post(url, params, options)
}

// Content-Type: application/x-www-form-urlencoded
function formPost(url, params, options) {
    return axios.post(url, qs.stringify({ ...params }), options)
}

// Content-Type: multipart/form-data
function multipartPost(url, params, options) {
    const formData = new FormData();
    Object.keys(params).forEach((key, index, origin) => {
        formData.append(key, params[key]);
    });
    return axios.post(url, formData, options)
}


// 移除请求拦截器
function removeReqInterceptor() {
    axios.interceptors.request.eject(reqInterceptor);
}

// 移除响应拦截器
function removeResInterceptor() {
    axios.interceptors.response.eject(resInterceptor);
}

function cancel() {
    source.cancel()
}
export default axios