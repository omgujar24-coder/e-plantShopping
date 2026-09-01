import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onBackToHome }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?q=80&w=400", cost: "$15", description: "Produces oxygen at night, improving air quality." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=400", cost: "$12", description: "Filters formaldehyde and xylene from indoor air." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=400", cost: "$18", description: "Calming scent, helps relieve stress and anxiety." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592722546473-b3f885e35328?q=80&w=400", cost: "$20", description: "Sweet aromatic flowers that boost energy." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400", cost: "$14", description: "Easy to care for with soothing skin benefits." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=400", cost: "$16", description: "Thrives in low light and cleans indoor air." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={onBackToHome}>
          Paradise Nursery
        </div>
        <div className="nav-cart" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({totalQuantity})
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="plant_heading">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-price">{plant.cost}</div>
                    <p>{plant.description}</p>
                    <button 
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
