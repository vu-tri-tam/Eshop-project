import React from 'react'
import BannerHomePage from './banner'
import FooterHomePage from './footer'
import HeaderPage from './header'
import MainHomePage from './main'

export default function Home() {
    return (
        <div>
            <HeaderPage />
            <BannerHomePage />
            <MainHomePage />
            <FooterHomePage />
        </div>
    )
}
