import { fetchData, updateData, postData } from './common';

export const fetchProducts = async (filters) => {
    const products = await fetchData('/products', filters);
    return products;
};

export const fetchProduct = async (id) => {
    const product = await fetchData(`/products/${id}`);
    return product;
};

export const updateProduct = async (id, updates) => {
    const product = await updateData(`/products/${id}`, updates);
    return product;
};

export const createNewProduct = async (newProduct) => {
    const product = await postData('/products', newProduct);
    return product;
};

export default { fetchProduct, fetchProducts, updateProduct, createNewProduct };
