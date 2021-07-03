import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button,Row,Col} from 'react-bootstrap'

import{registerUser} from '../Actions/registerAction.js'
import FormContainer from '../Components/FormContainer.js'
function RegisterScreen({location,history}) {
    const [formdata,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        cpassword:'',
        contact:''
    })
    const[message,setMessage]=useState('')
    const redirect=location.search?'/'+location.search.split('=')[1]:'/'
    const user_Login = useSelector(state => state.register)
    const{loading,error,user}=user_Login
    useEffect(()=>{
        if(user){
            history.push(redirect)
            
        }
    })
       
    
    const dispatch=useDispatch()
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
    const{name,cpassword,email,password,contact}=formdata
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        if(password!==cpassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(registerUser({name,email,password,contact}))

        }
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

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={onChange}/>
  </Form.Group>

  <Form.Group controlId="ConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="ConfirmPassword" name='cpassword' value={cpassword} onChange={onChange}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Sign Up
  </Button>
</Form>


            <Row className='py-3'>
                <Col>
    Already a customer?{'  '}
    <Link to={redirect?`/login/redirect=${redirect}`:'/login'}>Register</Link>
    </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
