import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {CardItem, Thumbnail, Left, Body} from 'native-base';
import {connect, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icone from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';

import {medicamentList} from '../../actions/medicament';
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

import Modal from 'react-native-modal';
import Bagde from '../../components/Badge';
import {ItemSeparator, RadioButton} from '../../components';
import {TextInput} from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return {
    medicament: state.medicament,
  };
};

class MedicamentScreen extends Component {
  static propTypes = {
    medicamentList: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  static navigationOptions = () => {
    return null;
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
      isModalFilter: false,
      medicaments: null,
    };
  }

  async componentDidMount() {
    await this.onRefresh();
    this.setState({
      medicaments: this.props.medicament.rows,
    });
  }

  onRefresh = async () => {
    if (this.props.medicament.isLoading) {
      return;
    }
    await this.load();
  };

  load = async () => {
    await this.props.medicamentList(this.props.medicament.skip);
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
        medicaments: this.props.medicament.rows,
      });
    } else {
      this.props.medicament.rows.forEach(element => {
        if (element.fullName.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        medicaments: news,
      });
    }
  }

  onPress = item => {
    //this.props.cooperatorCurrent(item.id);
  };

  render() {
    const {isModalFilter} = this.state;

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
              Medicamentos
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
                          color="#828fff"
                          shadowColor="#D8F3DC"
                          bgColor="#fff">
                          <Icon name={'pill'} size={24} color={'#828fff'} />
                        </ProgressCircle>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
          refreshing={this.props.medicament.isLoading}
          keyExtractor={({id}) => id.toString()}
          data={this.state.medicaments}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          onMomentumScrollBegin={() => this.setState({reached: false})}
          ListEmptyComponent={() =>
            this.props.medicament.isLoading ? null : (
              <EmptyList message={'Não há dados disponíveis'} />
            )
          }
        />
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
  {medicamentList},
)(MedicamentScreen);
