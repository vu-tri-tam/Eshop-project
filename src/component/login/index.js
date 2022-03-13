import React, { useContext } from 'react'
// import { Redirect } from 'react-router-dom'
// import { AuthContext } from '../../contexts/AuthCtrolAll'
import FooterHomePage from '../homePage/footer'
import HeaderPage from '../homePage/header'
import LoginPage from './loginComponent/login'
// import { Redirect, useHistory } from 'react-router-dom';
// import { AuthContext } from '../../../contexts/AuthCtrolAll';

export default function LoginToWeb() {


    return (
        <div>
            <HeaderPage />
            <LoginPage></LoginPage>

            <FooterHomePage />
        </div>
    )
}
