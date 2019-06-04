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
    GETUSERINFO_FAILURE
} from './consts.js';
import {registerApi, loginApi, updateApi, getUserInfoApi} from '../api.js';

export const registerAction = (email, login, password) => {
    return async (dispatch) => {
            dispatch({type: REGISTER_START});
            registerApi(email,login,password)
                .then(response => {
                    return response.json();
                })
                .then(res => dispatch({type: REGISTER_SUCCESS, payload: res}))
                .catch(error => {
                    dispatch({type: REGISTER_FAILURE, payload: error})
                });
    }
};

export const loginAction = (login, password) => {
    return async (dispatch) => {
            dispatch({type: LOGIN_START});
            loginApi(login, password)
                .then(response => {
                    return response.json();
                })
                .then(res => dispatch({type: LOGIN_SUCCESS, payload: res}))
                .catch(error => {
                    dispatch({type : LOGIN_FAILURE, payload: error})
                })
    }
};

export const logoutAction = () => {
    return dispatch => {
        dispatch({type: LOGOUT_START});
        dispatch({type: LOGOUT_SUCCESS});
    }
};

export const guestModeAction = () => {
    return dispatch => {
        dispatch({type: GUEST_MODE_START});
        dispatch({type: GUEST_MODE_SUCCESS});
    }
};

export const updateUserInfoAction = (login, props) => {
    return dispatch => {
        dispatch({type: UPDATE_START});
        updateApi(login, props)
            .then(res => res.json())
            .then(res => dispatch({type: UPDATE_SUCCESS, payload: res}))
            .catch(err => dispatch({type: UPDATE_FAILURE, payload: err}))
    };
};

export const getUserInfoAction = login => {
    return dispatch => {
        dispatch({type: GETUSERINFO_START});
        getUserInfoApi(login)
            .then(res => res.json())
            .then(res => dispatch({type: GETUSERINFO_SUCCESS, payload: res}))
            .catch(err => dispatch({type: GETUSERINFO_FAILURE, payload: err}))
    }
};