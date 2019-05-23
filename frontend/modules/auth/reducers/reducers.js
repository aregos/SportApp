import {REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/consts.js';

const initialState = {
    email: '',
    login: '',
    password: '',
    message: '',
    status: '',
    isFetching: false
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
                email: action.payload.email,
                login: action.payload.login,
                password: action.payload.login,
                message: action.payload.message,
                status: action.payload.status,
                isFetching: false
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status,
                isFetching: false
            };
        default:
            return state;
    }
}