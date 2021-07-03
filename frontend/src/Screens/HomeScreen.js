import React,{useState,useEffect} from 'react'
import{Row,Col,Form,Button} from 'react-bootstrap'
import CakeScreen from './CakeScreen'
import{useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../Actions/productActions.js'
import{Link} from 'react-router-dom'
// import products from '../data/products.js'



const HomeScreen = () => {
  const dispatch= useDispatch()
  const product=useSelector(state=>state.product)
  const{products,error,loading}=product
    let filteredProductCateg=[]
    const[categ,setCategory]=useState('')
    const[from,setFrom]=useState(0)
    const[to,setTo]=useState(0)
    useEffect(()=>{
      dispatch(getProducts())
    },[dispatch])
let filteredCakes=[]
    
      return(
        <>
        <div className='container'>
          <Row>
            <Col md={3}>
                <Form>
                <Form.Group controlId="select Category">
   <Form.Label>Select Category</Form.Label>
   <Form.Control as="select" multiple onChange={(e)=>setCategory(e.target.value)}>
     <option>BirthDay Cake</option>
     <option>Anniversary Cake</option>
     <option>Special Cake</option>
     <option>Other Types of Cake</option>
   </Form.Control>

 </Form.Group>
 <Button type='button' variant='primary' style={{display:'none'}} onClick={
      filteredCakes=products.filter((product)=>product.category.toLowerCase()===categ.toLowerCase())
 }>
   Search
   </Button>
                </Form>
   <Form>
       <h5 className='pt-5 pb-2'>Sort By Price</h5>
   <Form.Group controlId="from">
   <Form.Label>From</Form.Label>
   <Form.Control type="text"  name='from' value={from} onChange={(e)=>setFrom(Number(e.target.value))}  />
 </Form.Group>
 <Form.Group controlId="to">
   <Form.Label>TO</Form.Label>
   <Form.Control type="text" name='to' value={to} onChange={(e)=>setTo(Number(e.target.value))} />
 </Form.Group>
 <Button  type='button' variant='primary' style={{display:'none'}}
 onClick={
    filteredProductCateg=products.filter((product)=>product.price>=from && product.price<=to)
} >
  
   </Button>
   </Form>
            </Col>
            <Col md={9}>
           { filteredProductCateg.length>0 ? (<Row>{filteredProductCateg.map(product=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        <CakeScreen product={product} key={product._id}/>
        </Col>
       ))}  </Row>):filteredCakes.length>0?(<Row>{filteredCakes.map(product=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        <CakeScreen product={product} key={product._id}/>
        </Col>
       ))}  </Row>): (<Row>{products.map(product=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        <CakeScreen product={product} key={product._id}/>
        </Col>
       ))}  </Row>)  }
          
                       
                     
                
            </Col>
            
            </Row>  
          </div>

          </>
       
       
      ) 
        
    
                        }


export default HomeScreen
