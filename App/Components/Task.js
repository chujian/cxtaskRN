'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  Platform,
  TouchableHighlight,
} from 'react-native'
import {fetchTask} from '../Actions/taskActions'

import TaskItem from './TaskItem'
import Loading from './loading'
import TaskAddConstanter from '../Constants/TaskAddConstanter'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView } from 'react-native-swipe-list-view';

class Task extends Component {
  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      source: dataSource.cloneWithRows(props.task.taskList.data),
      isLoading: false,
    }
  }

  componentWillMount(){
    if(Platform.OS==='android') {
      this.setState({isLoading: true});
    }
    this._onRefresh();
  }

  _onRefresh() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch}  = this.props;
      const {token,userInfo} = this.props.user;
      dispatch(fetchTask(userInfo.LOGINID,token,3));
    });
  }

  _toTaskAdd(){
    const {navigator} = this.props;
    navigator.push({
      name: 'TaskAdd',
      component: TaskAddConstanter,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {task} = this.props;
		if (nextProps.task.taskList.data !== this.props.task.taskList.data) {
			this.setState({
				source: this.state.source.cloneWithRows(nextProps.task.taskList.data)
			});
		}
    if(Platform.OS==='android') {
      this.setState({isLoading: nextProps.user.isFetching});
    }
	}

  render(){
    const {user,task,navigator} = this.props;

    //let source = dataSource.cloneWithRows(task.taskList.data);
    return(
      <View style={styles.container}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#34b2e5'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的任务'}}
        rightButton={<View style={{alignItems:'center',justifyContent: 'center',marginRight:10,}}><Icon name="md-add-circle" size={32} color='#FFF' onPress={() => this._toTaskAdd()}  /></View>}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <Loading isLoading={this.state.isLoading} loadingTitle={'正在获取任务'} />
          <SwipeListView
            ref='swipe'
            closeOnRowPress={true}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            disableRightSwipe={true}
            dataSource={this.state.source}
            renderRow={ (Task,secdId, rowId, rowMap) =>
              (
                <TaskItem task={Task} User={user} onPress={ () => {}} />
              )
          }
            renderHiddenRow={ Task => (
                <View style={styles.rowBack}>
                    <View style={styles.RightBtnMore}><Text style={{fontSize:18,color:'#fff'}}>更多</Text></View>
                    <View style={styles.RightBtnDelete}><Text style={{fontSize:18,color:'#fff'}}>删除</Text></View>
                </View>
            )}
            refreshControl={
                      <RefreshControl
                          initialListSize={10}
                          pagingEnabled={false}
                          onEndReachedThreshold={30}
                          scrollRenderAheadDistance={90}
                          refreshing={task.isFetching}
                          onRefresh={() => this._onRefresh()}
                          colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                          progressBackgroundColor="#fff"
                          tintColor="red"
                          />}
            //leftOpenValue={75}
            rightOpenValue={-150}
        />
          </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      //  marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    rowBack: {
  		alignItems: 'center',
  		backgroundColor: '#DDD',
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'flex-end',
  	},
    RightBtnMore: {
  		alignItems: 'center',
  		bottom: 0,
  		justifyContent: 'center',
  		position: 'absolute',
  		top: 0,
  		width: 75,
      backgroundColor: '#eee',
		  right: 75
  	},
    RightBtnDelete: {
  		alignItems: 'center',
  		bottom: 0,
  		justifyContent: 'center',
  		position: 'absolute',
  		top: 0,
  		width: 75,
      backgroundColor: 'red',
		  right: 0
  	},
});


export default Task;
