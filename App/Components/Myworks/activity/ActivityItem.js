import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
} from 'react-native';

class ActivityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.9,
        }
    }

    render() {
        let Activity = this.props.activity;

        return (<TouchableHighlight onPress = {
                () => {}
            }
            underlayColor="#A8CEBF">
            <View style={styles.Item}>
              <View style={styles.ItemContent}>
                <Text>{Activity.get_name}</Text>
              </View>

              <View style={styles.ItemContent}>
                <Text>活动时间:</Text>
                <Text>{Activity.get_startdate}</Text>
              </View>

              <View style={styles.ItemContent}>
                <Text>地址:</Text>
                <Text>{Activity.get_address}</Text>
              </View>

              <View style={styles.ItemContent}>
                <Text>业务员:</Text>
                <Text>{Activity.get_employeename}({Activity.get_tel})</Text>
              </View>

              <View style={styles.ItemContent}>
                <Text>医生:</Text>
                <Text>get_doctors</Text>
              </View>
            </View>
            </TouchableHighlight>);
    }

}

const styles = StyleSheet.create({
    Item: {
      flex:1,
      backgroundColor: '#FFF',
      justifyContent:'flex-start',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    ItemContent:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      padding:5,
    },
});

export default ActivityItem;
