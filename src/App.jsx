import React, { useState } from "react";
import Header from "./components/Header";
import ProductListPage from "./product-pages/ProductListPage/ProductListPage";

const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Tech" },
];

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(1);

  // Handle category click to update activeCategory state
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    console.log(`Active Category: ${categoryId}`);
  };

  return (
    <div className="app-container">
      {/* Header Component */}
      <Header
        cartItemCount={cartItemCount}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* Main Content */}
      <main className="main-content">
        <ProductListPage
          categoryId={activeCategory}
          categoryName={categories.find((c) => c.id === activeCategory)?.name}
        />
      </main>
    </div>
  );
}

export default App;
