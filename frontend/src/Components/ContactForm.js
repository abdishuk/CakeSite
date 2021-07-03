import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button,Row,Col} from 'react-bootstrap'
import Axios from 'axios'

import{registerUser} from '../Actions/registerAction.js'
import FormContainer from '../Components/FormContainer.js'
function ContactForm({location,history}) {
    const [formdata,setFormData]=useState({
        name:'',
        email:'',
        message:'',
        contact:''
    })
  /*  const redirect=location.search?'/'+location.search.split('=')[1]:'/'*/
    const user_Login = useSelector(state => state.register)
    const{loading,error,user}=user_Login
    useEffect(()=>{
        if(user){
          //  history.push(redirect)
            
        }
    })
       
    
    const dispatch=useDispatch()
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
    const{name,message,email,contact}=formdata
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        console.log('submit handler')
        Axios.post('/form',{name,email,message,contact})
        
       
}
   
    

    return (
        <FormContainer>
            <h1>Register</h1>
           
            
            <Form  onSubmit={onsubmitHandler}
         >
             <Form.Group controlId="name" 
        >
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter email" name='name' value={name} onChange={onChange}/>
    <Form.Text className="text-muted">
     Enter your official names
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicEmail" 
        >
            <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
<Form.Group controlId="formBasicEmail" />
<Form.Group controlId="contact" 
        >
    <Form.Label>Contact</Form.Label>
    <Form.Control type="text" placeholder="Enter phone number" name='contact' value={contact} onChange={onChange}/>
    <Form.Text className="text-muted">
     Enter your phone Number
    </Form.Text>
  </Form.Group>
  
        
    
  </Form.Group>

  <Form.Group controlId="message">
    <Form.Label>message</Form.Label>
    <Form.Control type="text" placeholder="message" name='message' value={message} onChange={onChange}/>
  </Form.Group>

 
  <Button variant="primary" type="submit">
        Submit
  </Button>
</Form>


          
        </FormContainer>
    )
}

export default ContactForm
