import React, {Component} from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { CardItem, Thumbnail, Left, Body, Card, Right } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import PropTypes from 'prop-types'

import { skipped } from '../../actions/account-wallet'
import { ScrollView } from 'react-native-gesture-handler';

import StepIndicator from 'react-native-step-indicator';

import QRCode from 'react-native-qrcode-svg';

const mapStateToProps = state => {
  return {
    state: state.accountWallet,
  }
}

class ProfessionalSummaryScreen extends Component {

  static propTypes = {
    skipped: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => <Text>Confirmar</Text>,
      headerStyle: { backgroundColor: '#f3f6fe'}
    };
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.state = {
      item: null,
      isModalCard: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});
    this.setState({ item });

    this.props.skipped(this.props.state.skip)
  }
  
  onPress = (item) => {
    this.props.navigation.navigate('ProfessionalCalendarScreen', { item });
  }

  render() {

    const { item, isModalCard } = this.state;

    const dateFormatter = (timestamp) => {
      var date = new Date(parseInt(timestamp ));
      return date.toLocaleString();
    }

    const currencyFormatter = (currency) => {
      return 'R$ ' + parseFloat(currency).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    if(item == null)
      return null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{padding: 10}}>
          <StepIndicator
            stepCount={4}
            labels={["Profissionais", "Horário", "Confirmar", "Recibo"]}
            currentPosition={2}
            customStyles={{_stepIndicatorFinishedColor: '#F4A828'}}
          />
        </View>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text style={{color: '#C83A45', fontSize: 12}}>TOTAL A PAGAR</Text>
          <Text style={{color: '#C83A45', fontWeight: 'bold', fontSize: 26}}>{currencyFormatter(item.price)}</Text>
        </View>
        <View style={[{top: 0, margin: 15, flexDirection: 'row', borderRadius: 10, justifyContent: 'space-around', padding: 15, backgroundColor: '#fff'}, styles.shadow]}>
          <View style={{flexDirection: 'row'}}>
            <Icon name={"calendar-clock"} size={32} color={"#2F9084"} />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text style={{color: '#777', fontSize: 12}}>Horário</Text>
              <Text style={{color: '#777', fontSize: 14, fontWeight: 'bold'}}>{dateFormatter(item.time)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name={"charity"} size={32} color={"#2F9084"} />
            <View style={{flexDirection: 'column', paddingLeft: 5}}>
              <Text style={{color: '#777', fontSize: 12}}>Tipo de serviço</Text>
              <Text style={{color: '#777', fontSize: 12, fontWeight: 'bold'}}>Exame</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <Card style={[{backgroundColor: '#FAFAFA', padding: 8}, styles.shadow]} transparent>
          { item.cooperator != null && (<>
            <CardItem header style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30}}>
              <Text style={{color: '#2F9084', fontWeight: 'bold', fontSize: 15}}>Profissional</Text>
            </CardItem>
            <CardItem style={{paddingTop: 0, paddingLeft: 10}}>
              <Body>
                <Text style={{color: '#777', fontWeight: 'bold', fontSize: 14}}>{item.cooperator.fullName}</Text>
                <Text style={{color: '#777', fontSize: 12}} note>CRM 11182 - PE</Text>
              </Body>
            </CardItem>
          </>)}
          { item.service != null && (<>
            <CardItem header style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30}}>
              <Text style={{color: '#2F9084', fontWeight: 'bold', fontSize: 15}}>Serviço</Text>
            </CardItem>
            <CardItem style={{paddingTop: 0, paddingLeft: 10}}>
              <Body>
              <Text style={{fontFamily: 'Titillium Web', color: '#777', fontWeight: 'bold', fontSize: 14}}>{item.scheduling.current.calendarTime.calendar.service.type.name}: {item.scheduling.current.calendarTime.calendar.service.name}</Text>
                <Text style={{fontFamily: 'Titillium Web', color: '#777', fontSize: 12}} note>{item.scheduling.current.calendarTime.calendar.service.name}</Text>
              </Body>
            </CardItem>
          </>)}
          <CardItem header style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30}}>
            <Text style={{color: '#2F9084', fontWeight: 'bold', fontSize: 15}}>Endereço</Text>
          </CardItem>
          <CardItem style={{paddingTop: 0, paddingLeft: 10}}>
            <Body>
              <Text style={{color: '#777', fontWeight: 'bold', fontSize: 14}}>SHOPPING DIFUSORA</Text>
              <Text style={{color: '#777', fontSize: 12}} note>Av. Agamenon Magalhães, 444</Text>
              <Text style={{color: '#777', fontSize: 12}} note>Nova Caruaru - Caruaru - PE</Text>
              <Text style={{color: '#777', fontSize: 12}} note>CEP 55700-000</Text>
            </Body>
          </CardItem>
          <CardItem header style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30}}>
            <Text style={{color: '#2F9084', fontWeight: 'bold', fontSize: 15}}>Confirmar</Text>
          </CardItem>
          <CardItem style={{paddingTop: 0, paddingLeft: 10}}>
            { this.props.state.rows.length > 0 && (
              <Body>
                <Text style={{color: '#777', fontWeight: 'bold', fontSize: 14}}>Cartão de Crédito</Text>
                <Text style={{color: '#777', fontSize: 12}} note>{this.props.state.rows[0].fullName}</Text>
                <Text style={{color: '#777', fontSize: 12}} note>{this.props.state.rows[0].brand} {this.props.state.rows[0].number}</Text>
              </Body>
            )}
            <Right>
              <TouchableOpacity onPress={() => this.setState({isModalCard: true})}>
                <View style={{flexDirection: 'row'}}>
                  <Icon size={16} name={"refresh"} color={'#C83A45'} />
                  <Text style={{color: '#777', fontWeight: 'bold', fontSize: 14}}>Trocar</Text>
                </View>
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
        </ScrollView>
        <View style={{padding: 20}}>
          <TouchableOpacity>
            <View style={{borderRadius: 5, flexDirection: 'row', backgroundColor: '#b26d8e', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40, bottom: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Confirmar agendamento</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={{borderRadius: 5, flexDirection: 'row', backgroundColor: '#777', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40, bottom: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Escolher outra data</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal testID={'modal'} isVisible={isModalCard}>
          <View style={{backgroundColor: '#fff'}}>
            <FlatList
              data={this.props.state.rows}
              keyExtractor={({ number }) => number.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.setState({isModalCard: false})}>
                  <CardItem>
                    <Icon name={"credit-card"} size={24} color={'#777'}/>
                    <Left>
                      <Body>
                        <Text style={{fontFamily: 'Calibre', fontSize: 15}}>{item.fullName}</Text>
                        <Text style={{fontFamily: 'Calibre', fontSize: 11, paddingLeft: 2}} note>{item.brand} {item.number}</Text>
                      </Body>
                    </Left>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#C83A45', fontWeight: 'bold', fontSize: 15}}>Selecionar</Text>
                    </View>
                  </CardItem>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => this.setState({isModalCard: false})}>
              <View style={{flexDirection: 'row', backgroundColor: '#777', margin: 10, justifyContent: 'center', alignItems: 'center', height: 40}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Voltar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F6F6F6',
   //padding: 10
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

export default connect(mapStateToProps, { skipped })(ProfessionalSummaryScreen)