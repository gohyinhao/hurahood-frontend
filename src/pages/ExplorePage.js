import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Carousel from '../components/carousel/Carousel';
import ListingToggle from '../components/ListingToggle';
import CategoryFilter from '../components/filters/CategoryFilter';
import List from '../components/List';
import ProductThumbnail from '../components/product/ProductThumbnail';
import Paginator from '../components/Paginator';
import { filterProducts, limitProducts } from '../utils/products';
import { capitalizeCategory } from '../utils/categories';
import { isString } from '../utils/string';

class ExplorePage extends Component {
    state = {
        filters: {
            categories: ['Facial', 'Massage', 'Manicure', 'Hair Treatment', 'Hair Cut'],
        },
        paging: {
            currentPage: 1,
            listingsPerPage: '20',
            totalListings: this.props.productList.length,
        },
        filteredProducts: [],
        products: [],
    };

    componentDidMount() {
        const query = queryString.parse(this.props.location.search, { arrayFormat: 'bracket' });
        const categories = [];

        if (query.categories) {
            if (isString(query.categories)) {
                categories.push(capitalizeCategory(query.categories));
            } else {
                query.categories.forEach((category) => {
                    categories.push(capitalizeCategory(category));
                });
            }
            this.setState(() => ({
                filters: {
                    categories,
                },
            }));
        }
        this.filterAndLimitProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filters !== this.state.filters) {
            return this.filterAndLimitProducts();
        }

        if (prevState.paging !== this.state.paging) {
            this.setState(() => ({
                products: limitProducts(this.state.filteredProducts, this.state.paging),
            }));
        }
    }

    filterAndLimitProducts = () => {
        const filteredProducts = filterProducts(this.props.productList, this.state.filters);

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
                        categories={this.state.filters.categories}
                        className="util-light-grey-border"
                        onChange={this.onCategoryFilterChange}
                    />
                </div>
                <List className="explore-page__list">
                    {this.state.products.map((product, index) => (
                        <Link
                            key={index}
                            to={`/product/${product.id}`}
                            className="explore-page__product-thumbnail"
                        >
                            <ProductThumbnail
                                brand={product.brand}
                                category={product.category}
                                highestPrice={product.highestPrice}
                                image={product.image}
                                isFavourited={product.isFavourited}
                                lowestPrice={product.lowestPrice}
                                numOfRatings={product.numOfRatings}
                                rating={product.rating}
                            />
                        </Link>
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

const mapStateToProps = (state) => ({
    productList: state.products.productList,
});

export default connect(mapStateToProps)(ExplorePage);
