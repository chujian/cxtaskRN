import React,{ Component } from 'react';

import { connect } from 'react-redux';

import TaskAdd from '../Components/TaskAdd';

class TaskAddConstanter extends React.Component {
  render() {
    return (
      <TaskAdd {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,task} = state;
  return {
    user,
    task,
  }
}

export default connect(mapStateToProps)(TaskAddConstanter)
