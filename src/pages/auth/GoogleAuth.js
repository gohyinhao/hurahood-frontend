import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import UserActions from '../../actions/users';
import UserAPI from '../../api/users';

class GoogleAuth extends Component {
    async componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        if (!params || !params.code || !params.state || params.state !== AUTH_STATE_KEY) {
            this.props.history.push('/');
        }

        try {
            const user = await UserAPI.loginGoogleUser(params.code, params.state);
            this.props.updateUser(user);
        } catch (err) {
            // do nothing
        }
        this.props.history.push('/');
    }

    render() {
        return <div>Logging you in shortly...</div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(undefined, mapDispatchToProps)(GoogleAuth);
