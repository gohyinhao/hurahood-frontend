import { fetchData } from './common';

export const fetchProducts = async (filters) => {
    const products = await fetchData('/products', filters);
    return products;
};
