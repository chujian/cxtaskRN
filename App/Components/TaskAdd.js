'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Alert,
  Platform,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import LeftButton from './LeftButton'
import TaskNote from '../Constants/TaskNoteConstanter'

import {fetchTask,cancelTask} from '../Actions/taskActions'
import Icon from 'react-native-vector-icons/Ionicons'

class TaskAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      task_title: '',
      task_executor: '执行人姓名',
      task_executorCode: '',//执行人code
      task_endDate: '',//任务结束日期
      task_parterCode: '',//任务参与人code
      task_parterName: '',//任务参与人姓名
      task_level: '2',//任务等级
      task_levelName: '',//任务等级含义
      task_note: '',//任务备注
      task_status: '1',
    }
  }

  //取消发布任务
  _taskCancel(){
    const {dispatch,navigator} = this.props

    if(this.state.task_title !== '' || (this.state.task_note !== '' && this.state.task_note !== '任务备注')) {
      Alert.alert(
            '提示',
            '您确定需要取消本次新建任务的操作吗?',
            [
              {text: '点错了', onPress: () => console.log('取消关闭!')},
              {text: '确认', onPress: () => {
                dispatch(cancelTask());
                navigator.pop();
              }},
            ]
          )
    }else{
      navigator.pop();
    }
  }

  //打开任务备注界面
  _openTaskNote(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskNote',
      component: TaskNote,
    });
  }

  //组件加载前
  componentWillMount(){
    const {userInfo} = this.props.user
    const {taskNew} = this.props.task
    this.setState({
      token: userInfo.token,//token
      task_executor: userInfo.LASTNAME,//发布人姓名
      task_executorCode: userInfo.LOGINID,//发布人ID
      task_note: taskNew.taskNote,//任务备注
    });
  }

  componentDidMount(){
    if(this.state.task_level === '1') {
      this.setState({task_levelName: '普通'});
    }else if(this.state.task_level === '2') {
      this.setState({task_levelName: '紧急'});
    }else{
      this.setState({task_levelName: '非常紧急'});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.task.taskNew.taskNote) {
      this.setState({task_note: nextProps.task.taskNew.taskNote});
    }
  }

  render(){
    const {navigator} = this.props

    const rightButtonConfig = {
      title: '保存',
      handler: () => alert('hello!'),
      tintColor: '#EEE'
    }

    const arrowIcon = (<Icon name="ios-arrow-forward-outline" size={24} color='#eee' />);

    return(
      <View style={styles.container}>
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          tintColor={'#34b2e5'}
          title={{title: '发布任务'}}
          rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>this._taskCancel()} />}
          />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.taskTitleView}>
            <TextInput
              style={{height: 45,marginLeft:5,}}
              placeholder='任务标题'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({task_title: text})}
              value={this.state.task_title}
            />
          </View>

          <View style={styles.List}>
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-contact" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <Text>{this.state.task_executor} ({this.state.task_executorCode})</Text>
              {arrowIcon}
            </View>
          </View>
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-time-outline" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContentLaster}>
              <Text>结束日期</Text>
              {arrowIcon}
            </View>
          </View>
          </View>

          <View style={styles.List}>
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-contacts" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <Text>任务接收人</Text>
              {arrowIcon}
            </View>
          </View>
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-megaphone-outline" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContentLaster}>
              <Text>{this.state.task_levelName}</Text>
              {arrowIcon}
            </View>
          </View>
          </View>

          <View style={styles.List}>
          <TouchableHighlight
              onPress={()=>this._openTaskNote()}
              underlayColor="#bbbbbb"
              >
            <View style={styles.Item}>
              {/*icon view*/}
              <View style={styles.ItemIcon}>
                <Icon name="ios-list-box-outline" size={32} />
              </View>
              {/*ItemContent*/}
              <View style={styles.ItemContentLaster}>
                <Text>{this.state.task_note}</Text>
                {arrowIcon}
              </View>
            </View>
            </TouchableHighlight>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4',
    },
    scroll:{
      padding:0,
    },
    taskTitleView:{
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 60,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    List:{
      marginTop:30,
      borderBottomWidth:0.5,
      borderBottomColor:'#ccc',
      borderTopWidth:0.5,
      borderTopColor:'#ccc',
      backgroundColor: '#FFF',
    },
    Item: {
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
    },
    ItemIcon: {
      marginLeft:10,
    },
    ItemContent: {
      height: 42,
      flex:1,
      marginLeft:10,
      marginRight:10,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    ItemContentLaster: {
      height: 42,
      flex:1,
      marginLeft:10,
      marginRight:10,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
    //  borderBottomColor: '#ccc',
  //    borderBottomWidth: 0.5,
    }
});

export default TaskAdd;
