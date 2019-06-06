import {
    FETCH_NEWS_START,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE
} from "../actions/consts";

const initialState = {
    news: [],
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_START:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                news: action.payload.articles
            };
        case FETCH_NEWS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}