import React,{useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import{Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {createOrder} from '../Actions/orderCreateActions.js'
import{Link} from 'react-router-dom'
import Message from '../Components/Message.js'
import{ORDER_CREATE_RESET} from '../Actions/types.js'

import CheckOutSteps from '../Components/CheckoutSteps'
function PlaceOrder({history}) {
    const user_Login = useSelector(state => state.userLogin)
    const{user}=user_Login 
    const orderCreate=useSelector(state=>state.orderCreate)
    const{order,success,error}=orderCreate
    const dispatch=useDispatch()
    useEffect(()=>{
        if(success){
           history.push(`/order/${order._id}`)
           dispatch({ type: ORDER_CREATE_RESET })
        }
        if(!user){
            history.push('login?redirect=placeorder')
        }
        
        
    })
    const PlaceOrderHandler=(e)=>{
       
       dispatch(createOrder({
           orderItems:userCartItems,
          deliveryAddress:cart.shippingAddress,
           paymentMethod:cart.paymentMethod,
           itemsPrice:cart.itemsPrice,
           deliveryPrice:cart.shippingPrice,
           taxPrice:cart.taxPrice,
          totalPrice :cart.totalPrice

       }))
console.log('placed an order')    }
    const cart=useSelector(state=>state.cart)
    const{cartItems}=cart
    const userCartItems=user ?cartItems.filter(item=>item.user_id===user._id):[]


    // calculate prices
    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    cart.itemsPrice=addDecimals(userCartItems.reduce((acc,item)=>acc + item.price*item.qty,0))
    cart.shippingPrice=addDecimals(cart.itemsPrice>100? 0:100)
    
    cart.taxPrice=addDecimals(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalPrice=(
        Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    ).toFixed(2)
  
    return (
        <>
           <CheckOutSteps step1 step2 step3 step4 />
           <Row>
               <Col md={8} >
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                        
                           <p>
                               <strong>
                                   Address:
                               </strong>
                               {cart.shippingAddress.address}, {cart.shippingAddress.city} {' '}
                               
                           </p>
                           <p>
                           {cart.shippingAddress.contact}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>PaymentMethod</h2>
                           <p>
                               <strong>
                                  Method:
                               </strong>
                              {cart.paymentMethod}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {userCartItems.length===0?<Message var='primary' message='your cart is empty'/>:(
                               <ListGroup variant='flush'>
                                   <Row>
                                       <Col md={8}></Col>
                                   </Row>
                                 {userCartItems.map((item,index)=>(<ListGroup.Item key={index}>
                                     <Row>
                                     <Col md={1}>
                                         <Image src={item.image} alt={item.name} fluid rounded />
                                     </Col>
                                     <Col >
                                     <Link to={`/product/${item.product}`}>
                                         {item.name}
                                         </Link></Col>
                                         <Col md={4}>
                                             {item.qty}x{item.price}=${item.qty*item.price}
                                         </Col>
                                      </Row>
                                 </ListGroup.Item>))}
                               </ListGroup>
                           )}
                       </ListGroup.Item>
                       
                   </ListGroup>

               </Col>
               <Col md={4}>
                   <Card >
                       <ListGroup variant='flush'>
                           <ListGroup.Item>
                               <h2>Order Summary</h2>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Items</Col>
                                   <Col>${cart.itemsPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col></Col>
                                   <Col>${cart.shippingPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax</Col>
                                   <Col>${cart.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Total Price</Col>
                                   <Col>${cart.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               {error && <Message var='danger' message={error}/>}
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Button type='button' className='btn-block' disabled={userCartItems.length===0}  onClick={PlaceOrderHandler}>PlaceOrder</Button>
                           </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default PlaceOrder
