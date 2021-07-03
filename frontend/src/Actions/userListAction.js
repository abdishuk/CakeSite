import{USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL} from './types.js'
import Axios from 'axios'
export const userList=()=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })    
        
     const{data}=await Axios.get('/api/users/users')
     dispatch({
         type:USER_LIST_SUCCESS,
         payload:data
     })    
     console.log(data)
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}