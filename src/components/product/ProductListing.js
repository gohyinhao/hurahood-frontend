import React from 'react';
import PropTypes from 'prop-types';
import DefaultImage from '../../assets/images/no-image-available.svg';
import CategoryHelper from '../../utils/categories';
import Helper from '../../utils/helper';

const ProductListing = ({ className, category, image, title, location }) => {
    const classNames = 'product-listing ' + (className ? className : '');

    return (
        <div className={classNames}>
            <div className="product-listing__image-wrapper">
                <img
                    src={image === undefined ? DefaultImage : image}
                    alt="Product Image"
                    className="product-listing__image"
                />
            </div>
            <div className="product-listing__description">
                <h3 className="product-listing__title">{title}</h3>
                <span className="product-listing__category">
                    {CategoryHelper.capitalizeCategory(category)}
                </span>
                <span className="product-listing__location">
                    {location ? Helper.capitalizeWords(location) : 'Unavailable'}
                </span>
            </div>
        </div>
    );
};

ProductListing.propTypes = {
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string.isRequired,
};

ProductListing.defaultProps = {
    className: '',
    image: undefined,
    location: '',
};

export default ProductListing;
