import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import Pages from '../pages';
import MerchantNav from '../components/MerchantNav';

const AppRouter = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <MerchantNav />
            <Switch>
                <Route exact path={path} component={Pages.Merchant.MerchantDashboardPage} />
                <Route exact path={`${path}/edit/:id`} component={Pages.Merchant.EditProductPage} />
                <Route path="*" component={Pages.ErrorPage} />
            </Switch>
        </>
    );
};

export default AppRouter;
