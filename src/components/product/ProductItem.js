import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../../components/Rating';

const ProductItem = ({ brand, className, image, location, numOfRatings, rating, service }) => {
    const classNames = 'product-item' + (className ? ` ${className}` : '');

    return (
        <div className={classNames}>
            <div className="product-item__image-wrapper">
                <img src={image} alt="Product Image" className="product-item__image" />
            </div>
            <div className="product-item__description">
                <h3 className="product-item__brand">{brand}</h3>
                <h4 className="product-item__service">{service}</h4>
                {<p className="product-item__location">{location ? location : 'Unavailable'}</p>}
                <Rating rating={rating} numOfRatings={numOfRatings} />
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    brand: PropTypes.string.isRequired,
    className: PropTypes.string,
    image: PropTypes.string.isRequired,
    location: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    service: PropTypes.string.isRequired,
};

ProductItem.defaultProps = {
    className: '',
    location: '',
};

export default ProductItem;
