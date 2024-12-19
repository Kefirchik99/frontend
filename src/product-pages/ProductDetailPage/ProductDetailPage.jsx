import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CartContext } from '../../context/CartContext';
import { GET_PRODUCT_DETAILS } from '../../graphql/queries';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
    const { id } = useParams(); // Get product ID from the URL
    const navigate = useNavigate(); // For navigation after adding to cart
    const { addItem } = useContext(CartContext); // Access addItem from CartContext

    // Fetch product details using Apollo's useQuery
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id },
    });

    // Handle loading and error states
    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error loading product details: {error.message}</p>;

    const product = data.product;

    // Add to cart handler
    const handleAddToCart = () => {
        if (product.inStock) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                gallery: product.gallery,
            });
            alert(`${product.name} added to cart!`);
            navigate('/'); // Redirect to homepage after adding to cart
        } else {
            alert('This product is out of stock!');
        }
    };

    return (
        <div className="product-detail-page">
            {/* Gallery Section */}
            <div className="product-detail-page__gallery">
                {product.gallery.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} - ${index}`} />
                ))}
            </div>

            {/* Details Section */}
            <div className="product-detail-page__details">
                <h1 className="product-detail-page__name">{product.name}</h1>
                <p className="product-detail-page__price">
                    ${product.price.toFixed(2)}
                </p>

                {/* Attributes Section */}
                <div className="product-detail-page__attributes">
                    {product.attributes.map((attr, index) => (
                        <div key={index} className="product-detail-page__attribute">
                            <span className="product-detail-page__attribute-name">
                                {attr.name}:
                            </span>
                            <span className="product-detail-page__attribute-value">
                                {attr.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Add to Cart Button */}
                <button
                    className="product-detail-page__add-to-cart"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {/* Description Section */}
                <p className="product-detail-page__description">
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetailPage;
