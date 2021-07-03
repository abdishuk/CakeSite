import React from 'react'
import{Button,Table,Image} from 'react-bootstrap'
import{useSelector,useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import{productCreate} from '../Actions/productActions.js'
import{PRODUCT_CREATE_RESET} from '../Actions/types.js'


const ProductListScreen = () => {
    const productList = useSelector(state => state.product)
    const{products}=productList
    const dispatch=useDispatch()
    const user_Login = useSelector(state => state.userLogin)
    const{user}=user_Login 
    const productCreateHandler=()=>{
        dispatch(productCreate())
        alert('product created successfully')
        dispatch({type:PRODUCT_CREATE_RESET})

    }
    return (
        <>
        <h1>ProductList</h1>
        <Button className='primary btn-large float-right' onClick={productCreateHandler}>
          <i className='fas fa-plus'></i>Add a Product
        </Button>
        <Table>
            <thead>
                
                <tr>
                    <td>Product name</td>
                    <td>Product Category</td>
                    <td>Product Price</td>
                    <td>Count in Stock</td>
                    <td>
                      
                    </td>
                   

                </tr>
                </thead>
                <tbody>
                {
                    products.map((product)=><tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          {product.category} 

                           
                        </td>
                        <td>{product.price}</td>
                        <td>{product.countInStock}</td>
                        <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>Edit

                        </Button>
                        </LinkContainer>
                        </td>
                        
                    </tr>)
                }
                        

                   
                </tbody>
          
        </Table>
        
            
        </>
    )
}

export default ProductListScreen
