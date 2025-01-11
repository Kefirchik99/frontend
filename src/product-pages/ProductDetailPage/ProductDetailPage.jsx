import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import { CartContext } from '../../context/CartContext';
import { GET_PRODUCT_DETAILS } from '../../graphql/queries';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    // NEW: track which gallery image is currently selected
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id },
    });

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error loading product details: {error.message}</p>;

    const product = data?.product;
    if (!product) return <p>Product not found.</p>;

    // The rest of your attribute logic remains the same:
    const handleSelectAttribute = (attrName, itemValue) => {
        setSelectedAttributes((prev) => ({ ...prev, [attrName]: itemValue }));
    };
    const allAttributesSelected = product.attributes.every(
        (attr) => selectedAttributes[attr.name]
    );
    const isAddToCartDisabled = !product.inStock || !allAttributesSelected;

    const handleAddToCart = () => {
        if (!product.inStock) {
            alert('This product is out of stock!');
            return;
        }
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

    // The new layout:
    return (
        <div className="product-detail-page">
            {/* Left column: Thumbnails */}
            <div className="product-detail-page__thumbnails">
                {product.gallery.map((imageUrl, idx) => {
                    const isSelected = (idx === selectedIndex);
                    return (
                        <img
                            key={idx}
                            src={imageUrl}
                            alt={`${product.name}-thumb-${idx}`}
                            className={
                                `product-detail-page__thumbnail ${isSelected ? 'selected' : ''}`
                            }
                            onClick={() => setSelectedIndex(idx)}
                        />
                    );
                })}
            </div>

            {/* Main image */}
            <div className="product-detail-page__main-image">
                <img
                    src={product.gallery[selectedIndex]}
                    alt={`${product.name}-main`}
                />
            </div>

            {/* Right column: Details */}
            <div className="product-detail-page__details">
                <h1 className="product-detail-page__name">{product.name}</h1>
                <p className="product-detail-page__price">
                    ${product.price.toFixed(2)}
                </p>

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
                                                className={
                                                    `product-detail-page__attribute-item ${isSelected ? 'selected' : ''}`
                                                }
                                                onClick={() => handleSelectAttribute(attr.name, item.value)}
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

                <button
                    className="product-detail-page__add-to-cart"
                    data-testid="add-to-cart"
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

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
