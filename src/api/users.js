import { fetchData, postData } from './common';

export const fetchUser = async () => {
    const user = await fetchData('/users/me');
    return user;
};

export const signUpUser = async (user) => {
    const newUser = await postData('/users', user);
    return newUser;
};

export default { fetchUser, signUpUser };
