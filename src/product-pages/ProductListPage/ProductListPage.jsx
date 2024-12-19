import React from 'react';
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

const ProductListPage = ({ activeCategory }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: activeCategory === 'all' ? null : activeCategory },
  });

  return (
    <div className="product-list-page">
      <div className="product-list-page__content">
        <h2 className="product-list-page__title">
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        {loading && <p>Loading products...</p>}
        {error && <p>Error loading products: {error.message}</p>}
        {data && (
          <div className="product-list-page__products">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
