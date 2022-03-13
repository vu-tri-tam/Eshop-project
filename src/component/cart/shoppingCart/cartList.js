import React, { useEffect, useState } from 'react'
import { SkeletonPro } from '../SkeletonProduct/skeleton';
import CartItem from './cartItem';

import { addToCart } from '../../../features/cartSlice/cartSlice'
import { useDispatch } from 'react-redux'
import CreateNotification from '../../notification/notification';
import Pagination from '../../pagination/paginaton';
import Example from '../../shopPage/modalProDetail';

export default function CartList({ render }) {
    // console.log(render, 'render');
    const [showModal, setModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [detailItem, setDetail] = useState()
    const [pricePro, setPricePro] = useState([])
    const [size, setSize] = useState()
    const [activeClass, setActive] = useState('')

    //phân trang react pagination
    const [indexFirt, setIndexFirt] = useState(0)
    const usePage = 6;
    const indexOfFirt = indexFirt * usePage;
    const current = render?.slice(indexOfFirt, indexOfFirt + usePage) || render
    const dispatch = useDispatch()

    const handleShowModal = (status) => {
        setModal(status)
    }

    const handleSeenFast = (id) => {
        handleShowModal(true)
        const getDetail = render?.filter((e) => e?._id == id)
        setDetail(getDetail)
    }
    const handleAddCart = (id, item) => {
        // console.log({ ...item, size: size, price: item.price * pricePro || item.price++, quantity: pricePro * 1 || 1 }, 9999);
        // console.log(item, 'item');

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
                handleShowModal(false)
            } else {
                CreateNotification.error("vui lòng chọn size sản phẩm")
                return
            }
        }
    }
    const handlePrice = (e) => {
        if (e < 0) {
            CreateNotification.error("Lỗi khi nhập số lượng")
            return
        }
        if (e > 1000) {
            CreateNotification.error("Số lượng không vượt quá 1000 sản phẩm")
            return
        }
        setPricePro(e)
    }
    // const breakPoints = [
    //     { width: 550, itemsToShow: 1 },
    //     { width: 550, itemsToShow: 3, itemsToScroll: 2 },
    //     { width: 768, itemsToShow: 3 },
    //     { width: 1400, itemsToShow: 4 }
    // ];
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);


    }, [current?.length == 0])// nếu không có data cho danh mục sản phẩm thì chạy effect này


    // mặc định loading là false
    // => nếu là false thì 
    // nếu current?.length == 0 thì cho chạy seleke trong một khoảng time rồi in ra ko có data
    // nếu current?.length > 0 thì cho chạy seleke trong một khoảng time rồi in ra data

    return (
        <>
            <Example handlePrice={handlePrice} setSize={setSize} handleAddCart={handleAddCart} setActive={setActive} activeClass={activeClass} pricePro={pricePro} show={showModal} detailItem={detailItem} handleShowModal={handleShowModal} />
            {
                isLoading ? <SkeletonPro type={6} /> : current?.length > 0 ? current?.map((ele, idx) => {
                    return <CartItem key={idx} {...ele} handleSeenFast={handleSeenFast} />
                }) : <p className='text-center p-3'>Chưa có sản phẩm nào cả</p>




            }
            <Pagination usePage={usePage} totalPage={render?.length} setIndexFirt={setIndexFirt} />


        </>
    )
}
