import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Header from '../layout/header';

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {

    const checkLogger = localStorage.getItem('loggedIn');
    if (!checkLogger) {
      navigate('/signin');
    }
  }, [navigate]); 

  return (
    <div>
        <Header/>
      <h2>Cart</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
