import React, { Component } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { CardItem, Thumbnail, Left, Body, Card } from 'native-base';
import Modal from "react-native-modal";
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from 'react-native-search-bar'
import PropTypes from 'prop-types'
import IconOcticons from 'react-native-vector-icons/Octicons';
import { serviceList, clear, current } from '../../actions/service'
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import RangeSlider from 'rn-range-slider';
import StepIndicator from 'react-native-step-indicator';
import { ItemSeparator, EmptyList, CheckBox } from '../../components'
import ProgressCircle from 'react-native-progress-circle';

const mapStateToProps = state => {
  return {
    service: state.service,
  }
}

class ServiceScreen extends Component {

  static propTypes = {
    serviceList: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    service: PropTypes.object,
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => <Text>{state.params ? state.params.item.name : ''} </Text>,
      headerStyle: { backgroundColor: '#f3f6fe' }
    };
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.load = this.load.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);

    this.state = {
      item: null,
      type: {},
      reached: true,
      refreshing: false,
      isModalFilter: false,
      isModalPrice: false,
      checked: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});
    this.setState({ item, type: item.id }, () => {
      this.init();
    });
  }

  init = async () => {
    await this.props.clear();
    await this.onRefresh();
  }

  onRefresh = async () => {
    if (this.props.service.isLoading) return;
    this.load();
  };

  load = () => {
    this.props.serviceList(this.props.service.skip, this.state.type)
  }

  onEndReached = () => {
    const { reached } = this.state;
    if (!reached) {
      this.load();
      this.setState({ reached: true });
    }
  };

  onSearch = (text) => {

  }

  onPress = (route, item) => {
    this.props.navigation.navigate(route, { item });
  }

  handleClick({ target }) {
    this.setState({
      [target.name]: !target.checked,
    })
  }

  render() {

    const { item } = this.state;

    const { isModalFilter, isModalPrice } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 10 }}>
          <StepIndicator
            stepCount={4}
            labels={[(item ? item.name : ''), "Horário", "Confirmar", "Recibo"]}
            currentPosition={0}
            customStyles={{ labelColor: '#000', separatorFinishedColor: '#94ADEE', separatorUnFinishedColor: '#94ADEE', stepStrokeCurrentColor: '#94ADEE', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#94ADEE', stepIndicatorFinishedColor: '#94ADEE', stepIndicatorLabelCurrentColor: '#000' }}
          />
        </View>
        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />
        <View style={{ border: 1, borderColor: '#000', marginTop: 25, marginLeft: 16 }}></View>

        <Text style={{ fontFamily: 'Roboto', marginLeft: 15, marginTop: 12, fontWeight: "bold", fontSize: 19, paddingLeft: 10, color: '#828fff' }}>QUAL TIPO DE MARCAÇÃO VOCÊ DESEJA REALIZAR ?</Text>

        <View style={{ flexDirection: 'row', width: '100%', marginLeft: 15, marginTop: 20}}>
            <TouchableOpacity onPress={() => this.onPress('ServiceSpeciality', item)}>
              <Card style={{ width: 180, height: 75, elevation: 0, alignItems: 'center', borderColor: '#87C4C0', backgroundColor: '#87C4C0', flexDirection: 'row', borderRadius: 6 }}>
                <CardItem style={{ backgroundColor: '#87C4C0'}}>
                  <Text style={{ marginTop: '-3%', marginLeft: '3%',color: "#FFF", fontSize: 19, fontWeight: '700' }}>Especialidades</Text>
                </CardItem>
                <Text></Text>
              </Card>
            </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15}} onPress={() => this.onPress('ServiceDateOrLab', item)}>
            <Card style={{ width: 180, height: 75, elevation: 0, alignItems: 'center', borderColor: '#94ADEE', backgroundColor: '#94ADEE', flexDirection: 'row', borderRadius: 6 }}>
              <CardItem style={{ backgroundColor: '#94ADEE' }}>
                <Text style={{ marginTop: '-3%', marginLeft: '10%',color: "#FFF", fontSize: 19, fontWeight: '700' }}>Laboratoriais</Text>
              </CardItem>
              <Text></Text>
            </Card>
          </TouchableOpacity>
        </View>        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default connect(mapStateToProps, { serviceList, clear, current })(ServiceScreen)