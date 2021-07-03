
import{USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL} from '../Actions/types.js'

const initialState={
    users:[]
}
export const userListReducer=(state=initialState,action)=>{
    const{type,payload}=action
    switch(action.type){
        case USER_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
            case USER_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                users:payload
            }
            case USER_LIST_FAIL:
                return{
                ...state,
                    loading:false,
                    error:payload
                }
               
                default:
                    return state
    }
}
