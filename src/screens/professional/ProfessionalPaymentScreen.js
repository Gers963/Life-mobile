import React, { Component } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { CardItem, Thumbnail, Left, Body, Card, Right } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import PropTypes from 'prop-types'

import Arrow from '../../navigations/BackNavigationIcon';
import { accountWalletList } from '../../actions/account-wallet'
import { schedulingCreate, schedulingReset } from '../../actions/scheduling'
import { ScrollView } from 'react-native-gesture-handler';

import StepIndicator from 'react-native-step-indicator';

import QRCode from 'react-native-qrcode-svg';

const mapStateToProps = state => {
  return {
    accountWallet: state.accountWallet,
    scheduling: state.scheduling
  }
}

class ProfessionalPaymentScreen extends Component {

  static propTypes = {
    accountWalletList: PropTypes.func.isRequired,
    schedulingCreate: PropTypes.func.isRequired,
    schedulingReset: PropTypes.func.isRequired,
    accountWallet: PropTypes.object,
    scheduling: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSummaryClose = this.onSummaryClose.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.state = {
      item: null,
      isModalCard: false,
      isModalSummary: false,
      currentPosition: 2
    };
  }

  componentDidMount() {
    this.props.schedulingReset();
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});
    console.log(this.props)
    this.setState({ item });

    //this.props.accountWalletList(this.props.accountWallet.skip)
  }

  onPress = (item) => {
    this.props.navigation.navigate('ServiceCalendarScreen', { item });
  }

  onCreate() {
    if (this.props.scheduling.isLoading) return;
    this.setState({ currentPosition: 3 });
    this.props.schedulingCreate({ calendarTime: this.state.item.id, wallet: 'a3d5acae-5e19-4407-b385-87e6b8635edc' });
  }

  onSummaryClose() {
    //this.props.schedulingReset();
    this.props.navigation.navigate('Home', {});
    this.props.navigation.navigate('Scheduling', {});
  }

  onErrorClose() {
    //this.props.schedulingReset();
    this.props.navigation.navigate('Home', {});
  }

  onStepChange(number) {
    if (number === 0) this.props.navigation.navigate('ServiceScreen', {});
    if (number === 1) this.props.navigation.navigate('ServiceCalendarScreen', {});
  }

  render() {

    const { item, isModalCard, currentPosition } = this.state;

    const dateFormatter = (timestamp) => {
      var date = new Date(timestamp);
      return date.toLocaleString();
    }

    const currencyFormatter = (currency) => {
      return 'R$ ' + parseFloat(currency).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    if (item == null)
      return null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow />
          <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
            <StepIndicator
              stepCount={4}
              labels={["Profissional", "Horário", "Confirmar"]}
              currentPosition={3}
              customStyles={{ labelColor: '#000', separatorFinishedColor: '#828fff', separatorUnFinishedColor: '#828fff', stepStrokeCurrentColor: '#828fff', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#828fff', stepIndicatorFinishedColor: '#828fff', stepIndicatorLabelCurrentColor: '#000' }}

            />
          </View>
        </View>

        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />

        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontSize: 12 }}>VALOR TOTAL</Text>
          <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 26 }}>{currencyFormatter(item.calendar.pricelist.price)}</Text>
        </View>
        <View style={[{ top: 0, margin: 15, flexDirection: 'row', borderRadius: 10, padding: 15, backgroundColor: '#fff' }, styles.shadow]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={"calendar-clock"} size={32} color={"#828FFE"} />
            <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
              <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }}>Horário</Text>
              <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 14, fontWeight: 'bold', marginTop: -6 }}>{dateFormatter(item.date)}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <Card style={[{ backgroundColor: '#FFFFFF', padding: 8 }]} transparent>
            {item.calendar.professional != null && (<>
              <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
                <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 15 }}>Profissional</Text>
              </CardItem>
              <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
                <Body>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 14 }}>{item.calendar.professional.fullName}</Text>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>CRM {item.calendar.professional.crm} - PE</Text>
                </Body>
              </CardItem>
            </>)}
            {(item.calendar.service != null && item.calendar.service.type != null) && (<>
              <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
                <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 15 }}>Serviços</Text>
              </CardItem>
              <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
                <Body>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 14 }}>{item.calendar.service.type.name}: {item.calendar.service.name}</Text>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>{item.calendar.service.annotation}</Text>
                </Body>
              </CardItem>
            </>)}
            <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
              <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 15 }}>Endereço</Text>
            </CardItem>
            <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
              <Body>
                <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 14 }}>{item.calendar.place.fullName}</Text>
                <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>{item.calendar.place.street}, {item.calendar.place.number}</Text>
                <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>{item.calendar.place.district}</Text>
              </Body>
            </CardItem>
            <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30 }}>
              <Text style={{ color: '#828FFE', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 15 }}>Confirmar</Text>
            </CardItem>
            <CardItem header style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, height: 30, marginTop: "4%", alignSelf: "center", alignItems: "center", textAlign: "center" }}>
              <Text style={{ color: '#ae5b7f', fontFamily: 'Titillium Web', fontWeight: "bold", fontSize: 13 }}>*Será cobrado uma %, caso o cancelamento não seja efeutado, no prazo de 24h</Text>
            </CardItem>
            <CardItem style={{ paddingTop: 0, paddingLeft: 10 }}>
              {this.props.accountWallet.rows.length > 0 && (
                <Body>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 14 }}>Cartão de Crédito</Text>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>{this.props.accountWallet.rows[0].fullName}</Text>
                  <Text style={{ color: '#777', fontFamily: 'Titillium Web', fontSize: 12 }} note>{this.props.accountWallet.rows[0].brand} {this.props.accountWallet.rows[0].number}</Text>
                </Body>
              )}
              <Right>
                <TouchableOpacity onPress={() => this.setState({ isModalCard: true })}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon size={16} name={"refresh"} color={'#C83A45'} />
                    <Text style={{ color: '#777', fontWeight: 'bold', fontSize: 14 }}>Trocar</Text>
                  </View>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </ScrollView>
        {this.props.scheduling.isSuccess == false && (<>
          <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={() => this.onCreate()}>
              <View style={{ borderRadius: 5, flexDirection: 'row', backgroundColor: '#828FFE', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40, bottom: 10 }}>
                {this.props.scheduling.isLoading && (<>
                  <ActivityIndicator size={"small"} color="#fff" style={{ padding: 5 }} />
                </>)}
                <Text style={{ color: '#fff', fontFamily: 'Titillium Web', fontWeight: 'bold', fontSize: 15 }}>{this.props.scheduling.isLoading ? "Aguarde um momento" : "Confirmar agendamento"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>)}
        <Modal isVisible={isModalCard}>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              data={this.props.accountWallet.rows}
              keyExtractor={({ number }) => number.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.setState({ isModalCard: false })}>
                  <CardItem>
                    <Icon name={"credit-card"} size={24} color={'#777'} />
                    <Left>
                      <Body>
                        <Text style={{ fontFamily: 'Titillium Web', fontSize: 15 }}>{item.fullName}</Text>
                        <Text style={{ fontFamily: 'Titillium Web', fontSize: 11, paddingLeft: 2 }} note>{item.brand} {item.number}</Text>
                      </Body>
                    </Left>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: '#C83A45', fontWeight: 'bold', fontSize: 15 }}>Selecionar</Text>
                    </View>
                  </CardItem>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => this.setState({ isModalCard: false })}>
              <View style={{ flexDirection: 'row', backgroundColor: '#777', margin: 10, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Voltar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.props.scheduling.isSuccess}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <View style={{ padding: 10, alignItems: 'center' }}>
              <QRCode value={this.props.scheduling.current.id + '#' + this.props.scheduling.current.code} size={150} logoBackgroundColor='transparent' />
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#C83A45', padding: 5 }}>{this.props.scheduling.current.code}</Text>
              <Text style={{ fontSize: 14, paddingBottom: 5 }}>Apresente o código acima na recepção</Text>
            </View>
            <TouchableOpacity onPress={() => this.onSummaryClose()}>
              <View style={{ flexDirection: 'row', backgroundColor: '#828FFE', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Fechar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.props.scheduling.isError}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <View style={{ padding: 10, alignItems: 'center' }}>
              <Icon name={"alert-decagram-outline"} size={86} color={"#C83A45"} />
              <Text style={{ fontSize: 15, paddingBottom: 5, textAlign: 'center' }}>{this.props.scheduling.error.error}</Text>
            </View>
            <TouchableOpacity onPress={() => this.onErrorClose()}>
              <View style={{ flexDirection: 'row', backgroundColor: '#777', margin: 5, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Tudo bem</Text>
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
    backgroundColor: '#FFFFFF',
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

export default connect(mapStateToProps, { accountWalletList, schedulingCreate, schedulingReset })(ProfessionalPaymentScreen)