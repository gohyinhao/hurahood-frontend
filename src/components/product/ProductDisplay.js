import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import Button from '../Button';
import CarouselList from '../carousel/CarouselList';
import ExpandableText from '../ExpandableText';
import HeartIcon from '../../assets/fontawesome/regular/heart.svg';
import FilledHeartIcon from '../../assets/fontawesome/solid/heart.svg';
import MapMarkerIcon from '../../assets/fontawesome/solid/map-marker-alt.svg';
import ChatIcon from '../../assets/fontawesome/regular/comment-alt.svg';

const ProductDisplay = ({
    activeImageIndex,
    brand,
    className,
    companyLogo,
    description,
    images,
    isFavourited,
    location,
    onImageChange,
    numOfRatings,
    rating,
}) => {
    const classNames = 'product-display ' + (className ? className : '');
    const firstScrollValue = 150;
    const scrollValue = 190;
    const lastScrollValue = 150;

    const calcScrollPosition = () => {
        if (activeImageIndex === 0) {
            return 0;
        } else if (activeImageIndex === 1) {
            return firstScrollValue;
        } else {
            return firstScrollValue + (activeImageIndex - 1) * scrollValue;
        }
    };

    const onScroll = (scrollPosition) => {
        let imageIndex;
        if (scrollPosition <= 0) {
            imageIndex = 0;
        } else if (scrollPosition <= firstScrollValue) {
            imageIndex = 1;
        } else {
            imageIndex = 1 + Math.ceil((scrollPosition - firstScrollValue) / scrollValue);
        }

        if (imageIndex >= images.length) {
            // TODO: fix bug where can click next twice on end unless move mouse away and back for it to be disabled
            imageIndex = images.length - 1;
        }

        onImageChange(imageIndex);
    };

    return (
        <div className={classNames}>
            <img src={companyLogo} className="product-display__logo" />
            <h2 className="product-display__brand">{brand}</h2>
            <Rating
                className="product-display__rating"
                numOfRatings={numOfRatings}
                rating={rating}
                showNumOfRatings
                showRatingValue
            />
            <div className="product-display__location">
                <img src={MapMarkerIcon} className="product-display__location-icon" />
                <span className="product-display__location-text">{location}</span>
            </div>
            <div className="product-display__chat-button-wrapper">
                <Button
                    className="product-display__chat-button"
                    text="Chat with service provider"
                    onClick={() => {}}
                    iconBefore={ChatIcon}
                    size="full"
                />
            </div>
            <div className="product-display__heart-wrapper">
                {isFavourited ? (
                    <img
                        src={FilledHeartIcon}
                        className="product-display__heart product-display__heart--filled"
                    />
                ) : (
                    <img src={HeartIcon} className="product-display__heart" />
                )}
            </div>
            <Button
                className="product-display__booking-button"
                backgroundColor="black"
                text="MAKE A BOOKING!"
                onClick={() => {}}
                textColor="tertiary"
                size="full"
            />
            <ExpandableText className="product-display__description" text={description} />
            <CarouselList
                caretStyle="thick"
                useInvisibleCarets
                firstScrollValue={firstScrollValue}
                scrollValue={scrollValue}
                lastScrollValue={lastScrollValue}
                className="product-display__image-gallery"
                onScroll={onScroll}
                scrollPosition={calcScrollPosition()}
            >
                {images.map((image, index) => (
                    <img key={index} src={image} className="product-display__image" />
                ))}
            </CarouselList>
        </div>
    );
};

ProductDisplay.propTypes = {
    activeImageIndex: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    className: PropTypes.string,
    companyLogo: PropTypes.string,
    description: PropTypes.string.isRequired,
    images: PropTypes.array,
    isFavourited: PropTypes.bool,
    location: PropTypes.string,
    onImageChange: PropTypes.func.isRequired,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

// TODO: link location to google maps
// TODO: Add stock photo if company logo unavailable
// TODO: add onClick for buttons

ProductDisplay.defaultProps = {
    className: '',
    companyLogo: '',
    isFavourited: false,
    location: 'Unavailable',
    images: [],
};

export default ProductDisplay;
