import React, { Component } from 'react';
import ProductDisplay from '../components/product/ProductDisplay';
import CarouselList from '../components/carousel/CarouselList';
import ServiceDisplay from '../components/ServiceDisplay';
import RatingDisplay from '../components/rating/RatingDisplay';
import RatingDistribution from '../components/rating/RatingDistribution';
import CompanyLogo from '../assets/images/company-logo.png';
import MassageImage from '../assets/images/massage.jpg';
import MassageImage2 from '../assets/images/massage-2.jpg';
import MassageImage3 from '../assets/images/massage-3.jpg';

class ProductPage extends Component {
    state = {
        product: {
            brand: 'ABC Haircut',
            companyLogo: CompanyLogo,
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus animi voluptates vitae recusandae id delectus est excepturi, earum temporibus doloribus accusamus, deleniti eum distinctio cum maiores assumenda quidem autem perferendis. vitae recusandae id delectus est excepturi, earum temporibus doloribus accusamus, deleniti eum distinctio cum maiores assumenda quidem autem perferendis.',
            images: [MassageImage, MassageImage2, MassageImage3, MassageImage],
            isFavourited: true,
            location: '21 Circular Road',
            rating: {
                value: 4.08,
                numOfRatings: 12,
                ratingsBreakdown: {
                    oneStar: 0,
                    twoStar: 2,
                    threeStar: 1,
                    fourStar: 3,
                    fiveStar: 6,
                },
            },
            services: [
                {
                    name: 'Aromatherapy Massage',
                    price: 68.9,
                    description:
                        'In nisl mi, rutrum sed arcu non, consequat dapibus lacus. Nullam rhoncus sem quis tempus ornare. Quisque scelerisque, massa vel semper viverra, massa tortor pulvinar dui, sed mollis sem dui et nibh. Sed accumsan accumsan ante vel tincidunt. In quis egestas nisl.',
                    info: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nisi id velit varius porttitor et nec nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut elementum vehicula urna ac rutrum. Cras hendrerit elit nisl, in accumsan ligula sagittis vitae. Nullam rhoncus fermentum auctor. Fusce pretium, arcu in ullamcorper pellentesque, felis nulla efficitur quam, ac euismod dui dui sed ligula. Vivamus volutpat turpis a aliquam eleifend. Morbi tincidunt, eros et tempus fermentum, metus arcu porttitor leo, sed scelerisque erat velit quis mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris elementum, lacus ut accumsan volutpat, dui felis consequat est, porttitor pulvinar neque felis et ante. ',
                        'Morbi et leo et sapien facilisis volutpat non at neque. Vivamus quis libero ut diam tincidunt imperdiet eu non sem. Integer id tristique lectus. Donec sodales a sapien eget tincidunt. Etiam ornare vitae enim vitae accumsan. Quisque auctor luctus mi, vitae scelerisque mauris semper quis. Cras ultrices lacus libero, ut sollicitudin justo pharetra eget. Nam vitae neque tempor, mattis nibh in, feugiat urna. In vel sem quis est bibendum semper non quis lorem. Duis enim odio, dictum id euismod non, rutrum eu ante. Etiam sed tempor turpis, vitae congue nunc. Donec luctus dictum turpis, at porta libero malesuada sit amet.',
                        'Etiam ut dictum tellus. Suspendisse gravida aliquet turpis at tempus. Cras ipsum neque, lacinia ut condimentum interdum, feugiat ut est. Mauris ullamcorper velit nec euismod sollicitudin. Praesent eleifend porta finibus. Mauris tempus in ipsum at varius. Aenean convallis lobortis tincidunt. Aliquam commodo malesuada leo, tincidunt pharetra metus tincidunt tincidunt. Etiam id molestie diam, eu interdum arcu. Suspendisse potenti. Ut in suscipit eros. Aliquam id convallis enim, at varius leo. Vivamus a luctus augue, sit amet semper massa. Aliquam odio elit, ornare dignissim finibus quis, tempus sit amet nisi. Fusce nec lectus id velit malesuada facilisis at id odio. Proin tincidunt ante ut magna aliquam fermentum.',
                    ],
                },
                {
                    name: 'Thai Massage',
                    price: 52.1,
                    description:
                        'Aenean faucibus leo vitae erat facilisis, sed semper erat tincidunt. Aenean rutrum pharetra mauris blandit blandit. Mauris velit libero, convallis finibus iaculis vitae, porttitor a felis. Proin tellus tortor, pellentesque a euismod eu, convallis consectetur nibh. Praesent auctor placerat hendrerit.',
                    info: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nisi id velit varius porttitor et nec nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut elementum vehicula urna ac rutrum. Cras hendrerit elit nisl, in accumsan ligula sagittis vitae. Nullam rhoncus fermentum auctor. Fusce pretium, arcu in ullamcorper pellentesque, felis nulla efficitur quam, ac euismod dui dui sed ligula. Vivamus volutpat turpis a aliquam eleifend. Morbi tincidunt, eros et tempus fermentum, metus arcu porttitor leo, sed scelerisque erat velit quis mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris elementum, lacus ut accumsan volutpat, dui felis consequat est, porttitor pulvinar neque felis et ante. In nisl mi, rutrum sed arcu non, consequat dapibus lacus. Nullam rhoncus sem quis tempus ornare. Quisque scelerisque, massa vel semper viverra, massa tortor pulvinar dui, sed mollis sem dui et nibh. Sed accumsan accumsan ante vel tincidunt. In quis egestas nisl.',
                        'Morbi et leo et sapien facilisis volutpat non at neque. Vivamus quis libero ut diam tincidunt imperdiet eu non sem. Integer id tristique lectus. Donec sodales a sapien eget tincidunt. Etiam ornare vitae enim vitae accumsan. Quisque auctor luctus mi, vitae scelerisque mauris semper quis. Cras ultrices lacus libero, ut sollicitudin justo pharetra eget. Nam vitae neque tempor, mattis nibh in, feugiat urna. In vel sem quis est bibendum semper non quis lorem. Duis enim odio, dictum id euismod non, rutrum eu ante. Etiam sed tempor turpis, vitae congue nunc. Donec luctus dictum turpis, at porta libero malesuada sit amet.',
                        'Etiam ut dictum tellus. Suspendisse gravida aliquet turpis at tempus. Cras ipsum neque, lacinia ut condimentum interdum, feugiat ut est. Mauris ullamcorper velit nec euismod sollicitudin. Praesent eleifend porta finibus. Mauris tempus in ipsum at varius. Aenean convallis lobortis tincidunt. Aliquam commodo malesuada leo, tincidunt pharetra metus tincidunt tincidunt. Etiam id molestie diam, eu interdum arcu. Suspendisse potenti. Ut in suscipit eros. Aliquam id convallis enim, at varius leo. Vivamus a luctus augue, sit amet semper massa. Aliquam odio elit, ornare dignissim finibus quis, tempus sit amet nisi. Fusce nec lectus id velit malesuada facilisis at id odio. Proin tincidunt ante ut magna aliquam fermentum.',
                    ],
                },
            ],
        },
        activeImageIndex: 0,
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        // TODO: fetch data from database using id
    }

    onImageChange = (activeImageIndex) => {
        this.setState(() => ({
            activeImageIndex,
        }));
    };

    render() {
        const {
            brand,
            companyLogo,
            description,
            images,
            isFavourited,
            location,
            rating,
        } = this.state.product;

        return (
            <>
                <ProductDisplay
                    activeImageIndex={this.state.activeImageIndex}
                    brand={brand}
                    className="product-page__display"
                    companyLogo={companyLogo}
                    description={description}
                    images={images}
                    isFavourited={isFavourited}
                    location={location}
                    onImageChange={this.onImageChange}
                    rating={rating.value}
                    numOfRatings={rating.numOfRatings}
                />
                <div className="product-page__border util-secondary-border"></div>
                <CarouselList
                    caretStyle="none"
                    className="product-page__gallery"
                    imageWrapperClassName="product-page__image-wrapper"
                >
                    {images.map((image, index) => {
                        const imgClassNames =
                            'product-page__image ' +
                            (index === this.state.activeImageIndex
                                ? ' product-page__image--active'
                                : '');
                        return (
                            <img
                                key={index}
                                src={image}
                                onClick={() => this.onImageChange(index)}
                                className={imgClassNames}
                            />
                        );
                    })}
                </CarouselList>
                <div className="product-page__border util-secondary-border"></div>
                <ServiceDisplay
                    className="product-page__services"
                    services={this.state.product.services}
                />
                <h2 className="product-page__ratings-header">Ratings & Reviews</h2>
                <div className="product-page__ratings">
                    <RatingDisplay
                        className="product-page__rating-display"
                        rating={rating.value}
                        numOfRatings={rating.numOfRatings}
                    />
                    <RatingDistribution
                        className="product-page__rating-distribution"
                        ratings={rating.ratingsBreakdown}
                    />
                </div>
            </>
        );
    }
}

export default ProductPage;
