import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import {CardItem, Card} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import Arrow from '../../navigations/BackNavigationIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {serviceList, clear, current} from '../../actions/service';
import {BASE_URI} from '../../constants/config';
import {authHeaders} from '../../api/utils';
import ProgressCircle from 'react-native-progress-circle';

const mapStateToProps = state => {
  return {
    service: state.service,
  };
};

class ExamLabOrSpeciality extends Component {
  static propTypes = {
    serviceList: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    service: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.state = {
      item: null,
      services: [],
      allServices: [],
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    var newValues = [];
    const item = navigation.getParam('item', {});
    await this.setState({item, type: item.id}, async () => {
      await fetch(`${BASE_URI}/v1/service`, {
        method: 'GET',
        headers: await authHeaders(),
      })
        .then(response => response.json())
        .then(res => {
          res.content.forEach(element => {
            if (element.type.id == item.id) {
              newValues.push(element);
            }
          });
        });

      await fetch(`${BASE_URI}/v1/sub-services`, {
        method: 'GET',
        headers: await authHeaders(),
      })
        .then(response => response.json())
        .then(res => {
          var services = [];
          for (let i = 0; i < res.content.length; i++) {
            const element = res.content[i];
            if (element.service.type.id == item.id) {
              services.push(element);
            }
          }
          newValues.push(...services);
          this.setState({
            services: newValues,
            allServices: newValues,
          });
        });
    });
  }

  init = async () => {
    await this.props.clear();
    await this.onRefresh();
  };

  onPress = (route, item) => {
    item = {
      ...item,
      isOnline: this.state.item.isOnline,
    };
    this.props.navigation.navigate(route, {item});
  };

  onSearch(text) {
    const news = [];
    if (text == '') {
      this.setState({
        services: this.state.allServices,
      });
    } else {
      this.state.allServices.forEach(element => {
        if (element.name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        services: news,
      });
    }
  }

  onPressSpecility = item => {
    let route = '';
    if (item.service) {
      route = 'ServiceCalendarScreen';
    } else {
      route = 'SubspecialityScreen';
    }
    item = {
      ...item,
      isOnline: this.state.item.isOnline,
    };
    this.props.navigation.navigate(route, {item});
  };

  render() {
    const {item, services, allServices} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <Arrow />
          <View style={{width: '90%', marginLeft: '-10%', padding: 10}}>
            <StepIndicator
              stepCount={4}
              labels={[item ? item.name : '', '...', '...', 'confirmar']}
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
              style={{marginTop: 10, marginLeft: 10}}
            />
            <TextInput
              style={{
                marginLeft: 4,
                marginBottom: 5,
                color: '#595959',
                fontSize: 18,
              }}
              ref="searchBar"
              hitSlop={{left: 90, right: 90, top: 10, bottom: 10}}
              placeholderTextColor={'#595959'}
              onChangeText={text => this.onSearch(text)}
              hideBackground={true}
              placeholder={`Buscar ${item ? item.name.toLowerCase() : ''}`}
            />
          </View>
          <View
            style={{
              borderWidth: 1 / 2,
              marginHorizontal: '1%',
              borderColor: '#595959',
              marginVertical: '1%',
              marginTop: Platform.OS == 'ios' ? '2%' : -10,
              opacity: 0.1,
              marginLeft: '1%',
              marginRight: '4%',
            }}
          />
        </View>

        {this.state.services.length == this.state.allServices.length ? (
          <>
            <Text
              style={{
                fontFamily: 'Roboto',
                marginLeft: Platform.OS == 'ios' ? 35 : 13,
                marginTop: 12,
                fontWeight: 'bold',
                fontSize: 19,
                paddingLeft: 10,
                color: '#828fff',
              }}>
              Qual tipo de {item ? item.name : ''} deseja agendar ?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.onPress('SubspecialityScreen', item)}>
                <Card
                  style={{
                    height: 75,
                    elevation: 0,
                    alignItems: 'center',
                    borderColor: '#87C4C0',
                    backgroundColor: '#87C4C0',
                    flexDirection: 'row',
                    borderRadius: 6,
                  }}>
                  <CardItem style={{backgroundColor: '#87C4C0'}}>
                    <Text
                      style={{color: '#FFF', fontSize: 15, fontWeight: '700'}}>
                      Subespecialidade
                    </Text>
                  </CardItem>
                  <Text />
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => this.onPress('SpecialityScreen', item)}>
                <Card
                  style={{
                    height: 75,
                    elevation: 0,
                    alignItems: 'center',
                    borderColor: '#94ADEE',
                    backgroundColor: '#94ADEE',
                    flexDirection: 'row',
                    borderRadius: 6,
                  }}>
                  <CardItem style={{backgroundColor: '#94ADEE'}}>
                    <Text
                      style={{
                        marginTop: '-3%',
                        marginLeft: Platform.OS == 'ios' ? '4%' : 0,
                        color: '#FFF',
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      Especialidade
                    </Text>
                  </CardItem>
                  <Text />
                </Card>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <FlatList
              style={{paddingLeft: 10, backgroundColor: '#fff'}}
              renderItem={({item}) => (
                <>
                  <TouchableOpacity onPress={() => this.onPressSpecility(item)}>
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
                              {item.name.substr(0, 1).toUpperCase()}
                            </Text>
                          </ProgressCircle>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={({id}) => id.toString()}
              data={this.state.services}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={() =>
                this.state.services ? null : (
                  <EmptyList message={'Não há dados disponíveis'} />
                )
              }
            />
          </>
        )}
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
  {serviceList, clear},
)(ExamLabOrSpeciality);
