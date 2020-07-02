import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Helper from '../utils/helper';
import FileIcon from '../assets/fontawesome/regular/file-alt.svg';
import CopyIcon from '../assets/fontawesome/regular/copy.svg';

class AddProductForm extends Component {
    state = {
        selectedProduct: '',
    };

    onCreateProduct = () => {
        // TODO: create new product and redirect
    };

    onCopyProduct = () => {
        // TODO: copy product and redirect
        // TODO: remember to dispatch to redux store the updated products
    };

    onDropdownChange = (value) => {
        this.setState({
            selectedProduct: value,
        });
    };

    render() {
        const { className, products } = this.props;
        const classNames = 'add-product-form ' + (className ? className : '');

        return (
            <div className={classNames}>
                <h2 className="add-product-form__header">New Listing</h2>
                <div className="util-secondary-border add-product-form__border"></div>
                <h3 className="add-product-form__sub-header">
                    Are you creating a whole new listing or a similar one?
                </h3>
                <div className="add-product-form__container">
                    <div className="add-product-form__sub-container">
                        <div className="add-product-form__icon-wrapper">
                            <img
                                className="add-product-form__icon"
                                src={FileIcon}
                                alt="Add New Product Icon"
                            />
                        </div>
                        <h4 className="add-product-form__title">Fill details from scratch</h4>
                        <span className="add-product-form__subtitle">
                            Fill in all service information by yourself!
                        </span>
                        <Button
                            className="add-product-form__button"
                            backgroundColor="black"
                            onClick={this.onCreateProduct}
                            text="Create"
                            textColor="tertiary"
                        />
                    </div>
                    <div className="add-product-form__sub-container">
                        <div className="add-product-form__icon-wrapper">
                            <img
                                className="add-product-form__icon"
                                src={CopyIcon}
                                alt="Copy Existing Product Icon"
                            />
                        </div>
                        <h4 className="add-product-form__title">Use previous template</h4>
                        <span className="add-product-form__subtitle">
                            Copy information over from other listing and edit where necessary!
                        </span>
                        <div className="add-product-form__button-wrapper">
                            <select
                                className="add-product-form__select"
                                onChange={(e) => this.onDropdownChange(e.target.value)}
                                value={this.state.selectedProduct}
                            >
                                <option value="" defaultValue>
                                    Select Listing
                                </option>
                                {products.map((product, index) => (
                                    <option value="product._id" key={index}>
                                        {Helper.capitalizeWords(product.address.street)}
                                    </option>
                                ))}
                            </select>
                            <Button
                                className="add-product-form__button"
                                backgroundColor="black"
                                onClick={this.onCopyProduct}
                                text="Create"
                                textColor="tertiary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProductForm.propTypes = {
    className: PropTypes.string,
    products: PropTypes.array.isRequired,
};

AddProductForm.defaultProps = {
    className: '',
};

export default withRouter(AddProductForm);
