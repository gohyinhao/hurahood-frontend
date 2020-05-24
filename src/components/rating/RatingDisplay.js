import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

const RatingDisplay = ({ className, rating, numOfRatings }) => {
    const classNames = 'rating-display ' + (className ? className : '');
    return (
        <div className={classNames}>
            <span className="rating-display__value">{rating}</span>
            <Rating rating={rating} className="rating-display__stars" />
            <span className="rating-display__reviews">{numOfRatings} reviews</span>
        </div>
    );
};

RatingDisplay.propTypes = {
    className: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

RatingDisplay.defaultProps = {
    className: '',
};

export default RatingDisplay;
