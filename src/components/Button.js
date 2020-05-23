import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    className,
    backgroundColor,
    iconBefore,
    iconAfter,
    textColor,
    onClick,
    size,
    text,
}) => {
    const classNames =
        `button button--${size} button--${backgroundColor} button--${textColor}-text ` +
        (className ? className : '');

    return (
        <button className={classNames} onClick={onClick}>
            {iconBefore && <img className="button__icon button__icon--before" src={iconBefore} />}
            <span>{text}</span>
            {iconAfter && <img className="button__icon button__icon--after" src={iconAfter} />}
        </button>
    );
};

Button.propTypes = {
    backgroundColor: PropTypes.oneOf(['white', 'black']),
    className: PropTypes.string,
    iconAfter: PropTypes.string,
    iconBefore: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
    text: PropTypes.string,
    textColor: PropTypes.oneOf(['white', 'black', 'tertiary']),
};

Button.defaultProps = {
    backgroundColor: 'white',
    className: '',
    iconAfter: '',
    iconBefore: '',
    size: 'medium',
    text: 'Button',
    textColor: 'black',
};

export default Button;
