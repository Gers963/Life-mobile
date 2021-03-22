import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {CardItem, Thumbnail, Left, Body, Card} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {serviceList, clear, current} from '../../actions/service';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import RangeSlider from 'rn-range-slider';
import StepIndicator from 'react-native-step-indicator';
import {ItemSeparator, EmptyList, CheckBox} from '../../components';
import ProgressCircle from 'react-native-progress-circle';
import {TextInput} from 'react-native-gesture-handler';
import {authHeaders} from '../../api/utils';
import Arrow from '../../navigations/BackNavigationIcon';
import {BASE_URI} from '../../constants/config';

const mapStateToProps = state => {
  return {
    service: state.service,
  };
};

class ServiceSpeciality extends Component {
  static propTypes = {
    serviceList: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    service: PropTypes.object,
  };

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      headerTitle: () => (
        <Text>{state.params ? state.params.item.name : ''} </Text>
      ),
      headerStyle: {backgroundColor: '#f3f6fe'},
    };
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.load = this.load.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);

    this.state = {
      item: null,
      type: {},
      reached: true,
      refreshing: false,
      isModalFilter: false,
      isModalPrice: false,
      checked: false,
      services: null,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const item = navigation.getParam('item', {});
    this.setState({item, type: item.id}, () => {
      this.init();
    });
    fetch(`${BASE_URI}/v1/service?type=${item.id}&skip=0`, {
      method: 'GET',
      headers: await authHeaders(),
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          services: res.content,
        });
      });
  }

  init = async () => {
    await this.props.clear();
    await this.onRefresh();
  };

  onRefresh = async () => {
    if (this.props.service.isLoading) {
      return;
    }
    this.load();
  };

  load = () => {
    this.props.serviceList(this.props.service.skip, this.state.type);
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
        services: this.props.service.rows,
      });
    } else {
      this.props.service.rows.forEach(element => {
        if (element.name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        services: news,
      });
    }
  }

  onPress = item => {
    if (item.type.name.substr(0, 1) == 'C') {
      this.props.navigation.navigate('SchedulingDateOrProfessional', {item});
    } else if (item.type.name.substr(0, 1) == 'E') {
      this.props.navigation.navigate('ExamDateOrLab', {item});
    } else {
      Alert('Serviço temporariamente indisponível');
    }
  };

  handleClick({target}) {
    this.setState({
      [target.name]: !target.checked,
    });
  }

  render() {
    const {item} = this.state;

    const {isModalFilter, isModalPrice} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <Arrow />
          <View style={{width: '90%', marginLeft: '-10%', padding: 10}}>
            <StepIndicator
              stepCount={4}
              labels={[
                item ? item.name : '',
                item && item.name.substr(0, 1) == 'C'
                  ? 'Data ou profissional'
                  : 'Data/Local',
                '...',
                'Confirmar',
              ]}
              currentPosition={0}
              customStyles={{
                labelColor: '#000',
                separatorFinishedColor: '#94ADEE',
                separatorUnFinishedColor: '#94ADEE',
                stepStrokeCurrentColor: '#94ADEE',
                currentStepLabelColor: '#000',
                stepIndicatorUnFinishedColor: '#94ADEE',
                stepIndicatorFinishedColor: '#94ADEE',
                stepIndicatorLabelCurrentColor: '#000',
              }}
            />
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
            <Icon
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
              placeholder={'Buscar especialidade'}
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
                  {item.name}
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
                    {item.type.name.substr(0, 1) == 'C' && (
                      <ProgressCircle
                        percent={100}
                        radius={25}
                        borderWidth={3}
                        color="#828fff"
                        shadowColor="#D8F3DC"
                        bgColor="#828fff">
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          {item.name.substr(0, 1)}
                        </Text>
                      </ProgressCircle>
                    )}
                    {item.type.name.substr(0, 1) == 'E' && (
                      <ProgressCircle
                        percent={100}
                        radius={25}
                        borderWidth={3}
                        color="#87d4de"
                        shadowColor="#D8F3DC"
                        bgColor="#87d4de">
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          {item.name.substr(0, 1)}
                        </Text>
                      </ProgressCircle>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={this.props.service.isLoading}
          keyExtractor={({id}) => id.toString()}
          data={this.state.services}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          onMomentumScrollBegin={() => this.setState({reached: false})}
          ListEmptyComponent={() =>
            this.props.service.isLoading ? null : (
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
  {serviceList, clear, current},
)(ServiceSpeciality);
