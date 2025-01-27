import React, { createContext, useState } from 'react';

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // ✅ State to track cart overlay visibility

    // Calculate total items in the cart
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    /**
     * Add item to cart
     * @param {Object} product - The product to add
     * @param {boolean} shouldOpenCart - Determines if the cart overlay should open (default: true)
     */
    const addItem = (product, shouldOpenCart = true) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) =>
                item.id === product.id &&
                JSON.stringify(item.attributes) === JSON.stringify(product.attributes) // ✅ Ensures variants are treated separately
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });

        if (shouldOpenCart) {
            setIsCartOpen(true); // ✅ Open only when explicitly needed
        }
    };

    // Update quantity of an item
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) => {
            if (newQuantity < 1) {
                return prevItems.filter((item) => item.id !== productId);
            }

            return prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // Remove an item from the cart
    const removeItem = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    // Clear the cart
    const clearCart = () => {
        setCartItems([]);
        setIsCartOpen(false); // ✅ Close the cart when clearing items
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                totalPrice,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
                isCartOpen, // ✅ Expose cart visibility state
                setIsCartOpen, // ✅ Expose function to toggle cart visibility
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
