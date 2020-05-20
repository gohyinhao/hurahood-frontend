import React from 'react';
import PropTypes from 'prop-types';

const List = ({ className, children }) => {
    const classNames = 'list' + (className ? ` ${className}` : '');
    return <div className={classNames}>{children}</div>;
};

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

List.defaultProps = {
    className: '',
};

export default List;
