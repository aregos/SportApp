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
        await registerApi(email, login, password)
            .then(res => {
                if (res) {
                    dispatch({type: REGISTER_SUCCESS, payload: Object.assign({}, email, login, password)})
                }
                else {
                    dispatch({type: REGISTER_FAILURE, payload: res})
                }
            })
    }
};

export const loginAction = (login, password) => {
    return async (dispatch) => {
            dispatch({type: LOGIN_START});
        await loginApi(login, password)
            .then(res => {
                if (res) {
                    return {type: LOGIN_SUCCESS, payload: Object.assign({}, res, login, password)}
                }
                else {
                    return {type : LOGIN_FAILURE, payload: res}
                }
            })
    }
}