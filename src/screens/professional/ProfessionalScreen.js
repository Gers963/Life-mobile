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
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import StepIndicator from 'react-native-step-indicator';
import {cooperatorList, cooperatorCurrent} from '../../actions/professional';
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

import Modal from 'react-native-modal';
import Bagde from '../../components/Badge';
import {ItemSeparator, RadioButton, CheckBox} from '../../components';
import {TextInput} from 'react-native-gesture-handler';
import {authHeaders} from '../../api/utils';
import {BASE_URI} from '../../constants/config';
import Arrow from '../../navigations/BackNavigationIcon';

const mapStateToProps = state => {
  return {
    cooperator: state.professional,
  };
};

class ProfessionalScreen extends Component {
  static propTypes = {
    cooperatorList: PropTypes.func.isRequired,
    cooperatorCurrent: PropTypes.func.isRequired,
    current: PropTypes.func.isRequired,
    state: PropTypes.object,
  };

  static navigationOptions = () => {
    return {
      headerTitle: () => <Text style={{color: '#8C8E93'}}>BUSCAR</Text>,
      headerLeft: () => <DrawerNavigationIcon />,
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
      reached: true,
      refreshing: false,
      professional: null,
    };
  }

  async componentDidMount() {
    this.onRefresh();
    fetch(`${BASE_URI}/v1/professional?skip=0`, {
      method: 'GET',
      headers: await authHeaders(),
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          professional: res.content,
        });
      });
  }

  onRefresh = async () => {
    if (this.props.cooperator.isLoading) {
      return;
    }
    this.load();
  };

  load = () => {
    this.props.cooperatorList(this.props.cooperator.skip);
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
        professional: this.props.cooperator.rows,
      });
    } else {
      this.props.cooperator.rows.forEach(element => {
        if (element.fullName.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        professional: news,
      });
    }
  }

  onPress = item => {
    {
      /* this.props.cooperatorCurrent(item.id); */
    }
    this.props.navigation.navigate('ProfessionalCalendarScreen', {item});
  };

  handleClick({target}) {
    this.setState({
      [target.name]: !target.checked,
    });
  }

  render() {
    const {isModalFilter} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Arrow />
          </TouchableOpacity>
          <View style={{width: '90%', marginLeft: '-10%', padding: 10}}>
            <StepIndicator
              stepCount={3}
              labels={['Profissionais', 'Horário', 'Confirmar']}
              currentPosition={0}
              customStyles={{
                labelColor: '#000',
                separatorFinishedColor: '#000',
                separatorUnFinishedColor: '#8eb330',
                stepStrokeCurrentColor: '#9058a0',
                currentStepLabelColor: '#000',
                stepIndicatorUnFinishedColor: '#9058a0',
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
              style={{marginLeft: 4, marginBottom: 5, fontSize: 18}}
              ref="searchBar"
              placeholderTextColor={'#595959'}
              onChangeText={text => this.onSearch(text)}
              hideBackground={true}
              placeholder={'Buscar profissional'}
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
          style={{paddingLeft: 10, backgroundColor: '#fff'}}
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
                    {item.profession}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 19,
                      paddingBottom: 22,
                    }}>
                    <View style={{marginLeft: '73%', marginTop: '-12%'}}>
                      <View>
                        <Thumbnail
                          source={{
                            uri:
                              item.thumbnail != null
                                ? item.thumbnail.uri
                                : 'https://jornalggn.com.br/sites/default/files/u16/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
            </>
          )}
          refreshing={this.props.cooperator.isLoading}
          keyExtractor={({id}) => id.toString()}
          data={this.state.professional}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => this.setState({reached: false})}
          ListEmptyComponent={() =>
            this.props.cooperator.isLoading ? null : (
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
  {cooperatorList, cooperatorCurrent},
)(ProfessionalScreen);
