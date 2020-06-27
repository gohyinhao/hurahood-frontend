import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonLink = ({
    backgroundColor,
    className,
    disabled,
    iconAfter,
    iconAfterClassName,
    iconBefore,
    iconBeforeClassName,
    text,
    textColor,
    to,
}) => {
    const classNames =
        `button-link button-link--${backgroundColor} button-link--${textColor}-text ` +
        (disabled ? 'button-link--disabled ' : '') +
        (className ? className : '');
    const iconBeforeClassNames =
        'button-link__icon button-link__icon--before ' +
        (iconBeforeClassName ? iconBeforeClassName : '');
    const iconAfterClassNames =
        'button-link__icon button-link__icon--after ' +
        (iconAfterClassName ? iconAfterClassName : '');

    return (
        <Link to={to} className={classNames}>
            {iconBefore && <img className={iconBeforeClassNames} src={iconBefore} />}
            {text}
            {iconAfter && <img className={iconAfterClassNames} src={iconAfter} />}
        </Link>
    );
};

ButtonLink.propTypes = {
    backgroundColor: PropTypes.oneOf(['white', 'black', 'facebook']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconAfter: PropTypes.string,
    iconAfterClassName: PropTypes.string,
    iconBefore: PropTypes.string,
    iconBeforeClassName: PropTypes.string,
    text: PropTypes.string,
    to: PropTypes.string.isRequired,
    textColor: PropTypes.oneOf(['white', 'black', 'tertiary']),
};

ButtonLink.defaultProps = {
    backgroundColor: 'white',
    className: '',
    disabled: false,
    iconAfter: '',
    iconAfterClassName: '',
    iconBefore: '',
    iconBeforeClassName: '',
    text: 'Button',
    textColor: 'black',
};

export default ButtonLink;
