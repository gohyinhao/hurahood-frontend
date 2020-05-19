import React from 'react';
import PropTypes from 'prop-types';
import StarImage from '../../assets/fontawesome/solid/star.svg';
import HalfStarImage from '../../assets/fontawesome/solid/star-half.svg';

const Star = ({ type }) => {
    let classNames = 'star';
    switch (type) {
        case 'empty':
            classNames += ' star--empty';
            return <div className={classNames} />;
        case 'half':
            classNames += ' star--half';
            return <img src={HalfStarImage} alt="Half-star" className={classNames} />;
        case 'full':
            classNames += ' star--full';
            return <img src={StarImage} alt="Star" className={classNames} />;
    }
};

Star.propTypes = {
    type: PropTypes.oneOf(['empty', 'half', 'full']).isRequired,
};

export default Star;
