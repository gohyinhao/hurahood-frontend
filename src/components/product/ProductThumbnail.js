import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../../components/rating/Rating';
import HeartImage from '../../assets/images/heart.svg';
import FilledHeartImage from '../../assets/images/heart-filled.svg';
import DefaultProductImage from '../../assets/fontawesome/regular/image.svg';

const calculatePriceRange = (prices) => {
    let result = '';
    let lowestPrice = Number.MAX_SAFE_INTEGER;
    let highestPrice = Number.MIN_SAFE_INTEGER;

    prices.forEach((price) => {
        if (price < lowestPrice) {
            lowestPrice = price;
        }

        if (price > highestPrice) {
            highestPrice = price;
        }
    });

    if (lowestPrice === highestPrice) {
        result = `$${Math.round(lowestPrice / 100)}`;
    } else {
        result = `\$${Math.floor(lowestPrice / 100)} - \$${Math.ceil(highestPrice / 100)}`;
    }

    return result;
};

const ProductThumbnail = ({
    title,
    category,
    className,
    image,
    isFavourited,
    numOfRatings,
    prices,
    rating,
}) => {
    const classNames = 'product-thumbnail ' + (className ? className : '');
    const imageClassNames =
        'product-thumbnail__image ' +
        (image === DefaultProductImage ? 'product-thumbnail__image--default' : '');

    return (
        <div className={classNames}>
            <div className="product-thumbnail__image-wrapper">
                <img src={image} alt="Product Image" className={imageClassNames} />
                {image === DefaultProductImage && (
                    <span className="product-thumbnail__image-caption">No Image Available</span>
                )}
            </div>
            <div className="product-thumbnail__description">
                <div className="product-thumbnail__main-info">
                    <h3 className="product-thumbnail__title">{title}</h3>
                    <h4 className="product-thumbnail__category">{category}</h4>
                </div>
                <img
                    src={isFavourited ? FilledHeartImage : HeartImage}
                    className="product-thumbnail__heart"
                />
            </div>
            <div className="product-thumbnail__miscellaneous">
                {prices.length > 0 && (
                    <span className="product-thumbnail__price">{calculatePriceRange(prices)}</span>
                )}
                <Rating
                    rating={rating}
                    numOfRatings={numOfRatings}
                    showNumOfRatings
                    showRatingValue
                />
            </div>
        </div>
    );
};

ProductThumbnail.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    image: PropTypes.string,
    isFavourited: PropTypes.bool.isRequired,
    location: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    prices: PropTypes.arrayOf(PropTypes.number),
    rating: PropTypes.string.isRequired,
};

ProductThumbnail.defaultProps = {
    className: '',
    image: DefaultProductImage,
    location: '',
    prices: [],
};

export default ProductThumbnail;
