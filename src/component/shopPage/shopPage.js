import React, { useEffect, useState } from 'react'
import ProductsApi from '../../api/product/productApi'

import FooterHomePage from '../homePage/footer'
import HeaderPage from '../homePage/header'
// import SideBar from '../sideBar'
import Products from './products'

export default function ShopPage() {
    // console.log(match, render, 8787);
    // const param = match.params.id

    // const [render, setRender] = useState([])
    // const [product, setProduct] = useState([])
    // useEffect(() => {

    //     ProductsApi.getAllProduct().then(res => setProduct(res?.data))
    // }, [])
    // useEffect(() => {
    //     const handleProById = (idcata) => {
    //         const cc = product?.product?.filter((e, index) => e?.catelogyParent == idcata)
    //         setRender(cc)
    //     }
    //     handleProById(param)
    // }, [param])
    return (
        <div>
            <HeaderPage />

            {/* <SideBar /> */}
            <Products />
            <FooterHomePage />

        </div>
    )
}
