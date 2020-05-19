import React from 'react';
import PropTypes from 'prop-types';

//TODO: convert this to a link

const CarouselThumbnail = ({ image, title }) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="carousel-thumbnail" style={styles}>
            <span className="carousel-thumbnail__title">{title}</span>
        </div>
    );
};

CarouselThumbnail.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default CarouselThumbnail;
