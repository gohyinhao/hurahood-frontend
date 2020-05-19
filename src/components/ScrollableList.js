import React from 'react';
import PropTypes from 'prop-types';

const ScrollableList = ({ children, className, title }) => {
    const classNames = 'scrollable-list' + (className ? ` ${className}` : '');

    return (
        <div className={classNames}>
            <h3 className="scrollable-list__title">{title}</h3>
            <div className="scrollable-list__body">{children}</div>
        </div>
    );
};

ScrollableList.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
};

ScrollableList.defaultProps = {
    className: '',
};

export default ScrollableList;
