import axios from "axios";
import jwt_decode from "jwt-decode";

const tokenfake = localStorage.getItem("users")

const getToken = (tokenfake) => {
    try {
        if (tokenfake !== undefined) {
            let token = jwt_decode(tokenfake)//giải mã jwt thành token nguyên bản
            // console.log(token, 133);
            return token
        }
        return null
    } catch (error) {
        console.log(error, 'pllpczcpkdf');
    }


}


const axiosConfig = axios.create({
    baseURL: "https://eshop-code-app.herokuapp.com",
    headers: { 'Authorization': getToken(tokenfake) }
})

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     if (tokenfake) {
//         config.headers.Authorization = tokenfake
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });


axiosConfig.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    if (error.response !== undefined && error.response.status === 403) {
        localStorage.removeItem('users')
        window.location.href = "/login"
    }
});

export default axiosConfig