import {
    SEARCH_FRIENDS_START,
    SEARCH_FRIENDS_SUCCESS,
    SEARCH_FRIENDS_FAILURE
} from "./consts";
import {searchFriendsApi} from "../api";

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