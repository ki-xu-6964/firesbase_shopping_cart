import React from 'react';
import ReactDOM from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from './contexts/cartContext';
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseProvider } from './contexts/firebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
          <BrowserRouter>
        <AuthProvider>
        <CartProvider>
        <FirebaseProvider>      
        <App/>
        </FirebaseProvider>
        </CartProvider>
        </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>


)