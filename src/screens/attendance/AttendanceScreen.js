import React, {Component} from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList } from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from 'react-native-search-bar'
import PropTypes from 'prop-types'

import { paged, current } from '../../actions/attendance'
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

const mapStateToProps = state => {
  return {
    state: state.attendance,
  }
}

class AttendanceScreen extends Component {

  static propTypes = {
    paged: PropTypes.func.isRequired,
    current: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  static navigationOptions = () => {
    return {
      headerTitle: () => <Text>Atendimentos</Text>,
      headerLeft: () => <DrawerNavigationIcon/>,
      headerStyle: { backgroundColor: '#f3f6fe'}
    };
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
    this.setState({page: this.state.page + 1}, () => {
      this.props.paged(this.state.page)
    })
  }

  onSearch = (text) => {

  }
  
  onPress = (row) => {
    
  }

  render() {

    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={(text) => this.onSearch(text)}
          hideBackground={true}
          placeholder='Buscar'
        />
        <FlatList
          renderItem={({ item }) => (
            <CardItem style={{borderLeftWidth: 5, borderLeftColor: '#99cc00'}}>
              <Left>
                <Body>
                  <Text style={{fontFamily: 'Poppins', fontSize: 15}}>Sábado, 14 de Novembro de 2019</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon size={12} name={"map-marker-outline"} />
                    <Text style={{fontFamily: 'Poppins', fontSize: 12, paddingLeft: 5}} note>Caruaru - PE</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon size={12} name={"doctor"} />
                    <Text style={{fontFamily: 'Poppins', fontSize: 12, paddingLeft: 5}} note>Endocrinologista</Text>
                  </View>
                </Body>
              </Left>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: 'Poppins', fontSize: 14}}>R$ 9.999,00</Text>
              </View>
            </CardItem>
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
          ListEmptyComponent={() => this.props.state.isLoading ? null : <EmptyList message="Não há atendimentos disponíveis" />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5FCFF'
 }
});

export default connect(mapStateToProps, { paged, current })(AttendanceScreen)