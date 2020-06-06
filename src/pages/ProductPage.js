import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductDisplay from '../components/product/ProductDisplay';
import CarouselList from '../components/carousel/CarouselList';
import DefaultImage from '../components/utility/DefaultImage';
import ServiceDisplay from '../components/ServiceDisplay';
import RatingDisplay from '../components/rating/RatingDisplay';
import RatingDistribution from '../components/rating/RatingDistribution';
import Review from '../components/Review';
import { fetchProduct } from '../utils/api/products';
import { updateProduct } from '../actions/products';
import CompanyLogo from '../assets/images/company-logo.png';
import ProfilePic1 from '../assets/images/profile-pic-1.jpg';
import ProfilePic2 from '../assets/images/profile-pic-2.jpg';

class ProductPage extends Component {
    state = {
        reviews: [
            {
                rating: 5,
                text:
                    'ultrices erat. Donec tellus nunc, posuere nec tempus vel, finibus vitae risus. Nulla volutpat ex in mattis vestibulum. Curabitur gravida ipsum a magna suscipit, non maximus nibh convallis. Quisque mattis felis id velit lacinia viverra. Ut id mattis metus. Quisque nibh est, congue et ex et, dignissim placerat sapien. Pellentesque venenatis ornare nisi, ut elementum est pellentesque in. Nam maximus, est vel scelerisque pretium, purus nisl egestas enim, in ',
                timestamp: 1590210633000,
                user: {
                    avatar: ProfilePic1,
                    name: 'Margaret Boom',
                },
            },
            {
                rating: 4,
                text:
                    'cidunt, sed maximus nisi consectetur. Nunc tempus varius est sed auctor. Integer urna eros, porttitor in maximus ac, faucibus ac velit. Nulla ut tempus urna. In lorem sapien, dictum con Proin volutpat finibus auctor. Phasellus gravida eros sed tellus mattis pulvinar. Morbi molestie justo molestie risus rutrum, et mollis lectus gravida. In vel tincidunt justo, a ornare ante. Sed non pulvinar mi, sit amet elementum est. Pellentesque tristique pretium erat in ultricies. Duis mattis leo sit amet congue rutrum. Cras libero nunc, efficitur in est id, facilisis pharetra enim. Suspendisse sit amet eros placerat, lacinia turpis nec, hendrerit felis.',
                timestamp: 1589519433000,
                user: {
                    avatar: ProfilePic2,
                    name: 'John Blabber',
                },
            },
            {
                rating: 3,
                text:
                    'Mauris imperdiet imperdiet lacus, et condimentum libero laoreet quis. Mauris vehicula varius risus, eu tristique risus placerat vel. Pellentesque sodales consequat quam ut scelerisque. Mauris condimentum semper sem non efficitur. Aenean posuere nisl non dapibus rhoncus. Proin volutpat finibus auctor. Phasellus gravida eros sed tellus mattis pulvinar. Morbi molestie justo molestie risus rutrum, et mollis lectus gravida. In vel tincidunt justo, a ornare ante. Sed non pulvinar mi, sit amet elementum est. Pellentesque tristique pretium erat in ultricies. Duis mattis leo sit amet congue rutrum. Cras libero nunc, efficitur in est id, facilisis pharetra enim. Suspendisse sit amet eros placerat, lacinia turpis nec, hendrerit felis.',
                timestamp: 1586927433000,
                images: [],
                user: {
                    avatar: ProfilePic2,
                    name: 'John Blabber 2',
                },
            },
        ],
        activeImageIndex: 0,
        reviewFilters: {
            text: '',
        },
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const product = await fetchProduct(id);
        this.props.updateProduct(product);

        // TODO: fetch merchant and reviews also
    }

    onImageChange = (activeImageIndex) => {
        this.setState(() => ({
            activeImageIndex,
        }));
    };

    render() {
        const {
            address,
            rating,
            services,
            description,
            merchantName,
            location,
            images,
        } = this.props.product;

        return (
            <>
                <ProductDisplay
                    activeImageIndex={this.state.activeImageIndex}
                    merchant={merchantName}
                    className="product-page__display"
                    // TODO: get company logo
                    companyLogo={CompanyLogo}
                    coordinates={location.coordinates}
                    description={description}
                    images={images}
                    // TODO: get isfavourited from user
                    isFavourited={false}
                    address={address.street}
                    onImageChange={this.onImageChange}
                    rating={rating.value}
                    numOfRatings={rating.numOfRatings}
                    // TODO: pass in social media from merchant
                />
                <div className="product-page__border util-secondary-border"></div>
                <CarouselList
                    caretStyle="none"
                    className="product-page__gallery"
                    imageWrapperClassName="product-page__image-wrapper"
                >
                    {images.length === 0 ? (
                        <DefaultImage
                            className="product-page__image product-page__image--active"
                            displayText={false}
                        />
                    ) : (
                        images.map((image, index) => {
                            const imgClassNames =
                                'product-page__image ' +
                                (index === this.state.activeImageIndex
                                    ? ' product-page__image--active'
                                    : '');
                            return (
                                <img
                                    key={index}
                                    src={image.link}
                                    onClick={() => this.onImageChange(index)}
                                    className={imgClassNames}
                                />
                            );
                        })
                    )}
                </CarouselList>
                <div className="product-page__border util-secondary-border"></div>
                {services.length > 0 && (
                    <ServiceDisplay className="product-page__services" services={services} />
                )}
                <h2 className="product-page__ratings-header">Ratings & Reviews</h2>
                <div className="product-page__ratings">
                    <RatingDisplay
                        className="product-page__rating-display"
                        rating={rating.value}
                        numOfRatings={rating.numOfRatings}
                    />
                    <RatingDistribution
                        className="product-page__rating-distribution"
                        ratings={rating.breakdown}
                    />
                </div>
                <div className="product-page__review-filters">
                    Placeholder for sorting and filtering
                </div>
                <div className="product-page__reviews">
                    {this.state.reviews.map((review, index) => (
                        <Review className="product-page__review" key={index} {...review} />
                    ))}
                </div>
            </>
        );
    }
}

// TODO: add text filter for reviews and possibly other filters and sort
// TODO: add images to reviews
const mapStateToProps = (state) => ({
    product: state.products.product,
});

const mapDispatchToProps = (dispatch) => ({
    updateProduct: (product) => dispatch(updateProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
