import React,{ Component } from 'react'

import {
  StyleSheet,
  Navigator,
  Platform,
  Alert,
  Linking,
} from 'react-native';

//热更新需要引入的组件
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import JPushModule from 'jpush-react-native';

import LoginConstanter from './LoginConstanter';
import _updateConfig from '../../update.json';

const {appKey} = _updateConfig[Platform.OS];

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bg: '#ffffff',
      appkey: 'AppKey',
      imei: 'IMEI',
      package: 'PackageName',
      deviceId: 'DeviceId',
      version: 'Version',
      pushMsg: 'PushMessage',
      registrationId: 'registrationId'
    }
  }

  _doUpdate = (info) => {
    downloadUpdate(info).then(hash => {
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '否',},
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      ]);
    }).catch(err => {
      Alert.alert('提示', '更新失败.');
    });
  }

  _updateAPP(){
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        ]);
      } else if (info.upToDate) {
        //Alert.alert('提示', '您的应用版本已是最新.');
      } else {
        Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
          {text: '是', onPress: ()=>{this._doUpdate(info)}},
          {text: '否',},
        ]);
      }
    }).catch(err => {
      Alert.alert('提示', '更新失败.');
    });
  }
  //componentDidMount(){
  componentWillMount(){
    this._updateAPP();
    //JPushModule.initPush();
    /*
    JPushModule.getInfo((map) => {
      console.log('map.key'+map.myPackageName);
      this.setState({
            appkey: map.myAppKey,
            imei: map.myImei,
            package: map.myPackageName,
            deviceId: map.myDeviceId,
            version: map.myVersion
      });
    });
    */
  }

  componentDidMount() {

    console.log('appkey=='+this.state.appkey);
      JPushModule.addReceiveCustomMsgListener((message) => {
        this.setState({pushMsg: message});
      });
      JPushModule.addReceiveNotificationListener((message) => {
        console.log("receive notification: " + message);
      })
      
    }

  componentWillUnmount() {
    /*
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    */
  }

  renderScene(route, navigator) {
    let Component = route.component
    return (
      <Component navigator={navigator} route={route} />
    )
  }

  configureScene(route) {
    console.log('当前route='+route.name);
    if (route.name && route.name === 'Main') {
      return Navigator.SceneConfigs.FadeAndroid
    } else if(route.name === 'TaskAdd') {
      return Navigator.SceneConfigs.PushFromRight
    } else {
      return Navigator.SceneConfigs.PushFromRight
    }
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: LoginConstanter,
          name: 'Login'
        }}
      />
    )
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default App;
