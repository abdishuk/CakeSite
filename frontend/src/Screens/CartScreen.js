import React, {useEffect} from 'react'
import{connect,useSelector} from 'react-redux'
import{Link} from 'react-router-dom'
import{Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../Components/Message.js'
import{addToCart,removeFromCart} from '../Actions/addToCartAction.js'
import PropTypes from 'prop-types'


export const CartScreen = ({match,addToCart,removeFromCart,cart:{cartItems},location,history}) => {
    console.log(match.params.id)
    const qty=location.search?Number(location.search.split('=')[1]) || Number(location.search.split('-')[1]):1
    const user_Login = useSelector(state => state.userLogin)
    const{user}=user_Login 
    const userCartItems=user ?cartItems.filter(item=>item.user_id===user._id):[]
    useEffect(() => {
      //  console.log('mounted')
    if(!user){
        history.push('/login')
    }
      else{
        addToCart(match.params.id,qty,user) 
      }    
      }, [addToCart,match.params.id,qty,user]);
  
    
    const removeFromCartHandler=(id,userId)=>{

        removeFromCart(id,userId)    }
    const checkoutHandler=()=>{
       history.push('/login?redirect=shipping')
    }
    return (
        <Row>
           <Col md={8}>
            <h1>Shopping Cart</h1>
            {userCartItems.length===0?<><Link className='py-5' to='/'>Go Back</Link><Message class='py-5' var='info' message='Your cart is empty'> </Message></>:
            <ListGroup variant='flush'>
                {userCartItems.map(item=>(
                    <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2} >
                               <Image src={item.image} alt={item.name} fluid rounded/>
                           </Col>
                           <Col md={3} >
                               <Link to={`/product/${item.product}`}>{item.name}</Link>
                           </Col>
                           <Col md={2}>
                               ${item.price}
                           </Col>
                           <Col md={2}>
                           <Form.Control as='select' value={item.qty} onChange={(e)=>
                                (addToCart(item.product,Number(e.target.value),user)) }>
                      {   [...Array(item.countInStock).keys()].map(x=>
                           ( <option key={x+1} value={x+1}>
                            {x+1}
                            </option>)
                        )
}  
                        
                        </Form.Control>
                           </Col>
                           <Col md={2}>
                       <Button type="button" variant='light' onClick={()=>removeFromCartHandler(item.product,user._id)}><i className='fas fa-trash'></i>Remove From Cart</Button>
                           </Col>
                        </Row>

                    </ListGroup.Item>
                ))}
            </ListGroup>
            }
           </Col>
           <Col md={4}>
                <Card>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Subtotal({userCartItems.reduce((acc,item)=>acc+=item.qty,0)}) Items</h2>
                           ${userCartItems.reduce((acc,item)=>acc+=item.qty*item.price,0).toFixed(2)}
                       </ListGroup.Item>
                       <Button type="button" className='btn btn-block' disabled={userCartItems.length===0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                       </ListGroup> 
                </Card>
           </Col>
          
        </Row>
    )
}

const mapstateToProps=state=>({
    cart:state.cart
  })
  CartScreen.propTypes = {
    addToCart:PropTypes.func.isRequired,
    removeFromCart:PropTypes.func.isRequired,
     cart:PropTypes.object.isRequired,
    }
export default connect(mapstateToProps,{addToCart,removeFromCart})(CartScreen)
