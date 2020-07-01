const singleCategoryFilter = (product, category) => {
    if (category === 'all') {
        return true;
    } else {
        return product.category === category;
    }
};

export const filterProducts = (products, filters) => {
    return products.filter((product) => singleCategoryFilter(product, filters.category));
};

export const limitProducts = (products, paging) => {
    const { currentPage, listingsPerPage } = paging;

    if (products.length <= listingsPerPage) {
        return products;
    }

    return products.filter((product, index) => {
        const maxIndex = currentPage * listingsPerPage;
        const minIndex = maxIndex - listingsPerPage;

        return index >= minIndex && index < maxIndex;
    });
};

export default { filterProducts, limitProducts };
