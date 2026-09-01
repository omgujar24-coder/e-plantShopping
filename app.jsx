import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1 className="landing-title">Welcome To Paradise Nursery</h1>
          <p>Where Greenery Meets Home</p>
          <AboutUs />
          <button 
            className="get-started-btn" 
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <ProductList onBackToHome={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
