import {USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGOUT} from '../Actions/types.js'
import Axios from 'axios'
// list all products
export const loginUser=(user)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })    
        const config={
            'Content-Type':'application/json',
           
          }
     const{data}=await Axios.post('/api/users/login',user,config)
     dispatch({
         type:USER_LOGIN_SUCCESS,
         payload:data
     })    
     localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}
export const logout=()=>async(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
       
    })
   /*  dispatch(
        {type:USER_LIST_RESET}
    ) */
}