import { Link, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { Modal,  Button, Container } from "react-bootstrap";
import Login from "./component/login";
import {Womens} from './component/Womens';
import Home from './component/Home';
import  "./styles/buttonStyle.css"
import { useCarts } from './contexts/cartContext';
import './styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./component/signup";
import { useAuth } from "./contexts/AuthContext";
import { updateCurrentUser } from "firebase/auth";
import { useFire } from "./contexts/firebaseContext";
import { db } from "./component/firestore";
import { collection, doc, getDoc } from "firebase/firestore";
import {signInAnonymously } from "firebase/auth";
import { auth } from "./firebase/firebase"
import {setDoc} from "firebase/firestore"; 


function App() {

  const [viewModal, setviewModal] = useState(false)
  
  const [total, setTotal] = useState(0);
  const {cart, RemoveFromCart, getTotal} = useCarts();
  const {currentUser, logout, uid, user, log_anon} = useAuth();
  const {addToUser, addToAnon} = useFire();

  const showModal = () =>
    setviewModal(true)
  
    const hideModal = () => 
    setviewModal(false)
  
   
  async function getCollection(){
    try{
      const shopRef = collection(db, "shopping_cart");
    const userRef = doc(db, "shopping_cart", uid)
    const docSnap = await getDoc(userRef)
    console.log(docSnap.data())
  }catch(e){
    console.log(e)
  }
}




 async function addToFire(){
    if (currentUser){
     await addToUser()

  }else {
      //DO ASYNC AWAIT , SIGN IN USER AS ANON THEN ADD TO ANONC CART 
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      console.log(user.uid); 
     try {
        await setDoc(doc(db, "shopping_cart", user.uid), {cart});
          console.log("Item added to user's cart!");
      } catch (error) {
          console.error("Error adding to user's cart: ", error);
      }
    }
  }

  





  return (
    <>
    
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
      {currentUser&& 
      <p onClick={logout} className="logout">Logout</p>
      }
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
      <button onClick={()=> RemoveFromCart(item)} className='remove-btn'>Remove</button>
      </div>
      </div> 
     
      </>  
       
      )}

  <div className="flex-container">
      <div className='modal-total-btn'> Item Total {getTotal()} </div>
     {currentUser? 
      <button className="checkout" >Checkout</button>:
      <button className="checkout" >Continue as guest </button>
     }
  </div>
  <button className="checkout" onClick={addToFire} >test</button>
    </Modal>

    <div className='grid-item-2'>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/womens" element={<Womens/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} /> 
    </Routes>
    </div>

    
    </>
  );
}

export default App;

