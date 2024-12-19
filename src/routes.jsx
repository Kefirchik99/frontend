import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './product-pages/ProductListPage/ProductListPage';
import ProductDetailPage from './product-pages/ProductDetailPage/ProductDetailPage';

const AppRoutes = ({ activeCategory }) => {
    return (
        <Router>
            <Routes>
                {/* Pass activeCategory to ProductListPage */}
                <Route path="/" element={<ProductListPage activeCategory={activeCategory} />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
