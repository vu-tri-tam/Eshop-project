import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';

export const SkeletonPro = ({ type }) => {
    const [state, setstate] = useState([])
    useEffect(() => {
        let arr = []
        for (let i = 0; i < type; i++) {
            arr.push(<div className="col-sm-4" >
                <div className="product-image-wrapper" >
                    <div className="single-products">
                        <div className="productinfo text-center">
                            <Skeleton width={250} height={300} />
                            <p><Skeleton width={250} height={20} /></p>
                            <h2><Skeleton width={250} height={20} /></h2>
                            <p><Skeleton width={250} height={20} /></p>

                        </div>

                    </div>

                </div>
            </div>)
        }
        setstate(arr)
    }, [type])



    return (
        <>
            {
                state
            }

        </>
    )
}
