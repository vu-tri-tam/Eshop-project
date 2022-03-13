import axiosConfig from "../axiosConfig"

const ProvinceApi = {
    getAllProvince: () => {
        return axiosConfig.get('/api/province')
    },
    postProvince: (id) => {
        return axiosConfig.post(`/api/province/${id}`)
    },
    updateProvince: (id, data) => {
        return axiosConfig.patch(`/api/province/${id}`, data)
    }
}

export default ProvinceApi