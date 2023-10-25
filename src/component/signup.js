import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth }  from '../contexts/AuthContext';



export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading]= useState(false);
  async function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordconfirmRef.current.value){
      //here we RETURN an error instead of catch- because if pw dont match we want to exit workflow completely. instead of continue  
      console.log('correct')
      return setError("Passwords do not match")
    }
    console.log('no stooge')
  
    try{
      setError("")
      setLoading(true)      
      await signup(emailRef.current.value, passwordRef.current.value)
      console.log("success!")      
      console.log("Current user in Signup:", currentUser);

    }catch{

      setError("failed to create account")
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
    <h2 className = "text-centre mb-4">Sign Up</h2>
     {currentUser && currentUser.email}
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
         <Form.Group id="password">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" ref={passwordconfirmRef} required />            
        </Form.Group>        
        
        <button disabled={loading} className = "w-100 signup_btn" type="submit">Sign Up</button>
        
    </Form>
    </Card.Body>
    </Card>
    </div>
    </Container>
    </>
  )
}
