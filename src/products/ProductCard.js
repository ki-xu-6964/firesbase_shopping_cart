import React, {useState} from 'react'
import { Card, Container } from 'react-bootstrap';
import './productCart.css'
import { useCarts } from '../contexts/cartContext';



export default function ProductCard(props) {

  const {name, price, imageUrl,index, productId} = props.data
  const {AddToCart} = useCarts();
  const [message, setMessage] = useState(false)


  function cartFunction(){
    setMessage(true);
    setTimeout(()=> setMessage(false), 1000)
    
    
    AddToCart(props.data)

  }

  return (
    <>

    <Card style={{ width: '18rem' }} key={index}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Text className='card-title'>
          {name}
        </Card.Text>
        <Card.Text className='card-price'>
        ${price}
        </Card.Text>
        <button onClick={()=>cartFunction()}  className='add-cart-btn' >Add to Cart </button>
        { message &&
        <text className='added-to-cart'>Added to cart!</text>
        }
      </Card.Body>
      </Card>
      
  
  
    </>
  )
}

