import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CarouselThumbnail = ({ image, path, title, size }) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <Link to={path} className={`carousel-thumbnail carousel-thumbnail--${size}`} style={styles}>
            {title && <span className="carousel-thumbnail__title">{title}</span>}
        </Link>
    );
};

CarouselThumbnail.propTypes = {
    image: PropTypes.string.isRequired,
    path: PropTypes.string,
    size: PropTypes.oneOf(['medium']),
    title: PropTypes.string,
};

CarouselThumbnail.defaultProps = {
    path: '#',
    size: 'medium',
    title: '',
};

export default CarouselThumbnail;
