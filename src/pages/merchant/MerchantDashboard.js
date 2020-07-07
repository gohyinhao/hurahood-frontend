import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helper from '../../utils/helper';
import ProductHelper from '../../utils/products';
import Filters from '../../components/filters';
import ListingToggle from '../../components/ListingToggle';
import Button from '../../components/Button';
import ProductListing from '../../components/product/ProductListing';
import Paginator from '../../components/Paginator';
import Input from '../../components/input';
import Modal from '../../components/Modal';
import Forms from '../../forms';
import StoreIcon from '../../assets/fontawesome/solid/store-alt.svg';
import SearchIcon from '../../assets/images/search.svg';

class MerchantDashboard extends Component {
    state = {
        showAddProductModal: false,
        filters: {
            text: '',
            category: 'all',
        },
        paging: {
            currentPage: 1,
            listingsPerPage: '20',
        },
    };

    componentDidMount() {
        // TODO: redirect if not logged in
        // if (Helper.isEmptyObject(this.props.user)) {
        //     this.props.history.push('/unauthorized');
        // }
    }

    onTextFilterChange = (text) => {
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                text,
            },
        }));
    };

    onCategoryFilterChange = (category) => {
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                category,
            },
        }));
    };

    onListingToggleChange = (listingsPerPage) => {
        this.setState((prevState) => ({
            paging: {
                ...prevState.paging,
                listingsPerPage,
            },
        }));
    };

    onPaginatorChange = (currentPage) => {
        this.setState((prevState) => ({
            paging: {
                ...prevState.paging,
                currentPage,
            },
        }));
    };

    openModal = () => {
        this.setState({
            showAddProductModal: true,
        });
    };

    onModalClose = () => {
        this.setState({
            showAddProductModal: false,
        });
    };

    render() {
        const { user, products } = this.props;
        const filteredProducts = ProductHelper.filterProducts(products, this.state.filters) || [];
        const pagedProducts = ProductHelper.limitProducts(filteredProducts, this.state.paging);

        return (
            <div className="merchant-dashboard">
                {user.isMerchant ? (
                    <>
                        <div className="merchant-dashboard__filters">
                            <Filters.Category.Dropdown
                                onChange={this.onCategoryFilterChange}
                                value={this.state.filters.category}
                            />
                            <Input.Textbox
                                className="merchant-dashboard__location-filter"
                                onChange={this.onTextFilterChange}
                                iconAfter={SearchIcon}
                                placeholder="Filter by location"
                                value={this.state.filters.text}
                            />
                            <ListingToggle
                                onChange={this.onListingToggleChange}
                                value={this.state.paging.listingsPerPage}
                            />
                        </div>
                        <div className="merchant-dashboard__products">
                            {pagedProducts.map((product, index) => (
                                <Link
                                    key={index}
                                    to={`/user/merchant/edit/${product._id}`}
                                    className="merchant-dashboard__product"
                                >
                                    <ProductListing
                                        title={user.merchant.name}
                                        category={product.category}
                                        location={product.address.street}
                                    />
                                </Link>
                            ))}
                            <div
                                className="merchant-dashboard__new-product"
                                onClick={this.openModal}
                            >
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
                            </div>
                        </div>
                        <Paginator
                            onChange={this.onPaginatorChange}
                            perPage={parseInt(this.state.paging.listingsPerPage, 10)}
                            total={filteredProducts.length}
                        />
                        <Modal
                            showModal={this.state.showAddProductModal}
                            isLightBackground={true}
                            onClose={this.onModalClose}
                            showCloseSign={true}
                        >
                            <Forms.AddProductForm products={products} />
                        </Modal>
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
