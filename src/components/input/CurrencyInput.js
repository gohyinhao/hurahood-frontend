import React from 'react';
import PropTypes from 'prop-types';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput = ({ className, onChange, value }) => {
    const classNames = 'currency-input ' + (className ? className : '');

    const valueAbsTrunc = Math.trunc(Math.abs(value));
    if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
        throw new Error(`invalid value property`);
    }

    const handleKeyDown = (e) => {
        const { key, keyCode } = e;
        if (
            (value === 0 && !VALID_FIRST.test(key)) ||
            (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
        ) {
            return;
        }
        const valueString = value.toString();
        let nextValue;
        if (keyCode !== DELETE_KEY_CODE) {
            const nextValueString = value === 0 ? key : `${valueString}${key}`;
            nextValue = Number.parseInt(nextValueString, 10);
        } else {
            const nextValueString = valueString.slice(0, -1);
            nextValue = nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10);
        }
        if (nextValue > Number.MAX_SAFE_INTEGER) {
            return;
        }
        onChange(nextValue);
    };

    const valueDisplay = (value / 100).toLocaleString('en-SG', {
        style: 'currency',
        currency: 'SGD',
    });

    const handleChange = () => {
        // DUMMY TO AVOID REACT WARNING
    };

    return (
        <input
            className={classNames}
            inputMode="numeric"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={valueDisplay}
        />
    );
};

CurrencyInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

CurrencyInput.defaultProps = {
    className: '',
};

export default CurrencyInput;
