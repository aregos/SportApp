import {
    FETCH_NEWS_START,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
} from "./consts";
import {fetchNewsApi} from "../api";

export const fetchNews = () => {
    return async dispatch => {
        dispatch({type: FETCH_NEWS_START});
        fetchNewsApi()
            .then(res => res.json())
            .then(res => dispatch({type: FETCH_NEWS_SUCCESS, payload: res}))
            .catch(err => dispatch({type: FETCH_NEWS_FAILURE, payload: err}))
    }
};