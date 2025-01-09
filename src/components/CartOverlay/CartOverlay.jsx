import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartOverlay.scss';

const CartOverlay = ({ onClose }) => {
    const {
        cartItems,
        totalItems,
        totalPrice,
        updateQuantity,
        removeItem,
        clearCart,
    } = useContext(CartContext);

    const handleCheckout = () => {
        console.log('Checkout initiated:', cartItems);
        clearCart();
        onClose();
    };

    return (
        <div className="cart-overlay">
            <div className="cart-overlay__background" onClick={onClose}></div>
            <div className="cart-overlay__content">
                <h2>Your Cart</h2>

                {cartItems && cartItems.length > 0 ? (
                    <div className="cart-overlay__items">
                        {cartItems.map((item, itemIndex) => (
                            <div
                                key={`${item.id}-instance-${itemIndex}`}
                                className="cart-overlay__item"
                                data-testid={`cart-item-${item.id}`} // Optional: test ID for the cart item as a whole
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

                                    {/* Cart item attributes */}
                                    <div className="cart-overlay__attributes">
                                        {Array.isArray(item.attributes) &&
                                            item.attributes.map((attr) => {
                                                // Convert attribute name + each option to kebab-case
                                                const attrNameKebab = attr.name
                                                    .toLowerCase()
                                                    .replace(/\s+/g, '-');

                                                return (
                                                    <div
                                                        key={`${item.id}-${attr.name}`}
                                                        className="cart-overlay__attribute"
                                                        data-testid={`cart-item-attribute-${attrNameKebab}`}
                                                    >
                                                        <strong>{attr.name}:</strong>{' '}
                                                        {attr.options.map((option) => {
                                                            const isSelected = attr.selectedOption === option;
                                                            const optionKebab = option
                                                                .toLowerCase()
                                                                .replace(/\s+/g, '-');

                                                            return (
                                                                <span
                                                                    key={`${item.id}-${attr.name}-${option}`}
                                                                    className={`cart-overlay__attribute-option ${isSelected ? 'selected' : ''
                                                                        }`}
                                                                    style={
                                                                        attr.type === 'swatch'
                                                                            ? {
                                                                                backgroundColor: option,
                                                                                width: '20px',
                                                                                height: '20px',
                                                                                display: 'inline-block',
                                                                                border: isSelected
                                                                                    ? '2px solid green'
                                                                                    : '1px solid #ccc',
                                                                                margin: '0 3px',
                                                                            }
                                                                            : {}
                                                                    }
                                                                    data-testid={
                                                                        isSelected
                                                                            ? // Selected cart item attribute option
                                                                            `cart-item-attribute-${attrNameKebab}-${optionKebab}-selected`
                                                                            : // Non-selected option
                                                                            `cart-item-attribute-${attrNameKebab}-${optionKebab}`
                                                                    }
                                                                >
                                                                    {/* If it's swatch, no text. Otherwise, display option name */}
                                                                    {attr.type === 'swatch' ? '' : option}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="cart-overlay__quantity">
                                        <button
                                            className="cart-overlay__decrease"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
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

                {cartItems && cartItems.length > 0 && (
                    <div className="cart-overlay__summary">
                        <p>Total Items: {totalItems}</p>
                        <p data-testid="cart-total">
                            Total Price: ${totalPrice.toFixed(2)}
                        </p>
                        <button
                            className="cart-overlay__checkout"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                )}

                <button className="cart-overlay__close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CartOverlay;
