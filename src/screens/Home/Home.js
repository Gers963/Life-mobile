import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CardItem, Thumbnail, Left, Body, Card, Fab, Right} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class YourApp extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Thumbnail
                  source={{
                    uri:
                      'https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/698ef6/698ef62ac201ea6d4db05d98f582abe0_large.jpg',
                  }}
                />
              </TouchableOpacity>
              <View style={{padding: 7, margin: 8}}>
                <Text
                  style={{
                    fontFamily: 'Cairo',
                    color: '#000',
                    fontSize: 20,
                    marginTop: -10,
                  }}>
                  Amanda Santos
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              fontSize: 16,
              paddingLeft: 10,
            }}>
            Como podemos te ajudar hoje?
          </Text>
          <View style={{flexDirection: 'row', margin: 15}}>
            <Card
              style={{
                width: '50%',
                alignItems: 'center',
                backgroundColor: '#87d4de',
              }}>
              <CardItem header style={{backgroundColor: '#87d4de'}}>
                <Text style={{marginTop: '-4%', color: '#fff'}}>Consultas</Text>
              </CardItem>
              <Icon
                name={'charity'}
                size={22}
                color={'#fff'}
                style={{marginTop: '-7%'}}
              />
            </Card>
            <Card style={{width: '50%'}}>
              <CardItem header>
                <Text>NativeBase</Text>
              </CardItem>
            </Card>
          </View>
          <View style={{flexDirection: 'row', margin: 15, marginTop: '-3%'}}>
            <Card style={{width: '50%'}}>
              <CardItem header>
                <Text>Consultas</Text>
              </CardItem>
              <Icon name={'cloud'} size={18} color={'#777'} />
            </Card>
            <Card style={{width: '50%'}}>
              <CardItem header>
                <Text>NativeBase</Text>
              </CardItem>
            </Card>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 8,
              }}>
              Meus últimos agendamentos
            </Text>
          </View>
          <View style={{margin: 15}}>
            <Card style={{width: '100%'}}>
              <CardItem header>
                <Text>Consultas</Text>
              </CardItem>
              <Icon name={'cloud'} size={18} color={'#777'} />
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
