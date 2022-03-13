import axiosConfig from "../axiosConfig"

const CouPonApi = {
    getAllCoupon: () => {
        return axiosConfig.get('/api/coupon')
    },
    postCounpon: (id) => {
        return axiosConfig.post(`/api/coupon/${id}`)
    },
    updateCounpon: (id, data) => {
        return axiosConfig.patch(`/api/coupon/${id}`, data)
    }
}

export default CouPonApi