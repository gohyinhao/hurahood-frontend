import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ className, isChecked, onChange, text, value }) => {
    const classNames = 'checkbox ' + (className ? className : '');

    return (
        <label className={classNames}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onChange(e.target.checked, value)}
            />
            <span className="checkbox__checkmark"></span>
            {text}
        </label>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string,
};

Checkbox.defaultProps = {
    className: '',
    isChecked: false,
    value: '',
};

export default Checkbox;
