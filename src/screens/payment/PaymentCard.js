import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {CardItem, Thumbnail, Left, Body} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';
import ActionButton from 'react-native-action-button';

import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import AsyncStorage from '@react-native-community/async-storage';

import Modal from 'react-native-modal';
import Bagde from '../../components/Badge';
import {ItemSeparator, RadioButton} from '../../components';

export default class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      cards: null,
    };
  }

  static navigationOptions = () => {
    return null;
  };

  async componentWillMount() {
    this.setState({
      cards: JSON.parse(await AsyncStorage.getItem('@coft:card')),
    });
    if (this.state.cards.length == 0) {
      this.setState({
        cards: null,
      });
    }
  }

  async componentWillReceiveProps() {
    this.setState({
      cards: JSON.parse(await AsyncStorage.getItem('@coft:card')),
    });
    if (this.state.cards.length == 0) {
      this.setState({
        cards: null,
      });
    }
  }

  removeCard = async item => {
    const pos = null;

    for (let i = 0; i < this.state.cards.length; i++) {
      const card = this.state.cards[i];
      if (card.number == item.number && card.cvc == item.cvc) {
        this.state.cards.splice(i, 1);
      }
    }

    if (this.state.cards.length == 0) {
      this.setState({
        cards: null,
      });
      await AsyncStorage.setItem('@coft:card', null);
    } else {
      await AsyncStorage.setItem(
        '@coft:card',
        JSON.stringify(this.state.cards),
      );
    }
  };

  onPress = () => {
    this.props.navigation.navigate('AddCard');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <DrawerNavigationIcon />
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
                marginRight: 28,
              }}>
              Cartões
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1 / 2,
            marginHorizontal: '2%',
            borderColor: '#000',
            marginVertical: '1%',
            opacity: 0.1,
          }}
        />

        <FlatList
          style={{paddingLeft: 10, borderRadius: 10, backgroundColor: '#fff'}}
          renderItem={({item}) => (
            <View style={{marginTop: 22, marginEnd: 10, margin: 4}}>
              {item.cvv != null && (
                <>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: '#595959',
                      fontSize: 12,
                      fontWeight: 'bold',
                      paddingLeft: 19,
                      paddingTop: 22,
                    }}>
                    XXXX XXXX XXXX {item.number.substr(15, 19)}
                  </Text>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: '#595959',
                      fontSize: 12,
                      fontWeight: 'bold',
                      paddingLeft: 19,
                      paddingTop: 5,
                    }}>
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 19,
                      paddingBottom: 22,
                    }}>
                    <View style={{marginLeft: '73%', marginTop: '-12%'}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            remove: !this.state.remove
                              ? this.state.remove
                              : !this.state.remove,
                          });
                          if (this.state.remove) {
                            this.removeCard(item);
                          }
                        }}>
                        {!this.state.remove && (
                          <ProgressCircle
                            percent={100}
                            radius={30}
                            borderWidth={3}
                            color="#828fff"
                            shadowColor="#D8F3DC"
                            bgColor="#fff">
                            <Icon
                              name={'credit-card'}
                              size={24}
                              color={'#828fff'}
                            />
                          </ProgressCircle>
                        )}
                        {this.state.remove && (
                          <ProgressCircle
                            percent={100}
                            radius={30}
                            borderWidth={3}
                            color="#ca4a6e"
                            shadowColor="#D8F3DC"
                            bgColor="#fff">
                            <Icon
                              name={'trash-can-outline'}
                              size={24}
                              color={'#ca4a6e'}
                            />
                          </ProgressCircle>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
          data={this.state.cards}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={() =>
            this.state.cards ? null : (
              <EmptyList message={'Não há dados disponíveis'} />
            )
          }
        />

        <ActionButton buttonColor="#828FFE">
          <ActionButton.Item
            buttonColor="#87C4C0"
            title="Adiconar"
            onPress={() => this.onPress()}>
            <Icon name={'credit-card'} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#ca4a6e"
            title="Remover"
            onPress={() => this.setState({remove: !this.state.remove})}>
            <Icon name={'trash-can-outline'} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
