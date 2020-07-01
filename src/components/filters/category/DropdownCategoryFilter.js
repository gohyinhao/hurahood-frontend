import React from 'react';
import PropTypes from 'prop-types';

const DropdownCategoryFilter = ({ className, onChange, value }) => {
    const classNames = 'dropdown-category-filter ' + (className ? className : '');

    return (
        <div className={classNames}>
            <select
                className="dropdown-category-filter__select"
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                <option value="all" defaultValue>
                    All
                </option>
                <option value="facial">Facial</option>
                <option value="massage">Massage</option>
                <option value="manicure">Manicure</option>
                <option value="hair-treatment">Hair Treatment</option>
                <option value="hair-cut">Hair Cut</option>
            </select>
        </div>
    );
};

DropdownCategoryFilter.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

DropdownCategoryFilter.defaultProps = {
    className: '',
};

export default DropdownCategoryFilter;
