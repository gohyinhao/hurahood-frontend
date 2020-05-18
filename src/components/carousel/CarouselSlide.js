import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({ isActive, title, subtitle, image }) => {
    const styles = {
        backgroundImage: image
            ? `linear-gradient(
            to right bottom,
            rgba(0, 0, 0, .25),
            rgba(0, 0, 0, .25)), url(${image})`
            : 'none',
        backgroundColor: image ? 'unset' : 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const className = 'carousel-slide' + (isActive ? ' carousel-slide--active' : '');

    return (
        <div className={className} style={styles}>
            <div className="carousel-slide__wrapper">
                {title && <h2 className="carousel-slide__header">{title}</h2>}
                {subtitle && <p className="carousel-slide__subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};

CarouselSlide.propTypes = {
    isActive: PropTypes.bool.isRequired,
    image: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
};

CarouselSlide.defaultProps = {
    image: '',
    subtitle: '',
    title: '',
};

export default CarouselSlide;
