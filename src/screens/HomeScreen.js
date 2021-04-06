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

  constructor(props) {
    super(props);
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

    this.setState({
      name: await AsyncStorage.getItem('@coft:userName'),
    });
  }

  onEndReached = () => {
    const { reached } = this.state;
    if (!reached) {
      this.setState({ reached: true });
    }
  };

  onPress = item => {
    if (item === 0){
      this.props.navigation.navigate('CalendarScreen')
    } else {
      this.props.navigation.navigate('ShowerScreem')
    }
  };

  onPressSeeMoreScheduling() {
    this.props.navigation.navigate('Scheduling');
  }

  render() {

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
                    uri: 'https://jornalggn.com.br/sites/default/files/u16/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg'
                  }}
                />
              </TouchableOpacity>
              <View style={{ padding: 7, margin: 8 }}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    color: '#af469b',
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
              color: '#af469b',
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
              <TouchableOpacity
                onPress={() => this.onPress(0)}>
                <Card
                  style={{
                    marginLeft: 15,
                    width: Platform.OS == 'ios' ? 165 : 155,
                    height: 75,
                    alignItems: 'center',
                    borderColor: '#af469b',
                    backgroundColor: '#af469b',
                    borderRadius: 6,
                  }}>
                  <Text />
                  <CardItem style={{ backgroundColor: '#af469b' }}>
                    <Text
                      style={{
                        marginTop: Platform.OS == 'ios' ? '-2%' : -8,
                        color: '#FFF',
                        fontSize: 21,
                        fontWeight: '700',
                      }}>
                      Consulta
                        </Text>
                  </CardItem>
                  <Text />
                </Card>
                <Text />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPress(1)}>
                <Card
                  style={{
                    marginLeft: 15,
                    width: Platform.OS == 'ios' ? 165 : 155,
                    height: 75,
                    alignItems: 'center',
                    borderColor: '#af469b',
                    backgroundColor: '#af469b',
                    borderRadius: 6,
                  }}>
                  <Text />
                  <CardItem style={{ backgroundColor: '#af469b' }}>
                    <Text
                      style={{
                        marginTop: Platform.OS == 'ios' ? '-2%' : -8,
                        color: '#FFF',
                        fontSize: 21,
                        fontWeight: '700',
                      }}>
                      Banhos
                        </Text>
                  </CardItem>
                  <Text />
                </Card>
                <Text />
              </TouchableOpacity>

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
            color: '#af469b',
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
                          <Icon name={"laptop"} size={19} color={'#af469b'} />
                          <Text style={{ fontSize: 13, paddingLeft: 5, color: 'grey', fontWeight: 'bold' }}>Online</Text>
                        </View>
                      </View>
                    ) : (
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 19 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name={"hospital-building"} size={19} color={'#af469b'} />
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
                            color="#af469b"
                            shadowColor="#D8F3DC"
                            bgColor="#fff">
                            <Icon name={'pill'} size={19} color={'#af469b'} />
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
