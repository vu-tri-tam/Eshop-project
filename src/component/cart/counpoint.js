import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import Slider from 'react-elastic-carousel';

const CounPoint = ({ show, handleShowModal, coupon, handleApplyCoupon, couponApplyTotal }) => {
    // console.log(couponApplyTotal, 676666);
    const [state, setstate] = useState([])
    // const [voucherId, setVoucherId] = useState();

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('totalCoupon') || {});
    //     setVoucherId(data?.id);

    // }, [voucher])
    // console.log(voucherId, 9990)
    useEffect(() => {
        setstate(coupon)
    }, [coupon])
    // const breakPoints = [
    //     { width: 550, itemsToShow: 1 },
    //     { width: 550, itemsToShow: 3, itemsToScroll: 2 },
    //     { width: 768, itemsToShow: 3 },
    //     { width: 1400, itemsToShow: 4 }
    // ];

    return (
        <>
            <Modal
                visible={show}
                width="800"
                effect="fadeInLeft"
                onClickAway={() => handleShowModal(false)}
            >
                <div style={{ overflowY: "auto", maxHeight: "500px", padding: "2%" }}>
                    {
                        state?.map((e, i) => {
                            {/* console.log(e) */ }
                            return <div className="row" style={{ marginBottom: "5%" }}>
                                <div class="col-sm-5">
                                    <img src={e?.images} style={{ width: "100%", height: "120px", marginBottom: "2%" }} />
                                </div>
                                <div class="col-sm-6"><span>
                                    <span>{e?.tittle}</span>
                                    <label>{e?.content}</label>
                                </span>
                                    <p><b>HSD:</b>{e?.expiry}</p>
                                    <p><button className="btn btn-warning" disabled={e?.status === true ? true : false} onClick={() => handleApplyCoupon(e)} >{e?.status === true ? "Đã sử dụng" : "Sử dụng ngay"}</button></p></div>
                            </div>

                        })
                    }
                </div>
            </Modal>
        </>
    );
}



export default CounPoint