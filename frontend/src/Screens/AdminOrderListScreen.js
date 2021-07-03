import React,{useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import{getorderList} from '../Actions/orderCreateActions.js'
import{Table,Button} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'

const AdminOrderListScreen = ({history}) => {
    const orderList = useSelector(state => state.orderList)
    const{orders}=orderList
    const dispatch=useDispatch()
    const user_Login = useSelector(state => state.userLogin)
    const{user}=user_Login 
    useEffect(()=>{
        if(user &&  user.isAdmin){
            dispatch(getorderList())
        } else{
history.push('/login')
        }

            
    },[]
)
    return (
       
        <>
        <h1>Order List</h1>
        <Table>
            <thead>
                <tr>
                <th>Name</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th> 
                            <th></th>            

                
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order=>(
                        <tr key={order._id}>
                            <td >
                                {order.user.name}

                            </td>
                            <td>
                                {order.createdAt}
                            </td>
                            <td>
                                {
                                    order.totalPrice
                                }
                            </td>
                            <td>
                            { 
                            order.isPaid?(
                                order.paidAt.substring(0,10)
                            ):(<i className='fas fa-times' style={{color:'red'}}></i>)}
                            
                            </td>
                            <td>
                            {order.isDelivered? (
                                    order.deliveredAt.substring(0,10)
                                ):(<i className='fas fa-times' style={{color:'red'}}></i>)} 
                            </td>
                           <td>
                           <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' >
                                       Details
                                    </Button>
                                </td>
                           </td>
                        </tr>
                    ))
                }

            </tbody>
        </Table>
            
        </>
    )
}

export default AdminOrderListScreen
