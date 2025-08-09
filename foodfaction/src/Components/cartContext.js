// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = () => {
    axios.get('http://localhost/API/cart/')
      .then(res => {
        setCartCount(res.data.length || res.data); // handle array or number
      })
      .catch(err => console.error(err));
  };

  const addToCart = async (item) => {
    try {
      await axios.get(`http://localhost/API/sendData/index.php?item_id=${item.id}`);
      fetchCart(); // refresh count after add
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  useEffect(() => {
    fetchCart(); // load initial cart count
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
