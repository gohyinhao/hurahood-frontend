import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    className,
    backgroundColor,
    iconBefore,
    iconBeforeClassName,
    iconAfter,
    iconAfterClassName,
    textColor,
    onClick,
    size,
    text,
}) => {
    const classNames =
        `button button--${size} button--${backgroundColor} button--${textColor}-text ` +
        (className ? className : '');
    const iconBeforeClassNames =
        'button__icon button__icon--before ' + (iconBeforeClassName ? iconBeforeClassName : '');
    const iconAfterClassNames =
        'button__icon button__icon--after ' + (iconAfterClassName ? iconAfterClassName : '');

    return (
        <button className={classNames} onClick={onClick}>
            {iconBefore && <img className={iconBeforeClassNames} src={iconBefore} />}
            <span>{text}</span>
            {iconAfter && <img className={iconAfterClassNames} src={iconAfter} />}
        </button>
    );
};

Button.propTypes = {
    backgroundColor: PropTypes.oneOf(['white', 'black', 'facebook']),
    className: PropTypes.string,
    iconAfter: PropTypes.string,
    iconAfterClassName: PropTypes.string,
    iconBefore: PropTypes.string,
    iconBeforeClassName: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
    text: PropTypes.string,
    textColor: PropTypes.oneOf(['white', 'black', 'tertiary']),
};

Button.defaultProps = {
    backgroundColor: 'white',
    className: '',
    iconAfter: '',
    iconAfterClassName: '',
    iconBefore: '',
    iconBeforeClassName: '',
    size: 'medium',
    text: 'Button',
    textColor: 'black',
};

export default Button;
