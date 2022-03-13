import axiosConfig from "../axiosConfig"

// import axiosConfig from "../axiosConfig"


const LoginApi = {
    checkLogin: () => {
        return axiosConfig.get('/api/auth')
    },
    registerForm: (params) => {
        return axiosConfig.post('/api/auth/register', params)
    },
    LoginForm: (userForm) => {
        return axiosConfig.post('/api/auth/login', userForm)
    }
}

export default LoginApi