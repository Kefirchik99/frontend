import React from 'react';
import './ProductListPage.scss';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ProductCard from '../../components/ProductCard';
import { CartContext } from '../../context/CartContext';

// GraphQL query to fetch products by category
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
  const effectiveCategory =
    categoryName.toLowerCase() === 'all' ? null : categoryName;

  const { addItem } = React.useContext(CartContext);

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { category: effectiveCategory },
  });

  // Format the page title
  const pageTitle =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // Quick Shop function
  const handleQuickShop = (product) => {
    const defaultAttributes =
      product.attributes?.map((attr) => ({
        name: attr.name,
        type: attr.type,
        selectedOption: attr.items[0]?.value,
        options: attr.items.map((i) => i.value),
      })) || [];

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      gallery: product.gallery,
      attributes: defaultAttributes,
    });
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="product-list-page">
      <div className="product-list-page__content">
        <h2 className="product-list-page__title">{pageTitle}</h2>

        {data && (
          <div className="product-list-page__products">
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickShop={(productId) => {
                  // Find the product object by ID
                  const fullProduct = data.products.find(
                    (p) => p.id === productId
                  );
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
