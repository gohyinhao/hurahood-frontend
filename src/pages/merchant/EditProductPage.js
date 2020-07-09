import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
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
import InstagramIcon from '../../assets/social-media/instagram-filled.svg';
import FacebookIcon from '../../assets/social-media/facebook-filled.svg';
import TwitterIcon from '../../assets/social-media/twitter-filled.svg';
import PinterestIcon from '../../assets/social-media/pinterest-filled.svg';

class EditProductPage extends Component {
    state = {
        product: {
            _id: '',
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
        uneditedProduct: {
            services: [],
        },
        socialMedia: {
            facebook: '',
            twitter: '',
            instagram: '',
            pinterest: '',
        },
        isEditing: {
            location: false,
            services: [],
            socialMedia: {
                facebook: false,
                twitter: false,
                instagram: false,
                pinterest: false,
            },
        },
        errors: {
            location: '',
            services: [],
            socialMedia: {
                facebook: '',
                twitter: '',
                instagram: '',
                pinterest: '',
            },
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
            const servicesErrors = [];
            product.services.forEach((service) => {
                servicesEditStatus.push(false);
                servicesErrors.push({
                    name: '',
                    description: '',
                    info: new Array(service.info.length),
                    price: '',
                    staff: new Array(service.staff.length),
                });
            });

            this.setState((prevState) => ({
                product,
                uneditedProduct: cloneDeep(product),
                socialMedia: user.merchant.socialMedia,
                isEditing: {
                    ...prevState.isEditing,
                    services: servicesEditStatus,
                },
                errors: {
                    ...prevState.errors,
                    services: servicesErrors,
                },
            }));
        } catch (err) {
            this.props.history.push('/unauthorized');
        }
    }

    onLocationTypeChange = (locationType) => {
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                locationType,
            },
        }));
    };

    onLocationSave = async () => {
        const { product } = this.state;
        try {
            await ProductAPI.updateProduct(product._id, {
                address: product.address,
                locationType: product.locationType,
            });
            this.setState((prevState) => ({
                isEditing: { ...prevState.isEditing, location: false },
                errors: {
                    ...prevState.errors,
                    location: '',
                },
            }));
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    location: err.error,
                },
            }));
        }
    };

    onCategoryChange = async (category) => {
        const { product } = this.state;
        try {
            const updatedProduct = await ProductAPI.updateProduct(product._id, { category });
            this.setState({
                product: updatedProduct,
            });
        } catch (err) {
            // TODO: possibly implement error message for category?
        }
    };

    onServiceSave = async (index) => {
        const {
            uneditedProduct,
            product: { _id, services },
            errors: { services: serviceErrors },
            isEditing,
        } = this.state;

        try {
            let uneditedServices = cloneDeep(uneditedProduct.services);
            uneditedServices[index] = services[index];
            await ProductAPI.updateProduct(_id, { services: uneditedServices });

            isEditing.services[index] = false;
            serviceErrors[index] = {
                name: '',
                description: '',
                info: new Array(services[index].info.length),
                price: '',
                staff: new Array(services[index].staff.length),
            };
            this.setState((prevState) => ({
                uneditedProduct: {
                    ...prevState.uneditedProduct,
                    services: uneditedServices,
                },
                isEditing: {
                    ...prevState.isEditing,
                    services: isEditing.services,
                },
                errors: {
                    ...prevState.errors,
                    services: serviceErrors,
                },
            }));
        } catch (err) {
            console.log(err);
            let errors = serviceErrors[index];

            if (services[index].name.length === 0) {
                errors.name = 'Name cannot be blank';
            } else {
                errors.name = '';
            }

            if (services[index].description.length === 0) {
                errors.description = 'Description cannot be blank';
            } else {
                errors.description = '';
            }

            services[index].info.forEach((info, infoIndex) => {
                if (info.length === 0) {
                    errors.info[infoIndex] = 'Info cannot be blank';
                } else {
                    errors.info[infoIndex] = '';
                }
            });

            if (services[index].price === 0 || services[index].price === undefined) {
                errors.price = 'Price cannot be zero';
            } else {
                errors.price = '';
            }

            services[index].staff.forEach((staff, staffIndex) => {
                if (staff.length === 0) {
                    errors.staff[staffIndex] = 'Staff name cannot be blank';
                } else {
                    errors.staff[staffIndex] = '';
                }
            });

            serviceErrors[index] = errors;
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    services: serviceErrors,
                },
            }));
        }
    };

    onServiceDelete = async (index) => {
        const {
            product: { services, _id },
            uneditedProduct: { services: uneditedServices },
            errors,
            isEditing,
        } = this.state;

        try {
            if (index < uneditedServices.length) {
                // old service being deleted
                uneditedServices.splice(index, 1);
                await ProductAPI.updateProduct(_id, { services: uneditedServices });
            }
            services.splice(index, 1);
            isEditing.services.splice(index, 1);
            errors.services.splice(index, 1);

            this.setState((prevState) => ({
                uneditedProduct: {
                    ...prevState.uneditedProduct,
                    services: uneditedServices,
                },
                product: {
                    ...prevState.product,
                    services,
                },
                isEditing,
                errors,
            }));
        } catch (err) {
            // do nothing
            console.err(err);
        }
    };

    onServiceInfoDelete = (serviceIndex, infoIndex) => {
        const {
            product: { services },
            errors,
        } = this.state;
        services[serviceIndex].info.splice(infoIndex, 1);
        errors.services[serviceIndex].info.splice(infoIndex, 1);
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                services,
            },
            errors: {
                ...prevState.errors,
                services: errors.services,
            },
        }));
    };

    onServiceStaffDelete = (serviceIndex, staffIndex) => {
        const {
            product: { services },
            errors,
        } = this.state;
        services[serviceIndex].staff.splice(staffIndex, 1);
        errors.services[serviceIndex].staff.splice(staffIndex, 1);
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                services,
            },
            errors: {
                ...prevState.errors,
                services: errors.services,
            },
        }));
    };

    addNewService = () => {
        const newService = {
            name: '',
            description: '',
            price: 0,
            info: [],
            isPriceFixed: true,
            maxPrice: undefined,
            staff: [],
        };

        const {
            product: { services },
            isEditing: { services: areServicesEditing },
            errors: { services: serviceErrors },
        } = this.state;
        services.push(newService);
        areServicesEditing.push(true);
        serviceErrors.push({
            name: '',
            description: '',
            info: [],
            price: '',
            staff: [],
        });
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                services,
            },
            isEditing: {
                ...prevState.isEditing,
                services: areServicesEditing,
            },
            errors: {
                ...prevState.errors,
                services: serviceErrors,
            },
        }));
    };

    onFacebookSave = async () => {
        const { merchant, updateMerchant } = this.props;
        const { socialMedia } = this.state;

        try {
            const updatedMerchant = {
                ...merchant,
                socialMedia: {
                    ...merchant.socialMedia,
                    facebook: socialMedia.facebook,
                },
            };
            const user = await UserAPI.updateUser({ merchant: updatedMerchant });
            updateMerchant(updatedMerchant);

            this.setState((prevState) => ({
                isEditing: {
                    ...prevState.isEditing,
                    socialMedia: {
                        ...prevState.isEditing.socialMedia,
                        facebook: false,
                    },
                },
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        facebook: '',
                    },
                },
            }));
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        facebook: 'Not a valid URL link',
                    },
                },
            }));
        }
    };

    onTwitterSave = async () => {
        const { merchant, updateMerchant } = this.props;
        const { socialMedia } = this.state;

        try {
            const updatedMerchant = {
                ...merchant,
                socialMedia: {
                    ...merchant.socialMedia,
                    twitter: socialMedia.twitter,
                },
            };
            const user = await UserAPI.updateUser({ merchant: updatedMerchant });
            updateMerchant(updatedMerchant);

            this.setState((prevState) => ({
                isEditing: {
                    ...prevState.isEditing,
                    socialMedia: {
                        ...prevState.isEditing.socialMedia,
                        twitter: false,
                    },
                },
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        twitter: '',
                    },
                },
            }));
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        twitter: 'Not a valid URL link',
                    },
                },
            }));
        }
    };

    onInstagramSave = async () => {
        const { merchant, updateMerchant } = this.props;
        const { socialMedia } = this.state;

        try {
            const updatedMerchant = {
                ...merchant,
                socialMedia: {
                    ...merchant.socialMedia,
                    instagram: socialMedia.instagram,
                },
            };
            const user = await UserAPI.updateUser({ merchant: updatedMerchant });
            updateMerchant(updatedMerchant);

            this.setState((prevState) => ({
                isEditing: {
                    ...prevState.isEditing,
                    socialMedia: {
                        ...prevState.isEditing.socialMedia,
                        instagram: false,
                    },
                },
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        instagram: '',
                    },
                },
            }));
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        instagram: 'Not a valid URL link',
                    },
                },
            }));
        }
    };

    onPinterestSave = async () => {
        const { merchant, updateMerchant } = this.props;
        const { socialMedia } = this.state;

        try {
            const updatedMerchant = {
                ...merchant,
                socialMedia: {
                    ...merchant.socialMedia,
                    pinterest: socialMedia.pinterest,
                },
            };
            const user = await UserAPI.updateUser({ merchant: updatedMerchant });
            updateMerchant(updatedMerchant);

            this.setState((prevState) => ({
                isEditing: {
                    ...prevState.isEditing,
                    socialMedia: {
                        ...prevState.isEditing.socialMedia,
                        pinterest: false,
                    },
                },
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        pinterest: '',
                    },
                },
            }));
        } catch (err) {
            this.setState((prevState) => ({
                errors: {
                    ...prevState.errors,
                    socialMedia: {
                        ...prevState.errors.socialMedia,
                        pinterest: 'Not a valid URL link',
                    },
                },
            }));
        }
    };

    render() {
        const { product, isEditing, socialMedia, errors, uneditedProduct } = this.state;
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
                        text={merchant ? merchant.description : 'No merchant description'}
                    />
                </section>
                <section className="edit-product-page__section">
                    {isEditing.location ? (
                        <div className="edit-product-page__edit-buttons-wrapper">
                            <Button
                                className="edit-product-page__edit-button"
                                onClick={this.onLocationSave}
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
                                background="grey"
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
                                Not initialized
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Street:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                background="grey"
                                className="edit-product-page__textbox"
                                error={errors.location}
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
                                Not initialized
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Unit:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                background="grey"
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
                                Not initialized
                            </span>
                        )}
                        <span className="edit-product-page__field-name">Postal Code:</span>
                        {isEditing.location ? (
                            <Input.Textbox
                                background="grey"
                                className="edit-product-page__textbox"
                                error={errors.location}
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
                                Not initialized
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
                                <div className="edit-product-page__service-edit-buttons-wrapper">
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onServiceSave.bind(undefined, index)}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onServiceDelete.bind(undefined, index)}
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
                                    background="grey"
                                    className="edit-product-page__textbox"
                                    error={errors.services[index].name}
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
                                    background="grey"
                                    className="edit-product-page__textbox"
                                    error={errors.services[index].description}
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
                                        <span className="edit-product-page__text-wrapper">
                                            <Input.Textbox
                                                background="grey"
                                                className="edit-product-page__textbox"
                                                error={errors.services[index].info[infoIndex]}
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
                                            <Button
                                                className="edit-product-page__edit-button"
                                                onClick={this.onServiceInfoDelete.bind(
                                                    undefined,
                                                    index,
                                                    infoIndex,
                                                )}
                                                text="Delete"
                                            />
                                        </span>
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
                                        onClick={() => {
                                            product.services[index].info.push('');
                                            errors.services[index].info.push('');
                                            this.setState({
                                                product,
                                                errors,
                                            });
                                        }}
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
                                <span>
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
                                            <div>
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
                                            </div>
                                        </span>
                                    )}
                                    {errors.services[index].price && (
                                        <span className="edit-product-page__error-message">
                                            {errors.services[index].price}
                                        </span>
                                    )}
                                </span>
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

                            {service.staff.map((staff, staffIndex) => (
                                <React.Fragment key={staffIndex}>
                                    {isEditing.services[index] ? (
                                        <span className="edit-product-page__text-wrapper">
                                            <Input.Textbox
                                                background="grey"
                                                className="edit-product-page__textbox"
                                                error={errors.services[index].staff[staffIndex]}
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
                                                onClick={this.onServiceStaffDelete.bind(
                                                    undefined,
                                                    index,
                                                    staffIndex,
                                                )}
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
                            {isEditing.services[index] ? (
                                <Button
                                    className="edit-product-page__new-button"
                                    text="Add More Staff"
                                    onClick={() => {
                                        product.services[index].staff.push('');
                                        errors.services[index].staff.push('');
                                        this.setState({
                                            product,
                                            errors,
                                        });
                                    }}
                                />
                            ) : (
                                product.services[index].staff.length === 0 && (
                                    <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                        No staff added
                                    </span>
                                )
                            )}
                        </div>
                    ))}
                    <Button
                        className="edit-product-page__new-service-button"
                        disabled={product.services.length !== uneditedProduct.services.length}
                        text="Add new service"
                        onClick={this.addNewService}
                    />
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Service Media</h3>
                    <div className="edit-product-page__section-content">
                        <span className="edit-product-page__field-name">Listing Pictures</span>
                        <div className="edit-product-page__image-gallery">
                            {product.images.map((image, index) => (
                                <div className="edit-product-page__image-wrapper" key={index}>
                                    <img
                                        src={image.link}
                                        alt="Product Image"
                                        className="edit-product-page__image"
                                    />
                                    <button
                                        className="edit-product-page__delete-image-button"
                                        onClick={() => this.onImageDelete(image.key)}
                                    >
                                        &#8211;
                                    </button>
                                </div>
                            ))}
                            <button
                                className="edit-product-page__add-image-button"
                                onClick={this.onShowImageModal}
                            >
                                Add Image
                            </button>
                        </div>
                    </div>
                </section>
                <section className="edit-product-page__section">
                    <h3 className="edit-product-page__section-header">Connected Social Accounts</h3>
                    <div className="edit-product-page__social-media-section">
                        <div className="edit-product-page__social-media-wrapper">
                            <img
                                src={FacebookIcon}
                                alt="Facebook Icon"
                                className="edit-product-page__social-media-icon"
                            />
                            {isEditing.socialMedia.facebook ? (
                                <>
                                    <Input.Textbox
                                        className="edit-product-page__textbox"
                                        error={errors.socialMedia.facebook}
                                        onChange={(text) => {
                                            this.setState((prevState) => ({
                                                socialMedia: {
                                                    ...prevState.socialMedia,
                                                    facebook: text,
                                                },
                                            }));
                                        }}
                                        placeholder="www.facebook.com/yourAccountLink"
                                        value={socialMedia.facebook}
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onFacebookSave}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                </>
                            ) : (
                                <>
                                    {socialMedia.facebook ? (
                                        <span className="edit-product-page__field-text">
                                            {socialMedia.facebook}
                                        </span>
                                    ) : (
                                        <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                            Not initialized
                                        </span>
                                    )}

                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={() => {
                                            this.setState((prevState) => ({
                                                isEditing: {
                                                    ...prevState.isEditing,
                                                    socialMedia: {
                                                        ...prevState.isEditing.socialMedia,
                                                        facebook: true,
                                                    },
                                                },
                                            }));
                                        }}
                                        text="Edit"
                                    />
                                </>
                            )}
                        </div>
                        <div className="edit-product-page__social-media-wrapper">
                            <img
                                src={TwitterIcon}
                                alt="Twitter Icon"
                                className="edit-product-page__social-media-icon"
                            />
                            {isEditing.socialMedia.twitter ? (
                                <>
                                    <Input.Textbox
                                        className="edit-product-page__textbox"
                                        error={errors.socialMedia.twitter}
                                        onChange={(text) => {
                                            this.setState((prevState) => ({
                                                socialMedia: {
                                                    ...prevState.socialMedia,
                                                    twitter: text,
                                                },
                                            }));
                                        }}
                                        placeholder="www.twitter.com/yourAccountLink"
                                        value={socialMedia.twitter}
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onTwitterSave}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                </>
                            ) : (
                                <>
                                    {socialMedia.twitter ? (
                                        <span className="edit-product-page__field-text">
                                            {socialMedia.twitter}
                                        </span>
                                    ) : (
                                        <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                            Not initialized
                                        </span>
                                    )}

                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={() => {
                                            this.setState((prevState) => ({
                                                isEditing: {
                                                    ...prevState.isEditing,
                                                    socialMedia: {
                                                        ...prevState.isEditing.socialMedia,
                                                        twitter: true,
                                                    },
                                                },
                                            }));
                                        }}
                                        text="Edit"
                                    />
                                </>
                            )}
                        </div>
                        <div className="edit-product-page__social-media-wrapper">
                            <img
                                src={InstagramIcon}
                                alt="Instagram Icon"
                                className="edit-product-page__social-media-icon"
                            />
                            {isEditing.socialMedia.instagram ? (
                                <>
                                    <Input.Textbox
                                        className="edit-product-page__textbox"
                                        error={errors.socialMedia.instagram}
                                        onChange={(text) => {
                                            this.setState((prevState) => ({
                                                socialMedia: {
                                                    ...prevState.socialMedia,
                                                    instagram: text,
                                                },
                                            }));
                                        }}
                                        placeholder="www.instagram.com/yourAccountLink"
                                        value={socialMedia.instagram}
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onInstagramSave}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                </>
                            ) : (
                                <>
                                    {socialMedia.instagram ? (
                                        <span className="edit-product-page__field-text">
                                            {socialMedia.instagram}
                                        </span>
                                    ) : (
                                        <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                            Not initialized
                                        </span>
                                    )}

                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={() => {
                                            this.setState((prevState) => ({
                                                isEditing: {
                                                    ...prevState.isEditing,
                                                    socialMedia: {
                                                        ...prevState.isEditing.socialMedia,
                                                        instagram: true,
                                                    },
                                                },
                                            }));
                                        }}
                                        text="Edit"
                                    />
                                </>
                            )}
                        </div>
                        <div className="edit-product-page__social-media-wrapper">
                            <img
                                src={PinterestIcon}
                                alt="Pinterest Icon"
                                className="edit-product-page__social-media-icon"
                            />
                            {isEditing.socialMedia.pinterest ? (
                                <>
                                    <Input.Textbox
                                        className="edit-product-page__textbox"
                                        error={errors.socialMedia.pinterest}
                                        onChange={(text) => {
                                            this.setState((prevState) => ({
                                                socialMedia: {
                                                    ...prevState.socialMedia,
                                                    pinterest: text,
                                                },
                                            }));
                                        }}
                                        placeholder="www.pinterest.com/yourAccountLink"
                                        value={socialMedia.pinterest}
                                    />
                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={this.onPinterestSave}
                                        text="Save"
                                        textColor="tertiary"
                                        backgroundColor="black"
                                    />
                                </>
                            ) : (
                                <>
                                    {socialMedia.pinterest ? (
                                        <span className="edit-product-page__field-text">
                                            {socialMedia.pinterest}
                                        </span>
                                    ) : (
                                        <span className="edit-product-page__field-text edit-product-page__field-text--empty">
                                            Not initialized
                                        </span>
                                    )}

                                    <Button
                                        className="edit-product-page__edit-button"
                                        onClick={() => {
                                            this.setState((prevState) => ({
                                                isEditing: {
                                                    ...prevState.isEditing,
                                                    socialMedia: {
                                                        ...prevState.isEditing.socialMedia,
                                                        pinterest: true,
                                                    },
                                                },
                                            }));
                                        }}
                                        text="Edit"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </section>
                {/* TODO: Link to preview page */}
                <ButtonLink
                    className="edit-product-page__preview-button"
                    to="#"
                    backgroundColor="black"
                    textColor="tertiary"
                    text="Preview Listing!"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    merchant: state.user.merchant,
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (user) => dispatch(UserActions.updateUser(user)),
    updateMerchant: (merchant) => dispatch(UserActions.updateMerchant(merchant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);
