import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE
} from "../actions/consts";

const initialState = {
    isFetching: false,
    foundedPeople: [],
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_FRIENDS_START:
            return {
                ...state,
                isFetching: true
            };
        case SEARCH_FRIENDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                foundedPeople: action.payload.peopleList
            };
        case SEARCH_FRIENDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload.message
            };
        default:
            return state
    }
}