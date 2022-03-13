import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { AuthContext } from '../../contexts/AuthCtrolAll';
import checkAuth from '../../untils/checkAuth';


export default function HeaderPage() {
    const cart = useSelector((state) => state.cartItem)

    const { authState: { loading, isAuthencation, user }, dispatch } = useContext(AuthContext)
    // console.log(dispatch, 6666);
    // const userLogin = user?.userName
    // console.log(user, 'user')
    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/login"
        // checkAuth(null)
        // dispatch({
        //     type: "SET_AUTH", payload: {
        //         isAuthencation: false,
        //         user: null
        //     }

        // })
        // isAuthencation:true
    }

    return (
        <div>
            <header id="header">{/*header*/}
                <div className="header_top">{/*header_top*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href="#"><i className="fa fa-phone" />0967979049</a></li>
                                        <li><a href="#"><i className="fa fa-envelope" />vutritamiuem@gmail.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header_top*/}
                <div className="header-middle">{/*header-middle*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="logo pull-left">
                                    <a href="index.html"><img src="images/home/logo.png" /></a>
                                </div>
                                <div className="btn-group pull-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Canada</a></li>
                                            <li><a href="#">UK</a></li>
                                        </ul>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Canadian Dollar</a></li>
                                            <li><a href="#">Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="shop-menu pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#"><i className="fa fa-user" /> Account</a></li>
                                        <li><a href="#"><i className="fa fa-star" /> Wishlist</a></li>
                                        <li><a href="/checkout"><i className="fa fa-crosshairs" /> Checkout</a></li>
                                        <li className="position-relative"><a href="/cart" ><i className="fa fa-shopping-cart" /><span className="position-absolute top-3 left-10 start-100 translate-middle badge rounded-pill bg-danger"></span></a></li>
                                        {
                                            isAuthencation !== true ? <li><Link to="/login"><i className="fa fa-lock" /> Đăng nhập</Link></li> : <li><Button onClick={handleLogout}><i className="fa fa-lock" />Đăng xuất</Button></li>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-middle*/}
                <div className="header-bottom">{/*header-bottom*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><a href="/" className="active">Trang chủ</a></li>
                                        <li className="dropdown"><Link to="/shop">Danh mục<i className="fa fa-angle-down" /></Link>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to="/shop">Tất cả sản phẩm</Link></li>
                                                {/* <li><Link to="/product-detail">Product Details</Link></li> */}
                                                <li><a href="checkout.html">Đơn hàng</a></li>
                                                <li><Link to="/cart">Giỏ hàng</Link></li>
                                                <li><Link to="/login">Đăng nhập</Link></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down" /></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><a href="blog.html">Blog List</a></li>
                                                <li><a href="blog-single.html">Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="404.html">404</a></li>
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-bottom*/}
            </header>{/*/header*/}


        </div>
    )
}
