import React, { useState } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
export default function RangeComponent({ state, setState, product }) {
    let sum = product.reduce(function (previousValue, currentValue) {
        return (previousValue > currentValue.price) ? previousValue : currentValue.price
    }, 0)
    // console.log(sum, 'state');

    return (
        <InputRange
            maxValue={sum}
            minValue={0}
            value={state.value}
            onChange={value => setState({ value })}
            onChangeComplete={value => setState({ value: { min: value.min, max: value.max } })} />

    )
}
