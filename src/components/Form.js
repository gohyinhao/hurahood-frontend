import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    };

    render() {
        const { className, children } = this.props;
        const classNames = 'form' + (className ? ` ${className}` : '');

        return (
            <form className={classNames} onSubmit={this.onSubmit}>
                {children}
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
    className: '',
};

export default Form;
