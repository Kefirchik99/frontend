import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import AppRoutes from './routes';

const App = () => {
  // Centralized state for active category
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <CartProvider>
      <div>
        {/* Pass activeCategory and handler to Header */}
        <Header
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <main>
          {/* Pass activeCategory to AppRoutes */}
          <AppRoutes activeCategory={activeCategory} />
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
