import React,{ Component } from 'react';
import {
  View,
  Text,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Loading from './loading'
import Profile from './Profile'
import LeftButton from './LeftButton'

import TaskConstanter from '../Constants/TaskConstanter'
import ProjectConstanter from '../Constants/ProjectConstanter'
import MyWork from './Myworks/MyWork'
import Message from './Message'


class Main extends Component {
  constructor(props) {
          super(props);
          this.state = {
              selectedTab: '任务',
          }
      }
      render() {
          return (<TabBarIOS selectedTab = {
              this.state.selectedTab
          }
              tintColor="#46afe4"
              barTintColor="#fff">
              <Icon.TabBarItemIOS
                  iconName="ios-paper-outline"
                  selectedIconName="ios-paper-outline"
                  title = '任务'
                  accessibilityLabel = "Blue Tab"
                  selected = {
                      this.state.selectedTab === '任务'
                  }
                  onPress = {
                      () => {
                          this.setState({
                              selectedTab: '任务',
                          });
                      }
                  }>
                  <TaskConstanter {...this.props}/>
              </Icon.TabBarItemIOS>

              <Icon.TabBarItemIOS
                  title="项目"
                  iconName="ios-albums-outline"
                  selectedIconName="ios-albums"
                  selected={this.state.selectedTab === 'profile'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'profile',
                      });
                  } }>
                  <ProjectConstanter {...this.props}/>
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                  title="工作"
                  iconName="ios-keypad-outline"
                  selectedIconName="ios-keypad"
                  selected={this.state.selectedTab === 'work'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'work',
                      });
                  } }>
                  <MyWork {...this.props} />
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                  title="消息"
                  iconName="ios-mail-outline"
                  selectedIconName="ios-mail-outline"
                  selected={this.state.selectedTab === 'message'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'message',
                      });
                  } }>
                  <Message {...this.props} />
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                  title="我的"
                  iconName="ios-contact-outline"
                  selectedIconName="ios-contact-outline"
                  selected={this.state.selectedTab === 'settings'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'settings',
                      });
                  } }>
                  <Profile {...this.props} />
              </Icon.TabBarItemIOS>
          </TabBarIOS>
          );
      }
}

export default Main;
