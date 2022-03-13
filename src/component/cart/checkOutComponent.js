import React, { useState, useEffect, useContext, useRef } from 'react'
// import CartList from './shoppingCart/cartList'
import { useSelector } from 'react-redux';
import ModalCheckOut from "../cart/finalCheckOut/modalCheckOut"
import CreateNotification from '../notification/notification';
import ProvinceApi from '../../api/province/province';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AuthContext } from '../../contexts/AuthCtrolAll';
// import axios from "axios"

export default function CheckOutComponent() {

    const cartList = useSelector((state) => state.cartItem)
    const [show, setShow] = useState(false)
    const [couponTotal, setApplyTotal] = useState(false)
    const [province, setProvince] = useState([])
    const [dictrict, setDictrict] = useState([])
    const [contentAddress, setContent] = useState("")
    const [saveOrther, setSaveOrther] = useState()
    const [thanhToanUser, setThanhToan] = useState(false)
    const ref = useRef()
    const refUserName = useRef(null)


    const SignupSchema = Yup.object().shape(
        thanhToanUser ?
            {
                Email: Yup.string()
                    .email("Vui lòng nhập đúng định dạng")
                    .required("Không được bỏ trống Email!"),


                address1: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống địa chỉ 1!"),
                address2: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống đại chỉ 2!"),
                ZipCode: Yup.number()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống mã bưu điện!"),
                password: Yup.string()
                    .required("Không được bỏ trống mật khẩu!"),
                provinces: Yup.string().required("Không được để trống tỉnh/thành phố"),
                districts: Yup.string()
                    .required("Không được bỏ trống quận/huyện!"),
                phone: Yup.number().positive("Phải là số dương").min(10, "Tối thiểu 10 số")
                    .required("Không được bỏ trống số điện thoại!"),
            } : {
                Email: Yup.string()
                    .email("Vui lòng nhập đúng định dạng")
                    .required("Không được bỏ trống Email!"),
                first_name: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống tên đầu tiên!"),
                middle_name: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống tên giữa!"),
                last_name: Yup.string()
                    .min(2, "Tối thiểu 2 kí tự")
                    .required("Không được bỏ trống tên cuối!"),
                address1: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống địa chỉ 1!"),
                address2: Yup.string()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống đại chỉ 2!"),
                ZipCode: Yup.number()
                    .min(3, "Tối thiểu 3 kí tự")
                    .required("Không được bỏ trống mã bưu điện!"),
                password: Yup.string()
                    .required("Không được bỏ trống mật khẩu!"),
                provinces: Yup.string().required("Không được để trống tỉnh/thành phố"),
                districts: Yup.string()
                    .required("Không được bỏ trống quận/huyện!"),
                phone: Yup.number().positive("Phải là số dương").min(10, "Tối thiểu 10 số")
                    .required("Không được bỏ trống số điện thoại!"),
            }
    );
    // console.log(SignupSchema, 'SignupSchema');
    const renderError = (message) => <p className="isDanger">{message}</p>;
    const { authState: { user } } = useContext(AuthContext)
    // console.log(user.userName, 53);

    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await axios.get('http://localhost:8000/api/auth')
    //         console.log(response, 66666);
    //     }
    //     getUser()
    // }, [])

    // const response = await axios.get('http://localhost:8000/api/auth')


    const total = cartList && cartList.reduce((total, item) =>
    (
        total + item.price || 0
    ), 0); //  Số 0 cuối cùng là giá trị khởi tạo

    useEffect(() => {
        const totalApplyCouponed = localStorage.getItem('totalCoupon')
        setApplyTotal(total - totalApplyCouponed)
        getAllProvince()
    }, [])

    const getAllProvince = async () => {
        const provinces = await ProvinceApi.getAllProvince()
        setProvince(provinces?.data?.provinces)
    }

    const handleShow = (status) => {
        setShow(status)
    }

    const handleFilterDistrict = (id) => {
        console.log(id);
        const getProvince = province?.filter(e => e?._id === id)
        setDictrict(getProvince)
    }

    const handleThanhToan = (data) => {
        let checkThanhToan
        if (data === true) {
            checkThanhToan = true
        } else {
            checkThanhToan = false
        }

        setThanhToan(checkThanhToan)
    }
    console.log(refUserName, 'check');
    return (
        <div>

            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="/">Trang chủ</a></li>
                            <li className="active">check out</li>
                        </ol>
                    </div>{/*/breadcrums*/}
                    <div className="step-one">
                        <h2 className="heading">Bước 1</h2>
                    </div>
                    <div className="checkout-options">
                        <h3>Người dùng mới</h3>
                        <p>Tùy chọn thanh toán</p>
                        <ul className="nav">
                            <li>
                                <label><input type="checkbox" onChange={(e) => handleThanhToan(e?.target?.checked)} />Thanh toán bằng tài khoản người dùng</label>
                            </li>
                            <li>
                                <label><input type="checkbox" />Thanh toán của khách</label>
                            </li>
                            <li>
                                <a href><i className="fa fa-times" />Hủy bỏ</a>
                            </li>
                        </ul>
                    </div>{/*/checkout-options*/}
                    <div className="register-req">
                        <p>Vui lòng sử dụng Đăng ký và Thanh toán để dễ dàng truy cập vào lịch sử đơn đặt hàng của bạn hoặc sử dụng Thanh toán với tư cách Khách</p>
                    </div>{/*/register-req*/}
                    <div className="shopper-informations">
                        <div className="row">

                            <Formik
                                initialValues={thanhToanUser === true ? {
                                    Email: '',
                                    userName: "",
                                    address1: "",
                                    address2: "",
                                    ZipCode: "",
                                    password: "",
                                    provinces: "",
                                    districts: "",
                                    phone: ""
                                } : {
                                    Email: '',
                                    first_name: "",
                                    middle_name: "",
                                    last_name: "",
                                    address1: "",
                                    address2: "",
                                    ZipCode: "",
                                    password: "",
                                    provinces: "",
                                    districts: "",
                                    phone: ""
                                }
                                }
                                validationSchema={() => SignupSchema}
                                // validator={() => ({ SignupSchema })}
                                onSubmit={(values, { resetForm }) => {
                                    console.log({ ...values, userName: refUserName.current.children[1].value, contentAddress: contentAddress }, 'hhh')
                                    // console.log(refUserName, 'refUserName');

                                    if (ref.current.checked) {
                                        if (thanhToanUser) {
                                            console.log('vô đây')
                                            setSaveOrther({ ...values, userName: refUserName.current.children[1].value, contentAddress: contentAddress })
                                        } else {
                                            console.log('vô đây nè')
                                            setSaveOrther({ ...values, contentAddress: contentAddress })
                                        }
                                        // setSaveOrther({ ...values, contentAddress: contentAddress })


                                        resetForm()
                                    } else {
                                        setSaveOrther(values)
                                    }
                                }}
                            >

                                <Form >
                                    <div className="col-sm-8 clearfix">
                                        <div className="bill-to">
                                            <p>Thông tin hóa đơn</p>

                                            <div className="form-one" ref={refUserName}>


                                                <Field name="Email" placeholder="Email *" />
                                                <ErrorMessage name="Email" render={renderError} />
                                                {

                                                    thanhToanUser ?

                                                        <Field name="userName" placeholder="Tên" value={user?.userName} /> :
                                                        (<><Field name="first_name" placeholder="Tên đầu tiên *" />
                                                            <ErrorMessage name="first_name" render={renderError} />


                                                            <Field name="middle_name" placeholder="Tên giữa *" />
                                                            <ErrorMessage name="middle_name" render={renderError} />

                                                            <Field name="last_name" placeholder="Tên cuối *" />
                                                            <ErrorMessage name="last_name" render={renderError} />
                                                        </>)

                                                }

                                                <Field name="address1" placeholder="Địa chỉ 1 *" />
                                                <ErrorMessage name="address1" render={renderError} />

                                                <Field name="address2" placeholder="Địa chỉ 2 *" />
                                                <ErrorMessage name="address2" render={renderError} />



                                            </div>
                                            <div className="form-two">
                                                <Field name="ZipCode" placeholder="Mã bưu điện *" />
                                                <ErrorMessage name="ZipCode" render={renderError} />

                                                <Field name="provinces" as="select" onBlur={(e) => handleFilterDistrict(e.target.value)}>
                                                    <option>Tỉnh/Thành phố</option>
                                                    {
                                                        province?.map((e, idx) => {
                                                            return <option value={e?._id}>{e?.name}</option>
                                                        })
                                                    }
                                                </Field>


                                                <ErrorMessage name="provinces" render={renderError} />

                                                <Field name="districts" as="select" >
                                                    <option>Quận/Huyện</option>
                                                    {
                                                        dictrict[0]?.districts?.map((e, i) => {

                                                            return <option value={e?._id}>{e?.name}</option>
                                                        })
                                                    }
                                                </Field>
                                                <ErrorMessage name="districts" render={renderError} />

                                                <Field name="password" placeholder="Mật khẩu *" />
                                                <ErrorMessage name="password" render={renderError} />

                                                <Field name="phone" placeholder="Số điện thoại *" />
                                                <ErrorMessage name="phone" render={renderError} />


                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="order-message">
                                            <p>Ghi chú vận chuyển (không bắt buộc)</p>
                                            <Field as="textarea" name="message" placeholder="Ghi chú về đơn đặt hàng của bạn, Ghi chú đặc biệt khi giao hàng" rows={16} onChange={(e) => setContent(e.target.value)} />
                                            <label><input type="checkbox" ref={ref} onClick={(e) => {
                                                if (e.target.checked) {

                                                    cartList.length <= 0 ? CreateNotification.error("Cần phải có sản phẩm mới được lưu địa chỉ") : contentAddress === "" ? CreateNotification.error("Cần nhập địa chỉ trước khi lưu") : CreateNotification.success("Đã lưu địa chỉ thanh toán")

                                                }

                                            }} /> Vận chuyển đến địa chỉ thanh toán</label>
                                            <button className="btn btn-warning" style={{ float: "right" }} type="submit">Lưu lại</button>
                                        </div>
                                    </div>
                                </Form>

                            </Formik>
                            <ModalCheckOut show={show} saveOrther={saveOrther} setSaveOrther={setSaveOrther} handleShowModal={handleShow} />

                        </div>
                    </div>
                    <div className="review-payment">
                        <h2>Giỏ hàng &amp; Thanh toán</h2>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">size</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartList?.map((e, idx) => {
                                        return <tr>
                                            <td className="cart_product">
                                                <a href><img src={e?.images[0]?.URL} /></a>
                                            </td>
                                            <td className="cart_description">
                                                <h4><a>{e?.tittle}</a></h4>
                                            </td>
                                            <td className="cart_price">
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
                                                <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                                            </td>
                                        </tr>

                                    })
                                }
                                <tr>
                                    <td colSpan={4}>&nbsp;</td>
                                    <td colSpan={2}>
                                        <table className="table table-condensed total-result">
                                            <tbody><tr>
                                                <td>Cart Sub Total</td>
                                                <td>{total.toLocaleString()}</td>
                                            </tr>
                                                <tr>
                                                    <td>Coupon: </td>
                                                    <td>{localStorage.getItem('totalCoupon') || 0}</td>
                                                </tr>
                                                <tr className="shipping-cost">
                                                    <td>Shipping Cost</td>
                                                    <td>Free</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td><span>{couponTotal.toLocaleString() || total.toLocaleString()}</span></td>
                                                </tr>
                                            </tbody></table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-options">
                        <span>
                            <label><input type="checkbox" /> Direct Bank Transfer</label>
                        </span>
                        <span>
                            <label><input type="checkbox" onClick={(e) => {
                                if (e.target.checked) {
                                    cartList.length <= 0 ? CreateNotification.error("Cần phải có sản phẩm mới được thanh toán") : saveOrther === undefined ? CreateNotification.error("cần lưu thông tin hóa đơn trước khi thanh toán") : handleShow(true)

                                }
                            }} /> Check Payment</label>
                        </span>
                        <span>
                            <label><input type="checkbox" /> Paypal</label>
                        </span>
                    </div>
                </div>
            </section > {/*/#cart_items*/}

        </div >
    )
}
