import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import ProductListing from '../../components/product/ProductListing';
import StoreIcon from '../../assets/fontawesome/solid/store-alt.svg';

class MerchantDashboard extends Component {
    state = {
        filters: {
            text: '',
            categories: 'all',
        },
    };

    render() {
        const { user, products } = this.props;
        const filteredProducts = products || [];

        return (
            <div className="merchant-dashboard">
                {user.isMerchant ? (
                    <>
                        <div>Filter placeholder</div>
                        <div className="merchant-dashboard__products">
                            {filteredProducts.map((product, index) => (
                                <Link key={index} to="#" className="merchant-dashboard__product">
                                    <ProductListing
                                        title="test"
                                        category={product.category}
                                        location={product.address.street}
                                    />
                                </Link>
                            ))}
                            <Link to="#" className="merchant-dashboard__new-product">
                                <div className="merchant-dashboard__new-product-image-wrapper">
                                    <img
                                        src={StoreIcon}
                                        alt="Product Image"
                                        className="merchant-dashboard__new-product-image"
                                    />
                                </div>
                                <div className="merchant-dashboard__new-product-text">
                                    + Add new listing
                                </div>
                            </Link>
                        </div>
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
    products: state.products.ownedProducts,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDashboard);
