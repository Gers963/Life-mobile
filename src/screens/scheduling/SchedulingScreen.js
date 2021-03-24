import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';
import SearchBar from 'react-native-search-bar';
import PropTypes from 'prop-types';
import Arrow from '../../navigations/BackNavigationIcon';
import { schedulingList, schedulingCurrent } from '../../actions/scheduling';
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';
import Modal from 'react-native-modal';
import SchedulingDetailsScreen from './SchedulingDetailsScreen';
import Bagde from '../../components/Badge';
import { ItemSeparator, RadioButton } from '../../components';
import ActionButton from 'react-native-action-button';

const mapStateToProps = state => {
  return {
    scheduling: state.scheduling,
  };
};

class SchedulingScreen extends Component {
  static propTypes = {
    schedulingList: PropTypes.func.isRequired,
    schedulingCurrent: PropTypes.func.isRequired,
    scheduling: PropTypes.object,
  };

  static navigationOptions = () => {
    return {
      headerTitle: () => <Text style={{ color: '#8C8E93' }}>AGENDAMENTOS</Text>,
      headerLeft: () => <DrawerNavigationIcon />,
      headerStyle: { backgroundColor: '#f3f6fe' },
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
      isModalFilter: false,
      isModalDetails: false,
      modalVisible: false,
      allShed: [],
      sheds: [],
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = async () => {
    if (this.props.scheduling.isLoading) {
      return;
    }
    this.load();
  };

  async componentDidUpdate(nexProps) {
    if (
      this.props.scheduling.rows !== nexProps.scheduling.rows &&
      this.props.scheduling.error === ''
    ) {
      this.setState({
        sheds: this.props.scheduling.rows,
        allShed: this.props.scheduling.rows,
      });
    }
  }

  load = () => {
    this.props.schedulingList(this.props.scheduling.skip);
  };

  onEndReached = () => {
    const { reached } = this.state;
    if (!reached) {
      this.setState({ reached: true });
    }
  };

  filterType = type => {
    var newArray = [];

    this.state.allShed.forEach(element => {
      if (element.calendarTime.calendar.telemedicina == type) {
        newArray.push(element);
      }
    });

    this.setState({
      sheds: newArray,
    });
  };

  filterStatus = status => {
    var newArray = [];

    if (status == '*') {
      this.setState({
        sheds: this.props.scheduling.rows,
      });
      return;
    }

    this.state.allShed.forEach(element => {
      if (element.status == status) {
        newArray.push(element);
      }
    });

    this.setState({
      sheds: newArray,
    });
  };

  onPress = item => {
    this.setState({ modalVisible: true });
    this.props.schedulingCurrent(item.id);
  };

  render() {
    const { sheds } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: '#FFF', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Arrow />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#FFF',
              alignSelf: 'center',
              width: '80%',
              marginBottom: '6%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                borderWidth: 0,
                marginTop: 16,
                marginLeft: '-17%',
                color: '#af469b',
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              Agendamentos
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1 / 2,
            marginHorizontal: '2%',
            borderColor: '#000',
            marginVertical: '1%',
            marginLeft: '-10%',
            marginRight: '-10%',
            marginTop: '-2%',
            opacity: 0.1,
          }}
        />

        <FlatList
          style={{ paddingLeft: 10, borderRadius: 10, backgroundColor: '#fff' }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onPress(item)}>
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
                    <Icon name={'calendar-clock'} size={19} color={'#f8c012'} />
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
                </View>
                <View
                  style={{
                    marginLeft: '79%',
                    marginTop: '-22%',
                    paddingBottom: 38,
                  }}>
                  {item.calendarTime.calendar.subService.service.type.name
                    .substr(0, 1)
                    .toUpperCase() == 'E' ? (
                      <ProgressCircle
                        percent={100}
                        radius={25}
                        borderWidth={3}
                        color="#828fff"
                        shadowColor="#D8F3DC"
                        bgColor="#828fff">
                        <Text style={{ fontSize: 14, color: '#fff' }}>
                          {item.calendarTime.calendar.subService.service.type.name.substr(
                            0,
                            1,
                          )}
                        </Text>
                      </ProgressCircle>
                    ) : (
                      <ProgressCircle
                        percent={100}
                        radius={25}
                        borderWidth={3}
                        color="#87d4de"
                        shadowColor="#D8F3DC"
                        bgColor="#87d4de">
                        <Text style={{ fontSize: 14, color: '#fff' }}>
                          {item.calendarTime.calendar.subService.service.type.name.substr(
                            0,
                            1,
                          )}
                        </Text>
                      </ProgressCircle>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={this.props.scheduling.isLoading}
          keyExtractor={({ id }) => id.toString()}
          data={sheds}
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

        <ActionButton
          degrees={0}
          renderIcon={() => (
            <Icon name={'filter-variant'} style={styles.actionButtonIcon} />
          )}
          buttonColor="#8fb330">
          <ActionButton.Item
            buttonColor="#f8c012"
            title="Todos"
            onPress={() => this.filterStatus('*')}>
            <Icon
              name={'format-list-bulleted'}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#94ADEE"
            title="Online"
            onPress={() => this.filterType(true)}>
            <Icon name={'cellphone'} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#87d4de"
            title="Concluídos"
            onPress={() => this.filterStatus('COMPLETED')}>
            <Icon name={'check'} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#ca4a6e"
            title="Pendentes"
            onPress={() => this.filterStatus('PENDING')}>
            <Icon name={'sync'} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#87d4de"
            title="Confirmados"
            onPress={() => this.filterStatus('CONFIRMED')}>
            <Icon name={'calendar-check'} style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#ca4a6e"
            title="Cancelados"
            onPress={() => this.filterStatus('CANCELLED')}>
            <Icon size={45} name={'close'} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <SchedulingDetailsScreen isVisible={this.props} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
    color: 'white',
  },
});

export default connect(
  mapStateToProps,
  { schedulingList, schedulingCurrent },
)(SchedulingScreen);
