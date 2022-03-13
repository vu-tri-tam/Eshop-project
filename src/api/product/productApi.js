import axiosConfig from "../axiosConfig"

const ProductsApi = {
    getAllProduct: () => {
        return axiosConfig.get('/api/products')
    }
}

export default ProductsApi