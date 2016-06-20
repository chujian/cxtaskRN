//import {Alert} from 'react-native';
import * as TYPES from '../Constants/ActionTypes';


//用户登录,参数为用户名和密码
export let userLogin = (userCode, userPassWd) => {
    let URL = 'http://task.cxjky.com:3080/app/LoginCheck?userCode=' + userCode + '&passWd=' + userPassWd;
    return dispatch => {
        dispatch(userLoginRequest()); //显示正在登录
        return fetch(URL)
            .then((response) => response.json())
            .then((json) => {
                if (json.status === '00') {
                    dispatch(userLoginSuccess(json.data, json.data.token));
                } else {
                    dispatch(userLoginFail());
                }
            })
            .catch((error) => {
                dispatch(userLogOut());
                console.log('登录失败==' + error);
            });
    };
}

//正在登录....userCode
export let userLoginRequest = () => {
    return {
        type: TYPES.LOGIN_REQUEST,
    };
}

//用户登录成功
export let userLoginSuccess = (userInfo, token) => {
    return {
        type: TYPES.LOGIN_SUCCESS,
        token,
        userInfo,
    };
}

//用户登录失败
export let userLoginFail = () => {
    return {
        type: TYPES.LOGIN_FAIL
    };
}

//用户退出登录
export let userLogOut = () => {
    return {
        type: TYPES.USER_LOGOUT
    };
}
