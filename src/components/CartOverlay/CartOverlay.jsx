import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartOverlay.scss';

const CartOverlay = ({ onClose }) => {
    const {
        cartItems,
        totalItems,
        totalPrice,
        updateQuantity,
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
                <h2 className="cart-overlay__title">
                    My Bag, {cartItems.length} items
                </h2>

                {cartItems.length > 0 ? (
                    <div className="cart-overlay__items">
                        {cartItems.map((item, index) => (
                            <div
                                key={`${item.id}-instance-${index}`}
                                className="cart-overlay__item"
                            >
                                <img
                                    className="cart-overlay__image"
                                    src={item.gallery?.[0] || 'https://via.placeholder.com/300'}
                                    alt={item.name}
                                />
                                <div className="cart-overlay__info">
                                    <p className="cart-overlay__name">{item.name}</p>
                                    <p className="cart-overlay__price">${item.price.toFixed(2)}</p>

                                    <div className="cart-overlay__attributes">
                                        {item.attributes?.map((attr) => (
                                            <div
                                                key={`${item.id}-${attr.name}`}
                                                className="cart-overlay__attribute"
                                            >
                                                <span className="cart-overlay__attribute-label">
                                                    {attr.name}:
                                                </span>
                                                <div className="cart-overlay__attribute-options">
                                                    {attr.options.map((option) => {
                                                        const isSelected = attr.selectedOption === option;
                                                        return (
                                                            <span
                                                                key={`${item.id}-${attr.name}-${option}`}
                                                                className={`cart-overlay__attribute-option ${isSelected ? 'selected' : ''
                                                                    }`}
                                                                style={
                                                                    attr.type === 'swatch'
                                                                        ? {
                                                                            backgroundColor: option,
                                                                            width: '16px',
                                                                            height: '16px',
                                                                            display: 'inline-block',
                                                                            marginRight: '4px',
                                                                            border: isSelected
                                                                                ? '2px solid green'
                                                                                : '1px solid #ccc',
                                                                        }
                                                                        : {}
                                                                }
                                                            >
                                                                {attr.type === 'swatch' ? '' : option}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="cart-overlay__quantity">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
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
                            <span>Total:</span>
                            <span data-testid="cart-total">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className="cart-overlay__checkout"
                            onClick={handleCheckout}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                )}

                <button className="cart-overlay__close" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default CartOverlay;
