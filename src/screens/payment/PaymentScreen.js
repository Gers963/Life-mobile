import React, { Component } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, SafeAreaView } from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from 'react-native-search-bar'
import PropTypes from 'prop-types'
import Arrow from '../../navigations/BackNavigationIcon';
import { paged, current } from '../../actions/payment'
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

const mapStateToProps = state => {
  return {
    state: state.payment,
  }
}

class PaymentScreen extends Component {

  static propTypes = {
    paged: PropTypes.func.isRequired,
    current: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  static navigationOptions = () => {
    return null
  };


  constructor(props) {
    super(props);
    this.onLoadMoreData = this.onLoadMoreData.bind(this);
    this.onPress = this.onPress.bind(this);

    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    this.props.paged()
  }

  onLoadMoreData = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.props.paged(this.state.page)
    })
  }

  onSearch = (text) => {

  }

  onPress = (row) => {

  }

  render() {

    return (
      <SafeAreaView style={{backgroundColor:"#fff", flex: 1,}}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow />
          <View style={{ backgroundColor: "#FFF", alignSelf: 'center', width: "80%", }}>
            <Text style={{ fontFamily: 'Roboto', borderWidth: 0, color: '#828fff', fontWeight: "bold", fontSize: 18, alignSelf: "center" }}>Seus Gastos</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', opacity: 0.1 }} />
        <View style={{ marginBottom: 16, marginTop: 16, backgroundColor: "#fff", marginLeft: 16 }}>
          <SearchBar
            onChangeText={(text) => this.onSearch(text)}
            hideBackground={true}
            placeholder='Buscar'
          />
        </View>

        <FlatList
          renderItem={({ item }) => (
            <>
              <CardItem >
                <Left>
                  <Body>
                    <Text style={{ fontFamily: 'Poppins', fontSize: 15, color:"#828fff" }}>4010-XXXX-XXXX-2212 - Autorizada</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={12} name={"credit-card"}  color={"#828fff"} />
                      <Text style={{ fontFamily: 'Poppins', fontSize: 12, paddingLeft: 5 }} note>MASTERCARD</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={12} name={"calendar"} color={"#828fff"} />
                      <Text style={{ fontFamily: 'Poppins', fontSize: 12, paddingLeft: 5 }} note>Domingo, 16 de Outubro de 2019</Text>
                    </View>
                  </Body>
                </Left>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'Poppins', fontSize: 14, color:"#828fff" }}>R$ 9.999,00</Text>
                </View>
              </CardItem>
              <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', opacity: 0.1 }} />
            </>
          )}
          refreshing={this.props.state.isLoading}
          refreshControl={
            <RefreshControl
              refreshing={this.props.state.isLoading}
              onRefresh={this.props.list}
            />
          }
          keyExtractor={({ id }) => id.toString()}
          data={this.props.state.rows}
          onEndReached={this.onLoadMoreData}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => this.props.state.isLoading ? null : <EmptyList message="Não há Confirmars disponíveis" />}
        />
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

export default connect(mapStateToProps, { paged, current })(PaymentScreen)