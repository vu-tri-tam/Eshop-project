import React from 'react'
import Skeleton from 'react-loading-skeleton'
// import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'



export default function CartItem({ handleSeenFast, ...props }) {

    const { tittle, price, quantity, size, status, color, images } = props


    return (

        <div className="col-sm-4" key={props._id}>

            <div className="product-image-wrapper" >
                <div className="single-products">


                    <div className="productinfo text-center">
                        <img src={images[0].URL || 0} />
                        <p > {tittle}</p>
                        <h2>{price}</h2>

                        <p>{status}</p>
                        <button className="btn btn-default add-to-cart" onClick={() => handleSeenFast(props._id)}><i className="fa fa-shopping-cart" />Xem nhanh</button>
                        <NavLink className="btn btn-default add-to-cart" to={`/detail-product/${props._id}`} ><i className="fa fa-shopping-cart" />Detail item</NavLink>
                    </div>
                    {/* <div className="product-overlay">
                <div className="overlay-content">
                    <p>{tittle}</p>
                    <h2>{price}</h2>

                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" onClick={() => handleAddCart(id)} />Add to cart</button>
                </div>
            </div> */}
                </div>
                <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                        <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                    </ul>
                </div>
            </div>
        </div>



    )
}
