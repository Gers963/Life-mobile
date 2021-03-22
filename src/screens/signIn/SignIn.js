import React, { Component, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import styles from './Styles';
import { Item, Label, Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPet } from '../../actions/pet';
import api from '../../api/api';

const mapStateToProps = state => {
  return {
    pet: state.pet,
  };
};

class TempScreen extends Component {
  static propTypes = {
    setPet: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
    };
  }

  onPress = () => {
    this.props.navigation.navigate('SingUp');
  };

  loginUser = async () => {
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert('LifePet', 'Preencha todos os campos para continuarmos');
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await api.post('/pet/login',
        {
          email: this.state.email,
          password: this.state.password,
        },
      );

      const token = response.data.token;
      const pet = response.data.pet

      this.props.setPet(pet);
      await AsyncStorage.setItem('access_token', token); 
      await AsyncStorage.setItem('pet', JSON.stringify(pet));
      await AsyncStorage.setItem('@life:petId', `${pet._id}`);
      await AsyncStorage.setItem('@life:petName', `${pet.name}`).then(
        () => {
          this.setState({ isLoading: false });
          this.props.navigation.navigate('Home');
        },
      );

    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert('LifePet', 'Usuário ou senha incorretos');
    }
  };

  render() {
    const { isLoading } = this.state;
    let img = require('../images/logoName.png');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? '-2%' : '2%',
            marginBottom: Platform.OS == 'ios' ? '3%' : '-5%'
          }}>
          <Image
            source={img}
            style={{width: 320, height: 143, marginTop: '5%'}}
          />
        </View>

        <ScrollView>
          <View>
            <Item
              stackedLabel
              style={{
                marginHorizontal: 16,
                borderBottomColor: '#d9d9d9',
                overflow: 'hidden',
                marginLeft: '7%',
                marginRight: '7%',
                height: 40,
                marginBottom: '4%',
              }}>
              <Label>E-mail</Label>
              <Input
                autoCapitalize={'none'}
                placeholderTextColor={'#e6e6e6'}
                underlineColorAndroid={'transparent'}
                style={{
                  color: '#595959',
                  position: 'absolute',
                  marginTop: 20,
                  width: '100%',
                }}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>

            <Item
              stackedLabel
              style={{
                marginHorizontal: 16,
                borderBottomColor: '#d9d9d9',
                height: 40,
                overflow: 'hidden',
                marginLeft: '7%',
                marginBottom: Platform.OS == 'ios' ? '30%' : '10%',
              }}>
              <Label>Senha</Label>
              <Input
                autoCapitalize={'none'}
                placeholderTextColor={'#e6e6e6'}
                underlineColorAndroid={'transparent'}
                style={{
                  color: '#595959',
                  position: 'absolute',
                  marginTop: 20,
                  width: '100%',
                }}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>

            <View style={{ marginTop: Platform.OS == 'ios' ? -50 : 0 }}>
              <TouchableOpacity
                style={[styles.buttonLogin]}
                disabled={isLoading}
                onPress={() => this.loginUser()}>
                <View style={styles.buttonArea}>
                  {isLoading ? (
                    <>
                      <ActivityIndicator
                        style={styles.buttonText}
                        color={'#fff'}
                      />
                    </>
                  ) : (
                      <>
                        <Text style={[styles.buttonText, { color: '#fff' }]}>
                          Entrar
                      </Text>
                      </>
                    )}
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: '10%' }}>
              <TouchableOpacity
                style={[styles.buttonCad]}
                onPress={() => this.onPress()}>
                <View style={styles.buttonArea}>
                  <Text style={[styles.buttonText, { color: '#333333' }]}>
                    Não possui conta ?{' '}
                  </Text>
                  <Text style={[styles.buttonText, { marginLeft: 5 }]}>
                    Cadastre-se
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { setPet },
)(TempScreen);
