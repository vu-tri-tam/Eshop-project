import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import ProductsApi from '../../api/product/productApi';
import ShopPage from '../../component/shopPage/shopPage'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";
export default function QuanLyShop() {
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
            {/* <Router>
                <Switch>
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/shop/:id" component={() => <ShopPage render={render} />} />
                </Switch>

            </Router> */}
            <ShopPage />
        </div>
    )
}
