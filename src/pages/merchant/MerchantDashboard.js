import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchantDashboard extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="merchant-dashboard">
                {user.isMerchant ? <div>I am merchant</div> : <div>Not merchant</div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDashboard);
