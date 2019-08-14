import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE,
    SEND_FRIEND_REQUEST_START,
    SEND_FRIEND_REQUEST_SUCCESS,
    SEND_FRIEND_REQUEST_FAILURE,
    GET_FRIENDS_REQUESTS_START,
    GET_FRIENDS_REQUESTS_SUCCESS,
    GET_FRIENDS_REQUESTS_FAILURE
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
        case SEND_FRIEND_REQUEST_START:
            return {
                ...state,
                isFetchingAddFriend: true,
            };
        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                isFetchingAddFriend: false,
                friendsInRequests: action.payload.friendsRequests,
                message: action.payload.message
            };
        case SEND_FRIEND_REQUEST_FAILURE:
            return {
                ...state,
                isFetchingAddFriend: false,
                message: action.payload.message
            };
        case GET_FRIENDS_REQUESTS_START:
            return {
                ...state,
                isFetching: true,
            };
        case GET_FRIENDS_REQUESTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                friendsInRequests: action.payload.friendsRequests
            };
        case GET_FRIENDS_REQUESTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload.message
            }
        default:
            return state
    }
}