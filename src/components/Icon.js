import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Icon = ({ link, linkClassName, icon, iconClassName }) => {
    return (
        <Link to={link} className={linkClassName}>
            <img src={icon} className={iconClassName} />
        </Link>
    );
};

// TOOD: add isactive styles
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    iconClassName: PropTypes.string,
    link: PropTypes.string.isRequired,
    linkClassName: PropTypes.string,
};

Icon.defaultProps = {
    iconClassName: '',
    linkClassName: '',
};

export default Icon;
