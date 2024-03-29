import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import UserActions from '../actions/users';
import UserAPI from '../api/users';
import Input from '../components/input';
import Button from '../components/Button';
import CompanyLogo from '../assets/images/hurahood_logo_with_text.svg';
import FacebookLogo from '../assets/fontawesome/brands/facebook-f.svg';
import GoogleLogo from '../assets/fontawesome/brands/google.svg';

const googleParams = queryString.stringify({
    client_id: GOOGLE_AUTH_ID,
    redirect_uri: `${FRONTEND_URL}/auth/google`,
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'online',
    prompt: 'consent',
    state: AUTH_STATE_KEY,
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${googleParams}`;

const facebookParams = queryString.stringify({
    client_id: FACEBOOK_AUTH_ID,
    redirect_uri: `${FRONTEND_URL}/auth/facebook`,
    scope: ['email'].join(','),
    response_type: 'code',
    state: AUTH_STATE_KEY,
});

const facebookLoginUrl = `https://www.facebook.com/v7.0/dialog/oauth?${facebookParams}`;

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await UserAPI.loginUser(this.state.email, this.state.password);
            this.props.updateUser(user);
            this.setState({ error: '' });
            this.props.onSuccessfulLogin();
        } catch (err) {
            this.setState({ error: err.error });
        }
    };

    onFacebookLogin = () => {
        window.location.href = facebookLoginUrl;
    };

    onGoogleLogin = () => {
        window.location.href = googleLoginUrl;
    };

    render() {
        const { error, email, password } = this.state;
        const { className, showSignUpForm } = this.props;
        const classNames = 'login-form ' + (className ? className : '');

        return (
            <div className={classNames}>
                <img src={CompanyLogo} alt="HuraHood Logo" className="login-form__logo" />
                <form className="login-form__form">
                    <Input.TextInput
                        className="login-form__text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(email) => this.setState({ email })}
                    />
                    <Input.TextInput
                        className="login-form__text"
                        placeholder="Password"
                        value={password}
                        onChange={(password) => this.setState({ password })}
                        type="password"
                    />
                    <Button
                        backgroundColor="black"
                        className="login-form__button"
                        size="full"
                        onClick={this.onFormSubmit}
                        text="Login"
                        textColor="tertiary"
                    />
                    {error && <p className="login-form__error">{error}</p>}
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
    onSuccessfulLogin: PropTypes.func.isRequired,
    showSignUpForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    className: '',
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
