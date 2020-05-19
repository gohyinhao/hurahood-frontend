import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ className, children }) => {
    const classNames = 'message' + (className ? ` ${className}` : '');

    return <div className={classNames}>{children}</div>;
};

Message.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
};

Message.defaultProps = {
    className: '',
};

export default Message;
