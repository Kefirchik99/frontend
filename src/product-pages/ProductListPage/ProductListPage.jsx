import React from 'react';
import './ProductListPage.scss';
import { useParams } from 'react-router-dom';
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

const ProductListPage = () => {
  // useParams => { categoryName: 'all' or 'clothes' or 'tech' }
  const { categoryName } = useParams();
  const effectiveCategory = categoryName.toLowerCase() === 'all' ? null : categoryName;

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: effectiveCategory },
  });

  // Capitalize for display
  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="product-list-page">
      <div className="product-list-page__content">
        <h2 className="product-list-page__title">
          {pageTitle}
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
