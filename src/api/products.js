import { fetchData } from './common';

export const fetchProducts = async (filters) => {
    const products = await fetchData('/products', filters);
    return products;
};

export const fetchProduct = async (id) => {
    const product = await fetchData(`/products/${id}`);
    return product;
};

export default { fetchProduct, fetchProducts };
