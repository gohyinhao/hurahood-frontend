import React from 'react';
import PropTypes from 'prop-types';
import StarImage from '../../assets/fontawesome/solid/star.svg';
import HalfStarImage from '../../assets/fontawesome/solid/star-half.svg';

const Star = ({ className, type }) => {
    let classNames = `star ${className ? className : ''} star--`;
    switch (type) {
        case 'empty':
            classNames += 'empty';
            return <div className={classNames} />;
        case 'half':
            classNames += 'half';
            return <img src={HalfStarImage} alt="Half-star" className={classNames} />;
        case 'full':
            classNames += 'full';
            return <img src={StarImage} alt="Star" className={classNames} />;
    }
};

Star.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['empty', 'half', 'full']).isRequired,
};

Star.defaultProps = {
    className: '',
};

export default Star;
