import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserActions from '../../actions/users';
import ProductActions from '../../actions/products';
import UserAPI from '../../api/users';

class SignOutPage extends Component {
    async componentDidMount() {
        try {
            await UserAPI.signOutUser();
            this.props.signOutUser();
            this.props.clearOwnedProducts();
        } catch (err) {
            // do nothing
        }
        this.props.history.push('/');
    }

    render() {
        return <div className="signout-page">Signing you out shortly</div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    signOutUser: () => dispatch(UserActions.updateUser({})),
    clearOwnedProducts: () => dispatch(ProductActions.clearOwnedProducts()),
});

export default connect(undefined, mapDispatchToProps)(SignOutPage);
