import axiosConfig from "../axiosConfig"

const CatalogApi = {
    getAllCatalog: () => {
        return axiosConfig.get('/api/catelogy')
    }
}

export default CatalogApi