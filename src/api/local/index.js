import axios from '../../http'

const loadEmProjs = () => {
    return axios.get('/ems/folders', {
        baseURL: process.env.VUE_APP_EMS_API_PREFIX
    })
}

export {
    loadEmProjs
}