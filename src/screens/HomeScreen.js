import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  VirtualizedList,
  Platform,
  Alert,
} from 'react-native';
import { CardItem, Thumbnail, Card } from 'native-base';
import DrawerNavigationIcon from '../navigations/DrawerNavigationIcon';
import NotificationIcon from '../components/NotificationIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { serviceTypeList } from '../actions/service-type';
import { schedulingList, schedulingCurrent } from '../actions/scheduling';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle';
import { ItemSeparator, EmptyList } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import SchedulingDetailsScreen from './scheduling/SchedulingDetailsScreen';

const mapStateToProps = state => {
  return {
    serviceType: state.serviceType,
    scheduling: state.scheduling,
    patient: state.patient,
  };
};

class HomeScreen extends Component {
  static propTypes = {
    serviceTypeList: PropTypes.func.isRequired,
    schedulingList: PropTypes.func.isRequired,
    schedulingCurrent: PropTypes.func.isRequired,
    serviceType: PropTypes.object,
    patient: PropTypes.object,
  };

  static navigationOptions = () => {
    return {
      headerTitle: () => (
        <View>
          <Image
            style={{ width: 103, height: 43 }}
            source={require('../assets/images/clinic.png')}
          />
        </View>
      ),
      headerLeft: () => <DrawerNavigationIcon />,
      headerRight: () => <NotificationIcon />,
      headerStyle: { backgroundColor: '#f3f6fe' },
    };
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onPressSeeMoreScheduling = this.onPressSeeMoreScheduling.bind(this);
    this.load = this.load.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);

