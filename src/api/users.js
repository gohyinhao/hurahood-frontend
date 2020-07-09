import { fetchData, updateData, postData } from './common';

export const fetchUser = async () => {
    const user = await fetchData('/users/me');
    return user;
};

export const updateUser = async (updates) => {
    const user = await updateData('/users/me', updates);
    return user;
};

export const signUpUser = async (user) => {
    const newUser = await postData('/users', user);
    return newUser;
};

export const signOutUser = async () => {
    await postData('/users/logout');
    return;
};

export const loginUser = async (email, password) => {
    const user = await postData('/users/login', { email, password });
    return user;
};

export const loginGoogleUser = async (code, state) => {
    const user = await postData('/users/login/google', { code, state });
    return user;
};

export const loginFacebookUser = async (code, state) => {
    const user = await postData('/users/login/facebook', { code, state });
    return user;
};

export const verifyEmail = async (token) => {
    const user = await postData('/users/email/verify', { token });
    return user;
};

export default {
    fetchUser,
    updateUser,
    signUpUser,
    signOutUser,
    loginUser,
    loginGoogleUser,
    loginFacebookUser,
    verifyEmail,
};
