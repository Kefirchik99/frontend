import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.scss';

class ProductCard extends Component {
    handleCardClick = () => {
        const { product, onCardClick } = this.props;
        onCardClick(product.id);
    };

    handleQuickShop = (e) => {
        e.stopPropagation();
        const { product, onQuickShop } = this.props;
        onQuickShop(product.id);
    };

    render() {
        const { product } = this.props;
        const isOutOfStock = !product.inStock;

        // Safely access gallery and price values
        const productImage = product.gallery?.[0] || 'https://via.placeholder.com/300'; // Placeholder if no image
        const productPrice = product.prices?.[0]?.amount ? `$${product.prices[0].amount.toFixed(2)}` : 'Price N/A';

        return (
            <div
                className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
                onClick={this.handleCardClick}
                data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
                {/* Product Image */}
                <div className="product-card__image-container">
                    <img src={productImage} alt={product.name} className="product-card__image" />
                    {isOutOfStock && (
                        <div className="product-card__overlay">
                            <p className="product-card__out-of-stock">Out of Stock</p>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="product-card__details">
                    <p className="product-card__name">{product.name}</p>
                    <p className="product-card__price">{productPrice}</p>
                </div>

                {/* Quick Shop Button */}
                {!isOutOfStock && (
                    <button
                        className="product-card__quick-shop"
                        onClick={this.handleQuickShop}
                        aria-label="Quick Shop"
                    >
                        🛒
                    </button>
                )}
            </div>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        inStock: PropTypes.bool,
        gallery: PropTypes.arrayOf(PropTypes.string),
        prices: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number,
            })
        ),
    }).isRequired,
    onCardClick: PropTypes.func,
    onQuickShop: PropTypes.func,
};

ProductCard.defaultProps = {
    onCardClick: () => { },
    onQuickShop: () => { },
};

export default ProductCard;
