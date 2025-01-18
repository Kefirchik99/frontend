import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./CartOverlay.scss";

const CartOverlay = ({ onClose }) => {
    const { cartItems, totalPrice, updateQuantity, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        console.log("Checkout initiated:", cartItems);
        clearCart();
        onClose();
    };

    return (
        <>
            {/* Grayed-out background that does not cover the header */}
            <div className="cart-overlay__background" onClick={onClose}></div>

            {/* Main Cart Overlay */}
            <div className="cart-overlay">
                <div className="cart-overlay__content">
                    <h2 className="cart-overlay__title">
                        My Bag, {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </h2>

                    {cartItems.length > 0 ? (
                        <div className="cart-overlay__items">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-instance-${index}`} className="cart-overlay__item">
                                    {/* Product Info */}
                                    <div className="cart-overlay__info">
                                        <p className="cart-overlay__name">{item.name}</p>
                                        <p className="cart-overlay__price">${item.price.toFixed(2)}</p>
                                        <div className="cart-overlay__attributes">
                                            {item.attributes?.map((attr) => (
                                                <div key={attr.name} className="cart-overlay__attribute">
                                                    <span className="cart-overlay__attribute-label">{attr.name}:</span>
                                                    <div className="cart-overlay__attribute-options">
                                                        {attr.options.map((option) => {
                                                            const isSelected = attr.selectedOption === option;
                                                            const isColor = attr.type === "swatch";

                                                            return (
                                                                <span
                                                                    key={option}
                                                                    className={`cart-overlay__attribute-option ${isSelected ? "selected" : ""
                                                                        } ${isColor ? "cart-overlay__color-swatch" : ""}`}
                                                                    style={isColor ? { backgroundColor: option } : {}}
                                                                >
                                                                    {!isColor && option}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Image */}
                                    <img
                                        className="cart-overlay__image"
                                        src={item.gallery?.[0] || "https://via.placeholder.com/300"}
                                        alt={item.name}
                                    />

                                    {/* Quantity Controls */}
                                    <div className="cart-overlay__quantity">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="cart-overlay__empty">
                            <p>Your cart is empty.</p>
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <div className="cart-overlay__summary">
                            <div className="cart-overlay__total-line">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="cart-overlay__checkout" onClick={handleCheckout}>
                                PLACE ORDER
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartOverlay;
