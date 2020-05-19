import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ className, title, content }) => {
    const classNames = 'list-item' + (className ? ` ${className}` : '');

    return (
        <div className={classNames}>
            <h3 className="list-item__title">{title}</h3>
            <p className="list-item__content">{content}</p>
        </div>
    );
};

ListItem.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
    className: '',
};

export default ListItem;
