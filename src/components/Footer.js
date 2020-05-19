import React from 'react';
import { Link } from 'react-router-dom';

//TODO: add google play and ios app badges in the future

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__column footer__copyright">&copy;2020, HuraHood.com</div>
            <div className="footer__column">
                <Link className="footer__link" to="#">
                    <h5 className="footer__title">Site Map</h5>
                </Link>
            </div>
            <div className="footer__column">
                <h5 className="footer__title">Quick Links</h5>
                <Link className="footer__link" to="#">
                    Sign up as merchant
                </Link>
                <Link className="footer__link" to="#">
                    Advertise with us
                </Link>
                <Link className="footer__link" to="#">
                    Contact us
                </Link>
            </div>
            <div className="footer__column">
                <h5 className="footer__title">About Us</h5>
                <Link className="footer__link" to="#">
                    Team
                </Link>
                <Link className="footer__link" to="#">
                    FAQ
                </Link>
                <Link className="footer__link" to="#">
                    Join us
                </Link>
            </div>
            <div className="footer__column">
                <h5 className="footer__title">Policies</h5>
                <Link className="footer__link" to="#">
                    Terms & Conditions
                </Link>
                <Link className="footer__link" to="#">
                    Privacy Policy
                </Link>
            </div>
            <div className="footer__column">
                <h5 className="footer__title">Social Media</h5>
            </div>
        </footer>
    );
};

export default Footer;
