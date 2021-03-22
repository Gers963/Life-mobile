import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types'
import { paged, current, pagedProfessional } from '../../actions/calendar'
import { pagedPlace } from '../../actions/place'
import { connect } from 'react-redux'
import { Right } from 'native-base';
import Modal from "react-native-modal";
import StepIndicator from 'react-native-step-indicator';
import { ItemSeparator, CheckBox } from '../../components';
import Arrow from '../../navigations/BackNavigationIcon';

const mapStateToProps = state => {
  return {
    professional: state.professional,
    state: state.calendar,
    place: state.place
  }
}

class ProfessionalCalendarScreen extends Component {

  static propTypes = {
    paged: PropTypes.func.isRequired,
    pagedProfessional: PropTypes.func.isRequired,
    pagedPlace: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.state = {

      loading: false,
      dates: { '2020-06-08': [{ name: 'Amanda Santos', time: '10:30', address: 'Shopping Difusora - CEOFT' }, { name: 'Joyce Danielle', time: '11:30', address: 'Shopping Difusora - CEOFT' }], '2020-06-09': [{ name: 'Jorge Daniel', time: '09:30', address: 'Shopping Difusora - CEOFT' }] },
      rows: [],
      filtered: [],
      isModalFilter: false,
    };
  }



  componentDidMount() {
     const { navigation } = this.props;
     const item = navigation.getParam("item", {});
     this.setState({item, type: item.id });
     console.log('teste', item)
     this.props.pagedProfessional(this.state.page, item.id)
     this.props.pagedPlace(1);
   }

  onSearch = (text) => {

  }

  onPress = (row) => {
    this.props.navigation.navigate('ProfessionalPaymentScreen', { item: row });
  }

  onStepChange(number) {
    if (number === 0) this.props.navigation.navigate('ProfessionalScreen', {});
  }

  render() {

    const { isModalFilter } = this.state;

    const { item } = this.state;

    const dateFormatter = (timestamp) => {
      var date = new Date(timestamp);
      return date.toLocaleTimeString();
    }

    const currencyFormatter = (currency) => {
      return 'R$ ' + parseFloat(currency).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow />
          <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
            <StepIndicator
              stepCount={3}
              labels={["Profissionais", "Horário", "Confirmar"]}
              currentPosition={1}

              customStyles={{ labelColor: '#000', separatorFinishedColor: '#94ADEE', separatorUnFinishedColor: '#94ADEE', stepStrokeCurrentColor: '#94ADEE', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#94ADEE', stepIndicatorFinishedColor: '#94ADEE', stepIndicatorLabelCurrentColor: '#000' }}
            />
          </View>
        </View>
        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />


        {/*<CalendarList
          horizontal={true}
          pagingEnabled={true}
          calendarWidth={320}
        />*/}

        <Agenda
          items={this.props.state.current}
          pastScrollRange={1}
          theme={{ selectedDayBackgroundColor: '#94ADEE', dotColor: '#00cc00', agendaTodayColor: '#C83A45', backgroundColor: '#FFF' }}
          minDate={'2020-03-07'}
          renderEmptyData={() => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontFamily: 'Titillium Web', fontSize: 14, color: 'grey' }}>Não existe agenda para o dia selecionado</Text>
              </View>)
          }}
          futureScrollRange={3}
          renderItem={(item, firstItemInDay) => {
            return (
              <TouchableOpacity style={styles.item} onPress={() => this.onPress(item)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={16} name={"clock-outline"} color={'#828fff'} />
                  <Text style={{ fontFamily: 'Titillium Web', fontSize: 18, paddingLeft: 5 }} note>{dateFormatter(item.date)}</Text>
                </View>
                {item.calendar.professional != null && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={16} name={"doctor"} color={'#87D4DE'} />
                    <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{item.calendar.professional.fullName}</Text>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={16} name={"map-marker-outline"} color={'#F8C012'} />
                  <View>
                    <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{item.calendar.place.fullName}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={16} name={"hospital"} color={'#CA4A6E'} />
                  <View>
                    <Text style={{ fontFamily: 'Titillium Web', fontSize: 12, paddingLeft: 5, color: '#8C8E93' }}>{item.calendar.plan.name}</Text>
                  </View>
                </View>
                <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginTop: 4, marginVertical: '1%', opacity: 0.1 }} />
              </TouchableOpacity>
            );
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
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    //height: 80
  }
});

export default connect(mapStateToProps, { paged, pagedProfessional, current, pagedPlace })(ProfessionalCalendarScreen)