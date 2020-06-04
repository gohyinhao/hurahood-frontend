import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../../components/rating/Rating';

const ProductItem = ({ brand, className, image, location, numOfRatings, rating, category }) => {
    const classNames = 'product-item' + (className ? ` ${className}` : '');

    return (
        <div className={classNames}>
            <div className="product-item__image-wrapper">
                <img src={image} alt="Product Image" className="product-item__image" />
            </div>
            <div className="product-item__description">
                <h3 className="product-item__brand">{brand}</h3>
                <h4 className="product-item__category">{category}</h4>
                {<p className="product-item__location">{location ? location : 'Unavailable'}</p>}
                <Rating
                    showRatingValue
                    showNumOfRatings
                    rating={rating}
                    numOfRatings={numOfRatings}
                />
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    image: PropTypes.string.isRequired,
    location: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
};

ProductItem.defaultProps = {
    className: '',
    location: '',
};

export default ProductItem;
