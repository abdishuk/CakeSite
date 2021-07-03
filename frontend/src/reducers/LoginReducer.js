import {USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGOUT} from '../Actions/types.js'
const initialState={
    user:{},
    error:null,
    loading:true
}


export const loginReducer=(state=initialState,action)=>{
    const{type,payload}=action
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading:true
            }
            case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                user:payload
            }
            case USER_LOGIN_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                case USER_LOGOUT:
                   
                    return {
                        
                    }
                default:
                    return state
    }
}
