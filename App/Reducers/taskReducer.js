import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: true,
  taskList:{
    data:[],
  },
  taskNew:{
    taskNote: '任务备注',
  }
};

let taskReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.TASK_REQUEST:
    return {
      ...state,
      //isFetching: action.isFetching,
    }
    case TYPES.TASK_RECEIVE:
    return {
      ...state,
      isFetching: action.isFetching,
      taskList: action.taskList,
    }
    case TYPES.TASK_RECEIVE_FAIL:
    return {
      ...state,
      isFetching: false,
    }
    case TYPES.ADD_TASK_NOTE:
    return {
      ...state,
      taskNew:{
        taskNote: action.note,
      }
    }
    case TYPES.CANCEL_TASK:
    return {
      ...state,
      taskNew:{
        taskNote: '任务备注',
      }
    }
    default:
    return state;
  }
}

export default taskReducer;
