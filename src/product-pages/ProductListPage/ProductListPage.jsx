import React from 'react';
import './ProductListPage.scss';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ProductCard from '../../components/ProductCard';
import { CartContext } from '../../context/CartContext';

// Updated query with attributes
const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      price
      attributes {
        name
        type
        items {
          value
        }
      }
    }
  }
`;

const ProductListPage = () => {
  const { categoryName } = useParams();
  const effectiveCategory = categoryName.toLowerCase() === 'all' ? null : categoryName;

  // Use the CartContext so we can call addItem
  const { addItem } = React.useContext(CartContext);

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: effectiveCategory },
  });

  // Capitalize for display
  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // handleQuickShop receives the entire product from ProductCard
  const handleQuickShop = (product) => {
    // Build default attributes array
    // For each attribute, pick the first item => selectedOption
    const defaultAttributes = product.attributes?.map((attr) => ({
      name: attr.name,
      type: attr.type,
      selectedOption: attr.items[0]?.value, // the first item
      options: attr.items.map((i) => i.value),
    })) || [];

    // Add item to cart with those default attributes
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      gallery: product.gallery,
      attributes: defaultAttributes,
    });

    alert(`${product.name} added to cart with default attributes!`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="product-list-page">
      <div className="product-list-page__content">
        <h2 className="product-list-page__title">
          {pageTitle}
        </h2>
        {data && (
          <div className="product-list-page__products">
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // Pass handleQuickShop => ProductCard calls this with full product
                onQuickShop={(productId) => {
                  // We'll find the product object from data, 
                  // but we can just pass 'product' directly if we prefer
                  // and avoid searching by ID. Here's the "search by ID" approach:
                  const fullProduct = data.products.find((p) => p.id === productId);
                  if (fullProduct) {
                    handleQuickShop(fullProduct);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
