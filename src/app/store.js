import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import cartReducer from '../features/cartSlice/cartSlice'
import cartReducer from '../features/cartSlice/cartSlice'

// import userReducer from '../features/cartSlice/userSlice'
import {
    persistStore, persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'//lưu data trong localStorage

const persistConfig = {
    key: 'cart',
    storage,

}
// const authPersistConfig = {
//     key: 'auth',
//     storage,

//   };
const rootReducer = combineReducers({
    cartItem: cartReducer
    // user: userReducer
    // toTalCoupon: totalReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)
export default store