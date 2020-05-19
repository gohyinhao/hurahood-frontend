import React from 'react';
import PropTypes from 'prop-types';
import Star from './utility/Star';

const generateStarsArray = (rating) => {
    const array = [];
    let ratingValue = rating;
    let count = 0;
    while (ratingValue > 0) {
        if (ratingValue >= 1) {
            array.push('full');
            ratingValue -= 1;
            count++;
            continue;
        } else if (ratingValue >= 0.5) {
            array.push('half');
            count++;
            break;
        } else {
            break;
        }
    }

    while (count < 5) {
        array.push('empty');
        count++;
    }

    return array;
};

const Rating = ({ className, numOfRatings, rating }) => {
    const classNames = 'rating' + (className ? ` ${className}` : '');

    const array = generateStarsArray(rating);

    return (
        <div className={classNames}>
            <div className="rating__stars">
                <span className="rating__value">{rating}</span>
                {array.map((type, index) => (
                    <Star key={index} type={type} />
                ))}
                <span className="rating__num-of-ratings">({numOfRatings})</span>
            </div>
        </div>
    );
};

Rating.propTypes = {
    className: PropTypes.string,
    numOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
    className: '',
};

export default Rating;
