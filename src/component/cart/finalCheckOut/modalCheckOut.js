import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import Slider from 'react-elastic-carousel';
import './finalCss.css'
import { BiPrinter } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { GrContactInfo } from 'react-icons/gr';
import { RiCoupon3Line } from 'react-icons/ri';
import { FcAdvance } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import CheckOutApi from '../../../api/checkout/checkOutApi';
import Swal from 'sweetalert2'

import ConfirmAlert from '../../../comon/confirmAlert';

const ModalCheckOut = ({ show, handleShowModal, detailItem, setSaveOrther, saveOrther }) => {

    const listCart = useSelector(state => state.cartItem)
    const [state, setstate] = useState([])
    const [toTalAll, setApplyTotal] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const total = listCart && listCart.reduce((total, item) =>
    (
        (total + item.price) || 0
    ), 0); //  Số 0 cuối cùng là giá trị khởi tạo

    // const handleShowAlert = (stattus) => {
    //     setShowAlert(stattus)
    // }


    const handleCheckOutSuccess = (data) => {
        handleShowModal(false)
        Swal.fire({
            title: 'xác nhận Lưu đơn hàng?',
            text: 'Bạn sẽ không thể thay đổi hãy cân nhắc trước khi quyết định!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Quay lại'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Thanh toán thành công!',
                    'Your imaginary file has been deleted.',
                    'success'
                )

                CheckOutApi.postCheckOut({
                    products: listCart,
                    code: Math.random(),
                    address: data?.address1,
                    ZIPcode: data?.ZipCode,
                    Email: data?.Email,
                    note: data?.contentAddress,
                    phone: data?.phone,
                    totalProduct: toTalAll || total,
                    orther: data?.address2 || "",
                })
                setSaveOrther()
                // localStorage.removeItem('infomationUser')
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                handleShowModal(true)
            }
        })

    }

    useEffect(() => {
        setstate(saveOrther)
    }, [saveOrther])
    console.log(state, 'state');
    useEffect(() => {
        const totalApplyCouponed = localStorage.getItem('totalCoupon')
        setApplyTotal(totalApplyCouponed)

    }, [])

    const handleShowAlertConfirm = () => {

        setShowAlert(true)
        // handleShowModal(false)
    }
    console.log(showAlert);
    return (
        <>
            {/* <Prompt when={true} message="Chưa thanh toán? Bạn có muốn hủy bỏ không ?" /> */}

            <Modal
                visible={show}
                width="800"
                // height="500"
                effect="fadeInLeft"
                onClickAway={() => handleShowModal(false)}
            >
                <div className="product-details container-all">{/*product-details*/}
                    <div class="container-list">
                        <div className="list-tittle">
                            <h2>Chi tiết đơn hàng</h2>
                            <h3>Đơn hàng chưa hoàn thành</h3>
                        </div>


                        <div className="d-flex">
                            <div className="box-left">
                                <div className="img-list">
                                    {
                                        listCart?.map((e, i) => {
                                            return <div className="img-list-product" key={i}>
                                                <img src={e?.images[0]?.URL} />
                                                <div className="list-content">
                                                    <h4>{e?.tittle}</h4>
                                                    <p>color: {e?.color}</p>
                                                    <p>size: {e?.size}</p>
                                                    <p>1 hoàn trả</p>
                                                </div>
                                                <div className="list-content-total">
                                                    <p><span>x{e?.quantity}</span><span><h5>Thành tiền: {e?.price.toLocaleString()}</h5></span></p>

                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                                <div className="total-all">
                                    <p><h5>Tổng giá trị sản phẩm: {total.toLocaleString()}đ</h5></p>
                                    <p><RiCoupon3Line style={{ marginRight: "2%" }} />mã khuyến mãi: {toTalAll || 0}đ</p>
                                    <p><RiCoupon3Line style={{ marginRight: "2%" }} />Ghi chú: <b>{state?.contentAddress || "Không có ghi chú"}</b> </p>
                                    <p><FcAdvance style={{ marginRight: "2%" }} />Phí vận chuyển: {0 || "đang cập nhật"}</p>
                                    <p>số tiền thanh toán: {toTalAll || total}đ</p>
                                </div>

                            </div>
                            <div className="box-right">
                                <p><h5>Khách hàng</h5></p>
                                <div className="detail-item">
                                    <p className="name-user"><FaRegUserCircle style={{ marginRight: "2%" }} />{state?.last_name && state?.middle_name && state?.first_name !== '' ? `${state?.last_name} ${state?.middle_name} ${state?.first_name}` || `${state.userName}` : state?.userName}</p>
                                    <p><BiPrinter style={{ marginRight: "2%" }} />{listCart.length} đơn hàng</p>
                                </div>
                                <div className="detail-item">
                                    <p><h5>Thông tin đơn hàng</h5></p>
                                    <p className="name-user"><HiOutlineMail style={{ marginRight: "2%" }} />Email: {state?.Email}</p>
                                    <p className="name-user"><HiOutlineMail style={{ marginRight: "2%" }} />Phone: {state?.phone}</p>
                                    <p>Loại tài khoản: chưa có tài khoản</p>
                                </div>
                                <div className="detail-item">
                                    <p><h5><GrContactInfo style={{ marginRight: "2%" }} />Địa chỉ giao hàng</h5></p>
                                    <p >Địa chỉ 1: <span className="name-user">{state?.address1} </span></p>
                                    <p >Địa chỉ 2: <span className="name-user">{state?.address2} </span></p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="button">
                        <ConfirmAlert handleShowModal={handleShowModal} />
                        {/* <button className="btn btn-danger" style={{ float: "right" }} >   Hủy</button> */}
                        <button className="btn btn-warning" style={{ float: "right", marginRight: "1%" }} onClick={() => handleCheckOutSuccess(saveOrther)}>Thanh toán</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}



export default ModalCheckOut