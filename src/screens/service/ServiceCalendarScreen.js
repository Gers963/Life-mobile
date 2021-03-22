import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import IconOcticons from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types'
import { paged, current, pagedProfessional, pagedSub, pagedPlaceDates } from '../../actions/calendar'
import { pagedPlace } from '../../actions/place'
import { connect } from 'react-redux'
import { Right } from 'native-base';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import { ItemSeparator, CheckBox } from '../../components';
import { ProgressCircle } from 'react-native-svg-charts';
import Arrow from '../../navigations/BackNavigationIcon';

LocaleConfig.locales.pt = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
};

LocaleConfig.defaultLocale = 'pt';

const mapStateToProps = state => {
  return {
    state: state.calendar,
    place: state.place
  }
}

class ServiceCalendarScreen extends Component {

  static propTypes = {
    paged: PropTypes.func.isRequired,
    pagedSub: PropTypes.func.isRequired,
    pagedProfessional: PropTypes.func.isRequired,
    pagedPlace: PropTypes.func.isRequired,
    pagedPlaceDates: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.state = {
      dates: [],
      loading: false,
      rows: [],
      filtered: [],
      item: null,
      schedState: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});
    this.setState({
      item: item,
      type: item.id
    })
    console.log(JSON.stringify(item, null, 2))

    if (item.place) {
      this.props.pagedPlaceDates(item.place.id, item.id)
      return;
    }

    if (item.service == undefined) {
      this.props.paged(this.state.page, item.id)
      return;
    } else {
      this.props.pagedSub(this.state.page, item.id, item.isOnline)
    }
    this.props.pagedPlace(1);
  }


  onPress = (row) => {
    this.props.navigation.navigate('ServicePaymentScreen', { item: row });
  }

  onStepChange(number) {
    if (number === 0) this.props.navigation.navigate('ServiceSpeciality', {});
  }

  render() {

    const { navigation } = this.props;
    const item = navigation.getParam("item", {});

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow />
          <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
            <StepIndicator
              stepCount={4}
              labels={[
                (item ? item.service.name : ''),
                (item ? item.name : ''),
                (item.fullName ? item.fullName : 'Horário'),
                "Confirmar"
              ]}
              currentPosition={2}

              customStyles={{ labelColor: '#000', separatorFinishedColor: '#94ADEE', separatorUnFinishedColor: '#94ADEE', stepStrokeCurrentColor: '#94ADEE', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#94ADEE', stepIndicatorFinishedColor: '#94ADEE', stepIndicatorLabelCurrentColor: '#000' }}
            />
          </View>
        </View>

        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />

        <Text style={{ fontFamily: 'Roboto', textAlign: 'center', marginTop: 12, fontWeight: "bold", fontSize: 19, paddingLeft: 10, color: '#828fff' }}>Escolha um dia disponível</Text>
        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#404040', marginVertical: '1%', marginTop: '2%', opacity: 0.1 }} />
        <Agenda
          items={this.props.state.current}
          pastScrollRange={1}
          theme={{ selectedDayBackgroundColor: '#94ADEE', dotColor: '#00cc00', agendaTodayColor: '#C83A45', backgroundColor: '#FFF' }}
          minDate={new Date()}
          renderEmptyData={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '53%' }}>
                <Icon size={45} style={{ paddingBottom: 100 }} name={"arrow-down-circle"} color={'#828fff'} />
                <Text style={{ fontFamily: 'Titillium Web', fontSize: Platform.OS == 'ios' ? 17 : 14, color: 'grey', fontWeight: '700' }}>Arraste para baixo para selecionar um dia disponível</Text>
              </View>)
          }}
          futureScrollRange={4}
          renderItem={(time, firstItemInDay) => {
            console.log(time);
            if (time.active == false) {
              return (
                <TouchableOpacity style={styles.item} onPress={() => this.onPress(time)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={16} name={"clock-outline"} color={'#828fff'} />
                    <Text style={{ fontFamily: 'Titillium Web', fontSize: 18, paddingLeft: 5 }} note>{moment(time.date).format('HH:mm')}</Text>
                  </View>
                  {time.calendar.professional != null && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={16} name={"doctor"} color={'#87D4DE'} />
                      <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{time.calendar.professional.fullName}</Text>
                    </View>
                  )}
                  {time.calendar.plan != null && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={16} name={"hospital"} color={'#828fff'} />
                      <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{time.calendar.plan.name}</Text>
                    </View>
                  )}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={16} name={"map-marker-outline"} color={'#F8C012'} />
                    <View>
                      <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{time.calendar.place.fullName}</Text>
                    </View>
                  </View>
                  {item.isOnline ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={16} name={"laptop"} color={'#828fff'} />
                      <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>Online</Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={16} name={"hospital-building"} color={'#828fff'} />
                      <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>Presencial</Text>
                    </View>
                  )}
                  <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginTop: 4, marginVertical: '1%', opacity: 0.1 }} />
                </TouchableOpacity>
              );
            }
          }}
        >
        </Agenda>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    //height: 80
  }
});

export default connect(mapStateToProps, { paged, pagedSub, pagedProfessional, current, pagedPlace, pagedPlaceDates })(ServiceCalendarScreen)