import React from 'react';
import ButtonLink from '../components/ButtonLink';
import HurahoodLogo from '../assets/images/hurahood_logo_with_text.svg';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <img src={HurahoodLogo} alt="HuraHood Logo" className="error-page__logo" />
            <section className="error-page__text">
                <h2 className="error-page__header">404</h2>
                <h3 className="error-page__secondary-header">Page not found</h3>
                <p className="error-page__subtitle">
                    Ooops, the page you are looking for cannot be found.
                </p>
                <ButtonLink className="error-page__button" to="/" text="Back to home page" />
            </section>
        </div>
    );
};

export default ErrorPage;
