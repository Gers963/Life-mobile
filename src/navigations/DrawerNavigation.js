import React, {useState, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {CardItem, Thumbnail, Left, Body} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import BottomTabNavigator from './BottomTabNavigator';
import {ItemSeparator} from '../components';
import NavigationService from '../shared/NavigationService';

const drawerNavigator = createDrawerNavigator(
  {
    Tabs: BottomTabNavigator,
  },
  {
    contentComponent: props => {
      const [name, setName] = useState('');

      const onPress = item => {
        NavigationService.topNavigate(item, {});
      };

      const getUser = async () => {
        setName(await AsyncStorage.getItem('@coft:userName'));
      };

      const logOut = async () => {
        await AsyncStorage.removeItem('@coft:patientId');
        await AsyncStorage.removeItem('@coft:userName');
        await AsyncStorage.removeItem('user');
        NavigationService.topNavigate('Auth', {});
      };

      getUser();

      return (
        <ScrollView>
          <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                style={{width: 134, height: 60, marginBottom: 8}}
                source={require('../assets/images/clinic.png')}
              />
            </View>
            <ItemSeparator />
            <TouchableOpacity
              style={{marginTop: 5}}
              onPress={() => onPress('Profile')}>
              <CardItem>
                <Icon
                  style={{marginLeft: -3}}
                  size={30}
                  name={'account'}
                  color={'#373737'}
                />
                <Left>
                  <Body>
                    <Text
                      style={{
                        fontFamily: 'Calibre',
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#373737',
                      }}>
                      {name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 12,
                        color: '#373737',
                      }}
                      note>
                      Editar meu perfil
                    </Text>
                  </Body>
                </Left>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon size={18} name={'chevron-right'} color={'#A4A4A4'} />
                </View>
              </CardItem>
            </TouchableOpacity>
            {/*
                        <TouchableOpacity onPress={() => onPress('PaymentCard')}>
                            <CardItem>
                                <Icon size={24} name={"credit-card"} color={"#373737"}/>
                                <Left>
                                    <Body>
                                        <Text style={{fontFamily: 'Roboto', fontSize: 15, color: '#373737'}}>Formas de Confirmar</Text>
                                    </Body>
                                </Left>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon size={18} name={"chevron-right"} color={"#A4A4A4"}/>
                                </View>
                            </CardItem>
                        </TouchableOpacity>
                        */}
            <TouchableOpacity onPress={() => onPress('MedicamentScreen')}>
              <CardItem>
                <Icon size={24} name={'medical-bag'} color={'#373737'} />
                <Left>
                  <Body>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 15,
                        color: '#373737',
                      }}>
                      Medicamentos
                    </Text>
                  </Body>
                </Left>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon size={18} name={'chevron-right'} color={'#A4A4A4'} />
                </View>
              </CardItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress('DiseaseScreen')}>
              <CardItem>
                <Icon size={24} name={'heart-pulse'} color={'#373737'} />
                <Left>
                  <Body>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 15,
                        color: '#373737',
                      }}>
                      Enfermidades
                    </Text>
                  </Body>
                </Left>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon size={18} name={'chevron-right'} color={'#A4A4A4'} />
                </View>
              </CardItem>
            </TouchableOpacity>
            {/*
                        <TouchableOpacity onPress={() => onPress('LocationScreen')}>
                            <CardItem>
                                <Icon size={24} name={"compass"} color={"#373737"}/>
                                <Left>
                                    <Body>
                                        <Text style={{fontFamily: 'Roboto', fontSize: 15, color: '#373737'}}>Localização</Text>
                                    </Body>
                                </Left>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon size={18} name={"chevron-right"} color={"#A4A4A4"}/>
                                </View>
                            </CardItem>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onPress('TempScreen')}>
                            <CardItem>
                                <Icon size={24} name={"bell-outline"} color={"#373737"}/>
                                <Left>
                                    <Body>
                                        <Text style={{fontFamily: 'Roboto', fontSize: 15, color: '#373737'}}>Notificações</Text>
                                    </Body>
                                </Left>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon size={18} name={"chevron-right"} color={"#A4A4A4"}/>
                                </View>
                            </CardItem>
                        </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => onPress('Historic')}>
                            <CardItem>
                                <Icon size={24} name={"file-document-outline"} color={"#373737"}/>
                                <Left>
                                    <Body>
                                        <Text style={{fontFamily: 'Roboto', fontSize: 15, color: '#373737'}}>Consultas</Text>
                                    </Body>
                                </Left>

                            </CardItem>
                        </TouchableOpacity> */}

            <TouchableOpacity onPress={() => logOut()}>
              <CardItem>
                <Icon size={24} name={'logout'} color={'#373737'} />
                <Left>
                  <Body>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 15,
                        color: '#373737',
                      }}>
                      Sair
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      );
    },
  },
);

const Stack = createStackNavigator(
  {
    Drawer: {
      screen: drawerNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        //headerShown: false
      },
    },
  },
  {
    //initialRouteName: 'Home'
  },
);
export default createAppContainer(Stack);
