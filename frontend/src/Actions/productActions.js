import {PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL ,GET_PRODUCTS,GET_PRODUCT,PRODUCT_ERROR,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS} from "../Actions/types"
import Axios from 'axios'
// list all products
export const getProducts=()=>async(dispatch)=>{
    try {
     const{data}=await Axios.get('/api/products')
     dispatch({
         type:GET_PRODUCTS,
         payload:data
     })    
    } catch (error) {
        dispatch({
            type:PRODUCT_ERROR,
            payload:{msg:'an error occurred',status:'501'}
        })
    }
}

// get a product by Id
export const getProduct=(id)=>async(dispatch)=>{
    try {
     const{data}=await Axios.get(`/api/products/${id}`)
     dispatch({
         type:GET_PRODUCT,
         payload:data
     })    
    } catch (error) {
        dispatch({
            type:PRODUCT_ERROR,
            payload:{msg:'an error occurred',status:'501'}
        })
    }
}
export const productCreate=()=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:PRODUCT_CREATE_REQUEST,
           
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
      const{data}=await Axios.post('/api/products',{},config)
      dispatch({
        type:PRODUCT_CREATE_SUCCESS,
        payload:data
    })
  
   
    } catch (error) {
        dispatch({
            type :PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const productUpdate=(id,updates)=>async(dispatch,getState)=>{
    console.log('update action dispatched')
    try {
        
        dispatch({
            type:PRODUCT_UPDATE_REQUEST,
           
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
      const{data}=await Axios.put(`/api/products/${id}/update`,updates,config)
      dispatch({
        type:PRODUCT_UPDATE_SUCCESS,
        payload:data
    })
  
   
    } catch (error) {
        dispatch({
            type :PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}