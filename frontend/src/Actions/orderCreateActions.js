import{ORDER_MARK_DELIVER_SUCCESS,ORDER_MARK_DELIVER_FAIL,ORDER_MARK_DELIVER_REQUEST,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_LIST_FAIL,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,ORDER_DETAILS_REQUEST} from './types.js'
import axios from 'axios'

export const createOrder=(order)=>async(dispatch,getState)=>{
    try {
        console.log('create order called')
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const{
            userLogin:{user}
        }=getState()
        
        const config={
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${user.token}`,

            },
          }
      const{data}=await axios.post('/api/orders',order,config)
      dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload:data
    })
   
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const getOrderDetails=(id)=>async(dispatch,getState)=>{
    console.log('get orderdeatils action called')
    try {
        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const{
            userLogin:{user}
        }=getState()
        
        const config={
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${user.token}`,

            },
          }
      const{data}=await axios.get(`/api/orders/${id}`,config)
      dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data
    })
   
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}
export const payorder=(id,paymentResult)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_PAY_REQUEST,
           
        })
        const{
            userLogin:{user}
        }=getState()
        
        const config={
            'Content-Type':'application/json',
            headers:{
              Authorization:`Bearer ${user.token}`,

            },
          }
      const{data}=await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
      dispatch({
        type:ORDER_PAY_SUCCESS,
        payload:data
    })
    alert('success')

   
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const deliverOrder=(id)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_MARK_DELIVER_REQUEST,
           
        })
        const{
            userLogin:{user}
        }=getState()
        
        const config={
            'Content-Type':'application/json',
            headers:{
              Authorization:`Bearer ${user.token}`,

            },
          }
      const{data}=await axios.put(`/api/orders/${id}/deliver`,config)
      dispatch({
        type:ORDER_MARK_DELIVER_SUCCESS
       
    })
  

   
    } catch (error) {
        dispatch({
            type:ORDER_MARK_DELIVER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const getorderList=()=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_LIST_REQUEST,
           
        })
        const{
            userLogin:{user}
        }=getState()
        
        const config={
            'Content-Type':'application/json',
            headers:{
              Authorization:`Bearer ${user.token}`,

            },
          }
      const{data}=await axios.get('/api/orders',config)
      dispatch({
        type:ORDER_LIST_SUCCESS,
        payload:data
    })
  
   
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}
