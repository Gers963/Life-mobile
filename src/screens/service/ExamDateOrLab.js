import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CardItem, Card } from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import Arrow from '../../navigations/BackNavigationIcon';

class ExamDateOrLab extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.state = {
      item: null,
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

  onPress = (route, item) => {
    this.props.navigation.navigate(route, { item });
  }

  render() {

    const { item } = this.state;

    const { isModalFilter, isModalPrice } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow />
          <View style={{ width: '90%', marginLeft: '-10%', padding: 10 }}>
            <StepIndicator
              stepCount={4}
              labels={[(item ? item.service.name : ''), (item ? item.name : ''), "...", "Confirmar"]}
              currentPosition={1}
              customStyles={{ labelColor: '#000', separatorFinishedColor: '#94ADEE', separatorUnFinishedColor: '#94ADEE', stepStrokeCurrentColor: '#94ADEE', currentStepLabelColor: '#000', stepIndicatorUnFinishedColor: '#94ADEE', stepIndicatorFinishedColor: '#94ADEE', stepIndicatorLabelCurrentColor: '#000' }}
            />
          </View>
        </View>

        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />
        <View style={{ border: 1, borderColor: '#000', marginTop: 25, marginLeft: 16 }}></View>

        <Text style={{ fontFamily: 'Roboto', marginLeft: Platform.OS == 'ios' ? 30 : 13, marginTop: Platform.OS == 'ios' ? 12 : -9, fontWeight: "bold", fontSize: 19, paddingLeft: 10, color: '#828fff' }}>Deseja agendar por:</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.onPress("LabScreen", item)}>
            <Card style={{ width: Platform.OS == "ios" ? 165 : 150, height: 75, elevation: 0, alignItems: 'center', borderColor: '#87C4C0', backgroundColor: '#87C4C0', flexDirection: 'row', borderRadius: 6 }}>
              <CardItem style={{ backgroundColor: '#87C4C0' }}>
                <Text style={{ marginTop: '-3%', marginLeft: '39%', color: "#FFF", fontSize: 19, fontWeight: '700' }}>Local</Text>
              </CardItem>
              <Text></Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => this.onPress("ServiceCalendarScreen", item)}>
            <Card style={{ width: Platform.OS == "ios" ? 165 : 150, height: 75, elevation: 0, alignItems: 'center', borderColor: '#94ADEE', backgroundColor: '#94ADEE', flexDirection: 'row', borderRadius: 6 }}>
              <CardItem style={{ backgroundColor: '#94ADEE' }}>
                <Text style={{ marginTop: '-3%', marginLeft: '44%', color: "#FFF", fontSize: 18, fontWeight: '700' }}>Data</Text>
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

export default (ExamDateOrLab)