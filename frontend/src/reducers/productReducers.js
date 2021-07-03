import { PRODUCT_UPDATE_REQUEST,PRODUCT_CREATE_RESET,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL ,GET_PRODUCTS,GET_PRODUCT,PRODUCT_ERROR,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS} from "../Actions/types"

const initialState={
    products:[],
    product:{},
    loading:true,
    error:{

    }
}


export const productCreate=(state={},action)=>{
  const{type,payload}=action
  
  switch(type){
      case PRODUCT_CREATE_REQUEST:
          return{
              
              loading:true,
             
          }
          case PRODUCT_CREATE_RESET:
          return{
              
             
             
          }
          case PRODUCT_CREATE_SUCCESS:
            return{
    
                createdproduct:payload,
               
                loading:false
            }
  
            case PRODUCT_CREATE_FAIL:
                return {
                    
                    error:payload,
                    loading:false
                }
            default:return state
  }


}

export const productUpdate=(state={},action)=>{
    const{type,payload}=action
    
    switch(type){
        case PRODUCT_UPDATE_REQUEST:
            return{
                
                loading:true,
               
            }
            case PRODUCT_UPDATE_SUCCESS:
              return{
      
                  updatedproduct:payload,
                 
                  loading:false
              }
    
              case PRODUCT_UPDATE_FAIL:
                  return {
                      
                      error:payload,
                      loading:false
                  }
              default:return state
    }
  
  
  }
  
export const product=(state=initialState,action)=>{
    const{type,payload}=action
    
    switch(type){
        case GET_PRODUCTS :
            return{
                ...state,
                products:payload,
                loading:false,
                error:null
            }
            case  GET_PRODUCT:
              return{
                  ...state,
                  product:payload,
                  products:[],
                  error:null,
                  loading:false
              }
    
              case PRODUCT_ERROR:
                  return {
                      ...state,
                      error:payload,
                      loading:false
                  }
              default:return state
    }
  
  
  }