import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE,
    ADD_FRIEND_START,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_FAILURE
} from "../actions/consts";

const initialState = {
    isFetching: false,
    isFetchingAddFriend: false,
    foundedPeople: [],
    friendsInRequests: [],
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
        case ADD_FRIEND_START:
            return {
                ...state,
                isFetchingAddFriend: true,
            };
        case ADD_FRIEND_SUCCESS:
            return {
                ...state,
                isFetchingAddFriend: false,
                friendsInRequests: action.payload.friendsRequests,
                message: action.payload.message
            };
        case ADD_FRIEND_FAILURE:
            return {
                ...state,
                isFetchingAddFriend: false,
                message: action.payload.message
            };
        default:
            return state
    }
}