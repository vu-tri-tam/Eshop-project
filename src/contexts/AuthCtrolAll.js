import { createContext, useReducer, useState, useEffect } from "react"
import { AuthReducer } from "../Reducers/AuthReducer"
import axios from "axios"
import checkAuth from "../untils/checkAuth"
// import LoginApi from "../api/login/loginApi"

export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        loading: true,
        isAuthencation: false,
        user: null
    })
    // console.log(authState, 888);

    useEffect(() => {
        console.log('pllplp');
        loadUser()
    }, [])

    // useEffect(() => {
    //     loadUserLogOut()
    // }, [authState])

    // check login
    const loadUser = async () => {
        if (localStorage['users']) {
            checkAuth(localStorage['users'])
        }
        try {
            const response = await axios.get('http://localhost:8000/api/auth')
            // const response = await LoginApi.checkLogin()
            console.log(response, 'res');
            if (response?.data?.success) {
                dispatch({
                    type: "SET_AUTH", payload: {
                        isAuthencation: true,
                        user: response?.data?.user
                    }

                })
            }
        } catch (error) {
            console.log('ok', error);
            localStorage.removeItem('users')
            checkAuth(null)
            dispatch({
                type: "SET_AUTH", payload: {
                    isAuthencation: false,
                    user: null
                }

            })
        }
    }


    //check login
    // const loadUser = async () => {
    //     if (localStorage['users']) {
    //         checkAuth(localStorage['users'])
    //     }
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/auth')
    //         // const response = await LoginApi.checkLogin()
    //         console.log(response, 'res');
    //         if (response.data.success) {
    //             dispatch({
    //                 type: "SET_AUTH", payload: {
    //                     isAuthencation: true,
    //                     user: response?.data?.user
    //                 }

    //             })
    //         }
    //     } catch (error) {
    //         console.log('ok', error);
    //         localStorage.removeItem('users')
    //         checkAuth(null)
    //         dispatch({
    //             type: "SET_AUTH", payload: {
    //                 isAuthencation: false,
    //                 user: null
    //             }

    //         })
    //     }
    // }
    //check logout
    // const loadUserLogOut = async () => {
    //     await localStorage.removeItem('users')
    //     checkAuth(null)
    //     dispatch({
    //         type: "SET_AUTH", payload: {
    //             isAuthencation: false,
    //             user: null
    //         }

    //     })


    // }
    //register
    const register = async userForm => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', userForm)
            // const response = await LoginApi.registerForm(userForm)
            console.log(response, 1232123);
            if (response?.data?.success) {
                localStorage.setItem('users', response?.data?.accessToken)
                await loadUser()
                return response?.data
            }
        } catch (error) {
            if (error?.response?.data) {
                console.log('ccccccccc');
                return error?.response?.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }


    //login
    const login = async userForm => {
        // console.log(userForm, 1232123);

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', userForm)
            // const response = await LoginApi.LoginForm(userForm)
            // console.log(response, 1232123);
            if (response?.data?.success) {
                localStorage.setItem('users', response?.data?.accessToken)

                return response?.data
            }
        } catch (error) {
            if (error?.response?.data) {
                console.log('error');
                return error?.response?.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    //context datagmhhgcx
    const authContextData = { login, register, authState, dispatch }

    //return provider
    return (
        <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>
    )
}
export default AuthContextProvider