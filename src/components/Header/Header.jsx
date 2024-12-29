import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import CartOverlay from '../CartOverlay';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const categories = [
    { id: 'all', name: 'All' },
    { id: 'clothes', name: 'Clothes' },
    { id: 'tech', name: 'Tech' },
];

const Header = () => {
    const { totalItems } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    // Current URL location
    const location = useLocation();

    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <header className="header">
            {/* Navigation Links */}
            <nav className="header__nav">
                <ul className="header__categories">
                    {categories.map((category) => {
                        // e.g. "/category/all"
                        const toPath = `/category/${category.id}`;
                        // We'll check if the location.pathname includes "/category/all"
                        const isActive = location.pathname === toPath;
                        return (
                            <li key={category.id}>
                                <Link
                                    to={toPath}
                                    className={`header__category ${isActive ? 'header__category--active' : ''}`}
                                    data-testid={isActive ? 'active-category-link' : 'category-link'}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Cart Button */}
            <div className="header__cart">
                <button
                    className="header__cart-btn"
                    onClick={handleCartToggle}
                    data-testid="cart-btn"
                >
                    🛒
                    {totalItems > 0 && (
                        <span className="header__cart-count">{totalItems}</span>
                    )}
                </button>
            </div>

            {/* Cart Overlay */}
            {isCartOpen && (
                <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            )}
        </header>
    );
};

export default Header;
