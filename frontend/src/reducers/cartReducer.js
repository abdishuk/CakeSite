import {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING,CART_SAVE_PaymentMethod} from '../Actions/types.js'

export const cartReducer=(state={cartItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            const existItem=state.cartItems.find(x=>x.product===item.product)
       if(existItem){
          return{
              ...state,
              cartItems:state.cartItems.map(x=>x.product===existItem.product? item:x) 
          }
       } else{
           return{
               ...state,
               cartItems:[...state.cartItems,item]
           }
       }
       case CART_REMOVE_ITEM:
           return{
               ...state,
               cartItems:state.cartItems.filter(item=>item.product!==action.payload.id && item.user_id !==action.payload.userId)
           }
     case CART_SAVE_SHIPPING:
           return{
               ...state,
               shippingAddress:action.payload
           }
            case CART_SAVE_PaymentMethod:
               return{
                ...state,
                paymentMethod:action.payload
               } 
        
            default:return state
    }
}
export default cartReducer