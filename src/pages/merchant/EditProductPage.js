import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAPI from '../../api/users';
import ProductAPI from '../../api/products';
import UserActions from '../../actions/users';
import Helper from '../../utils/helper';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import Input from '../../components/input';
import Rating from '../../components/rating/Rating';
import ExpandableText from '../../components/ExpandableText';
import DefaultImage from '../../assets/images/no-image-available.svg';
import EditIcon from '../../assets/fontawesome/regular/edit.svg';

class EditProductPage extends Component {
    state = {
        product: {
            address: {
                building: '',
                street: '',
                unit: '',
                zip: '',
            },
            category: 'facial',
            images: [],
            locationType: 'store',
            location: {
                type: 'Point',
                coordinates: [],
            },
            merchant: '',
            rating: {
                breakdown: {
                    fiveStar: 0,
                    fourStar: 0,
                    threeStar: 0,
                    twoStar: 0,
                    oneStar: 0,
                },
                numOfRatings: 0,
                value: '0.0',
            },
            services: [],
        },
        isEditing: {
            location: false,
            services: [],
        },
    };

    async componentDidMount() {
        try {
            const user = await UserAPI.fetchUser();
            this.props.updateUser(user);

            if (!user.isMerchant) {
                this.props.history.push('/unauthorized');
            }

            const product = await ProductAPI.fetchProduct(this.props.match.params.id);
            if (!product) {
                this.props.history.push('/error');
            }

            if (product.merchant !== user._id) {
                this.props.history.push('/unauthorized');
            }

            const servicesEditStatus = [];
            product.services.forEach((service) => servicesEditStatus.push(false));

            this.setState((prevState) => ({
                product,
                isEditing: {
                    ...prevState.isEditing,
                    services: servicesEditStatus,
                },
            }));
        } catch (err) {
            this.props.history.push('/unauthorized');
        }
    }

    onProductSave = async () => {};

