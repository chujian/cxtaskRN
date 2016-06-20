'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  TouchableHighlight,
  Platform,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from '../../Constants/ActivityConstanter'

const {height, width} = Dimensions.get('window');

class MyWork extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  _selectMyActivity(){
    this.props.navigator.push({name:'Activity',component:Activity});
  }

  render(){
    return(
      <View>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#34b2e5'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的工作'}}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <View style={styles.workMain}>
          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => this._selectMyActivity()}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/sjxl.png')}/>
             <Text style={styles.ItemText}>义诊活动</Text>
          </View>
          </TouchableHighlight>

          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => alert('111')}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/xcpph.png')}/>
             <Text style={styles.ItemText}>新品铺货</Text>
          </View>
          </TouchableHighlight>

          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => alert('111')}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/sjxl.png')}/>
             <Text style={styles.ItemText}>历史纪录</Text>
          </View>
          </TouchableHighlight>
        </View>

        <View style={styles.workMain}>
          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => alert('111')}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/sjxl.png')}/>
             <Text style={styles.ItemText}>实销上报</Text>
          </View>
          </TouchableHighlight>

          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => alert('111')}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/xcpph.png')}/>
             <Text style={styles.ItemText}>我的下属</Text>
          </View>
          </TouchableHighlight>

          <TouchableHighlight
          style={{flex:1}}
          underlayColor='#A8CEBF'
          onPress={() => alert('111')}>
          <View style={styles.workItem}>
            <Image
             style={styles.ItemImage}
             source={require('../../Images/sjxl.png')}/>
             <Text style={styles.ItemText}>系统图表</Text>
          </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    workMain: {
        flex: 1,
        backgroundColor: '#dcdace',
        flexDirection:'row',
    },
    workItem: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      height: 120,
      backgroundColor:'#FFF',
      marginLeft:1/PixelRatio.get(),
      marginBottom:1/PixelRatio.get(),
    },
    ItemImage: {
      width: 20*PixelRatio.get(),
      height:20*PixelRatio.get(),
    },
    ItemText: {
      marginTop:10,
    }
});
export default MyWork;
