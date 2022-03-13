import React, { useEffect, useState } from 'react'
import CatalogApi from '../../api/catalogApi/catalog'
import ProductsApi from '../../api/product/productApi'
import CartList from '../cart/shoppingCart/cartList'
import Skeleton from 'react-loading-skeleton';
import RangeComponent from '../../comon/inputRange';

export default function Products() {
    const [catalog, setCatalog] = useState([])
    const [product, setProduct] = useState([])
    const [render, setRender] = useState([])
    const [nameRender, setName] = useState([])
    const [isLoading, setLoading] = useState(false)

    const [state, setState] = useState({
        value: {
            min: 2,
            max: 10
        }
    })
    // console.log(render, 9999);
    useEffect(() => {
        setTimeout(() => {
            CatalogApi.getAllCatalog().then(res => setCatalog(res?.data?.catelogyParents))
            ProductsApi.getAllProduct().then(res => setProduct(res?.data?.product))
            setLoading(true)
        }, 2000);
        // setName(nameCatalog)
    }, [])

    const handleProById = (idcata, nameCatalog) => {
        // console.log(idcata, 656);
        const cc = product?.filter((e, index) => e?.catelogyParent?._id == idcata)
        // console.log(cc, 'cc');
        // switch (cc) {
        //     case value:

        //         break;

        //     default:
        //         break;
        // }
        setName(nameCatalog)
        setRender(cc)
    }


    useEffect(() => {
        setRender(product || 0)
        // setName(product)
    }, [product])

    const handlePriceRange = (arr) => {
        const filterByPrice = arr?.filter(e => e?.price >= state.value.min && e?.price <= state.value.max)
        return filterByPrice || arr

    }

    useEffect(() => {

        setRender(handlePriceRange(product))
    }, [state])

    // console.log(isLoading, 888);
    return (
        <div>
            <section>
                <div className="container">

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <h2>Category</h2>
                                <div className="panel-group category-products" id="accordian">
                                    {/*category-productsr*/}

                                    {
                                        catalog && catalog?.length > 0 ?
                                            catalog?.map((e, i) => {
                                                return <div className="panel panel-default">
                                                    <div className="panel-heading">
                                                        <h4 className="panel-title" >
                                                            <a className="user-select-none" onClick={() => handleProById(e?._id, e?.tittle)} >
                                                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                                                {e?.tittle}
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id="sportswear" className="panel-collapse collapse">
                                                        <div className="panel-body">
                                                            <ul>
                                                                <li><a href>Nike </a></li>
                                                                <li><a href>Under Armour </a></li>
                                                                <li><a href>Adidas </a></li>
                                                                <li><a href>Puma</a></li>
                                                                <li><a href>ASICS </a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            }) : <Skeleton count={10} />
                                    }
                                </div>
                                {/*/category-productsr*/}
                                {/* <div className="brands_products">
                                    
                                    <h2>Brands</h2>
                                    <div className="brands-name">
                                        <ul className="nav nav-pills nav-stacked">
                                            <li><a href> <span className="pull-right">(50)</span>Acne</a></li>
                                            <li><a href> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                            <li><a href> <span className="pull-right">(27)</span>Albiro</a></li>
                                            <li><a href> <span className="pull-right">(32)</span>Ronhill</a></li>
                                            <li><a href> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                            <li><a href> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                            <li><a href> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                                {/*/brands_products*/}
                                <div className="price-range">
                                    {/*price-range*/}
                                    <h2>Price Range product</h2>
                                    <div className="well">
                                        <RangeComponent className="span2" product={product} state={state} setState={setState} />
                                        {/* <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600000} data-slider-step={5} data-slider-value="[450000,600000]" id="sl2" onInput={(e) => console.log(e, 'range')} /><br /> */}
                                        {/* <b>$ 0</b> <b className="pull-right">$ 600</b> */}
                                    </div>
                                </div>{/*/price-range*/}
                                <div className="shipping text-center">{/*shipping*/}
                                    <img src="images/home/shipping.jpg" alt />
                                </div>{/*/shipping*/}
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="features_items">{/*features_items*/}
                                <h2 className="title text-center">{nameRender || "Đang cập nhật"}</h2>
                                <CartList render={render} isLoading={isLoading} />


                            </div>{/*features_items*/}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
