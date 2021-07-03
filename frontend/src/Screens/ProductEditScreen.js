import React,{useState,useEffect} from 'react'
import{Button,Form} from 'react-bootstrap'
import {productUpdate,getProduct} from '../Actions/productActions.js'
import{useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import Loader from '../Components/Loader.js'

const ProductEditScreen = ({match}) => {
    const products = useSelector(state => state.product)
    const{product}=products
    const dispatch=useDispatch()
    const prodıd=match.params.id
    const[formData,setFormdata]=useState({name:'',
    price:'', 
    image:'',
    category:'',
    countInStock:'',
    description:''})
    const[uploading,setUploading]=useState(false)
    const{name,price,image,countInStock,category,description}=formData
    const onsubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(productUpdate(prodıd,{name,price,image,countInStock,category,description}))
        alert('Product update successful')
    }
    const ImageUploadHandler=async(e)=>{
        const file=e.target.files[0]
        const imgdata=new FormData()
        imgdata.append('image',file)
        setUploading(true)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart-formdata'
                }
            }
            const{data}=await axios.post('/api/uploads',imgdata,config)
            setFormdata({
                ...formData,
                image:data
            })
            setUploading(false)
            
        } catch (error) {
            console.error(error)
            setUploading(false)
            
        }
    }
    useEffect(()=>{
        if(!product.name){
           dispatch(getProduct(prodıd))

        } else{
            setFormdata({
                name:product.name,
               image:product.image,
countInStock:product.countInStock,
               category:product.category,
             description:product.description,
               price:product.price
                
            })

        }
    },[product,dispatch,prodıd])
    
    const onChange=(e)=>{
        setFormdata({...formData,
            [e.target.name]:e.target.value
        })
    }
   
   
    return (
        <>
            <h1>Product Edit</h1>
           
         
     <Form  onSubmit={onsubmitHandler}
     >
         <Form.Group controlId="Name" 
    >
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter Name" name='name' value={name} onChange={onChange}/>

</Form.Group>
<Form.Group controlId="Price" 
    >
<Form.Label>Price</Form.Label>
<Form.Control type="number" placeholder="Enter price" name='price' value={price}  onChange={onChange}/>
</Form.Group>


<Form.Group controlId="Image" 
    >
<Form.Label>image</Form.Label>
<Form.Control type="text" placeholder="Enter Image URL" name='image' value={image} onChange={onChange}/>
</Form.Group>
<Form.File id='image-file' label='choose file'  custom onChange={ImageUploadHandler}>

</Form.File>
{
    uploading &&<Loader/>
}

<Form.Group controlId="countInStock" 
    >
<Form.Label>countInStock</Form.Label>
<Form.Control type="number" placeholder="Enter countInStock" name='countInStock' value={countInStock} onChange={onChange} />
</Form.Group>
<Form.Group controlId="category" 
    >
<Form.Label>Category</Form.Label>
<Form.Control type="text" placeholder="Enter category " name='category' value={category} onChange={onChange}/>
</Form.Group>
<Form.Group controlId="description" 
    >
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter description " name='description' value={description} onChange={onChange}/>
</Form.Group>
<Button variant="primary" type="submit">
Update  </Button>
</Form>
            
            
            
            


           
            
        </>
    )
}

export default ProductEditScreen
