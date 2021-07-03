import {USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQUEST} from '../Actions/types.js'
import Axios from 'axios'
// list all products
export const registerUser=(user)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })    
        const config={
            'Content-Type':'application/json',
           
          }
     const{data}=await Axios.post('/api/users',user,config)
     dispatch({
         type:USER_REGISTER_SUCCESS,
         payload:data
     })    
     localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}