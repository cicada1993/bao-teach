import axios from '../../http'

const loadGeoJson = (areaCode) => {
    return axios.get(`/areas_v2/bound/${areaCode}.json`, {
        baseURL: "https://geo.datav.aliyun.com/"
    })
}

export {
    loadGeoJson
}