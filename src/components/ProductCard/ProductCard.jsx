import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

class ProductCard extends Component {
    // Quick Shop: calls onQuickShop with product.id
    // The parent or listing page will handle "default attributes" logic.
    handleQuickShop = (e) => {
        e.stopPropagation(); // prevent card click navigation
        const { product, onQuickShop } = this.props;
        onQuickShop(product.id);
    };

    render() {
        const { product } = this.props;
        // out-of-stock => image greyed out
        const isOutOfStock = !product.inStock;

        // main image or placeholder
        const productImage = product.gallery?.[0] || 'https://via.placeholder.com/300';
        // price with 2 decimals
        const productPrice = product.price ? `$${product.price.toFixed(2)}` : 'Price N/A';

        // Convert product name to kebab-case for data-testid
        const kebabName = product.name.toLowerCase().replace(/\s+/g, '-');

        return (
            <Link
                to={`/product/${product.id}`}
                className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
                data-testid={`product-${kebabName}`}
            >
                <div className="product-card__image-container">
                    <img
                        src={productImage}
                        alt={product.name}
                        className="product-card__image"
                    />
                    {isOutOfStock && (
                        <div className="product-card__overlay">
                            <p className="product-card__out-of-stock">Out of Stock</p>
                        </div>
                    )}
                </div>

                <div className="product-card__details">
                    <p className="product-card__name">{product.name}</p>
                    <p className="product-card__price">{productPrice}</p>
                </div>

                {/* Quick Shop button hidden if out-of-stock.
            It also only shows on hover via CSS. */}
                {!isOutOfStock && (
                    <button
                        className="product-card__quick-shop"
                        onClick={this.handleQuickShop}
                        aria-label="Quick Shop"
                        data-testid="quick-shop-button"
                    >
                        {/* Example green cart icon or emoji */}
                        🛒
                    </button>
                )}
            </Link>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        inStock: PropTypes.bool,
        gallery: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
    }).isRequired,
    onQuickShop: PropTypes.func,
};

ProductCard.defaultProps = {
    onQuickShop: () => { },
};

export default ProductCard;
