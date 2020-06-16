import { fetchData } from './common';

export const fetchUser = async () => {
    const user = await fetchData('/users/me');
    return user;
};

export default { fetchUser };
