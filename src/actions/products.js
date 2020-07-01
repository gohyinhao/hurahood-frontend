export const updateProduct = (product) => ({
    type: 'UPDATE_PRODUCT',
    product,
});

export const updateOwnedProducts = (products) => ({
    type: 'UPDATE_OWNED_PRODUCTS',
    products,
});

export const clearOwnedProducts = () => ({
    type: 'CLEAR_OWNED_PRODUCTS',
});

export default { updateProduct, updateOwnedProducts, clearOwnedProducts };
