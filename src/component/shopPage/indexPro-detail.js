import React, { useEffect, useState } from 'react'
import ProductsApi from '../../api/product/productApi'
import FooterHomePage from '../homePage/footer'
import HeaderPage from '../homePage/header'
// import SideBar from '../sideBar'
import ProductDetail from './product-detail'

export default function ProDetailPage({ match }) {
    const param = match.params.id
    return (
        <div>
            <HeaderPage />
            <ProductDetail id={param} />
            <FooterHomePage />
        </div>
    )
}
