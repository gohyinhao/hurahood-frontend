const filterProducts = (products, filters) => {
    return products.filter((product) => filters.categories.includes(product.category));
};

const limitProducts = (products, paging) => {
    const { currentPage, listingsPerPage, totalListings } = paging;

    if (totalListings <= listingsPerPage) {
        return products;
    }

    return products.filter((product, index) => {
        const maxIndex = currentPage * listingsPerPage;
        const minIndex = maxIndex - listingsPerPage;

        return index >= minIndex && index < maxIndex;
    });
};

export { filterProducts, limitProducts };
