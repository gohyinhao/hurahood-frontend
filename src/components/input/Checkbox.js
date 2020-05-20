import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ className, isChecked, onChange, text }) => {
    const classNames = 'checkbox ' + (className ? className : '');

    return (
        <label className={classNames}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onChange(e.target.checked, text)}
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
};

Checkbox.defaultProps = {
    className: '',
    isChecked: false,
};

export default Checkbox;
