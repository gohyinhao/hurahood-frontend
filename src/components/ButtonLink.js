import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonLink = ({ className, text, to }) => {
    const classNames = 'button-link ' + (className ? className : '');

    return (
        <Link to={to} className={classNames}>
            {text}
        </Link>
    );
};

ButtonLink.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    to: PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {
    className: '',
    text: 'Button',
};

export default ButtonLink;
