import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from 'react-native-search-bar'
import { Card, CardItem, Left, Body } from 'native-base';

export default class AppointmentCalendarScreen extends Component {

  static navigationOptions = () => {
    return {
      headerTitle: () => <Text>Consulta - Agenda </Text>,
      headerStyle: { backgroundColor: '#f3f6fe'}
    };
  };

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPress = this.onPress.bind(this);

    this.state = {
      loading: false,
      rows: [],
      filtered: []
    };
  }

  onLoad = () => {

  }

  onSearch = (text) => {

  }

  onPress = (row) => {
    
  }

  render() {

    return (
      <View style={styles.container}>
        <Agenda
          items={{
            '2020-03-03': [{name: '13:00 - 14:00', professional: 'Dr Kleber'}],
            '2020-03-23': [{name: '13:00 - 14:00', professional: 'Dr Pedro'}],
            //'2020-03-24': [],
            '2020-03-25': [{name: '13:00 - 14:00', professional: 'Dr Gabriel'}, {name: '14:00 - 15:00', professional: 'Henrique'}],
            '2020-10-09': [{name: '14:00 - 15:00', professional: 'Dr Kleber'}],
          }}
          renderItem={(item, firstItemInDay) => {return (
            <TouchableOpacity style={styles.item} onPress={() => alert(item.name)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon size={16} name={"clock-outline"} />
                <Text style={{fontFamily: 'Poppins', fontSize: 14, paddingLeft: 5}} note>{item.name}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon size={16} name={"doctor"} />
                <Text style={{fontFamily: 'Poppins', fontSize: 14, paddingLeft: 5}} note>{item.professional}</Text>
              </View>
            </TouchableOpacity>
          );}}
          >

        </Agenda>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5FCFF'
 },
 item: {
  backgroundColor: 'white',
  flex: 1,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 17,
  height: 60
}
});