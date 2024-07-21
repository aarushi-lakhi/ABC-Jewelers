import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <main className="container">
      <h1>Your Cart</h1>
      <div className="grid">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </main>
  );
};

export default Cart;
