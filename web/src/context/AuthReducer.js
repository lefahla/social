const AuthReducer = (state, action) => {
    switch (action.state) {
        case "LOIGN_START":
            return {
                user: null,
                fetching: true,
                error: false
            }; 

        case "LOIGN_SUCCESS":
            return {
                user: action.payload,
                fetching: false,
                error: false
            };

        case "LOIGN_FAILURE":
            return {
                user: null,
                fetching: false,
                error: action.payload
            }; 

        default:
            return state
    }
}

export default AuthReducer;