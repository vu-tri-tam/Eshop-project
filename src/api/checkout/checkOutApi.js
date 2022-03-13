import axiosConfig from "../axiosConfig"

const CheckOutApi = {
    getAllCoupon: () => {
        return axiosConfig.get('/api/coupon')
    },
    postCheckOut: (data) => {
        return axiosConfig.post(`/api/checkout`, data)
    },
    updateCounpon: (id, data) => {
        return axiosConfig.patch(`/api/coupon/${id}`, data)
    }
}

export default CheckOutApi
