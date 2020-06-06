import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

const RatingBar = ({ className, numOfRatings, rating, percentage }) => {
    const classNames = 'rating-bar ' + (className ? className : '');
    const barStyles = {
        background: `linear-gradient(to right, #ffa500 0%, #ffa500 ${percentage}%, #f0eeee ${percentage}%, #f0eeee 100%)`,
    };
    return (
        <div className={classNames}>
            <Rating rating={rating.toString()} starAlignment="right" />
            <div className="rating-bar__bar" style={barStyles} />
            <span className="rating-bar__count">{numOfRatings}</span>
        </div>
    );
};

RatingBar.propTypes = {
    className: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
};

RatingBar.defaultProps = {
    className: '',
};

export default RatingBar;
