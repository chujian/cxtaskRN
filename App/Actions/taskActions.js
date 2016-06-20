'use strict'
//import {Alert} from 'react-native';
import * as TYPES from '../Constants/ActionTypes';

//获取tasklist
export let fetchTask = (userCode, token, status) => {
    return dispatch => {
        dispatch(requestTask());
        fetch(`http://task.cxjky.com:3080/app/getTask?userCode=${userCode}&token=${token}&t_status=${status}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((json) => {
              dispatch(receiveTask(json));
            })
            .catch((error) => {
                dispatch({type: TYPES.TASK_RECEIVE_FAIL});
                console.log('获取失效' + error);
            });
    };
}

//正在获取task列表
export let requestTask = () => {
    return {
        type: TYPES.TASK_REQUEST,
        //isFetching: true
    }
}

//接收tasklist
export let receiveTask = (taskList) => {
    return {
        type: TYPES.TASK_RECEIVE,
        isFetching: false,
        taskList
    }
}

//添加note
export let addTaskNote = (note) => {
  return {
    type: TYPES.ADD_TASK_NOTE,
    note
  }
}

//取消编辑任务
export let cancelTask = () => {
  return {
    type: TYPES.CANCEL_TASK
  }
}
