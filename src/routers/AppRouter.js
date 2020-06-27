import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pages from '../pages';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AppRouter = () => (
    <Router>
        <NavBar />
        <div className="grid">
            <Switch>
                <Route exact path="/auth/email" component={Pages.Auth.EmailVerificationPage} />
                <Route exact path="/auth/facebook" component={Pages.Auth.FacebookLoginPage} />
                <Route exact path="/auth/google" component={Pages.Auth.GoogleLoginPage} />
                <Route exact path="/auth/signout" component={Pages.Auth.SignOutPage} />

                <Route exact path="/" component={Pages.HomePage} />
                <Route exact path="/explore" component={Pages.ExplorePage} />
                <Route exact path="/product/:id" component={Pages.ProductPage} />
                <Route path="*" component={Pages.ErrorPage} />
            </Switch>
        </div>
        <Footer />
    </Router>
);

export default AppRouter;
