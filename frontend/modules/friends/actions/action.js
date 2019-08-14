import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE,
    SEND_FRIEND_REQUEST_START,
    SEND_FRIEND_REQUEST_SUCCESS,
    SEND_FRIEND_REQUEST_FAILURE,
    GET_FRIENDS_REQUESTS_START,
    GET_FRIENDS_REQUESTS_SUCCESS,
    GET_FRIENDS_REQUESTS_FAILURE,
    ACCEPT_FRIEND_REQUEST_START,
    ACCEPT_FRIEND_REQUEST_SUCCESS,
    ACCEPT_FRIEND_REQUEST_FAILURE
} from "./consts";
import { searchFriendsApi, addFriendApi, getFriendsInRequestsApi, acceptFriendRequestApi } from "../api";

export const searchFriendsAction = name => dispatch => {
    dispatch({ type: SEARCH_FRIENDS_START });
    searchFriendsApi(name)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: SEARCH_FRIENDS_SUCCESS, payload: res })
        })
        .catch(err => {
            dispatch({ type: SEARCH_FRIENDS_FAILURE, payload: err })
        })
};

export const sendFriendRequestAction = (id, friendId) => dispatch => {
    dispatch({ type: SEND_FRIEND_REQUEST_START });
    addFriendApi(id, friendId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: SEND_FRIEND_REQUEST_SUCCESS, payload: res })
        })
        .catch(err => {
            dispatch({ type: SEND_FRIEND_REQUEST_FAILURE, payload: err })
        })
};

export const getFriendsInRequestsAction = id => dispatch => {
    dispatch({ type: GET_FRIENDS_REQUESTS_START });
    getFriendsInRequestsApi(id)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: GET_FRIENDS_REQUESTS_SUCCESS, payload: res })
        })
        .catch(err => {
            dispatch({ type: GET_FRIENDS_REQUESTS_FAILURE, payload: err })
        })
}

export const acceptFriendRequestAction = (id, friendId) => dispatch => {
    dispatch({ type: ACCEPT_FRIEND_REQUEST_START });
    acceptFriendRequestApi(id, friendId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: ACCEPT_FRIEND_REQUEST_SUCCESS, payload: res })
        })
        .catch(err => {
            dispatch({ type: ACCEPT_FRIEND_REQUEST_FAILURE, payload: err })
        })
}