    this.state = {
      reached: true,
      refreshing: false,
      name: '',
    };
  }

  async componentDidMount() {
    const active = await AsyncStorage.getItem('access_token');
    if (!active) {
      await AsyncStorage.removeItem('@coft:patientId');
      await AsyncStorage.removeItem('@coft:userName');
      await AsyncStorage.removeItem('user');
      this.props.navigation.navigate('Auth', {});
      Alert.alert('ClinicLabs', 'Relaize seu login novamnete.');
    }
    this.loadServiceType();
    this.loadScheduling();
    this.onRefresh();
    this.setState({
      name: await AsyncStorage.getItem('@coft:userName'),
    });
  }

  loadServiceType = async () => {
    if (this.props.serviceType.isLoading) {
      return;
    }
    this.props.serviceTypeList(this.props.serviceType.skip);
  };

  onRefresh = async () => {
    if (this.props.scheduling.isLoading) {
      return;
    }
    this.load();
  };

  load = () => {
    this.props.schedulingList(this.props.scheduling.skip);
  };

  onEndReached = () => {
    const { reached } = this.state;
    if (!reached) {
      this.load();
      this.setState({ reached: true });
    }
  };

  loadScheduling = async () => {
    if (this.props.scheduling.isLoading) {
      return;
    }
    this.props.schedulingList(this.props.scheduling.skip);
  };

  onPress = item => {
    if (item.name.substr(0, 1) != 'C') {
      this.props.navigation.navigate('ExamLabOrSpeciality', { item });
    } else {
      this.props.navigation.navigate('OnlineOrLocalScreen', { item });
    }
  };

  onPres = item => {
    console.log(item);
    this.props.schedulingCurrent(item);
  };

  onPressSeeMoreScheduling() {
    this.props.navigation.navigate('Scheduling');
  }

  render() {
    const { width } = Dimensions.get('window');
    const itemWidth = width / 4;

    const color = [
      '#87C4C0',
      '#94ADEE',
      '#94ADEE',
      '#185A9A',
      '#C83A45',
      '#2F9084',
      '#F4A828',
      '#185A9A',
      '#C83A45',
      '#2F9084',
      '#F4A828',
      '#185A9A',
      '#C83A45',
      '#2F9084',
      '#F4A828',
      '#185A9A',
    ];

    const dateFormatter = timestamp => {
      var date = new Date(parseInt(timestamp));
      return date.toLocaleString();
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: '#fff' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 15,
            }}>
            <View
              style={{
                marginLeft: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Thumbnail
                  large
                  source={{
                    uri: this.props.patient.rows.thumbnail
                      ? this.props.patient.rows.thumbnail.key
                      : 'https://jornalggn.com.br/sites/default/files/u16/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg',
                  }}
                />
              </TouchableOpacity>
              <View style={{ padding: 7, margin: 8 }}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#828fff',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 4,
                  }}>
                  Bem vindo
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#777',
                    fontSize: 18,
                    marginTop: 4,
                    fontWeight: '400',
                  }}>
                  {this.props.patient.rows.fullName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
                style={{ marginLeft: 280, position: 'absolute' }}>
                <View>
                  <Icon
                    name={'notification-clear-all'}
                    size={30}
                    color={'#777'}
                    style={{ marginTop: -10 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1 / 2,
              marginHorizontal: '2%',
              borderColor: '#404040',
              marginVertical: '1%',
              marginTop: '-2%',
              opacity: 0.1,
            }}
          />
        </View>
        <View style={{ backgroundColor: '#fff' }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              marginLeft: 15,
              marginTop: 12,
              fontWeight: 'bold',
              fontSize: 22,
              paddingLeft: 10,
              color: '#828fff',
            }}>
            {' '}
            Nossos serviços{' '}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                width: Platform.OS == 'ios' ? '100%' : '21%',
                marginLeft: -12,
              }}>
              {this.props.serviceType.rows.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.onPress(item)}
                    key={index}>
                    <Card
                      style={{
                        marginLeft: 15,
                        width: Platform.OS == 'ios' ? 165 : 155,
                        height: 75,
                        alignItems: 'center',
                        borderColor: color[index],
                        backgroundColor: color[index],
                        borderRadius: 6,
                      }}>
                      <Text />
                      <CardItem style={{ backgroundColor: color[index] }}>
                        <Text
                          style={{
                            marginTop: Platform.OS == 'ios' ? '-2%' : -8,
                            color: '#FFF',
                            fontSize: 21,
                            fontWeight: '700',
                          }}>
                          {item.name}
                        </Text>
                      </CardItem>
                      <Text />
                    </Card>
                    <Text />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <View
            style={{
              borderWidth: 1 / 2,
              marginHorizontal: '2%',
              borderColor: '#404040',
              marginVertical: '1%',
              marginTop: '0%',
              opacity: 0.1,
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto',
            marginTop: 1,
            marginLeft: 15,
            fontSize: 22,
            marginBottom: 12,
            fontWeight: 'bold',
            paddingLeft: 10,
            paddingTop: 8,
            color: '#828fff',
          }}>
          Últimos agendamentos
        </Text>
        <ScrollView>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              style={{
                paddingLeft: 10,
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.onPres(item.id)}>
                  <View style={{ marginTop: 5, marginEnd: 10, margin: 4 }}>
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
                      {item.calendarTime.calendar.subService.service.type.name}:{' '}
                      {item.calendarTime.calendar.subService.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 9,
                        paddingLeft: 19,
                      }}>
                      <Icon
                        name={'map-marker-outline'}
                        size={19}
                        color={'#87d4de'}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          paddingLeft: 5,
                          color: 'gray',
                          fontWeight: 'bold',
                        }}>
                        {item.calendarTime.calendar.place.fullName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 19,
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          name={'calendar-clock'}
                          size={19}
                          color={'#f8c012'}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            paddingLeft: 5,
                            color: 'gray',
                            fontWeight: 'bold',
                          }}>
                          {moment(item.calendarTime.date).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        </Text>
                      </View>
                    </View>
                    {item.calendarTime.calendar.telemedicina ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 19 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name={"laptop"} size={19} color={'#828fff'} />
                          <Text style={{ fontSize: 13, paddingLeft: 5, color: 'grey', fontWeight: 'bold' }}>Online</Text>
                        </View>
                      </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 19 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Icon name={"hospital-building"} size={19} color={'#828fff'} />
                            <Text style={{ fontSize: 13, paddingLeft: 5, color: 'grey', fontWeight: 'bold' }}>Presencial</Text>
                          </View>
                        </View>
                      )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 19,
                        paddingBottom: 22,
                      }}>
                      <Icon
                        name={'stethoscope'}
                        size={18}
                        color={
                          item.status == 'PENDING' || item.status == 'CANCELLED'
                            ? '#ca4a6e'
                            : '#87d4de'
                        }
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          paddingLeft: 5,
                          color: 'gray',
                          fontWeight: 'bold',
                        }}>
                        {item.status == 'PENDING'
                          ? 'Pendente'
                          : item.status == 'CANCELLED'
                            ? 'Cancelado'
                            : item.status == 'CONFIRMED'
                              ? 'Confirmado'
                              : 'Concluído'}
                      </Text>
                      <View style={{ marginLeft: '53%', marginTop: '-16%' }}>
                        {item.calendarTime.calendar.subService.service.type.name
                          .substr(0, 1)
                          .toUpperCase() == 'E' ? (
                            <ProgressCircle
                              percent={100}
                              radius={25}
                              borderWidth={3}
                              color="#87d4de"
                              shadowColor="#D8F3DC"
                              bgColor="#fff">
                              <Icon name={'dna'} size={19} color={'#87d4de'} />
                            </ProgressCircle>
                          ) : (
                            <ProgressCircle
                              percent={100}
                              radius={25}
                              borderWidth={3}
                              color="#828fff"
                              shadowColor="#D8F3DC"
                              bgColor="#fff">
                              <Icon name={'pill'} size={19} color={'#828fff'} />
                            </ProgressCircle>
                          )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              refreshing={this.props.scheduling.isLoading}
              keyExtractor={({ id }) => id.toString()}
              data={
                this.props.scheduling.rows.length > 3
                  ? this.props.scheduling.rows.slice(
                    this.props.scheduling.rows.length - 3,
                    this.props.scheduling.rows.length,
                  )
                  : this.props.scheduling.rows
              }
              onRefresh={this.onRefresh}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.5}
              ItemSeparatorComponent={ItemSeparator}
              onMomentumScrollBegin={() => this.setState({ reached: false })}
              ListEmptyComponent={() =>
                this.props.scheduling.isLoading ? null : (
                  <EmptyList message={'Não há dados disponíveis'} />
                )
              }
            />
          </View>
        </ScrollView>
        <SchedulingDetailsScreen isVisible={this.props} />
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
  { serviceTypeList, schedulingList, schedulingCurrent },
)(HomeScreen);
