import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ExpandableText from './ExpandableText';
import Rating from './rating/Rating';

// TODO: add images to reviews

const Review = ({ className, rating, text, timestamp, user: { avatar, name } }) => {
    const classNames = 'review ' + (className ? className : '');

    return (
        <div className={classNames}>
            <div className="review__info-wrapper">
                <img className="review__profile-pic" src={avatar} alt="Profile Picture" />
                <div className="review__user-name">{name}</div>
                <div className="review__rating-wrapper">
                    <Rating rating={rating} />
                    <span className="review__timestamp">{moment(timestamp).fromNow()}</span>
                </div>
                <div className="review__image-wrapper">TO PLACE IMAGES HERE</div>
            </div>
            <ExpandableText className="review__text" charLimit={300} text={text} />
        </div>
    );
};

Review.propTypes = {
    className: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

Review.defaultProps = {
    className: '',
    images: [],
};

export default Review;
