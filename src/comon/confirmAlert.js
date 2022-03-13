import React from 'react'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ConfirmAlert({ handleShowModal }) {
    const submit2 = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h2>Chưa hoàn tất thủ tục mua hàng?</h2>
                        <p>Bạn có muốn thoát khỏi  ?</p>
                        <div>
                            <button className="btn-default btn" onClick={() => { handleShowModal(false); onClose(); }}>Có</button>
                            <button
                                className="btn-warning btn"
                                onClick={() => {
                                    handleShowModal(true)
                                    onClose();
                                }}
                                style={{ marginLeft: "1%" }}
                            >
                                Không
                            </button>
                        </div>

                    </div>
                );
            }
        });
    };

    const submit3 = () => {
        submit2()
        handleShowModal(false)
    }
    return (
        <button className="btn btn-danger" style={{ float: "right" }} onClick={submit3}>Hủy</button>
    )
}
