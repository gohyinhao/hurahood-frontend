import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import UserActions from '../../actions/users';
import UserAPI from '../../api/users';
import ButtonLink from '../../components/ButtonLink';
import HurahoodLogo from '../../assets/images/hurahood_logo_with_text.svg';

class EmailVerification extends Component {
    async componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        if (!params || !params.token) {
            this.props.history.push('/error');
        }

        try {
            const user = await UserAPI.verifyEmail(params.token);
            this.props.updateUser(user);
        } catch (err) {
            this.props.history.push('/error');
        }
    }

    render() {
        return (
            <div className="email-verification-page">
                <img
                    src={HurahoodLogo}
                    alt="HuraHood Logo"
                    className="email-verification-page__logo"
                />
                <section className="email-verification-page__text">
                    <h3 className="email-verification-page__header">
                        You have successfully verified your email.
                    </h3>
                    <p className="email-verification-page__subtitle">
                        This window can now be closed
                    </p>
                    <ButtonLink
                        className="email-verification-page__button"
                        to="/"
                        text="Back to home page"
                    />
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(undefined, mapDispatchToProps)(EmailVerification);
