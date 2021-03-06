import {USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL } from '../Actions/types.js'
export const RegisterReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
    
            return{
                loading:true
            }
       case USER_REGISTER_SUCCESS:
           return{
               loading:false,
               user:action.payload
           }
           case USER_REGISTER_FAIL:
            return{
                loading:false,
                error:action.payload
            }
           
            default:return state
    }
}

