import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUpForm extends Component {
    render() {
        return <div>Sign Up Form</div>;
    }
}

SignUpForm.propTypes = {
    className: PropTypes.string,
};

SignUpForm.defaultProps = {
    className: '',
};

export default SignUpForm;
