import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../assets/fontawesome/regular/image.svg';

const DefaultImage = ({ className, displayText, imageClassName, textClassName }) => {
    const classNames = 'default-image ' + (className ? className : '');
    const imageClassNames = 'default-image__image ' + (imageClassName ? imageClassName : '');
    const textClassNames = 'default-image__text ' + (textClassName ? textClassName : '');

    return (
        <div className={classNames}>
            <img src={Image} alt="Product Image" className={imageClassNames} />
            {displayText && <span className={textClassNames}>No Image Available</span>}
        </div>
    );
};

DefaultImage.propTypes = {
    className: PropTypes.string,
    displayText: PropTypes.bool,
    imageClassName: PropTypes.string,
    textClassName: PropTypes.string,
};

DefaultImage.defaultProps = {
    className: '',
    displayText: true,
    imageClassName: '',
    textClassName: '',
};

export default DefaultImage;
