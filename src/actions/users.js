export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    user,
});

export const updateMerchant = (merchant) => ({
    type: 'UPDATE_MERCHANT',
    merchant,
});

export default { updateUser, updateMerchant };
