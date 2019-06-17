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
    UPDATE_FAILURE,
    GETUSERINFO_START,
    GETUSERINFO_SUCCESS,
    GETUSERINFO_FAILURE,
    GETSETTINGSLIST_START,
    GETSETTINGSLIST_SUCCESS,
    GETSETTINGSLIST_FAILURE,
    UPDATESETTINGSLIST_START,
    UPDATESETTINGSLIST_SUCCESS,
    UPDATESETTINGSLIST_FAILURE
}
from '../actions/consts.js';

const initialState = {
    email: '',
    login: '',
    name: '',
    surName: '',
    birthDate: '',
    gender: null,
    token: null,
    message: '',
    error: null,
    isLogged: false,
    isGuestMode: false,
    isFetching: false,
    settingsList: {
        friends: false,
        trainings: true,
        news: true,
        teams: false,
        coaches: true,
        clubs: false,
        shops: false,
        hotels: true,
        travels: false,
        insurance: false,
        medicalServices: false
    }
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
                login: action.payload.data.user.login,
                token: action.payload.data.token,
                message: action.payload.message,
                isFetching: false,
                isLogged: true,
                isGuestMode: false
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
                name: action.payload.name,
                surName: action.payload.surName,
                birthDate: action.payload.birthDate,
                gender: action.payload.gender
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                isFetching: false,
                message: action.payload.error
            };
        case GETUSERINFO_START:
            return {
                ...state,
                isFetching: true
            };
        case GETUSERINFO_SUCCESS:
            return {
                ...state,
                isFetching: false,
                name: action.payload.user.name,
                surName: action.payload.user.surName,
                birthDate: action.payload.user.birthDate,
                gender: action.payload.user.gender
            };
        case GETUSERINFO_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        case GETSETTINGSLIST_START:
            return {
                ...state,
                isFetching: true
            };
        case GETSETTINGSLIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                settingsList: action.payload.settingsList
            };
        case GETSETTINGSLIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                message: action.payload.message
            };
        case UPDATESETTINGSLIST_START:
            return {
                ...state,
                isFetching: true
            };
        case UPDATESETTINGSLIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                settingsList: action.payload.settingsList
            };
        case UPDATESETTINGSLIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                message: action.payload.message
            };
        default:
            return state;
    }
}