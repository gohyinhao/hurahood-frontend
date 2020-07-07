import React from 'react';
import PropTypes from 'prop-types';
import Star from '../utility/Star';

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

    return array;
};

const Rating = ({
    className,
    numOfRatings,
    rating,
    showNumOfRatings,
    showRatingValue,
    starAlignment,
    valueClassName,
}) => {
    const classNames = 'rating ' + (className ? className : '');
    const starWrapperClassNames = `rating__star-wrapper rating__star-wrapper--${starAlignment}`;
    const valueClassNames = 'rating__value ' + (valueClassName ? valueClassName : '');

    const array = generateStarsArray(rating);

    return (
        <div className={classNames}>
            {showRatingValue && <span className={valueClassNames}>{rating}</span>}
            <div className={starWrapperClassNames}>
                {array.map((type, index) => (
                    <Star key={index} className="rating__star" type={type} />
                ))}
            </div>
            {showNumOfRatings && <span className="rating__num-of-ratings">({numOfRatings})</span>}
        </div>
    );
};

Rating.propTypes = {
    className: PropTypes.string,
    numOfRatings: PropTypes.number,
    rating: PropTypes.string.isRequired,
    showNumOfRatings: PropTypes.bool,
    showRatingValue: PropTypes.bool,
    starAlignment: PropTypes.oneOf(['left', 'center', 'right']),
    valueClassName: PropTypes.string,
};

Rating.defaultProps = {
    className: '',
    numOfRatings: 0,
    showNumOfRatings: false,
    showRatingValue: false,
    starAlignment: 'left',
    valueClassName: '',
};

export default Rating;
