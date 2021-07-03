import React,{useEffect,useState} from 'react'
import{Link} from 'react-router-dom'
import{Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import{ useDispatch,useSelector} from 'react-redux'
import{getProduct} from '../Actions/productActions.js'

const Cake = ({match,history}) => {
    const products=useSelector(state=>state.product)
  const{product,error,loading}=products
  const user_Login = useSelector(state => state.userLogin)
    const{user}=user_Login 
  const dispatch=useDispatch()
      const[qty,setQuantity]= useState(1)
    useEffect(() => {
        dispatch(getProduct(match.params.id))
      }, [match.params.id,getProduct,dispatch]);
    
      const AddToCartHandler=()=>{
          if(!user){
              history.push(`/login?redirect=cart/${match.params.id}?qty-${qty}`)
          }
          else{
            history.push(`/cart/${match.params.id}?qty=${qty}`)

          }
          }
        
  
    return (
        <>
       <Link className='btn btn-light my-3' to='/'>Go back</Link>
       {
           
            <Row>
            <Col md={6}>
           <Image src={product.image} alt={product.name} className='img-fluid'></Image>
            </Col>
            <Col md={3}>
           <ListGroup variant='flush'>
               <ListGroup.Item>
                   <h3>{product.name}</h3>
               </ListGroup.Item>
        
               <ListGroup.Item>
                 Price:${product.price}
               </ListGroup.Item>
               <ListGroup.Item>
                 Description:{product.description}
               </ListGroup.Item>
           </ListGroup>
           
            </Col>
            <Col>
             <Card>
                 <ListGroup>
                     <ListGroup.Item>
                         <Row>
                             <Col>
                             Price:
                             </Col>
                             <Col>
                            <strong>{product.price}</strong> 
                             </Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>
                             Status:
                             </Col>
                             <Col>
                            <strong>{product.countInStock>0?'In Stock':'Out of Stock'}</strong> 
                             </Col>
                         </Row>
                     </ListGroup.Item>
                     {
                       product.countInStock>0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=>
                                setQuantity(e.target.value) }>
                      {   [...Array(product.countInStock).keys()].map(x=>
                           ( <option key={x+1} value={x+1}>
                            {x+1}
                            </option>)
                        )
}  
                        
                        </Form.Control>
                                </Col>
                            </Row>
                         </ListGroup.Item>
                       )
                     }
                     <ListGroup.Item>
                        <Button className='btn btn-block' type='button' disabled={product.countInStock===0} onClick={AddToCartHandler}>
                         Add to Cart
                        </Button>
                     </ListGroup.Item>
                 </ListGroup>
             </Card>
            </Col>
        </Row>
       }
    
        </>
       
    )
}

  export default Cake
  
