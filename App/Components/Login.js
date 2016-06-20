'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    TextInput,
    Alert,
    Switch,
    Dimensions,
    PixelRatio,
} from 'react-native';

import {userLogin,userLoginFail} from '../Actions/userActions';
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from './loading';
import Main from './Main';

const {height, width} = Dimensions.get('window');
//用户登录界面
class Login extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
          userCode: 'YG1375',
          userPassWd: '12345678',
          isLoading: false,
          remember: false,
        }
    }

    //测试代码,添加数据到sotre
    _userLogin(){
        const { dispatch,user} = this.props;
        const {userCode,userPassWd} = this.state;
        if (userCode === '' || userCode.length < 6) {
            Alert.alert('', '请输入6位用户名');
            return false;
        }
        if (userPassWd === '') {
            Alert.alert('', '请输入密码');
            return false;
        }
        dispatch(userLogin(userCode,userPassWd));
    }

    _switchChage(){
      this.setState({remember: !this.state.remember})
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.user.isAuthenticated) {
          nextProps.navigator.push({ name: 'Main', component: Main });
      }
      if (nextProps.user.failure){
        Alert.alert('', '用户名密码输入错误');
      }
      console.log("user isFetching=="+nextProps.user.isFetching);
      this.setState({isLoading: nextProps.user.isFetching});
    }

    render() {
      const {user} = this.props
        return (
            <View style={styles.container}>
            <Loading isLoading={this.state.isLoading} loadingTitle={'正在登录'} />
            <Image
              style={styles.loginbg}
              source={require('../Images/login_bg.jpg') }>
              <View style={styles.logoView}>
                <Image
                  style={styles.logoImage}
                  source={require('../Images/logo.png') } />

              </View>

              {/*输入框开始*/}
              <View style={styles.inputContent}>
                <View style={styles.inputForm}>
                  <View style={styles.inputFormIcon}>
                    <Icon name="md-person" size={32} color='#FFF'/>
                  </View>
                  <View style={styles.inputFormInput}>
                    <TextInput
                      underlineColorAndroid='transparent'
                      placeholder='请输入用户名'
                      clearButtonMode={'always'}
                      onChangeText={(text) => this.setState({userCode: text})}
                      value={this.state.userCode}
                      style={{height: 40}}
                    />
                  </View>
                </View>
                <View style={styles.inputForm}>
                  <View style={[styles.inputFormIcon,{padding:2.3}]}>
                    <Icon name="ios-unlock" size={32} color='#FFF'/>
                  </View>
                  <View style={styles.inputFormInput}>
                    <TextInput
                      underlineColorAndroid='transparent'
                      placeholder='请输入密码'
                      secureTextEntry={true}
                      onChangeText={(text) => this.setState({userPassWd: text})}
                      value={this.state.userPassWd}
                      style={{height: 40}}
                    />
                  </View>
                </View>
              </View>
              {/*输入框结束*/}

              {/*记住密码开始*/}
              <View style={styles.rememberForm}>
                <Text>
                记住我
                </Text>
                <Switch
                    style={styles.switch}
                    onTintColor="#50A600"
                    thumbTintColor="white"
                    value={this.state.remember}
                    onValueChange={()=>this._switchChage()}
                />
              </View>
              {/*记住密码结束*/}
              <View style={styles.buttonForm}>
                <TouchableHighlight
                    onPress={()=>this._userLogin()}
                    style={styles.loginButton}
                    underlayColor="#bbbbbb"
                    >
                    <Text style={{ color: '#fff' }}>
                        登      录
                    </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.copyRight}>
                <Text>常笑健康苑 @2016</Text>
              </View>
              </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginbg:{
      justifyContent: 'flex-start',
      flex:1,
      height:height,
      width:width,
    },
    logoView :{
      //backgroundColor:'#eee',
      justifyContent: 'center',
      alignItems: 'center',
      height:200,
    },
    logoImage:{
      resizeMode: 'contain',
      width: 200,
    },
    inputContent:{
      height:100,
    },
    inputForm:{
      flex:1,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomColor: '#FFFFE3',
      borderBottomWidth: 1/PixelRatio.get(),
      //paddingLeft:30,
      marginLeft:30,
      marginRight:30,
    },
    inputFormIcon:{
      marginRight:10,
      alignItems:'center',
      //backgroundColor:'#e0e'
    },
    inputFormInput:{
      flex:1,
      //justifyContent:'flex-start',
      //backgroundColor:'#eee',
    },
    LoginInput: {
      //flex:1,
    },
    rememberForm:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft:30,
      marginRight:20,
      height:50,
    },
    switch: {
        position: 'absolute',
        right: 15,
        top: 10,
    },
    buttonForm: {
      height:80,
    },
    loginButton:{
      marginTop: 30,
      marginLeft: 15,
      marginRight: 15,
      backgroundColor: 'deepskyblue',
      height: 48,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    copyRight:{
      //flex:1,
      height:30,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
});

export default Login;
