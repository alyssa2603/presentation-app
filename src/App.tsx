import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/receipt" element={<Receipt />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AppProvider>
  );
}

export default App;