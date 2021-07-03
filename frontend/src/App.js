import './App.css';
import HomeScreen from './Screens/HomeScreen.js'
import Header from './Components/Header.js'
import{BrowserRouter as Router,Route} from 'react-router-dom'
import{Container} from 'react-bootstrap'
 import Cake from './Components/Cake.js'
 import LoginScreen from './Screens/LoginScreen.js'
import RegisterScreen from './Screens/registerScreen.js'
import CartScreen from './Screens/CartScreen.js'
import ShippingScreen from './Screens/ShippingScreen.js'
import PaymentMethodScreen from './Screens/PaymentMethodScreen.js'
import PlaceOrderScreen from './Screens/PlaceOrderScreen.js'
import OrderScreen from './Screens/OrderScreen.js'
import OrderLİSTSCREEN from './Screens/AdminOrderListScreen.js'
import ProductListScreen from './Screens/ProductListScreen.js'
import ProductEditscreen from './Screens/ProductEditScreen.js'
import UserList from './Screens/UserListScreen.js'
import ContactForm from './Components/ContactForm.js'
import { Fragment } from 'react';

function App() {
  return (
    <div id="app">
    <Router>
<Header class='header'/>
<main className='py-3' >
      <Container>   
        <Route path='/admin/userList'  component={UserList}/>
      <Route exact path='/' component={HomeScreen}/>
      <Route  path='/product/:id' component={Cake}/>
      <Route  path='/login' component={LoginScreen}/>
      <Route  path='/register' component={RegisterScreen}/>
      <Route  path='/cart/:id?' component={CartScreen}/>
      <Route  path='/shipping' component={ShippingScreen}/>
      <Route  path='/payment' component={PaymentMethodScreen}/>
      <Route  path='/placeorder' component={PlaceOrderScreen}/>
      <Route  path='/order/:id' component={OrderScreen}/>
      <Route  path='/admin/orderlist' component={OrderLİSTSCREEN}/>
      <Route  path='/admin/productlist' component={ProductListScreen}/>
      <Route  path='/admin/product/:id/edit' component={ProductEditscreen}/>






     
      </Container>
      </main>
    
      </Router>
    </div>
  );
}

export default App;
