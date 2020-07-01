import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button';

class MerchantDashboard extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="merchant-dashboard">
                {user.isMerchant ? (
                    <>
                        <div>Filter placeholder</div>
                        <div>Product placeholders</div>
                    </>
                ) : (
                    <Button
                        className="merchant-dashboard__button"
                        text="Request to be a merchant"
                        onClick={undefined}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDashboard);
