import React, {useState, TextInput} from 'react';
import ProductCard from '../products/ProductCard';
import { img_files } from '../products/shopData'; 
import '../styles/homepage.css'
import { Link } from 'react-router-dom';


export default function Home_test() {
  



  return (
    <>
    <div className='container'>
    <Link to='/womens'>
    <img src={img_files}/>
    <text className='centered shop-text'>shop now</text>
    </Link>
    </div>
    </>

  )}
      
      