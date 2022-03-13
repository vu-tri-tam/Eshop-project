import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import Slider from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

const Example = ({ show, handleShowModal, detailItem, handlePrice, pricePro, handleAddCart, setSize, activeClass, setActive }) => {

    const [state, setstate] = useState([])
    // console.log(typeof (state), 6767);
    console.log(pricePro, 5555);

    useEffect(() => {
        setstate(detailItem)
    }, [detailItem])

    const breakPoints = [
        { width: 550, itemsToShow: 1 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1400, itemsToShow: 4 }
    ];
    return (
        <>
            <Modal
                visible={show}
                width="800"
                // height="500"
                effect="fadeInLeft"
                onClickAway={() => handleShowModal(false)}
            >
                <div className="product-details">{/*product-details*/}
                    <div className="col-sm-5">



                        <Slider breakPoints={breakPoints}>
                            {
                                detailItem && detailItem[0]?.images?.map((e, idx) => {
                                    return <div id="similar-product" className="carousel slide" data-ride="carousel">
                                        <img src={e?.URL} />

                                    </div>
                                })

                            }
                        </Slider>

                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">

                            {
                                detailItem?.map((e, i) => {
                                    return <div >
                                        <h2>{e?.tittle}</h2>
                                        <span>
                                            <span>{e?.price * pricePro || e?.price}</span>
                                            <label>Số lượng: </label>
                                            <input type="text" defaultValue={1} onChange={(e) => handlePrice(e.target.value)} />

                                        </span>
                                        <p> <img src="images/product-details/rating.png" /></p>
                                        <p><b>Mô tả: </b>{e?.description}</p>
                                        <p><b>Số lượng trong kho: </b>{e?.quantity}</p>
                                        <p><b>Danh mục: </b>{e?.catelogyParent?.tittle}</p>
                                        <p><b>size: </b>{
                                            e?.sizes?.map((ele, index) => {
                                                return <Link className={`${activeClass} btn btn-warning`} style={{ margin: "1%" }} to="#" onClick={() => { setSize(ele?.sizeNumber); setActive('activeClass') }}>{ele?.sizeNumber}</Link>
                                            })

                                        }</p>

                                        <p><b>Nguồn: </b> E-SHOPPER</p>
                                        <button type="button" className="btn btn-fefault btn-info" disabled={pricePro >= 1 && pricePro <= 100 ? false : true} onClick={() => handleAddCart(e._id, e)}>
                                            <i className="fa fa-shopping-cart" />
                                            Add to cart
                                        </button>

                                    </div>
                                })
                            }
                        </div>{/*/product-information*/}
                    </div>
                </div>


            </Modal>
        </>
    );
}



export default Example