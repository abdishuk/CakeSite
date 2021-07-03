import React,{useState,useEffect} from 'react'
import axios from 'axios'
import{useDispatch,useSelector} from 'react-redux'
import{Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap'
import {getOrderDetails,payorder,deliverOrder} from '../Actions/orderCreateActions.js'
import{Link} from 'react-router-dom'
import {ORDER_PAY_RESET} from '../Actions/types.js'
import{PayPalButton} from 'react-paypal-button-v2'
import Loader from '../Components/Loader.js'
import FeedBack from '../Components/FeedBack'
import Message from '../Components/Message.js'
function OrderScreen({history,match}) {
    const orderDetails=useSelector(state=>state.orderDetails)
    const user_Login = useSelector(state => state.userLogin)
    const{order,loading,error}=orderDetails

    const{user}=user_Login  
    const orderId=match.params.id
    const dispatch=useDispatch()
    const[sdkReady,setSdkReady]=useState(false)

    const orderPay=useSelector(state=>state.Pay)
    const{loading:loadingPay,successPay}=orderPay
    const orderDeliver=useSelector(state=>state.orderDeliver)
    const{loading:loadingDeliver,successDeliver}=orderDeliver 


   
    useEffect(() => {
      
        const addPaypalScript=async()=>{
            const{data:clientId}=await axios.get('/api/config/paypal')
           console.log(clientId)
           const script=document.createElement('script')
           script.type='text/javascript'
           script.async=true
           script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
           script.onload=()=>{
               setSdkReady(true)
           }
           document.body.appendChild(script)
        }
        if(!order|| successPay||successDeliver){
            dispatch(getOrderDetails(orderId))
            dispatch({type:ORDER_PAY_RESET})
          /*  dispatch({type:ORDER_DELIVER_RESET})*/
        }
       else if(!order.isPaid){
           if(!window.paypal)
           addPaypalScript()
           else
           setSdkReady(true)
       }

  }, [successPay,order,history,user,dispatch,orderId,successDeliver]);
    
    const orderConfirmHandler=()=>{
     alert('Thank you for your order')
     history.push('/')
                                    
    }
   
   
  if (!loading && !error) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

        order.itemsPrice = addDecimals(
        
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    
      
    )
    
    
  }
  const successPaymentHandler=(paymentResult)=>{
   console.log(paymentResult)
   dispatch(payorder(orderId,paymentResult))
   
  }
  const successdeliverHandler=()=>{
    dispatch(deliverOrder(orderId))
   }
   
   
    return (
        <>
          {loading?<Loader/>:error? <FeedBack variant='danger'>{error}</FeedBack>:
          <>
          <h1>order {order._id}</h1>
          <Row>
               <Col md={8} >
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Delivering</h2>
                          
                
                           <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
                           <p>
                               <strong>
                                   Address:
                               </strong>
                               {order.deliveryAddress.address}, {order.deliveryAddress.city} {' '}
                               {order.deliveryAddress.contact}
                           </p>
                           <p>
                               <strong>Phone Number:</strong>{' '}
                               {order.deliveryAddress.contact}
                           </p>
                           {order.isDelivered ? (
                <FeedBack variant='success'>
                  Delivered on {order.deliveredAt}
                </FeedBack>
              ) : (
                <FeedBack variant='danger'>Not Delivered</FeedBack>
              )}
                       </ListGroup.Item>
                       <ListGroup.Item>
                       { order.isPaid ? alert('success'): (
                <FeedBack variant='danger'>Not Paid</FeedBack>
              )}
                           <p>
                               <strong>
                                  Method:
                               </strong>
                              {order.paymentMethod}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {order.orderItems.length===0?<FeedBack variant='danger'>Your order is empty</FeedBack>:(
                               <ListGroup variant='flush'>
                                   <Row>
                                       <Col md={8}></Col>
                                   </Row>
                                 {order.orderItems.map((item,index)=>(<ListGroup.Item key={index}>
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
                                   <Col>${order.itemsPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Delivery Price</Col>
                                   <Col>${order.deliveryPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax</Col>
                                   <Col>${order.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Total Price</Col>
                                   <Col>${order.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           {/*
                               !order.isPaid && order.paymentMethod==='Cash'?(
                                    <>
                                     <Message var='info' message='your order will be delivered to the address that you provided'/>
                                     <Button className='btn btn-success' onClick={orderConfirmHandler}>Confirm Order</Button>
                                    </>
                                 
                               )*/
                               !order.isPaid && (<ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady? <Loader/>:
                                (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )
                                }
                               </ListGroup.Item>)

                           }
                            {
                               user.isAdmin && order.isPaid && !order.isDelivered &&(
                                   <ListGroup.Item>
                                       <Button type='button' className='btn btn-block' onClick={successdeliverHandler} >Mark as Deliver</Button>
                                   </ListGroup.Item>
                               )
                           
                            }
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
          </>
}
        </>
                                 
    )
}

export default OrderScreen
