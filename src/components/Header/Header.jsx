import React from 'react';
import './Header.scss';
import CartOverlay from '../CartOverlay';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const categories = [
    { id: 'all', name: 'All' },
    { id: 'clothes', name: 'Clothes' },
    { id: 'tech', name: 'Tech' },
];

const Header = ({ activeCategory, onCategoryChange }) => {
    const { totalItems } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <header className="header">
            {/* Navigation Links */}
            <nav className="header__nav">
                <ul className="header__categories">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                className={`header__category ${activeCategory === category.id ? 'header__category--active' : ''
                                    }`}
                                onClick={() => onCategoryChange(category.id)}
                                data-testid={
                                    activeCategory === category.id
                                        ? 'active-category-link'
                                        : 'category-link'
                                }
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
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
