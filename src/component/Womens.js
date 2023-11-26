import React from 'react'
import { cart, useCarts } from '../contexts/cartContext'
import { shopData } from '../products/shopData'
import { Card } from 'react-bootstrap'
import '../products/productCart.css'
import ProductCard from '../products/ProductCard'


export function Womens() {
  

  const {addItems, cart, AddToCart} = useCarts();
  



 

  return (
    <>

<div className='grid-container p'>
      
      {shopData.map((data, index) => (
      <div className='grid-item-1'  key={data.productId}>
      <ProductCard data={data} >

      </ProductCard>
      </div>
         ))}


      </div>

      



    </>
        
  )
}





