import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Carousel from '../components/carousel/Carousel';
import ListingToggle from '../components/ListingToggle';
import CategoryFilter from '../components/filters/CategoryFilter';
import List from '../components/List';
import ProductThumbnail from '../components/product/ProductThumbnail';
import Paginator from '../components/Paginator';
import { limitProducts } from '../utils/products';
import { capitalizeCategory } from '../utils/categories';
import { isString } from '../utils/string';
import { fetchProducts } from '../utils/api/products';
import DefaultProductImage from '../assets/images/product-default.svg';

class ExplorePage extends Component {
    state = {
        filters: {
            categories: ['facial', 'massage', 'manicure', 'hair-treatment', 'hair-cut'],
        },
        paging: {
            currentPage: 1,
            listingsPerPage: '20',
            totalListings: 0,
        },
        filteredProducts: [],
        products: [],
    };

    componentDidMount() {
        const query = queryString.parse(this.props.location.search, { arrayFormat: 'bracket' });
        const categories = [];

        if (query.categories) {
            if (isString(query.categories)) {
                categories.push(query.categories);
            } else {
                query.categories.forEach((category) => {
                    categories.push(category);
                });
            }
            this.setState(() => ({
                filters: {
                    categories,
                },
            }));
        }

        this.requestProducts();
        this.filterProductsByPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filters !== this.state.filters) {
            this.requestProducts();
        }

        if (prevState.paging !== this.state.paging) {
            this.setState(() => ({
                products: limitProducts(this.state.filteredProducts, this.state.paging),
            }));
        }
    }

    requestProducts = async () => {
        const filteredProducts = await fetchProducts(this.state.filters);
        this.setState((prevState) => ({
            filteredProducts,
            paging: {
                ...prevState.paging,
                totalListings: filteredProducts.length,
            },
        }));
    };

    filterProductsByPage = () => {
        this.setState((prevState) => ({
            products: limitProducts(prevState.filteredProducts, this.state.paging),
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
                        categories={this.state.filters.categories}
                        className="util-light-grey-border"
                        onChange={this.onCategoryFilterChange}
                    />
                </div>
                <List className="explore-page__list">
                    {this.state.products.map((product, index) => {
                        const prices = [];
                        product.services.forEach((service) => {
                            prices.push(service.price);
                        });
                        return (
                            <Link
                                key={index}
                                to={`/product/${product.id}`}
                                className="explore-page__product-thumbnail"
                            >
                                <ProductThumbnail
                                    title={product.merchantName}
                                    category={capitalizeCategory(product.category)}
                                    image={
                                        product.images.length === 0
                                            ? DefaultProductImage
                                            : product.images[0]
                                    }
                                    // TODO: map user to props. check user favourite list if this exists. for now set all as false
                                    isFavourited={false}
                                    prices={prices}
                                    numOfRatings={product.rating.numOfRatings}
                                    rating={product.rating.value}
                                />
                            </Link>
                        );
                    })}
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
