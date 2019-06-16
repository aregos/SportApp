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
    UPDATESETTINGSLIST_START,
    UPDATESETTINGSLIST_SUCCESS,
    UPDATESETTINGSLIST_FAILURE,
    GETSETTINGSLIST_START,
    GETSETTINGSLIST_SUCCESS,
    GETSETTINGSLIST_FAILURE
} from './consts.js';
import {registerApi, loginApi, updateApi, getUserInfoApi, updateSettingsListApi, getSettingsListApi} from '../api.js';

export const registerAction = (email, login, password) => async (dispatch) => {
            dispatch({type: REGISTER_START});
            registerApi(email,login,password)
                .then(response => {
                    return response.json();
                })
                .then(res => dispatch({type: REGISTER_SUCCESS, payload: res}))
                .catch(error => {
                    dispatch({type: REGISTER_FAILURE, payload: error})
                });
};

export const loginAction = (login, password) => async (dispatch) => {
            dispatch({type: LOGIN_START});
            loginApi(login, password)
                .then(response => {
                    return response.json();
                })
                .then(res => dispatch({type: LOGIN_SUCCESS, payload: res}))
                .catch(error => {
                    dispatch({type : LOGIN_FAILURE, payload: error})
                })
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

export const updateUserInfoAction = (login, props) => dispatch => {
        dispatch({type: UPDATE_START});
        updateApi(login, props)
            .then(res => res.json())
            .then(res => {
                if (res.birthDate) {
                    const birthDate = res.birthDate.slice(0, 10).split('-');
                    res.birthDate = birthDate[2] + `-` + birthDate[1] + `-` + birthDate[0];
                }
                dispatch({type: UPDATE_SUCCESS, payload: res})
            })
            .catch(err => dispatch({type: UPDATE_FAILURE, payload: err}))
};

export const getUserInfoAction = login => dispatch => {
        dispatch({type: GETUSERINFO_START});
        getUserInfoApi(login)
            .then(res => res.json())
            .then(res => {
                if (res.user.birthDate) {
                    const birthDate = res.user.birthDate.slice(0, 10).split('-');
                    res.user.birthDate = birthDate[2] + `-` + birthDate[1] + `-` + birthDate[0];
                }
                if (res.user.gender === false || res.user.gender === true) {
                    res.user.gender = res.user.gender ? 1 : 0;
                }
                dispatch({type: GETUSERINFO_SUCCESS, payload: res})
            })
            .catch(err => dispatch({type: GETUSERINFO_FAILURE, payload: err}))
};

export const updateSettingsList = (login, settingList) => dispatch => {
        dispatch({type: UPDATESETTINGSLIST_START});
        updateSettingsListApi(login, settingList)
            .then(res => res.json())
            .then(res => {
                dispatch({type: UPDATESETTINGSLIST_SUCCESS, payload: res})
            })
            .catch(err => dispatch({type: UPDATESETTINGSLIST_FAILURE, payload: err}))
};

export const getSettingsList = login => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({type: GETSETTINGSLIST_START});
        getSettingsListApi(login)
            .then(res => res.json())
            .then(res => {
                dispatch({type: GETSETTINGSLIST_SUCCESS, payload: res});
                resolve(res);
            })
            .catch(err => {
                dispatch({type: GETSETTINGSLIST_FAILURE, payload: err});
                reject(err);
            })
    })
        
};