import React from 'react';
import ButtonLink from '../components/ButtonLink';
import HurahoodLogo from '../assets/images/hurahood_logo_with_text.svg';

const UnauthorizedPage = () => {
    return (
        <div className="error-page">
            <img src={HurahoodLogo} alt="HuraHood Logo" className="error-page__logo" />
            <section className="error-page__text">
                <h2 className="error-page__header">401</h2>
                <h3 className="error-page__secondary-header">Unauthorized</h3>
                <p className="error-page__subtitle">
                    Ooops, please login in order to access this page.
                </p>
                <ButtonLink className="error-page__button" to="/" text="Back to home page" />
            </section>
        </div>
    );
};

export default UnauthorizedPage;
