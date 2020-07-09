const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.user;
        case 'UPDATE_MERCHANT':
            return {
                ...state,
                merchant: action.merchant,
            };
        default:
            return state;
    }
};

export default usersReducer;
