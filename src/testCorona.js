import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function TestCorona() {

    useEffect(() => {
        const handleCoronal = async () => {
            try {
                await axios.get('https://api.covid19api.com/all')?.then(res => console.log(res?.data, 87878))

            } catch (error) {
                console.log(error, 445);
            }

        }
        handleCoronal()
    }, [])
    return (
        <div>

        </div>
    )
}
