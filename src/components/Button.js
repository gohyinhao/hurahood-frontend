import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, onClick, text }) => {
    const classNames = 'button' + (className ? ` ${className}` : '');
    return (
        <button className={classNames} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
};

Button.defaultProps = {
    className: '',
    text: 'Button',
};

export default Button;
