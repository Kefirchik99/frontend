import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import CartOverlay from "../CartOverlay";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useHeader } from "../../context/HeaderContext";

const categories = [
    { id: "all", name: "All" },
    { id: "clothes", name: "Clothes" },
    { id: "tech", name: "Tech" },
];

const Header = () => {
    const { totalItems } = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const location = useLocation();
    const { category } = useHeader();

    const handleCartToggle = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__categories">
                    {categories.map((categoryItem) => {
                        const toPath = `/category/${categoryItem.id.toLowerCase()}`;
                        const isActive =
                            location.pathname === toPath ||
                            (location.pathname.startsWith("/product/") &&
                                category === categoryItem.id.toLowerCase());

                        return (
                            <li key={categoryItem.id}>
                                <Link
                                    to={toPath}
                                    className={`header__category ${isActive ? "header__category--active" : ""
                                        }`}
                                    data-testid={
                                        isActive ? "active-category-link" : "category-link"
                                    }
                                >
                                    {categoryItem.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Cart Button and Cart Overlay Wrapper */}
            <div className="header__cart-container">
                <div className="header__cart">
                    <button
                        className="header__cart-btn"
                        onClick={handleCartToggle}
                        data-testid="cart-btn"
                    >
                        <i className="bi bi-cart"></i>
                        {totalItems > 0 && (
                            <span className="header__cart-count">{totalItems}</span>
                        )}
                    </button>

                    {/* Cart Overlay (Correctly Positioned Under Cart Button) */}
                    {isCartOpen && (
                        <div className="header__cart-overlay">
                            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
