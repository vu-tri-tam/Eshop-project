import React from 'react'
import FooterHomePage from '../homePage/footer'
import HeaderPage from '../homePage/header'
import CartComponent from './cartComponent'
import CartList from './shoppingCart/cartList'

export default function CartPage() {
    return (
        <div>
            <HeaderPage />
            {/* <CartList></CartList> */}
            <CartComponent />
            <FooterHomePage />
        </div>
    )
}
