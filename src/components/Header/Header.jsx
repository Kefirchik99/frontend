import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import CartOverlay from '../CartOverlay';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useHeader } from '../../context/HeaderContext'; // ✅ New: Context to manage category display

const categories = [
    { id: 'all', name: 'All' },
    { id: 'clothes', name: 'Clothes' },
    { id: 'tech', name: 'Tech' },
];

const Header = () => {
    const { totalItems } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const location = useLocation();
    const { category } = useHeader(); // ✅ New: Get current category from context

    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__categories">
                    {categories.map((categoryItem) => {
                        const toPath = `/category/${categoryItem.id}`;
                        const isActive = location.pathname === toPath;

                        return (
                            <li key={categoryItem.id}>
                                <Link
                                    to={toPath}
                                    className={`header__category ${isActive ? 'header__category--active' : ''}`}
                                    data-testid={isActive ? 'active-category-link' : 'category-link'}
                                >
                                    {categoryItem.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ✅ Display Selected Category Only When Present */}
            {category && (
                <div className="header__current-category">
                    <span>{category}</span>
                </div>
            )}

            {/* Cart Button */}
            <div className="header__cart">
                <button className="header__cart-btn" onClick={handleCartToggle} data-testid="cart-btn">
                    <i className="bi bi-cart"></i>
                    {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
                </button>
            </div>

            {/* Cart Overlay */}
            {isCartOpen && <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
        </header>
    );
};

export default Header;
