import {REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/consts.js';

const initialState = {
    email: '',
    login: '',
    message: '',
    isLogged: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                isFetching: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                email: action.payload.data.email,
                login: action.payload.data.login,
                message: action.payload.message,
                isLogged: true,
                isFetching: false
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isFetching: false
            };
        default:
            return state;
    }
}