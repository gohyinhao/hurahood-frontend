import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import UserActions from '../actions/users';
import UserAPI from '../api/users';
import Input from '../components/input';
import Button from '../components/Button';
import CompanyLogo from '../assets/images/hurahood_logo_with_text.svg';

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        merchantOnly: false,
        showEmailMessage: false,
        errors: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await UserAPI.signUpUser({
                email: this.state.email,
                password: this.state.password,
            });
            this.props.updateUser(newUser);
            this.setState({ showEmailMessage: true });
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    email: err.error,
                },
            }));
        }
        // TODO: redirect to merchant dashboard if merchantonly
    };

    onEmailChange = (email) => {
        if (validator.isEmail(email)) {
            this.setState((prevState) => ({
                email,
                errors: {
                    ...prevState.errors,
                    email: '',
                },
            }));
        } else {
            this.setState((prevState) => ({
                email,
                errors: {
                    ...prevState.errors,
                    email: 'Invalid email format',
                },
            }));
        }
    };

    onPasswordChange = (password) => {
        let areBothPasswordsIdentical = false;
        if (password === this.state.confirmPassword) {
            areBothPasswordsIdentical = true;
        }

        if (password.length >= 8) {
            if (areBothPasswordsIdentical) {
                this.setState((prevState) => ({
                    password,
                    errors: {
                        ...prevState.errors,
                        password: '',
                        confirmPassword: '',
                    },
                }));
            } else {
                this.setState((prevState) => ({
                    password,
                    errors: {
                        ...prevState.errors,
                        password: '',
                    },
                }));
            }
        } else {
            if (areBothPasswordsIdentical) {
                this.setState((prevState) => ({
                    password,
                    errors: {
                        ...prevState.errors,
                        password: 'At least 8 characters',
                        confirmPassword: '',
                    },
                }));
            } else {
                this.setState((prevState) => ({
                    password,
                    errors: {
                        ...prevState.errors,
                        password: 'At least 8 characters',
                    },
                }));
            }
        }
    };

    onConfirmPasswordChange = (confirmPassword) => {
        if (confirmPassword === this.state.password) {
            this.setState((prevState) => ({
                confirmPassword,
                errors: {
                    ...prevState.errors,
                    confirmPassword: '',
                },
            }));
        } else {
            this.setState((prevState) => ({
                confirmPassword,
                errors: {
                    ...prevState.errors,
                    confirmPassword: 'Enter the same password',
                },
            }));
        }
    };

    toggleMerchantOnly = () => {
        this.setState((prevState) => ({ merchantOnly: !prevState.merchantOnly }));
    };

    render() {
        const { className, showLoginForm } = this.props;
        const {
            email,
            password,
            confirmPassword,
            merchantOnly,
            showEmailMessage,
            errors,
        } = this.state;
        const classNames = 'signup-form ' + (className ? className : '');

        return (
            <div className={classNames}>
                <img src={CompanyLogo} alt="HuraHood Logo" className="signup-form__logo" />
                <form className="signup-form__form">
                    <Input.TextInput
                        className="signup-form__text"
                        placeholder="Email Address"
                        value={email}
                        onChange={this.onEmailChange}
                    />
                    {errors.email && <p className="signup-form__error">{errors.email}</p>}
                    <Input.TextInput
                        className="signup-form__text"
                        placeholder="Password"
                        value={password}
                        onChange={this.onPasswordChange}
                        type="password"
                    />
                    {errors.password && <p className="signup-form__error">{errors.password}</p>}
                    <Input.TextInput
                        className="signup-form__text"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={this.onConfirmPasswordChange}
                        type="password"
                    />
                    {errors.confirmPassword && (
                        <p className="signup-form__error">{errors.confirmPassword}</p>
                    )}
                    <Input.Checkbox
                        className="signup-form__checkbox"
                        isChecked={merchantOnly}
                        text="I want to sign up as an only-merchant account"
                        onChange={this.toggleMerchantOnly}
                    />
                    {merchantOnly && (
                        <p className="signup-form__merchant-only-info">
                            By checking this option, you will not be able to make any booking of
                            services.{' '}
                            <a target="_blank" href="#" className="signup-form__link">
                                More info here
                            </a>
                        </p>
                    )}
                    <Button
                        backgroundColor="black"
                        className="signup-form__button"
                        disabled={
                            !email ||
                            !password ||
                            !confirmPassword ||
                            !!errors.email ||
                            !!errors.password ||
                            !!errors.confirmPassword
                        }
                        size="full"
                        onClick={this.onFormSubmit}
                        text="Sign Up"
                        textColor="tertiary"
                    />
                    {showEmailMessage && (
                        <p className="signup-form__message">
                            An email with verification link has been sent to{' '}
                            <span className="signup-form__message-email">{email}</span>. Check your
                            inbox!
                        </p>
                    )}
                </form>
                <p className="signup-form__login" onClick={showLoginForm}>
                    Have an account? Log in now
                </p>
                <p className="signup-form__tnc">
                    By signing up, you agree to HuraHood's{' '}
                    <a target="_blank" href="#" className="signup-form__link">
                        Terms of Service
                    </a>{' '}
                    &{' '}
                    <a target="_blank" href="#" className="signup-form__link">
                        Privacy Policy
                    </a>
                </p>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    className: PropTypes.string,
    showLoginForm: PropTypes.func.isRequired,
};

SignUpForm.defaultProps = {
    className: '',
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(undefined, mapDispatchToProps)(SignUpForm);
