import React from 'react';
import PropTypes from 'prop-types';

const ListingToggle = ({ className, onChange, value }) => {
    const classNames = 'listing-toggle ' + (className ? className : '');
    return (
        <div className={classNames}>
            Number of listings shown:{' '}
            <select
                className="listing-toggle__select"
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                <option value="10">10</option>
                <option value="20" defaultValue>
                    20
                </option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
        </div>
    );
};

ListingToggle.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

ListingToggle.defaultProps = {
    className: '',
};

export default ListingToggle;
