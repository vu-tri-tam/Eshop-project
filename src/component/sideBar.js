// import React, { useEffect, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import CatalogApi from '../api/catalogApi/catalog'
// // import ProductsApi from '../api/product/productApi'


// export default function SideBar() {
//     const [catalog, setCatalog] = useState([])
//     // const [product, setProduct] = useState([])
//     // const [render, setRender] = useState([])


//     useEffect(() => {
//         CatalogApi.getAllCatalog().then(res => setCatalog(res?.data))
//         // await ProductsApi.getAllProduct().then(res => setProduct(res?.data))
//     }, [])



//     return (
//         <div>
//             <div className="col-sm-3">
//                 <div className="left-sidebar">
//                     <h2>Category</h2>
//                     <div className="panel-group category-products" id="accordian">
//                         {/*category-productsr*/}

//                         {
//                             catalog?.catelogyParents?.map((e, i) => {
//                                 return <div className="panel panel-default">
//                                     <div className="panel-heading">
//                                         <h4 className="panel-title">
//                                             <NavLink to={`/shop/${e?._id}`}>
//                                                 <span className="badge pull-right"><i className="fa fa-plus" /></span>
//                                                 {e?.tittle}
//                                             </NavLink>
//                                         </h4>
//                                     </div>
//                                     <div id="sportswear" className="panel-collapse collapse">
//                                         <div className="panel-body">
//                                             <ul>
//                                                 <li><a href>Nike </a></li>
//                                                 <li><a href>Under Armour </a></li>
//                                                 <li><a href>Adidas </a></li>
//                                                 <li><a href>Puma</a></li>
//                                                 <li><a href>ASICS </a></li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             })
//                         }
//                     </div>
//                     {/*/category-productsr*/}
//                     <div className="brands_products">
//                         {/*brands_products*/}
//                         <h2>Brands</h2>
//                         <div className="brands-name">
//                             <ul className="nav nav-pills nav-stacked">
//                                 <li><a href> <span className="pull-right">(50)</span>Acne</a></li>
//                                 <li><a href> <span className="pull-right">(56)</span>Grüne Erde</a></li>
//                                 <li><a href> <span className="pull-right">(27)</span>Albiro</a></li>
//                                 <li><a href> <span className="pull-right">(32)</span>Ronhill</a></li>
//                                 <li><a href> <span className="pull-right">(5)</span>Oddmolly</a></li>
//                                 <li><a href> <span className="pull-right">(9)</span>Boudestijn</a></li>
//                                 <li><a href> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                     {/*/brands_products*/}
//                     <div className="price-range">
//                         {/*price-range*/}
//                         <h2>Price Range</h2>
//                         <div className="well">
//                             <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
//                             <b>$ 0</b> <b className="pull-right">$ 600</b>
//                         </div>
//                     </div>{/*/price-range*/}
//                     <div className="shipping text-center">{/*shipping*/}
//                         <img src="images/home/shipping.jpg" alt />
//                     </div>{/*/shipping*/}
//                 </div>
//             </div>

//         </div>
//     )
// }
