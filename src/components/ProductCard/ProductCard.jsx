import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
    handleQuickShop = (e) => {
        e.stopPropagation();
        const { product, onQuickShop } = this.props;
        onQuickShop(product.id);
    };

    render() {
        const { product } = this.props;
        const isOutOfStock = !product.inStock;

        const productImage = product.gallery?.[0] || 'https://via.placeholder.com/300';
        const productPrice = product.price ? `$${product.price.toFixed(2)}` : 'Price N/A';

        return (
            <Link
                to={`/product/${product.id}`} // uses string ID from JSON
                className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
                data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
                <div className="product-card__image-container">
                    <img src={productImage} alt={product.name} className="product-card__image" />
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

                {!isOutOfStock && (
                    <button
                        className="product-card__quick-shop"
                        onClick={this.handleQuickShop}
                        aria-label="Quick Shop"
                        data-testid="quick-shop-button"
                    >
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
