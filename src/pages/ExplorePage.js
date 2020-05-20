import React, { Component } from 'react';
import Carousel from '../components/carousel/Carousel';
import ListingToggle from '../components/ListingToggle';
import CategoryFilter from '../components/filters/CategoryFilter';
import List from '../components/List';
import ProductThumbnail from '../components/product/ProductThumbnail';
import Paginator from '../components/Paginator';
import { filterProducts, limitProducts } from '../utils/products';
import HairdresserImage from '../assets/images/hairdresser.jpg';
import HairdresserImage2 from '../assets/images/hairdresser-2.jpg';

const productList = [
    {
        brand: 'ABC Haircut',
        category: 'Hair Cut',
        highestPrice: 15,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 15,
        rating: 0.51,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Facial',
        highestPrice: 25,
        image: HairdresserImage,
        isFavourited: false,
        lowestPrice: 15,
        rating: 1.21,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Massage',
        highestPrice: 115,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 5,
        rating: 1.51,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Manicure',
        highestPrice: 115,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 15,
        rating: 2.91,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Hair Treatment',
        highestPrice: 55,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 25,
        rating: 3.41,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Hair Cut',
        highestPrice: 15,
        image: HairdresserImage2,
        isFavourited: true,
        lowestPrice: 15,
        rating: 3.99,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Hair Treatment',
        highestPrice: 15,
        image: HairdresserImage2,
        isFavourited: true,
        lowestPrice: 15,
        rating: 4.01,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Massage',
        highestPrice: 15,
        image: HairdresserImage2,
        isFavourited: true,
        lowestPrice: 15,
        rating: 4.49,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Manicure',
        highestPrice: 25,
        image: HairdresserImage2,
        isFavourited: true,
        lowestPrice: 15,
        rating: 4.56,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Massage',
        highestPrice: 15,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 15,
        rating: 2.01,
        numOfRatings: 10,
    },
    {
        brand: 'ABC Haircut',
        category: 'Massage',
        highestPrice: 511,
        image: HairdresserImage,
        isFavourited: true,
        lowestPrice: 299,
        rating: 5,
        numOfRatings: 10,
    },
];

class ExplorePage extends Component {
    state = {
        filters: {
            categories: ['Facial', 'Massage', 'Manicure', 'Hair Treatment', 'Hair Cut'],
        },
        paging: {
            currentPage: 1,
            listingsPerPage: '20',
            totalListings: productList.length,
        },
        filteredProducts: [],
        products: [],
    };

    componentDidMount() {
        this.filterAndLimitProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filters !== this.state.filters) {
            return this.filterAndLimitProducts();
        }

        if (prevState.paging !== this.state.paging) {
            console.log('error');
            this.setState(() => ({
                products: limitProducts(this.state.filteredProducts, this.state.paging),
            }));
        }
    }

    filterAndLimitProducts = () => {
        const filteredProducts = filterProducts(productList, this.state.filters);

        this.setState(() => ({
            filteredProducts,
            products: limitProducts(filteredProducts, this.state.paging),
        }));
    };

    onToggleChange = (listingsPerPage) => {
        this.setState((prevState) => ({
            paging: {
                ...prevState.paging,
                listingsPerPage,
            },
        }));
    };

    onCategoryFilterChange = (categories) => {
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                categories,
            },
        }));
    };

    onPaginatorChange = (pageNum) => {
        this.setState((prevState) => ({
            paging: {
                ...prevState.paging,
                currentPage: pageNum,
            },
        }));
    };

    render() {
        return (
            <>
                <Carousel />
                <ListingToggle
                    className="explore-page__toggle"
                    onChange={this.onToggleChange}
                    value={this.state.paging.listingsPerPage}
                />
                <div className="explore-page__border util-secondary-border"></div>
                <div className="explore-page__filters">
                    <CategoryFilter
                        className="util-light-grey-border"
                        onChange={this.onCategoryFilterChange}
                    />
                </div>
                <List className="explore-page__list">
                    {this.state.products.map((product, index) => (
                        <ProductThumbnail
                            key={index}
                            brand={product.brand}
                            category={product.category}
                            className="explore-page__product-thumbnail"
                            highestPrice={product.highestPrice}
                            image={product.image}
                            isFavourited={product.isFavourited}
                            lowestPrice={product.lowestPrice}
                            numOfRatings={product.numOfRatings}
                            rating={product.rating}
                        />
                    ))}
                </List>
                <Paginator
                    className="explore-page__paginator"
                    onChange={this.onPaginatorChange}
                    perPage={parseInt(this.state.paging.listingsPerPage, 10)}
                    total={this.state.filteredProducts.length}
                />
            </>
        );
    }
}

ExplorePage.propTypes = {};

export default ExplorePage;
