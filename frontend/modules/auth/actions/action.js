import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './consts.js';
import {registerApi, loginApi} from '../api.js';

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