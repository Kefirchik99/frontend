import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import parse from "html-react-parser";
import { CartContext } from "../../context/CartContext";
import { GET_PRODUCT_DETAILS } from "../../graphql/queries";
import { useHeader } from "../../context/HeaderContext";
import "./ProductDetailPage.scss";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext);
    const { setCategory } = useHeader();

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id },
    });

    useEffect(() => {
        if (data?.product?.category) {
            setTimeout(() => {
                setCategory(data.product.category.toLowerCase()); // ✅ Force immediate re-render
            }, 0);
        }
    }, [data?.product?.category, setCategory]);



    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error loading product details: {error.message}</p>;

    const product = data?.product;
    if (!product) return <p>Product not found.</p>;

    const handleSelectAttribute = (attrName, itemValue) => {
        setSelectedAttributes((prev) => ({ ...prev, [attrName]: itemValue }));
    };

    const allAttributesSelected = product.attributes.every(
        (attr) => selectedAttributes[attr.name]
    );
    const isAddToCartDisabled = !product.inStock || !allAttributesSelected;

    const handleAddToCart = () => {
        if (!product.inStock) {
            alert("This product is out of stock!");
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
        navigate("/");
    };

    const nextImage = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % product.gallery.length);
    };
    const prevImage = () => {
        setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? product.gallery.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-page__gallery" data-testid="product-gallery">
                <div className="product-detail-page__thumbnails">
                    {product.gallery.map((imageUrl, idx) => (
                        <img
                            key={idx}
                            src={imageUrl}
                            alt={`${product.name}-thumb-${idx}`}
                            className={`product-detail-page__thumbnail ${product.gallery.length > 1 && idx === selectedIndex ? "selected" : ""}`}
                            onClick={() => setSelectedIndex(idx)}
                        />
                    ))}
                </div>

                <div className="product-detail-page__main-image">
                    {product.gallery.length > 1 && (
                        <button className="carousel-button left" onClick={prevImage}>❮</button>
                    )}

                    <img src={product.gallery[selectedIndex]} alt={`${product.name}-main`} />

                    {product.gallery.length > 1 && (
                        <button className="carousel-button right" onClick={nextImage}>❯</button>
                    )}
                </div>
            </div>

            <div className="product-detail-page__details">
                <h1 className="product-detail-page__name">{product.name}</h1>

                <div className="product-detail-page__attributes">
                    {product.attributes.map((attr) => {
                        const kebabName = attr.name.toLowerCase().replace(/\s+/g, "-");

                        return (
                            <div
                                key={attr.name}
                                className="product-detail-page__attribute"
                                data-testid={`product-attribute-${kebabName}`}
                            >
                                <h4>{attr.name}:</h4>
                                <div className="product-detail-page__attribute-items">
                                    {attr.items.map((item) => {
                                        const isSelected =
                                            selectedAttributes[attr.name] === item.value;

                                        return (
                                            <button
                                                key={item.value}
                                                className={`product-detail-page__attribute-item ${isSelected ? "selected" : ""} ${attr.type === "swatch" ? "product-detail-page__attribute-item--swatch" : ""}`}
                                                onClick={() => handleSelectAttribute(attr.name, item.value)}
                                            >
                                                {attr.type === "swatch" ? (
                                                    <span
                                                        className="product-detail-page__color-swatch"
                                                        style={{ backgroundColor: item.value }}
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

                <h4 className="product-detail-page__price-label">PRICE:</h4>
                <p className="product-detail-page__price">${product.price.toFixed(2)}</p>

                <button
                    className="product-detail-page__add-to-cart"
                    disabled={isAddToCartDisabled}
                    onClick={handleAddToCart}
                >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <div className="product-detail-page__description">
                    {parse(product.description)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
