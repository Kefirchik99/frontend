import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartOverlay.scss';

const CartOverlay = ({ onClose }) => {
    const { cartItems, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        console.log('Checkout initiated:', cartItems);
        clearCart(); // Clears the cart after checkout
        onClose(); // Close the overlay
    };

    return (
        <div className="cart-overlay">
            {/* Background overlay for dimming */}
            <div
                className="cart-overlay__background"
                onClick={onClose} // Close overlay when background is clicked
            ></div>

            <div className="cart-overlay__content">
                <h2>Your Cart</h2>

                {cartItems && cartItems.length > 0 ? (
                    <div className="cart-overlay__items">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="cart-overlay__item"
                                data-testid={`cart-item-${item.id}`}
                            >
                                <img
                                    className="cart-overlay__image"
                                    src={item.gallery?.[0] || 'https://via.placeholder.com/300'}
                                    alt={item.name}
                                />
                                <div className="cart-overlay__details">
                                    <p className="cart-overlay__name">{item.name}</p>
                                    <p className="cart-overlay__price">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <div
                                        className="cart-overlay__attributes"
                                        data-testid={`cart-item-attribute-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                        {item.attributes?.map((attr) => (
                                            <div
                                                key={attr.name}
                                                className="cart-overlay__attribute"
                                                data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                {attr.options.map((option) => (
                                                    <span
                                                        key={option}
                                                        className={`cart-overlay__attribute-option ${attr.selectedOption === option ? 'selected' : ''
                                                            }`}
                                                        data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(
                                                            /\s+/g,
                                                            '-'
                                                        )}-${option.toLowerCase().replace(/\s+/g, '-')}${attr.selectedOption === option ? '-selected' : ''
                                                            }`}
                                                    >
                                                        {option}
                                                    </span>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-overlay__quantity">
                                        <button
                                            className="cart-overlay__decrease"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                            data-testid="cart-item-amount-decrease"
                                        >
                                            -
                                        </button>
                                        <span
                                            className="cart-overlay__quantity-value"
                                            data-testid="cart-item-amount"
                                        >
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="cart-overlay__increase"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                            data-testid="cart-item-amount-increase"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="cart-overlay__remove"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
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

                {/* Cart Summary */}
                {cartItems && cartItems.length > 0 && (
                    <div className="cart-overlay__summary">
                        <p>Total Items: {totalItems}</p>
                        <p data-testid="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
                        <button
                            className="cart-overlay__checkout"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                )}

                {/* Close Button */}
                <button className="cart-overlay__close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CartOverlay;
