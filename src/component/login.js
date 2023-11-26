import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth }  from '../contexts/AuthContext';
import { Link, useNavigate} from 'react-router-dom';
import { db } from './firestore';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import '../styles/buttonStyle.css';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { signup, currentUser, log_in, uid } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading]= useState(false);

  async function handleSubmit(e){
    e.preventDefault()
  
    try{
     // setError("")
     // setLoading(true)      
      await log_in(emailRef.current.value, passwordRef.current.value)
       
      navigate('/womens')
    }catch(error){
      if (error.code == "auth/user-not-found"){
        //setError(error.message) Use this to fetch firebase message
        setError("This account does not exist")
      }else if (error.code == 'auth/wrong-password') {
        setError("Email or password incorrect")
      }
      console.log("signup err", error);
    }
    setLoading(false)
    
  }



  return (
    <>
     <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>
    <div className="w-100" style={{ maxWidth: "400px"}}>

    <Card>
    <Card.Body>
      
    <h2 className = "text-centre mb-4">Login</h2>
    
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />            
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />            
        </Form.Group>
       
        <button className = "w-100 signup_btn" type="submit">login</button>
        <Link className='login-link' to='/signup'> Sign up here </Link>
        
    </Form>
    </Card.Body>
    </Card>
    </div>
    </Container>
  
    </>
  )
}

