import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE,
    ADD_FRIEND_START,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_FAILURE,
    GET_FRIENDS_REQUESTS_START,
    GET_FRIENDS_REQUESTS_SUCCESS,
    GET_FRIENDS_REQUESTS_FAILURE
} from "./consts";
import {searchFriendsApi, addFriendApi, getFriendsInRequestsApi} from "../api";

export const searchFriendsAction = name => dispatch => {
    dispatch({type: SEARCH_FRIENDS_START});
    searchFriendsApi(name)
        .then(res => res.json())
        .then(res => {
            dispatch({type: SEARCH_FRIENDS_SUCCESS, payload: res})
        })
        .catch(err => {
            dispatch({type: SEARCH_FRIENDS_FAILURE, payload: err})
        })
};

export const addFriendAction = (id, friendId) => dispatch => {
    dispatch({type: ADD_FRIEND_START});
    addFriendApi(id, friendId)
        .then(res => res.json())
        .then(res => {
            dispatch({type: ADD_FRIEND_SUCCESS, payload: res})
        })
        .catch(err => {
            dispatch({type: ADD_FRIEND_FAILURE, payload: err})
        })
};

export const getFriendsInRequestsAction = id => dispatch => {
    dispatch({type: GET_FRIENDS_REQUESTS_START});
    getFriendsRequestsApi(id)
        .then(res => res.json())
        .then(res => {
            dispatch({type: GET_FRIENDS_REQUESTS_SUCCESS, payload: res})
        })
        .catch(err => {
            dispatch({type: GET_FRIENDS_REQUESTS_FAILURE, payload: err})
        })
}