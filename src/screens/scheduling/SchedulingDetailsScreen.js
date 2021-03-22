import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { CardItem, Thumbnail, Left, Body, Card, Right } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import PropTypes from 'prop-types'
import { schedulingCurrentClean } from '../../actions/scheduling'
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

import StepIndicator from 'react-native-step-indicator';

import QRCode from 'react-native-qrcode-svg';

const mapStateToProps = state => {
  return {
    scheduling: state.scheduling,
  }
}

class SchedulingDetailsScreen extends Component {

  static propTypes = {
    scheduling: PropTypes.object,
    schedulingCurrentClean: PropTypes.func.isRequired,
    isVisible: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      rotes: false,
      values: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isVisible: nextProps.isVisible.scheduling.isModalDetails, rotes: nextProps.isVisible.navigation, values: nextProps.isVisible })
  }

  onClose = () => {
    this.setState({ isVisible: false })
    this.props.schedulingCurrentClean()
  }

  render() {

    const { isVisible } = this.state

    const dateFormatter = (timestamp) => {
      var date = new Date(timestamp);
      return date.toLocaleString();
    }

    const currencyFormatter = (currency) => {
      return 'R$ ' + parseFloat(currency).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const startCall = () => {
      this.setState({ isVisible: false })
      this.state.rotes.navigate('VideoCall', { item: this.props.scheduling.current });
    }

    return (
      <>
        {this.props.scheduling.current != null && (
          <Modal hideModalContentWhileAnimating={true} style={styles.container} isVisible={isVisible} useNativeDriver={true}>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 0, justifyContent: 'flex-end', padding: 10, zIndex: 1 }}>
              <TouchableOpacity onPress={() => this.onClose()}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                <Icon name={"close"} size={24} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 15 }}>
              <Text style={{ fontFamily: 'Titillium Web', color: '#828ffe', fontSize: 12 }}>VALOR TOTAL</Text>
              <Text style={{ fontFamily: 'Titillium Web', color: '#828ffe', fontWeight: 'bold', fontSize: 26 }}>{currencyFormatter(this.props.scheduling.current.calendarTime.calendar.pricelist)}</Text>
            </View>
            <View style={[{ top: 0, margin: 15, flexDirection: 'row', borderRadius: 10, padding: 15, backgroundColor: '#fff' }, styles.shadow]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={"calendar-clock"} size={32} color={"#828ffe"} />
                <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                  <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontSize: 12 }}>Horário</Text>
                  {this.props.scheduling.current.calendarTime != null && (
                    <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontSize: 14, fontWeight: 'bold', marginTop: -6 }}>{moment(this.props.scheduling.current.calendarTime.date).format('DD/MM/YYYY HH:mm')}</Text>
                  )}
                </View>
              </View>
              { /*<View style={{flexDirection: 'row'}}>
            <Icon name={"charity"} size={32} color={"#2F9084"} />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text style={{color: '#777', fontSize: 12}}>Tipo</Text>
              { ( this.props.scheduling.current.service != null && this.props.scheduling.current.service.type != null) && (<>
                <Text style={{color: '#777', fontSize: 14, fontWeight: 'bold'}}>{this.props.scheduling.current.service.type.description}</Text>
              </>)}
            </View>
              </View> */}
            </View>
            <ScrollView style={{ marginLeft: 14, marginRight: 14 }} showsVerticalScrollIndicator={false}>
              <Card style={{ backgroundColor: '#fff', padding: 8 }} transparent>
                {this.props.scheduling.current.calendarTime != null && this.props.scheduling.current.calendarTime.calendar.professional != null && (<>
                  <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
                    <Text style={{ fontFamily: 'Titillium Web', color: '#828ffe', fontWeight: 'bold', fontSize: 15 }}>Profissional</Text>
                  </CardItem>
                  <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
                    <Body>
                      <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontWeight: 'bold', fontSize: 14 }}>{this.props.scheduling.current.calendarTime.calendar.professional.fullName}</Text>
                      <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontSize: 12 }} note>CRM - {this.props.scheduling.current.calendarTime.calendar.professional.crm}</Text>
                    </Body>
                  </CardItem>
                </>)}
                {this.props.scheduling.current.calendarTime != null && (<>
                  <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
                    <Text style={{ fontFamily: 'Titillium Web', color: '#828ffe', fontWeight: 'bold', fontSize: 15 }}>Serviço</Text>
                  </CardItem>
                  <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
                    <Body>
                      <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontWeight: 'bold', fontSize: 14 }}>{this.props.scheduling.current.calendarTime.calendar.subService.service.type.name}: {this.props.scheduling.current.calendarTime.calendar.subService.service.name}</Text>
                    </Body>
                  </CardItem>
                </>)}
                {!this.props.scheduling.current.calendarTime.calendar.telemedicina ? (<>
                  <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
                    <Text style={{ color: '#828ffe', fontWeight: 'bold', fontSize: 15 }}>Endereço</Text>
                  </CardItem>
                  <TouchableOpacity onPress={() => {
                    const {
                      street,
                      number,
                      district,
                      zipCode,
                      fullName
                    } = this.props.scheduling.current.calendarTime.calendar.place;
                    Linking.openURL(
                      Platform.select({
                        // TODO add city and state to place and use it on query
                        ios: `maps:0,0?q=caruaru ${street}, ${number} - ${district}, ${zipCode} ${fullName}`,
                        android: `geo:0,0?q=caruaru ${street}, ${number} - ${district}, ${zipCode} ${fullName}`,
                      }),
                    );
                  }}>
                    <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
                      <Body style={{ flex: 0.9 }}>
                        <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontWeight: 'bold', fontSize: 14 }}>{this.props.scheduling.current.calendarTime.calendar.place.fullName}</Text>
                        <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontSize: 12 }} note>{this.props.scheduling.current.calendarTime.calendar.place.street}, {this.props.scheduling.current.calendarTime.calendar.place.number}</Text>
                        <Text style={{ fontFamily: 'Titillium Web', color: '#777', fontSize: 12 }} note>{this.props.scheduling.current.calendarTime.calendar.place.district}</Text>
                      </Body>
                      <View style={{ alignItems: 'center' }}>
                        <Icon name={'map-marker'} color={'red'} size={35} style={{ flex: 0.1 }} />
                        <Text style={{ fontSize: 10 }}>Ver no Mapa</Text>
                      </View>
                    </CardItem>
                  </TouchableOpacity>
                  <View style={{ padding: 10, alignItems: 'center', marginTop: '3%' }}>
                    <QRCode value={this.props.scheduling.current.id + '#' + this.props.scheduling.current.code} size={150} logoBackgroundColor='transparent' />
                    <Text style={{ fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 20, color: '#828ffe', padding: 5 }}>{this.props.scheduling.current.code}</Text>
                    <Text style={{ fontFamily: 'Titillium Web', fontSize: 14, paddingBottom: 5 }}>Apresente o código acima na recepção</Text>
                  </View>
                </>) : (<>
                  <CardItem header style={{ paddingTop: 15, paddingLeft: 10 }}>
                    <Text style={{ color: '#828ffe', fontWeight: 'bold', fontSize: 15 }}>Sua consulta será realiza de forma online, seu acesso ficará disponível aqui no horário agendado.</Text>
                  </CardItem>
                </>)}
                {this.props.scheduling.current.meetingLink != null && this.props.scheduling.current.meetingLink != "" && (<>
                  <TouchableOpacity onPress={() => startCall()}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#828ffe', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Iniciar Atendimento</Text>
                    </View>
                  </TouchableOpacity>
                </>)}
              </Card>
            </ScrollView>
          </Modal>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: 50,
    marginBottom: 0,
    width: '100%',
    alignContent: 'center',
    marginLeft: 0
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default connect(mapStateToProps, { schedulingCurrentClean })(SchedulingDetailsScreen)
