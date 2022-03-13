import React, { useEffect, useState } from 'react'
import ProductsApi from '../../api/product/productApi'
import SideBar from '../sideBar'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Slider from 'react-elastic-carousel';
import Skeleton from 'react-loading-skeleton';
import { useSelector, useDispatch } from 'react-redux'
import CreateNotification from '../notification/notification';
import { addToCart } from '../../features/cartSlice/cartSlice';
import { Link, NavLink } from 'react-router-dom';
// import ModalDetailProduct from './modalProDetail';
// import { Tab, Tabs } from 'react-bootstrap'
// import { Button, Modal } from 'react-bootstrap';
// import Modal from 'react-bootstrap/lib/Modal';
// import Button from 'react-bootstrap/lib/Button';

// import { ModalDetailProduct } from './modalProDetail';
// import { Modal, Button } from 'react-bootstrap'
// import InfiniteCarousel from 'react-leaf-carousel';
// import 'react-slideshow-image/dist/styles.css'
// import { Slide } from 'react-slideshow-image';

export default function ProductDetail({ id }) {
    const [render, setRender] = useState([])
    // const [showModal, setModal] = useState(false)
    const [pricePro, setPricePro] = useState([])
    // const [detailItem, setDetail] = useState()
    const [allProduct, setAllPro] = useState([])
    const [size, setSize] = useState()
    const [activeClass, setActiveClass] = useState('')
    const dispatch = useDispatch()


    // const handleShowModal = (status) => {
    //     setModal(status)
    // }
    useEffect(() => {
        window.scrollTo(0, 3)
    }, [])
    const handleAddCart = (id, item) => {

        if (item._id === id) {
            if (activeClass !== "") {

                CreateNotification.success("thêm thành công sản phẩm")
                const action = addToCart({
                    ...item,
                    size: size,
                    price: item.price * pricePro,
                    quantity: pricePro * 1 || 1
                })
                dispatch(action)
            } else {
                CreateNotification.error("vui lòng chọn size sản phẩm")
                return
            }
        }
    }
    useEffect(() => {
        const getALL = async () => {
            const allpro = await ProductsApi.getAllProduct()
            setAllPro(allpro.data.product)
        }
        getALL()

    }, [])

    useEffect(() => {
        const getAll = async (idpro) => {
            const allpro = await ProductsApi.getAllProduct()
            const proById = await allpro?.data?.product?.filter(e => e?._id === idpro)
            setRender(proById)
        }
        getAll(id)
    }, [id])

    const handlePrice = (e) => {
        if (e < 0) {
            CreateNotification.error("Lỗi khi nhập số lượng")
            return
        }
        setPricePro(e)
    }

    const breakPoints = [
        { width: 550, itemsToShow: 1 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1400, itemsToShow: 4 }
    ];
    return (
        <div>

            <section>
                <div className="container">

                    <div className="row">

                        {/* <SideBar /> */}
                        <div className="col-sm-12 padding-right">
                            {
                                render && render.length > 0 ?
                                    <div className="product-details">{/*product-details*/}
                                        <div className="col-sm-5">

                                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                                {/* Wrapper for slides */}
                                                <Carousel className="carousel-inner">
                                                    {
                                                        render[0]?.images?.map((e, idx) => {
                                                            return <div className="view-product">
                                                                <img src={e?.URL} />
                                                            </div>
                                                        })
                                                    }

                                                </Carousel>

                                                <a className="left item-control" href="#" data-slide="prev">
                                                    <i className="fa fa-angle-left" />
                                                </a>
                                                <a className="right item-control" href="#" data-slide="next">
                                                    <i className="fa fa-angle-right" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="product-information">
                                                <img src="images/product-details/new.jpg" className="newarrival" />
                                                <h2>{render[0]?.tittle} (<span className="text-primary">{render[0]?.status ? "Còn hàng" : "Ngừng kinh doanh"}</span>)</h2>

                                                <span>
                                                    <span>{render[0]?.price * pricePro || render[0]?.price}</span>
                                                    <label>Số lượng: </label>
                                                    <input type="text" defaultValue={1} onChange={(e) => handlePrice(e.target.value)} />

                                                </span>
                                                <p> <img src="images/product-details/rating.png" /></p>
                                                <p><b>Mô tả: </b>{render[0]?.description}</p>
                                                <p><b>Số lượng trong kho: </b>{render[0]?.quantity}</p>
                                                <p><b>Danh mục: </b>{render[0]?.catelogyParent?.tittle}</p>
                                                <p><b>size: </b>{
                                                    render[0]?.sizes?.map((ele, index) => {
                                                        return <Link className={`${activeClass} btn btn-warning`} style={{ margin: "1%" }} to="#" onClick={() => { setSize(ele?.sizeNumber); setActiveClass('activeClass') }}>{ele?.sizeNumber}</Link>
                                                    })
                                                }</p>
                                                <p><b>Condition:</b> New</p>
                                                <p><b>Nguồn: </b> E-SHOPPER</p>
                                                {/* <button onClick={() => handleShowModal(true)}>click</button> */}
                                                <button type="button" className="btn btn-fefault btn-info" disabled={pricePro >= 1 && pricePro <= 100 ? false : true} onClick={() => handleAddCart(render[0]._id, render[0])}>
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </button>
                                                <a href><img src="images/product-details/share.png" className="share img-responsive" /></a>
                                            </div>{/*/product-information*/}
                                        </div>
                                    </div> : <div className="product-details">{/*product-details*/}
                                        <div className="col-sm-5">

                                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                                {/* Wrapper for slides */}
                                                <div className="view-product">
                                                    <Skeleton width={400} height={550} />
                                                </div>


                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="product-information">
                                                <Skeleton width={400} height={25} />
                                                <span>
                                                    <Skeleton width={400} height={25} />
                                                    <Skeleton width={400} height={15} />
                                                    <Skeleton width={400} height={15} />
                                                </span>
                                                <Skeleton width={400} height={15} />
                                                <Skeleton width={400} height={15} />
                                            </div>
                                        </div>
                                    </div>
                            }
                            {/* <Tabs defaultActiveKey={2} className="nav-tabs">
                                <Tab eventKey={1} title="Tab 1" data-toggle="tab">
                                    Tab 1 content
                                </Tab>
                                <Tab eventKey={2} title="Tab 2">
                                    Tab 2 content
                                </Tab>
                                <Tab eventKey={3} title="Tab 3">
                                    Tab 3 content
                                </Tab>
                            </Tabs> */}
                            <div className="category-tab shop-details-tab">{/*category-tab*/}
                                <div className="col-sm-12">

                                    <ul className="nav nav-tabs">
                                        <li><a href="#details" data-toggle="tab">Chi tiết</a></li>

                                        <li className="active"><a href="#reviews" data-toggle="tab">Đánh giá (5)</a></li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade" id="details">
                                        {/* <Slider breakPoints={breakPoints}> */}
                                        {
                                            allProduct?.map((e, i) => {
                                                return <div className="item active">
                                                    <div className="col-sm-4">
                                                        <div className="product-image-wrapper">
                                                            <div className="single-products">
                                                                <div className="productinfo text-center">
                                                                    <img src={e?.images[0]?.URL} />
                                                                    <h2>{e?.price}</h2>
                                                                    <p>{e?.tittle}</p>
                                                                    <p>{e?.status}</p>
                                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            })
                                        }
                                        {/* </Slider> */}



                                    </div>

                                    <div className="tab-pane fade active in" id="reviews">
                                        <div className="col-sm-12">
                                            <ul>
                                                <li><a href><i className="fa fa-user" />EUGEN</a></li>
                                                <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                                                <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            <p><b>Write Your Review</b></p>
                                            <form action="#">
                                                <span>
                                                    <input type="text" placeholder="Your Name" />
                                                    <input type="email" placeholder="Email Address" />
                                                </span>
                                                <textarea name defaultValue={""} />
                                                <b>Rating: </b> <img src="images/product-details/rating.png" />
                                                <button type="button" className="btn btn-default pull-right">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>{/*/category-tab*/}
                            <div className="recommended_items">{/*recommended_items*/}
                                <h2 className="title text-center">sản phẩm được đề xuất</h2>
                                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <Slider breakPoints={breakPoints}>
                                            {
                                                allProduct?.map((e, i) => {
                                                    return <div className="carousel-wrapper">
                                                        <div className="product-image-wrapper">
                                                            <div className="single-products">
                                                                <div className="productinfo text-center">
                                                                    <img src={e?.images[0]?.URL} />
                                                                    <h2>{e?.price}</h2>
                                                                    <p>{e?.tittle}</p>
                                                                    <p>{e?.status}</p>
                                                                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </Slider>
                                        {/* {
                                                allProduct?.map((e, i) => {
                                                    return <div className="item active">
                                                        <div className="col-sm-4">
                                                            <div className="product-image-wrapper">
                                                                <div className="single-products">
                                                                    <div className="productinfo text-center">
                                                                        <img src={e?.images[0]?.URL} />
                                                                        <h2>{e?.price}</h2>
                                                                        <p>{e?.tittle}</p>
                                                                        <p>{e?.status}</p>
                                                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                })
                                            }

                                        </InfiniteCarousel> */}


                                    </div>
                                    {/* <ModalDetailProduct handlePrice={handlePrice} handleAddCart={handleAddCart} pricePro={pricePro} show={showModal} detailItem={detailItem} handleShowModal={handleShowModal} /> */}

                                    {/* <a className="left recommended-item-control" href="#" data-slide="prev">
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right recommended-item-control" href="#" data-slide="next">
                                        <i className="fa fa-angle-right" />
                                    </a> */}
                                </div>
                            </div>{/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>




        </div>
    )
}
