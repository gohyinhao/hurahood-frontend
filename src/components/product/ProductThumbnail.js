import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../../components/Rating';
import HeartImage from '../../assets/fontawesome/regular/heart.svg';
import FilledHeartImage from '../../assets/fontawesome/solid/heart.svg';

// PRICE TIER LIST
const SINGLE_DOLLAR_CAP = 20; // $
const DOUBLE_DOLLAR_CAP = 50; // $$
const TRIPLE_DOLLAR_CAP = 100; // $$$
const QUAD_DOLLAR_CAP = 300; // $$$$

const calculatePriceTag = (lowestPrice, highestPrice) => {
    let result = '';

    if (lowestPrice <= SINGLE_DOLLAR_CAP) {
        result += '$';

        if (highestPrice <= SINGLE_DOLLAR_CAP) {
            // do nothing
        } else if (highestPrice <= DOUBLE_DOLLAR_CAP) {
            result += ' - $$';
        } else if (highestPrice <= TRIPLE_DOLLAR_CAP) {
            result += ' - $$$';
        } else if (highestPrice <= QUAD_DOLLAR_CAP) {
            result += ' - $$$$';
        } else {
            result += ' - $$$$$';
        }
    } else if (lowestPrice <= DOUBLE_DOLLAR_CAP) {
        result += '$$';

        if (highestPrice <= DOUBLE_DOLLAR_CAP) {
            // do nothing
        } else if (highestPrice <= TRIPLE_DOLLAR_CAP) {
            result += ' - $$$';
        } else if (highestPrice <= QUAD_DOLLAR_CAP) {
            result += ' - $$$$';
        } else {
            result += ' - $$$$$';
        }
    } else if (lowestPrice <= TRIPLE_DOLLAR_CAP) {
        result += '$$$';

        if (highestPrice <= TRIPLE_DOLLAR_CAP) {
            // do nothing
        } else if (highestPrice <= QUAD_DOLLAR_CAP) {
            result += ' - $$$$';
        } else {
            result += ' - $$$$$';
        }
    } else if (lowestPrice <= QUAD_DOLLAR_CAP) {
        result += '$$$$';

        if (highestPrice <= QUAD_DOLLAR_CAP) {
            // do nothing
        } else {
            result += ' - $$$$$';
        }
    } else {
        return '$$$$$';
    }

    return result;
};

const ProductThumbnail = ({
    brand,
    category,
    className,
    highestPrice,
    image,
    isFavourited,
    lowestPrice,
    numOfRatings,
    rating,
}) => {
    const classNames = 'product-thumbnail ' + (className ? className : '');
    const heartClassNames =
        'product-thumbnail__heart ' + (isFavourited ? 'product-thumbnail__heart--filled' : '');

    return (
        <div className={classNames}>
            <div className="product-thumbnail__image-wrapper">
                <img src={image} alt="Product Image" className="product-thumbnail__image" />
            </div>
            <div className="product-thumbnail__description">
                <div className="product-thumbnail__main-info">
                    <h3 className="product-thumbnail__brand">{brand}</h3>
                    <h4 className="product-thumbnail__category">{category}</h4>
                </div>
                <img
                    src={isFavourited ? FilledHeartImage : HeartImage}
                    className={heartClassNames}
                />
            </div>
            <div className="product-thumbnail__miscellaneous">
                <span className="product-thumbnail__price">
                    {calculatePriceTag(lowestPrice, highestPrice)}
                </span>
                <Rating rating={rating} numOfRatings={numOfRatings} showRatingValue />
            </div>
        </div>
    );
};

ProductThumbnail.propTypes = {
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    highestPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isFavourited: PropTypes.bool.isRequired,
    location: PropTypes.string,
    lowestPrice: PropTypes.number.isRequired,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

ProductThumbnail.defaultProps = {
    className: '',
    location: '',
};

export default ProductThumbnail;
