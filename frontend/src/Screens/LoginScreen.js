import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button,Row,Col} from 'react-bootstrap'
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
 import{loginUser} from '../Actions/loginActions.js'
import FormContainer from '../Components/FormContainer.js'
function LoginScreen({location,history}) {
     const [formdata,setFormData]=useState({
        email:'',
        password:'',
    })
    
    const user_Login = useSelector(state => state.userLogin)
    const{loading,error,user}=user_Login 
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(user ){
       history.push(redirect)
        } 
    },[ history,user,redirect ])
    
     const dispatch=useDispatch()
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
    const{email,password}=formdata
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        const{email,password}=formdata
dispatch(loginUser({email,password}))
} 
   
    

    return (
        <FormContainer >
            <h1>Sign in</h1>
           {error &&<Message var='danger' message={error}/>}
            {loading && <Loader/>}
            
        <Form onSubmit={onsubmitHandler}
         >
  <Form.Group controlId="formBasicEmail" 
        >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={onChange} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Sign In
  </Button>
</Form>


            <Row className='py-3'>
                <Col>
    New Customer?{'  '}
    <Link to={'/register'}>Register</Link>
    </Col>
            </Row>
        </FormContainer>
    )
}


export default LoginScreen

