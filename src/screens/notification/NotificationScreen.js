import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardItem, Left, Body } from 'native-base';
import BackNavigationIcon from '../../navigations/BackNavigationIcon';

export default class NotificationScreen extends Component {

  static navigationOptions = () => {
    return {
      headerTitle: () => <Text style={{color: '#8C8E93'}}>Notificações</Text>,
      headerStyle: { backgroundColor: '#f3f6fe'},
      headerLeft: () => <BackNavigationIcon/>,
    };
  };

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Card>
          <CardItem>
            <Body>
              <Text style={{fontFamily: 'Calibre', fontSize: 15}}>Agendamento</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon size={12} name={"message-outline"} />
                <Text style={{fontFamily: 'Calibre', fontSize: 12, paddingLeft: 5}} note>Olá, você tem uma nova cirurgia agendada para proxima...</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon size={12} name={"calendar"} />
                <Text style={{fontFamily: 'Calibre', fontSize: 12, paddingLeft: 5}} note>Domingo, 16 de Outubro de 2019</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5FCFF'
 }
});