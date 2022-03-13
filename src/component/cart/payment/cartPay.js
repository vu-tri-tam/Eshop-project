import React, { useEffect, useRef } from 'react'


export default function CartPayPal({ price }) {
    console.log(typeof (price));
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: 650.00
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const other = await actions.order.capture();
                console.log("success full other:", other);
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}
