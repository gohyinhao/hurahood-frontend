import React, { Component } from 'react';
import ProductDisplay from '../components/product/ProductDisplay';
import CarouselList from '../components/carousel/CarouselList';
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
            rating: 4.56,
            numOfRatings: 10,
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
            numOfRatings,
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
                    rating={rating}
                    numOfRatings={numOfRatings}
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
                        return <img key={index} src={image} className={imgClassNames} />;
                    })}
                </CarouselList>
                <div className="product-page__border util-secondary-border"></div>
            </>
        );
    }
}

export default ProductPage;
