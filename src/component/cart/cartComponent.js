import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux'
import CreateNotification from '../notification/notification';
import { DeleteCart, DeleteAllCart } from '../../features/cartSlice/cartSlice'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import CounPoint from './counpoint';
import CouPonApi from '../../api/coupon/coupon';
import CartPayPal from './payment/cartPay';
import { AuthContext } from '../../contexts/AuthCtrolAll';

export default function CartComponent() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cartItem)
    const { authState: { loading, isAuthencation, user } } = useContext(AuthContext)
    console.log(isAuthencation, 'ss');
    const [show, setShow] = useState(false)
    const [coupon, setCoupon] = useState([])
    const [couponApplyTotal, setApplyTotal] = useState()
    // const [toTal, setTotal] = useState()
    const [checkOut, setCheckOut] = useState(false)
    // console.log(couponApplyTotal, 889898);
    // const [voucher, setVoucher] = useState({});
    const total = cart && cart.reduce((total, item) =>
    (

        total + item.price || 0
    ), 0); //  Số 0 cuối cùng là giá trị khởi tạo

    useEffect(() => {

        getAllCoupon()
    }, [])


    const getAllCoupon = async () => {
        const coupon = await CouPonApi.getAllCoupon()

        setCoupon(coupon?.data?.countPoints)
    }
    // const calcularTotal = () => {
    //     const voucherData = JSON.parse(localStorage.getItem('totalCoupon') || {});
    //     setVoucher(voucherData || {});
    //     if (voucherData && voucherData !== {} && cart?.length > 0) {
    //         return setApplyTotal(total - voucherData.value);
    //     }
    //     setApplyTotal(total)
    // }

    // useEffect(() => {
    //     calcularTotal();
    // }, [])

    useEffect(() => {
        // calcularTotal();

        const totalApplyCouponed = localStorage.getItem('totalCoupon')

        if (cart.length > 0) {
            setApplyTotal(total - totalApplyCouponed)

        } else {
            localStorage.removeItem("totalCoupon");
            setApplyTotal(total)
        }
        // localStorage.removeItem("totalCoupon");
        // setApplyTotal(total)
    }, [cart]);


    // useEffect(() => {
    //     // localStorage.setItem("totalCoupon");
    //     setApplyTotal(0)
    //     console.log("chạy khi total thay đổi");
    //     // const finalPriceApplyCoupon = total //  Số 0 cuối cùng là giá trị khởi tạo
    //     // console.log(finalPriceApplyCoupon, 8956);
    //     // setApplyTotal(finalPriceApplyCoupon)


    // }, [total])


    useEffect(() => {
        // console.log('chạy đầu tiên');
        const totalApplyCouponed = localStorage.getItem('totalCoupon')
        console.log(totalApplyCouponed, 'loca');
        if (totalApplyCouponed === NaN) {
            setApplyTotal(total)
        } else {
            setApplyTotal(total - totalApplyCouponed)

        }
    }, [])

    // useEffect(() => {
    //     handleApplyCoupon(coupon)
    // }, [couponApplyTotal])

    const handleApplyCoupon = async (item) => {
        const toTalApply = total - item.priceCoupon;
        localStorage.setItem('totalCoupon', item.priceCoupon);

        setApplyTotal(toTalApply)

        const updateStatus = await CouPonApi.updateCounpon(item._id, { ...item, status: true })
        if (updateStatus) {
            CreateNotification.success('áp dụng thành công')
        } else {
            CreateNotification.error('có vẻ như đang gặp lỗi gì đó khi sử dụng coupon')
        }
        await getAllCoupon()


        // setVoucher(voucherData);
        // calcularTotal();
        // const findIndexCounpon = coupon.filter(e => e?._id === item._id)
        // console.log(findIndexCounpon._id, 6555);
        // const findIndexCounpon = coupon.findIndex(e => e?._id === item._id)
        // if (findIndexCounpon > -1) {

        //     coupon[findIndexCounpon].status = true
        //     CreateNotification.success('áp dụng thành công')
        // }
        // setCoupon()

    }

    const handleShow = (status) => {
        setShow(status)
    }


    const handleDelete = (item) => {
        CreateNotification.success("xóa thành công sản phẩm")
        const action = DeleteCart(item)
        dispatch(action)
    }

    // useEffect(() => {
    //     const action = DeleteAllCart()
    //     dispatch(action)
    // }, [user?._id])


    return (
        <div>
            <div>

                <section id="cart_items">
                    <div className="container">

                        <div className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li><Link to="/">Trang chủ</Link></li>
                                <li className="active">Giỏ hàng</li>
                            </ol>
                        </div>
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr class="cart_menu">
                                        <td class="image">Item</td>
                                        <td class="description">description</td>
                                        <td class="price">size</td>
                                        <td class="quantity">Quantity</td>
                                        <td class="price">Price</td>


                                        <td class="total">Total</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        cart && cart?.length > 0 ? cart?.map((e, i) => {
                                            console.log(e, "cartComponent")
                                            return <tr key={i}>
                                                <td className="cart_product">
                                                    <a href><img src={e?.images[0]?.URL} /></a>
                                                </td>
                                                <td className="cart_description">
                                                    <h4><a href>{e?.tittle}</a></h4>
                                                    <p>{e?.catelogyParent?.tittle}</p>
                                                </td>
                                                <td className="cart_quantity">
                                                    <p>{e?.size}</p>
                                                </td>
                                                <td className="cart_quantity">
                                                    <div className="cart_quantity_button">
                                                        <a className="cart_quantity_up" href> + </a>
                                                        <input className="cart_quantity_input" type="text" name="quantity" defaultValue={e?.quantity} autoComplete="off" size={2} />
                                                        <a className="cart_quantity_down" href> - </a>
                                                    </div>
                                                </td>
                                                <td className="cart_total">
                                                    <p className="cart_total_price">{e?.price}</p>
                                                </td>

                                                <td className="cart_delete">
                                                    <a className="cart_quantity_delete" onClick={() => handleDelete(e)}><i className="fa fa-times" /></a>
                                                </td>
                                            </tr>
                                        }) : <tr style={{ height: "300px" }}>
                                            <td colSpan="5" className="text-center"><b>Chưa có sản phẩm nào </b><button className="btn btn-warning"><Link to="/shop">Tiếp tục mua hàng</Link></button></td>

                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section> {/*/#cart_items*/}
                <section id="do_action">
                    <div className="container">
                        <div className="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="chose_area">
                                    <CounPoint show={show} handleShowModal={handleShow} coupon={coupon} handleApplyCoupon={handleApplyCoupon} couponApplyTotal={couponApplyTotal} />
                                    <ul className="user_option">
                                        <li>
                                            <input type="checkbox" onClick={(e) => {
                                                if (e.target.checked) {
                                                    cart.length > 0 ? handleShow(true) : CreateNotification.error("Vui lòng mua hàng trước khi áp dụng mã giảm giá")
                                                }
                                            }}

                                            />
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Estimate Shipping &amp; Taxes</label>
                                        </li>
                                    </ul>
                                    <ul className="user_info">
                                        <li className="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text" />
                                        </li>
                                    </ul>
                                    <a className="btn btn-default update" >Get Quotes</a>
                                    <a className="btn btn-default check_out" >Continue</a>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="total_area">

                                    <ul>
                                        <li>Cart Sub Total <span>{total}</span></li>
                                        <li>coupon<span>{localStorage.getItem('totalCoupon') || 0}</span></li>
                                        <li>Shipping Cost <span>Free</span></li>
                                        <li >Total <span style={{ color: "orange" }}>{localStorage.getItem('totalCoupon') !== null ? <p><s>{total}</s><b style={{ marginLeft: "5%" }}>{couponApplyTotal}</b></p> : total}</span></li>
                                    </ul>
                                    {
                                        checkOut ?
                                            <CartPayPal price={couponApplyTotal || total} /> : <button className="btn btn-danger check_out" onClick={() => {
                                                setCheckOut(true)
                                            }}>paypal online</button>


                                    }
                                    <button className="btn btn-danger check_out" disabled={total !== 0 && couponApplyTotal !== 0 ? false : true}><Link to="/checkout">Check Out</Link></button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/*/#do_action*/}
            </div>

        </div>
    )
}

// const mapStateToProp = state => ({
//     item: state.cartItem
// })

// export default connect(mapStateToProp)(CartComponent)