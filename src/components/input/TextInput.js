import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
    onChange = (e) => {
        const value = e.target.value;
        this.props.onChange(value);
    };

    render() {
        const { className, value, placeholder, type } = this.props;
        const classNames = 'text-input' + (className ? ` ${className}` : '');

        return (
            <input
                type={type}
                className={classNames}
                onChange={this.onChange}
                value={value}
                placeholder={placeholder}
            />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
    className: '',
    placeholder: '',
    type: 'text',
};

export default TextInput;
