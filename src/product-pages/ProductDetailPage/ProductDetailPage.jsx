import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser'; // <-- For safe HTML parsing
import { CartContext } from '../../context/CartContext';
import { GET_PRODUCT_DETAILS } from '../../graphql/queries';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext);

    const [selectedAttributes, setSelectedAttributes] = useState({});

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id },
    });

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error loading product details: {error.message}</p>;

    const product = data?.product;
    if (!product) return <p>Product not found.</p>;

    // Handle attribute selection in local state
    const handleSelectAttribute = (attrName, itemValue) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attrName]: itemValue,
        }));
    };

    // Check if user selected all required attributes (some products might have none)
    const allAttributesSelected = product.attributes.every(
        (attr) => selectedAttributes[attr.name]
    );

    // Add to cart
    const handleAddToCart = () => {
        if (!product.inStock) {
            alert('This product is out of stock!');
            return;
        }
        // Build attribute array for cart
        const attributesForCart = product.attributes.map((attr) => ({
            name: attr.name,
            type: attr.type,
            selectedOption: selectedAttributes[attr.name],
            options: attr.items.map((i) => i.value),
        }));

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            gallery: product.gallery,
            attributes: attributesForCart,
        });

        alert(`${product.name} added to cart!`);
        navigate('/');
    };

    const isAddToCartDisabled = !product.inStock || !allAttributesSelected;

    return (
        <div className="product-detail-page">
            {/* Image Gallery */}
            <div
                className="product-detail-page__gallery"
                data-testid="product-gallery"
            >
                {product.gallery.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} - ${index}`} />
                ))}
            </div>

            {/* Details */}
            <div className="product-detail-page__details">
                {/* Product Name */}
                <h1 className="product-detail-page__name">
                    {product.name}
                </h1>

                {/* Product Price (2 decimal places) */}
                <p className="product-detail-page__price">
                    ${product.price.toFixed(2)}
                </p>

                {/* Product Attributes */}
                <div className="product-detail-page__attributes">
                    {product.attributes.map((attr) => {
                        const kebabName = attr.name.toLowerCase().replace(/\s+/g, '-');
                        return (
                            <div
                                key={`${attr.id}-${attr.name}`}
                                className="product-detail-page__attribute"
                                data-testid={`product-attribute-${kebabName}`}
                            >
                                <h4>
                                    {attr.name} ({attr.type})
                                </h4>
                                <div className="product-detail-page__attribute-items">
                                    {attr.items.map((item) => {
                                        const isSelected =
                                            selectedAttributes[attr.name] === item.value;
                                        return (
                                            <button
                                                key={item.id}
                                                className={`product-detail-page__attribute-item ${isSelected ? 'selected' : ''
                                                    }`}
                                                onClick={() =>
                                                    handleSelectAttribute(attr.name, item.value)
                                                }
                                            >
                                                {attr.type === 'swatch' ? (
                                                    <span
                                                        style={{
                                                            backgroundColor: item.value,
                                                            width: '20px',
                                                            height: '20px',
                                                            display: 'inline-block',
                                                            border: '1px solid #ccc',
                                                        }}
                                                    />
                                                ) : (
                                                    item.displayValue
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add to Cart Button (disabled if out of stock or missing attributes) */}
                <button
                    className="product-detail-page__add-to-cart"
                    data-testid="add-to-cart"
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {/* Product Description - parse HTML safely */}
                <div
                    className="product-detail-page__description"
                    data-testid="product-description"
                >
                    {parse(product.description)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
