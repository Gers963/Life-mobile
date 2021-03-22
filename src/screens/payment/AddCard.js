import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import Arrow from '../../navigations/BackNavigationIcon';
import styles from './Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Form, Item, Label, Input} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputMask} from 'react-native-masked-text';

export default class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        number: null,
        cvv: null,
        date: null,
        name: null,
      },
      cards: [],
    };
  }

  static navigationOptions = () => {
    return null;
  };

  async componentDidMount() {
    console.log(await AsyncStorage.getItem('@coft:card'));
  }

  onPress = async () => {
    var cardCache = JSON.parse(await AsyncStorage.getItem('@coft:card'));
    const item = this.state.values;
    const allCards = [];

    if (!item) {
      alert('Insira os dados do cartão antes de salvar');
    } else {
      if (cardCache != null) {
        for (let i = 0; i < cardCache.length; i++) {
          const element = cardCache[i];
          allCards.push(cardCache[i]);
        }
        allCards.push({...item});
        cardCache = allCards;
      } else {
        cardCache = [{...item}];
      }
      await AsyncStorage.setItem('@coft:card', JSON.stringify(cardCache));
      this.props.navigation.navigate('PaymentCard', {cardCache});
    }
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <Arrow />
          <View
            style={{
              backgroundColor: '#FFF',
              alignSelf: 'center',
              width: '80%',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                borderWidth: 0,
                color: '#828fff',
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
                marginRight: Platform.OS == 'ios' ? 60 : 60,
              }}>
              Dados do cartão de crédito
            </Text>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <View style={{marginTop: 50, flex: 1}}>
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
              <View style={{flexDirection: 'row', marginRight: '57%'}}>
                <Icon
                  name={'credit-card'}
                  size={22}
                  color={'#595959'}
                  style={{marginRight: '2%'}}
                />
                <Label style={{marginTop: '-1%'}}>Número do cartão</Label>
              </View>
              <TextInputMask
                type={'credit-card'}
                style={{
                  color: '#595959',
                  marginTop: Platform.OS == 'ios' ? 10 : -6,
                  marginLeft: Platform.OS == 'ios' ? 8 : 6,
                  width: '100%',
                  fontSize: Platform.OS == 'ios' ? 17 : 14,
                }}
                value={this.state.values.number}
                onChangeText={number =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      number: number,
                    },
                  })
                }
              />
            </Item>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: '7%',
                marginLeft: '4%',
              }}>
              <View>
                <Item
                  stackedLabel
                  style={{
                    marginHorizontal: 16,
                    borderBottomColor: '#d9d9d9',
                    height: 40,
                    overflow: 'hidden',
                    marginLeft: '7%',
                    marginBottom: '10%',
                    paddingRight: '25%',
                  }}>
                  <Label>Validade</Label>
                  <TextInputMask
                    type={'datetime'}
                    maxLength={5}
                    style={{
                      color: '#595959',
                      marginTop: Platform.OS == 'ios' ? 10 : -6,
                      marginLeft: Platform.OS == 'ios' ? 8 : 6,
                      width: '100%',
                      fontSize: Platform.OS == 'ios' ? 17 : 14,
                    }}
                    value={this.state.values.date}
                    onChangeText={date =>
                      this.setState({
                        values: {
                          ...this.state.values,
                          date: date,
                        },
                      })
                    }
                  />
                </Item>
              </View>
              <View>
                <Item
                  stackedLabel
                  style={{
                    marginHorizontal: 16,
                    borderBottomColor: '#d9d9d9',
                    height: 40,
                    overflow: 'hidden',
                    marginLeft: '7%',
                    marginBottom: '10%',
                    paddingRight: '25%',
                  }}>
                  <Label>CVV</Label>
                  <Input
                    autoCapitalize={'none'}
                    placeholderTextColor={'#e6e6e6'}
                    underlineColorAndroid={'transparent'}
                    maxLength={3}
                    style={{position: 'absolute', marginTop: 20, width: '100%'}}
                    value={this.state.values.cvv}
                    onChangeText={cvv =>
                      this.setState({
                        values: {
                          ...this.state.values,
                          cvv: this.state.values.cvv,
                        },
                      })
                    }
                  />
                </Item>
              </View>
            </View>

            <Item
              stackedLabel
              style={{
                marginHorizontal: 16,
                borderBottomColor: '#d9d9d9',
                height: 40,
                overflow: 'hidden',
                marginLeft: '7%',
                marginBottom: '10%',
              }}>
              <Label>Nome impresso no cartão</Label>
              <Input
                autoCapitalize={'none'}
                placeholderTextColor={'#e6e6e6'}
                underlineColorAndroid={'transparent'}
                style={{position: 'absolute', marginTop: 20, width: '100%'}}
                value={this.state.values.name}
                onChangeText={name =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      name: this.state.values.name,
                    },
                  })
                }
              />
            </Item>

            <TouchableOpacity
              style={[styles.buttonLogin]}
              onPress={() => this.onPress()}>
              <View style={styles.buttonArea}>
                <Text style={[styles.buttonText, {color: '#fff'}]}>
                  Adicionar cartão
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
