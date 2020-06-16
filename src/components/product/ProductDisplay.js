import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import Button from '../Button';
import CarouselList from '../carousel/CarouselList';
import ExpandableText from '../ExpandableText';
import { capitalizeWords } from '../../utils/helper';
import HeartIcon from '../../assets/images/heart.svg';
import FilledHeartIcon from '../../assets/images/heart-filled.svg';
import MapMarkerIcon from '../../assets/fontawesome/solid/map-marker-alt.svg';
import ChatIcon from '../../assets/fontawesome/regular/comment-alt.svg';
import InstagramIcon from '../../assets/social-media/instagram-filled.svg';
import FacebookIcon from '../../assets/social-media/facebook-filled.svg';
import TwitterIcon from '../../assets/social-media/twitter-filled.svg';
import PinterestIcon from '../../assets/social-media/pinterest-filled.svg';
import DefaultImage from '../../assets/images/no-image-available.svg';

const ProductDisplay = ({
    activeImageIndex,
    merchant,
    className,
    companyLogo,
    coordinates,
    description,
    images,
    isFavourited,
    address,
    onImageChange,
    numOfRatings,
    rating,
    socialMedia,
}) => {
    const classNames = 'product-display ' + (className ? className : '');
    const imageClassNames =
        'product-display__image ' + (images.length === 1 ? 'product-display__image--single' : '');
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
            <div className="product-display__logo-wrapper">
                <img src={companyLogo} className="product-display__logo" />
            </div>
            <h2 className="product-display__merchant">{merchant}</h2>
            <Rating
                className="product-display__rating"
                numOfRatings={numOfRatings}
                rating={rating}
                showNumOfRatings
                showRatingValue
                valueClassName="product-display__rating-value"
            />
            {coordinates ? (
                <a
                    className="product-display__location"
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${coordinates[1]},${coordinates[0]}`}
                >
                    <img src={MapMarkerIcon} className="product-display__location-icon" />
                    <span className="product-display__location-text">
                        {capitalizeWords(address)}
                    </span>
                </a>
            ) : (
                <div className="product-display__location">
                    <img src={MapMarkerIcon} className="product-display__location-icon" />
                    <span className="product-display__location-text">
                        {capitalizeWords(address)}
                    </span>
                </div>
            )}

            <div className="product-display__social-media">
                {socialMedia.instagram && (
                    <a
                        href={socialMedia.instagram}
                        target="_blank"
                        className="product-display__social-media-link"
                    >
                        <img
                            src={InstagramIcon}
                            alt={`Link to ${merchant}'s Instagram page`}
                            className="product-display__social-media-icon"
                        />
                    </a>
                )}
                {socialMedia.facebook && (
                    <a
                        href={socialMedia.facebook}
                        target="_blank"
                        className="product-display__social-media-link"
                    >
                        <img
                            src={FacebookIcon}
                            alt={`Link to ${merchant}'s Facebook page`}
                            className="product-display__social-media-icon"
                        />
                    </a>
                )}
                {socialMedia.twitter && (
                    <a
                        href={socialMedia.twitter}
                        target="_blank"
                        className="product-display__social-media-link"
                    >
                        <img
                            src={TwitterIcon}
                            alt={`Link to ${merchant}'s Twitter page`}
                            className="product-display__social-media-icon"
                        />
                    </a>
                )}
                {socialMedia.pinterest && (
                    <a
                        href={socialMedia.pinterest}
                        target="_blank"
                        className="product-display__social-media-link"
                    >
                        <img
                            src={PinterestIcon}
                            alt={`Link to ${merchant}'s Pinterest page`}
                            className="product-display__social-media-icon"
                        />
                    </a>
                )}
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
                <img
                    src={isFavourited ? FilledHeartIcon : HeartIcon}
                    className="product-display__heart"
                />
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
                caretStyle={images.length <= 1 ? 'none' : 'thick'}
                useInvisibleCarets
                firstScrollValue={firstScrollValue}
                scrollValue={scrollValue}
                lastScrollValue={lastScrollValue}
                className="product-display__image-gallery"
                onScroll={onScroll}
                scrollPosition={calcScrollPosition()}
            >
                {images.length === 0 ? (
                    <img
                        src={DefaultImage}
                        className="product-display__image product-display__image--single"
                    />
                ) : (
                    images.map((image, index) => (
                        <img key={index} src={image.link} className={imageClassNames} />
                    ))
                )}
            </CarouselList>
        </div>
    );
};

ProductDisplay.propTypes = {
    activeImageIndex: PropTypes.number.isRequired,
    address: PropTypes.string,
    className: PropTypes.string,
    companyLogo: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    description: PropTypes.string,
    images: PropTypes.array,
    isFavourited: PropTypes.bool,
    merchant: PropTypes.string,
    onImageChange: PropTypes.func.isRequired,
    numOfRatings: PropTypes.number,
    rating: PropTypes.string,
    socialMedia: PropTypes.shape({
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        pinterest: PropTypes.string,
        twitter: PropTypes.string,
    }),
};

// TODO: Add stock photo if company logo unavailable
// TODO: add onClick for buttons

ProductDisplay.defaultProps = {
    address: 'Unavailable',
    className: '',
    companyLogo: '',
    description: '',
    isFavourited: false,
    images: [],
    merchant: 'Unavailable',
    numOfRatings: 0,
    rating: '0',
    socialMedia: {},
};

export default ProductDisplay;
