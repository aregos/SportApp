import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    GUEST_MODE_START,
    GUEST_MODE_SUCCESS,
    GUEST_MODE_FAILURE,
    UPDATE_START,
    UPDATE_SUCCESS,
    UPDATE_FAILURE
}
from '../actions/consts.js';

const initialState = {
    email: '',
    login: '',
    name: '',
    token: null,
    message: '',
    isLogged: false,
    isGuestMode: false,
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
        case LOGIN_START:
            return {
                ...state,
                isFetching: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.data.user.email,
                login: action.payload.data.user.name,
                token: action.payload.data.token,
                message: action.payload.message,
                isFetching: false,
                isLogged: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isFetching: false
            };
        case LOGOUT_START:
            return {
                ...state,
                isFetching: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                email: '',
                login: '',
                message: 'выход выполнен',
                isLogged: false,
                token: null,
                isFetching: false
            };
        case GUEST_MODE_START:
            return {
                ...state,
                isFetching: true
            };
        case GUEST_MODE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isGuestMode: true
            };
        case GUEST_MODE_FAILURE:
            return {
                ...state,
                isFetching: true
            };
        case UPDATE_START:
            return {
                ...state,
                isFetching: true
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                name: action.payload.data.name
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload.error
            };
        default:
            return state;
    }
}