export const AuthReducer = (state, action) => {
    const {
        type, payload: { isAuthencation, user }
    } = action
    // const { type, payload } = action
    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                loading: false,
                isAuthencation,
                user

            }

            break;

        default:
            return state;
    }
}