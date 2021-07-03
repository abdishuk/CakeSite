import React,{useState,useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button} from 'react-bootstrap'
import {saveShippingAddress} from '../Actions/addToCartAction.js'
import FormContainer from '../Components/FormContainer.js'
import CheckOutSteps from '../Components/CheckoutSteps.js'
function ShippingScreen({history}) {
  const cart= useSelector(state => state.cart)
  const user_Login = useSelector(state => state.userLogin)
    const{loading,error,user}=user_Login 
    const[address,setAddress]=useState('')
    const[city,setcity]=useState('')
    const[contact,setContact]=useState('')
    
    
      const dispatch=useDispatch()
    const onsubmitHandler=(e)=>{
        e.preventDefault()
        const id=user._id
        dispatch(saveShippingAddress({address,city,contact,id}))
        history.push('/payment')

    }
    useEffect(()=>{
         if(user && cart.shippingAddress){
          setContact(user.contact)
          setAddress(cart.shippingAddress.address)
          setcity(cart.shippingAddress.city)
         }
       
    },[user, cart.shippingAddress])

    return (
        <FormContainer>
       {  <CheckOutSteps step1 step2/> }
           <h1>Shipping</h1> 
           <Form onSubmit={onsubmitHandler}>
           <Form.Group controlId="address">
    <Form.Label>Address</Form.Label>
    <Form.Control type='text' placeholder="enter address" name='address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </Form.Group>
  <Form.Group controlId="city">
    <Form.Label>city</Form.Label>
    <Form.Control type='text' placeholder="enter city" name='city' value={city} onChange={(e)=>setcity(e.target.value)}  required/>
  </Form.Group>
  <Form.Group controlId="contact">
    <Form.Label>Contact</Form.Label>
    <Form.Control type='text' placeholder="Enter Contact" name='contact' value={contact} onChange={(e)=>setContact(e.target.value)}  required/>
  </Form.Group>
  
  <Button type='submit' variant='primary'>Continue</Button>

           </Form>
        </FormContainer>
    )
}

export default ShippingScreen
