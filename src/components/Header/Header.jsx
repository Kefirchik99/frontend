import React from "react";
import "./Header.scss";

const Header = ({ cartItemCount, categories, activeCategory, onCategoryClick }) => {
    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__categories">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`header__category ${activeCategory === category.id ? "header__category--active" : ""
                                }`}
                            data-testid={
                                activeCategory === category.id
                                    ? "active-category-link"
                                    : "category-link"
                            }
                            onClick={() => onCategoryClick(category.id)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="header__cart">
                <button
                    className="header__cart-btn"
                    data-testid="cart-btn"
                >
                    🛒
                    {cartItemCount > 0 && (
                        <span className="header__cart-count">{cartItemCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
