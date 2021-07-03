import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
 const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

/* const shippingaddressfromStorage=localStorage.getItem('shippingaddress')?JSON.parse(localStorage.getItem('shippingaddress')):{}
*/ 
const userınfo=localStorage.getItem('UserInfo')?JSON.parse(localStorage.getItem('UserInfo')):null
const initialState = {
  userLogin:{
    userInfo:userınfo
  },
  cart:{
    cartItems:cartItemsFromStorage,
  }
}; 

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store