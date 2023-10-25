import { Link, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { Modal,  Button, Container } from "react-bootstrap";

import {Womens} from './component/Womens';
import Home from './component/Home';
import  "./styles/buttonStyle.css"
import { useCarts } from './contexts/cartContext';
import './styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./component/signup";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  const [viewModal, setviewModal] = useState(false)
  
  const [total, setTotal] = useState(0);
  const {cart, RemoveFromCart, getTotal} = useCarts();

  const showModal = () =>
    setviewModal(true)
  
    const hideModal = () => 
    setviewModal(false)
  
  
  return (
    <>
    <AuthProvider>

      <ul>
      <li className='nav-item'>
        <Link className='nav-link-active' to="/">Home</Link>
      </li>
      <li>
        <Link to="/womens">Womens</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      </ul>

   
    <div className='grid-item-1'>
    <button onClick={showModal} className='checkout-btn'>View Cart</button>
    </div>
    <Modal size="sm" show= {viewModal} onHide={hideModal}   > 
    <div className='modal-checkout-btn'> SHOPPING CART</div>
   
    {cart.map((item)=>
    
        <>
      <div className='container-cart'>
      <img className='small-cart-img'  src={item.imageUrl} ></img>
      <div className='cart-text-cont cart-prod-title'>
      <div>Item: {item.name}</div>
      <div>Price: ${item.price}</div>
      <div>Quantity: {item.quantity}</div>
      <button onClick={()=> RemoveFromCart(item)} className='remove-btn'> remove from cart</button>
      </div>
      </div> 
     
      </>  
       
      )}
        
    <div className='modal-total-btn'> Item Total {getTotal()} </div>
    </Modal>

    <div className='grid-item-2'>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/womens" element={<Womens/>} />
    <Route path="/signup" element={<Signup/>} />
    </Routes>
    </div>

    </AuthProvider>
    </>
  );
}

export default App;



/*
    <div>cart: {points}</div>
    <Button onClick={addToCart}> Add Some Points!</Button>
*/


/* STYLING THE PRODUCTS

https://codesandbox.io/s/usereducer-hook-starter-wl8gc?file=/src/ProductCard.js

*/