    onLocationTypeChange = (locationType) => {
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                locationType,
            },
        }));
    };

    onCategoryChange = async (category) => {
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                category,
            },
        }));
        // TODO: update backend. call updateproduct
    };

    render() {
        const { product, isEditing } = this.state;
        const { merchant } = this.props;

        return (
            <div className="edit-product-page">
                <section className="edit-product-page__section">
                    <div className="edit-product-page__merchant-header">
                        <div className="edit-product-page__merchant-profile">
                            <img
                                src={
                                    merchant && merchant.avatar.link
                                        ? merchant.avatar.link
                                        : DefaultImage
                                }
                                className="edit-product-page__logo"
                            />
                            <div className="edit-product-page__merchant-info">
                                <h2 className="edit-product-page__merchant-name">
                                    {merchant ? merchant.name : ''}
                                </h2>
                                <Rating
                                    numOfRatings={product.rating.numOfRatings}
                                    rating={product.rating.value}
                                    showNumOfRatings
                                    showRatingValue
                                />
                            </div>
                        </div>
                        {/* {TODO: add link to profile page} */}
                        <ButtonLink to="#" text="Edit in Merchant Profile" />
                    </div>
                    <ExpandableText
                        className="edit-product-page__merchant-description"
                        text={merchant ? merchant.description : ''}
                    />
                </section>
                <section className="edit-product-page__section">
                    {isEditing.location ? (
                        <div className="edit-product-page__edit-buttons-wrapper">
                            <Button
                                className="edit-product-page__edit-button"
                                onClick={async () => {
                                    await this.onProductSave();
                                    this.setState((prevState) => ({
                                        isEditing: { ...prevState.isEditing, location: false },
                                    }));
                                }}
                                text="Save"
                                textColor="tertiary"
                                backgroundColor="black"
                            />
                        </div>
                    ) : (
                        <img
                            src={EditIcon}
                            alt="Edit Location"
                            className="edit-product-page__edit-icon"
                            onClick={() =>
                                this.setState((prevState) => ({
                                    isEditing: { ...prevState.isEditing, location: true },
                                }))
                            }
                        />
                    )}
                    <h3 className="edit-product-page__section-header">Location</h3>
                    <div className="edit-product-page__section-content">
                        <span className="edit-product-page__field-name">Service Location:</span>
                        {isEditing.location ? (
                            <select
                                className="edit-product-page__dropdown"
                                onChange={(e) => this.onLocationTypeChange(e.target.value)}
                                value={product.locationType}
                            >
                                <option value="store">Store</option>
                                <option value="home">Home</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        ) : (
                            <span className="edit-product-page__field-text">
                                {Helper.capitalizeWords(product.locationType)}
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Building:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                className="edit-product-page__textbox"
                                onChange={(building) =>
                                    this.setState((prevState) => ({
                                        product: {
                                            ...prevState.product,
                                            address: { ...prevState.product.address, building },
                                        },
                                    }))
                                }
                                placeholder="Building name if applicable, e.g. Nex"
                                value={product.address.building}
                            />
                        ) : product.address.building ? (
                            <span className="edit-product-page__field-text">
                                {Helper.capitalizeWords(product.address.building)}
                            </span>
                        ) : (
                            <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                No entry
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Street:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                className="edit-product-page__textbox"
                                onChange={(street) =>
                                    this.setState((prevState) => ({
                                        product: {
                                            ...prevState.product,
                                            address: { ...prevState.product.address, street },
                                        },
                                    }))
                                }
                                placeholder="Street name, e.g. 23 Serangoon Central"
                                value={product.address.street}
                            />
                        ) : product.address.street ? (
                            <span className="edit-product-page__field-text">
                                {Helper.capitalizeWords(product.address.street)}
                            </span>
                        ) : (
                            <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                No entry
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Unit:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                className="edit-product-page__textbox"
                                onChange={(unit) =>
                                    this.setState((prevState) => ({
                                        product: {
                                            ...prevState.product,
                                            address: { ...prevState.product.address, unit },
                                        },
                                    }))
                                }
                                placeholder="Unit number if applicable, e.g. 02-234"
                                value={product.address.unit}
                            />
                        ) : product.address.unit ? (
                            <span className="edit-product-page__field-text">
                                {Helper.capitalizeWords(product.address.unit)}
                            </span>
                        ) : (
                            <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                No entry
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Postal Code:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                className="edit-product-page__textbox"
                                onChange={(zip) =>
                                    this.setState((prevState) => ({
                                        product: {
                                            ...prevState.product,
                                            address: { ...prevState.product.address, zip },
                                        },
                                    }))
                                }
                                placeholder="Postal code, e.g. 576425"
                                value={product.address.zip}
                            />
                        ) : product.address.zip ? (
                            <span className="edit-product-page__field-text">
                                {Helper.capitalizeWords(product.address.zip)}
                            </span>
                        ) : (
                            <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                No entry
                            </span>
                        )}
                    </div>
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Category</h3>
                    <div className="edit-product-page__section-field">
                        <span className="edit-product-page__field-name">Select Category Type:</span>
                        <select
                            className="edit-product-page__dropdown"
                            onChange={(e) => this.onCategoryChange(e.target.value)}
                            value={this.state.product.category}
                        >
                            <option value="facial">Facial</option>
                            <option value="massage">Massage</option>
                            <option value="manicure">Manicure</option>
                            <option value="hair-treatment">Hair Treatment</option>
                            <option value="hair-cut">Hair Cut</option>
                        </select>
                    </div>
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Services</h3>
                    {product.services.map((service, index) => (
                        <div className="edit-product-page__service" key={index}>
                            {isEditing.services[index] ? (
                                <div className="edit-product-page__edit-buttons-wrapper">
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={async () => {
                                            await this.onProductSave();
                                            isEditing.services[index] = false;
                                            this.setState((prevState) => ({
                                                isEditing: {
                                                    ...prevState.isEditing,
                                                    services: isEditing.services,
                                                },
                                            }));
                                        }}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={async () => {
                                            // DELETE PRODUCT
                                        }}
                                        text="Delete"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={EditIcon}
                                    alt="Edit Location"
                                    className="edit-product-page__edit-icon edit-product-page__edit-icon--service"
                                    onClick={() => {
                                        isEditing.services[index] = true;
                                        this.setState((prevState) => ({
                                            isEditing: {
                                                ...prevState.isEditing,
                                                services: isEditing.services,
                                            },
                                        }));
                                    }}
                                />
                            )}
                            <span className="edit-product-page__field-name">Service Name:</span>
                            {isEditing.services[index] ? (
                                <Input.Textbox
                                    className="edit-product-page__textbox"
                                    onChange={(name) => {
                                        product.services[index].name = name;
                                        this.setState((prevState) => ({
                                            product: {
                                                ...prevState.product,
                                                services: product.services,
                                            },
                                        }));
                                    }}
                                    placeholder="Service Name, e.g. Thai Massage"
                                    value={service.name}
                                />
                            ) : (
                                <span className="edit-product-page__field-text">
                                    {service.name}
                                </span>
                            )}
                            <span className="edit-product-page__field-name">
                                Service Description:
                            </span>
                            {isEditing.services[index] ? (
                                <Input.Textbox
                                    className="edit-product-page__textbox"
                                    onChange={(description) => {
                                        product.services[index].description = description;
                                        this.setState((prevState) => ({
                                            product: {
                                                ...prevState.product,
                                                services: product.services,
                                            },
                                        }));
                                    }}
                                    placeholder="Service description"
                                    value={service.description}
                                />
                            ) : (
                                <span className="edit-product-page__field-text">
                                    {service.description}
                                </span>
                            )}
                            {service.info.map((info, infoIndex) => (
                                <React.Fragment key={infoIndex}>
                                    <span className="edit-product-page__field-name">
                                        Service Information {String.fromCharCode(infoIndex + 65)}:
                                    </span>
                                    {isEditing.services[index] ? (
                                        <Input.Textbox
                                            className="edit-product-page__textbox"
                                            onChange={(text) => {
                                                product.services[index].info[infoIndex] = text;
                                                this.setState((prevState) => ({
                                                    product: {
                                                        ...prevState.product,
                                                        services: product.services,
                                                    },
                                                }));
                                            }}
                                            placeholder="Service Name, e.g. Thai Massage"
                                            value={info}
                                        />
                                    ) : (
                                        <span className="edit-product-page__field-text">
                                            {info}
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                            {isEditing.services[index] && service.info.length < 3 && (
                                <>
                                    <span>{/* Just to occupy grid square */}</span>
                                    <Button
                                        className="edit-product-page__new-button"
                                        text="Add More Info"
                                        onClick={() => {}}
                                    />
                                </>
                            )}
                            <span className="edit-product-page__field-name">Price Type:</span>
                            {isEditing.services[index] ? (
                                <select
                                    className="edit-product-page__dropdown"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '1') {
                                            product.services[index].isPriceFixed = true;
                                        } else {
                                            product.services[index].isPriceFixed = false;
                                        }

                                        this.setState((prevState) => ({
                                            product: {
                                                ...prevState.product,
                                                services: product.services,
                                            },
                                        }));
                                    }}
                                    value={service.isPriceFixed ? '1' : '2'}
                                >
                                    <option value="1">Fixed</option>
                                    <option value="2">Range</option>
                                </select>
                            ) : (
                                <span className="edit-product-page__field-text">
                                    {service.isPriceFixed ? 'Fixed' : 'Range'}
                                </span>
                            )}
                            <span>{/* Just to occupy grid square */}</span>
                            {isEditing.services[index] ? (
                                <>
                                    {service.isPriceFixed ? (
                                        <Input.CurrencyInput
                                            className="edit-product-page__price-textbox"
                                            onChange={(price) => {
                                                product.services[index].price = price;
                                                this.setState((prevState) => ({
                                                    product: {
                                                        ...prevState.product,
                                                        services: product.services,
                                                    },
                                                }));
                                            }}
                                            value={service.price}
                                        />
                                    ) : (
                                        <span className="edit-product-page__price-wrapper">
                                            <Input.CurrencyInput
                                                className="edit-product-page__price-textbox"
                                                onChange={(price) => {
                                                    product.services[index].price = price;
                                                    this.setState((prevState) => ({
                                                        product: {
                                                            ...prevState.product,
                                                            services: product.services,
                                                        },
                                                    }));
                                                }}
                                                value={service.price}
                                            />{' '}
                                            &#8212;{' '}
                                            <Input.CurrencyInput
                                                className="edit-product-page__price-textbox"
                                                onChange={(price) => {
                                                    product.services[index].maxPrice = price;
                                                    this.setState((prevState) => ({
                                                        product: {
                                                            ...prevState.product,
                                                            services: product.services,
                                                        },
                                                    }));
                                                }}
                                                value={service.maxPrice ? service.maxPrice : 0}
                                            />
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span className="edit-product-page__field-text">
                                    {`${Helper.toCurrencyFormat(service.price / 100)}${
                                        service.isPriceFixed
                                            ? ''
                                            : ` - ${Helper.toCurrencyFormat(
                                                  service.maxPrice / 100,
                                              )}`
                                    }`}
                                </span>
                            )}
                            <span className="edit-product-page__field-name">Service Staff:</span>
                            {service.staff.length === 0 ? (
                                <Button
                                    className="edit-product-page__new-button"
                                    text="Add More Staff"
                                    onClick={() => {}}
                                />
                            ) : (
                                <>
                                    {service.staff.map((staff, staffIndex) => (
                                        <React.Fragment key={staffIndex}>
                                            {isEditing.services[index] ? (
                                                <span className="edit-product-page__text-wrapper">
                                                    <Input.Textbox
                                                        className="edit-product-page__textbox"
                                                        onChange={(staff) => {
                                                            product.services[index].staff[
                                                                staffIndex
                                                            ] = staff;
                                                            this.setState((prevState) => ({
                                                                product: {
                                                                    ...prevState.product,
                                                                    services: product.services,
                                                                },
                                                            }));
                                                        }}
                                                        placeholder="Staff Name"
                                                        value={staff}
                                                    />
                                                    <Button
                                                        className="edit-product-page__edit-button"
                                                        onClick={() => {}}
                                                        text="Delete"
                                                    />
                                                </span>
                                            ) : (
                                                <span className="edit-product-page__field-text">
                                                    {staff}
                                                </span>
                                            )}
                                            <span>{/* Just to occupy grid square */}</span>
                                        </React.Fragment>
                                    ))}
                                    <Button
                                        className="edit-product-page__new-button"
                                        text="Add More Staff"
                                        onClick={() => {}}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                    <Button
                        className="edit-product-page__new-service-button"
                        text="Add new service"
                        onClick={() => {}}
                    />
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Service Media</h3>
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Connected Social Accounts</h3>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    merchant: state.user.merchant,
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);
