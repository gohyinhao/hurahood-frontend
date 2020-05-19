import React from 'react';
import PropTypes from 'prop-types';

const DotSlider = ({ activeIndex, className, onClick, numOfDots }) => {
    let array = [];
    for (let i = 0; i < numOfDots; i++) {
        array.push(0);
    }

    return (
        <div className={`dot-slider ${className}`}>
            {array.map((undefined, index) => {
                const classNames =
                    'dot-slider__dot' + (activeIndex === index ? ' dot-slider__dot--active' : '');

                return (
                    <span key={index} className={classNames} onClick={onClick.bind(null, index)} />
                );
            })}
        </div>
    );
};

DotSlider.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    numOfDots: PropTypes.number.isRequired,
};

DotSlider.defaultProps = {
    className: '',
};

export default DotSlider;
