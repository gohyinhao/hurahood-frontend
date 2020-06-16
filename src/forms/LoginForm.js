import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../components/input';
import Button from '../components/Button';
import CompanyLogo from '../assets/images/hurahood_logo_with_text.svg';
import FacebookLogo from '../assets/fontawesome/brands/facebook-f.svg';
import GoogleLogo from '../assets/fontawesome/brands/google.svg';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    };

    onFormSubmit = () => {};

    onFacebookLogin = () => {};
    onGoogleLogin = () => {};

    render() {
        const { className, showSignUpForm } = this.props;
        const classNames = 'login-form ' + (className ? className : '');

        return (
            <div className={classNames}>
                <img src={CompanyLogo} alt="HuraHood Logo" className="login-form__logo" />
                <form className="login-form__form">
                    <Input.TextInput
                        className="login-form__text"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={(email) => this.setState({ email })}
                    />
                    <Input.TextInput
                        className="login-form__text"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(password) => this.setState({ password })}
                        type="password"
                    />
                    <Button
                        className="login-form__button"
                        size="full"
                        onClick={this.onFormSubmit}
                        text="Login"
                    />
                    {/* {TODO: add error} */}
                </form>
                <Link to="#" className="login-form__forgot-pass">
                    Forgot password?
                </Link>
                <div className="login-form__break">OR</div>
                <div className="login-form__social-buttons">
                    <Button
                        backgroundColor="facebook"
                        className="login-form__facebook"
                        size="full"
                        onClick={this.onFacebookLogin}
                        text="Facebook"
                        textColor="white"
                        iconBefore={FacebookLogo}
                        iconBeforeClassName="login-form__facebook-logo"
                    />
                    <Button
                        className="login-form__google"
                        size="full"
                        onClick={this.onGoogleLogin}
                        text="Google"
                        iconBefore={GoogleLogo}
                        iconBeforeClassName="login-form__google-logo"
                    />
                </div>
                <p className="login-form__sign-up">
                    New to HuraHood? Register for an account{' '}
                    <span className="login-form__sign-up-link" onClick={showSignUpForm}>
                        here
                    </span>
                </p>
            </div>
        );
    }
}

LoginForm.propTypes = {
    className: PropTypes.string,
    showSignUpForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    className: '',
};

export default LoginForm;
