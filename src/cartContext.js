import { useContext, createContext, useState } from "react";
import React from 'react'
import useLocalStorage from "./useLocalStorage";
 const testContext = createContext();

export function useCarts(){
  return useContext(testContext)

} 

export const CartProvider = ({ children }) => {

  const [cart, setCart]=useLocalStorage('cart', []);
  //const [item, itemTotal]=useState1([])
  //const [total, setTotal]=useState([])


  function RemoveFromCart(item) {
    setCart((prevItems)=> {return prevItems.filter((thing)=>(thing.productId!==item.productId))})
   // console.log(cart)
  }


  function AddToCart(item){
    setCart((prevItem)=>{
      if (prevItem.find(stuff => stuff.productId ===item.productId)){
       // console.log('yes')
        let objIndex= prevItem.findIndex(stuff => stuff.productId ===item.productId)
        prevItem[objIndex].quantity = (prevItem[objIndex].quantity +1)
        return [...prevItem]

      }
     // console.log('no');
      item.quantity =1
      return [...prevItem, item];
              
  })
}

function getTotal(){
  let totalAmount=0
  cart.map((each)=> 
  totalAmount+=(each.price* each.quantity)
  )
  return totalAmount
  }


  return (
    <testContext.Provider value={{

     setCart,
      cart,
      AddToCart,
      RemoveFromCart,
      getTotal
    }}
    >
      {children}

    </testContext.Provider>
  )
  }



  /*
  const addItems=(item)=>{
    if(item)
    return setCart((prevCart) => [...prevCart, item])
    
  }


  */