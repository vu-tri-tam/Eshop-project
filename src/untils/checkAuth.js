import axios from 'axios'
import React from 'react'

const checkAuth = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
export default checkAuth