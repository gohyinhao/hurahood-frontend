import React from 'react';
import PropTypes from 'prop-types';
import RatingBar from './RatingBar';

const RatingDistribution = ({
    className,
    ratings: { oneStar, twoStar, threeStar, fourStar, fiveStar },
}) => {
    const classNames = 'rating-distribution ' + (className ? className : '');
    const total = oneStar + twoStar + threeStar + fourStar + fiveStar;
    const numOfRatings = [];
    numOfRatings.push(oneStar);
    numOfRatings.push(twoStar);
    numOfRatings.push(threeStar);
    numOfRatings.push(fourStar);
    numOfRatings.push(fiveStar);

    return (
        <div className={classNames}>
            {numOfRatings.map((numOfRating, index) => (
                <RatingBar
                    key={index}
                    rating={index + 1}
                    numOfRatings={numOfRating}
                    percentage={Math.round((numOfRating / total) * 100)}
                />
            ))}
        </div>
    );
};

RatingDistribution.propTypes = {
    className: PropTypes.string,
    ratings: PropTypes.shape({
        oneStar: PropTypes.number.isRequired,
        twoStar: PropTypes.number.isRequired,
        threeStar: PropTypes.number.isRequired,
        fourStar: PropTypes.number.isRequired,
        fiveStar: PropTypes.number.isRequired,
    }),
};

RatingDistribution.defaultProps = {
    className: '',
};

export default RatingDistribution;
