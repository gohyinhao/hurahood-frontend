import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ExplorePage from '../pages/ExplorePage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AppRouter = () => (
    <Router>
        <NavBar />
        <div className="grid">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/explore" component={ExplorePage} />
            </Switch>
        </div>
        <Footer />
    </Router>
);

export default AppRouter;
