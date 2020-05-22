import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CarouselThumbnail = ({ image, path, title }) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <Link to={path} className="carousel-thumbnail" style={styles}>
            <span className="carousel-thumbnail__title">{title}</span>
        </Link>
    );
};

CarouselThumbnail.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
};

CarouselThumbnail.defaultProps = {
    path: '#',
};

export default CarouselThumbnail;
