import React, { Component } from 'react';
import './ProductListPage.scss';
import { gql, useQuery } from '@apollo/client';
import ProductCard from '../../components/ProductCard';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      price
    }
  }
`;

// Functional Component to use useQuery
const ProductListPage = ({ categoryName }) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: { category: categoryName },
    });

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;

    return (
        <div className="product-list-page">
            <h2 className="product-list-page__title">Category: {categoryName}</h2>
            <div className="product-list-page__products">
                {data.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
