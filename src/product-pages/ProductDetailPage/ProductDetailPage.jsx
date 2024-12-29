import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
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
    console.log(product.attributes)
    if (!product) return <p>Product not found.</p>;

    const handleSelectAttribute = (attrName, itemValue) => {
        // Log for debugging - remove if you don't need it
        console.log('Selecting:', attrName, itemValue);
        setSelectedAttributes((prev) => ({
            ...prev,
            [attrName]: itemValue,
        }));
    };

    const handleAddToCart = () => {
        if (!product.inStock) {
            alert('This product is out of stock!');
            return;
        }
        // Build an attributes array with selectedOption
        const attributesForCart = product.attributes.map((attr) => ({
            name: attr.name,
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

    return (
        <div className="product-detail-page">
            <div className="product-detail-page__gallery">
                {product.gallery.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} - ${index}`} />
                ))}
            </div>

            <div className="product-detail-page__details">
                <h1 className="product-detail-page__name">{product.name}</h1>
                <p className="product-detail-page__price">${product.price.toFixed(2)}</p>

                <div className="product-detail-page__attributes">
                    {product.attributes?.map((attr) => (
                        <div
                            key={attr.id}
                            className="product-detail-page__attribute"
                            data-testid={`product-attribute-${attr.name.toLowerCase()}`}
                        >
                            console.log(attr)
                            <h4>
                                {attr.name} ({attr.type})
                            </h4>
                            {attr.items && attr.items.length > 0 ? (
                                <div className="product-detail-page__attribute-items">
                                    {attr.items.map((item) => {
                                        console.log('Attribute debug:', attr.type, attr.name, item.value);
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
                                                            display: 'inline-block',
                                                            width: '20px',
                                                            height: '20px',
                                                            backgroundColor: item.value,
                                                            border: '1px solid #ccc',
                                                        }}
                                                    />
                                                ) : (
                                                    item.displayValue || item.value
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="product-detail-page__attribute-value">
                                    {attr.value}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="product-detail-page__add-to-cart"
                    data-testid="add-to-cart"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <p
                    className="product-detail-page__description"
                    data-testid="product-description"
                >
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetailPage;
