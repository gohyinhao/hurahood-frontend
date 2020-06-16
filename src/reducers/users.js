const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.user;
        default:
            return state;
    }
};

export default usersReducer;
