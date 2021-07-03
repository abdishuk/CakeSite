import { combineReducers } from 'redux';
import {product} from './productReducers.js'
import{loginReducer} from './LoginReducer.js'
import{RegisterReducer} from './registerReducer.js'
import {cartReducer} from './cartReducer.js'
import{orderCreateReducer,orderPayReducer,orderDetailsReducer,orderListReducer,orderDeliver} from './orderReducers.js'
import{productCreate,productUpdate} from './productReducers.js'

import{userListReducer} from './userListReducer.js'


export default combineReducers({
    userList:userListReducer,
    product,
    userLogin:loginReducer,
    register:RegisterReducer,
    cart:cartReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    Pay:orderPayReducer,
    orderList:orderListReducer,
    orderDeliver,
    productCreate,
    productUpdate
});