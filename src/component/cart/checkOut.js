import React from 'react'
import FooterHomePage from '../homePage/footer'
import HeaderPage from '../homePage/header'
import CheckOutComponent from './checkOutComponent'
// import CartComponent from './cartComponent'
// import CartList from './shoppingCart/cartList'

export default function CheckOut() {
    return (
        <div>
            <HeaderPage />
            {/* <CartList></CartList> */}
            {/* <CartComponent /> */}
            <CheckOutComponent />
            <FooterHomePage />
        </div>
    )
}
