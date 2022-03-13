import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'addCart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {

            const addCart = action.payload
            let existing = state.findIndex(e => e._id === addCart._id);
            if (existing > -1) {
                state[existing].quantity += addCart.quantity
            } else {
                state.push(addCart)

            }
        },
        DeleteCart: (state, actions) => {
            const addCart = actions.payload
            let existing = state.findIndex(e => e._id === addCart._id);
            if (existing > -1) {
                state.splice(state[existing], 1)
            } else {
                return

            }
        },
        DeleteAllCart: (state) => {
            state.length = 0

        },


    },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = cartSlice
export const { addToCart, DeleteCart, DeleteAllCart } = actions

export default reducer