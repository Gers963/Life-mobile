import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {CardItem, Thumbnail, Left, Body, Label} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icone from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {diseaseList} from '../../actions/disease';
import {updatePatient} from '../../actions/patient';
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

import Modal from 'react-native-modal';
import Bagde from '../../components/Badge';
import {ItemSeparator, RadioButton} from '../../components';
import ProgressCircle from 'react-native-progress-circle';
import {TextInput} from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return {
    disease: state.disease,
  };
};

class DiseaseScreen extends Component {
  static propTypes = {
    diseaseList: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.load = this.load.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);

    this.state = {
      reached: true,
      refreshing: false,
      isModal: false,
      disease: null,
      item: null,
    };
  }

  static navigationOptions = () => {
    return null;
  };

  async componentDidMount() {
    await this.onRefresh();
    this.setState({
      disease: this.props.disease.rows,
    });
  }

  onRefresh = async () => {
    if (this.props.disease.isLoading) {
      return;
    }
    await this.load();
  };

  load = async () => {
    await this.props.diseaseList(this.props.disease.skip);
  };

  onEndReached = () => {
    const {reached} = this.state;
    if (!reached) {
      this.load();
      this.setState({reached: true});
    }
  };

  onSearch(text) {
    const news = [];
    if (text == '') {
      this.setState({
        disease: this.props.disease.rows,
      });
    } else {
      this.props.disease.rows.forEach(element => {
        if (element.fullName.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        disease: news,
      });
    }
  }

  setDisease = async disease => {
    const id = await AsyncStorage.getItem('@coft:patientId');
    const newValue = {
      disease: disease.id,
    };
    console.log(disease.id);
    this.props.updatePatient(newValue, id);
  };

  onPress = item => {
    this.setState({
      isModal: true,
      item,
    });
  };

  render() {
    const {isModal, item} = this.state;

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
              }}>
              Enfermidades
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1 / 2,
            marginHorizontal: '2%',
            borderColor: '#000',
            marginVertical: '1%',
            marginTop: '-2%',
            opacity: 0.1,
          }}
        />

        <View
          style={{
            border: 1,
            borderColor: '#000',
            marginTop: 10,
            marginLeft: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icone
              name={'search'}
              size={22}
              color={'#595959'}
              style={{
                marginTop: Platform.OS == 'ios' ? -2 : 10,
                marginLeft: 10,
              }}
            />
            <TextInput
              style={{
                marginLeft: 4,
                marginBottom: 5,
                color: '#595959',
                fontSize: 18,
              }}
              ref="searchBar"
              placeholderTextColor={'#595959'}
              onChangeText={text => this.onSearch(text)}
              hideBackground={true}
              placeholder={'Buscar local'}
            />
          </View>
          <View
            style={{
              borderWidth: 1 / 2,
              marginHorizontal: '1%',
              borderColor: '#595959',
              marginVertical: '1%',
              marginTop: Platform.OS == 'ios' ? '2%' : '-2%',
              opacity: 0.1,
              marginLeft: '1%',
              marginRight: '4%',
            }}
          />
        </View>

        <FlatList
          style={{paddingLeft: 10, borderRadius: 10, backgroundColor: '#fff'}}
          renderItem={({item}) => (
            <>
              <TouchableOpacity onPress={() => this.onPress(item)}>
                <View style={{marginTop: 22, marginEnd: 10, margin: 4}}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: '500',
                      color: '#595959',
                      fontSize: 14,
                      fontWeight: 'bold',
                      paddingLeft: 19,
                      paddingTop: 22,
                    }}>
                    {item.fullName}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#595959',
                      fontSize: 14,
                      paddingLeft: 19,
                    }}>
                    {item.annotation}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 19,
                      paddingBottom: 22,
                    }}>
                    <View style={{marginLeft: '73%', marginTop: '-12%'}}>
                      <View style={{}}>
                        <ProgressCircle
                          percent={100}
                          radius={25}
                          borderWidth={3}
                          color="#87d4de"
                          shadowColor="#D8F3DC"
                          bgColor="#fff">
                          <Icon name={'dna'} size={24} color={'#87d4de'} />
                        </ProgressCircle>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
          refreshing={this.props.disease.isLoading}
          keyExtractor={({id}) => id.toString()}
          data={this.state.disease}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          onMomentumScrollBegin={() => this.setState({reached: false})}
          ListEmptyComponent={() =>
            this.props.disease.isLoading ? null : (
              <EmptyList message={'Não há dados disponíveis'} />
            )
          }
        />
        <Modal
          hideModalContentWhileAnimating={true}
          isVisible={isModal}
          useNativeDriver={true}>
          {item != null && (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 7,
                width: '100%',
                height: '80%',
              }}>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  flexDirection: 'row',
                }}>
                <Label style={{color: '#828fff', fontWeight: 'bold'}}>
                  {item.fullName}
                </Label>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    marginLeft: Platform.OS == 'ios' ? '85%' : '84%',
                    marginTop: Platform.OS == 'ios' ? '-15%' : '-15%',
                  }}
                  onPress={() =>
                    this.setState({isModal: !isModal, item: null})
                  }>
                  <Icon
                    size={45}
                    color={'#828fff'}
                    name={'close-circle-outline'}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <Text style={{flexWrap: 'wrap'}}>{item.annotation}</Text>
                </View>
              </ScrollView>

              <View style={{marginBottom: 9}}>
                <View style={{marginBottom: 9}}>
                  <Label
                    style={{
                      color: '#828fff',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      flexWrap: 'wrap',
                    }}>
                    Desjea adicionar a sua
                  </Label>
                  <Label
                    style={{
                      color: '#828fff',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      flexWrap: 'wrap',
                    }}>
                    lista de medicamentos
                  </Label>
                </View>
                <TouchableOpacity
                  onPress={() => this.setDisease(item)}
                  style={{
                    backgroundColor: '#828fff',
                    alignSelf: 'center',
                    width: 150,
                    height: 40,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 17,
                      marginTop: 10,
                    }}>
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default connect(
  mapStateToProps,
  {diseaseList, updatePatient},
)(DiseaseScreen);
