import React ,{useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import{userList} from '../Actions/userListAction.js'

function UserListScreen() {
  const dispatch = useDispatch()
  const UserList=useSelector(state=>state.userList)
  const{users}=UserList
  useEffect(()=>{
    dispatch(userList())
    
   },[])
    return (
        
        <div>
           {
              users.map(user=> <h1>{user.name}</h1>)
           } 
        </div>
    )
}

export default UserListScreen
