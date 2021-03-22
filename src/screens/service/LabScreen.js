import React, {Component} from 'react';
import {View, Text, Thumbnail} from 'native-base';
import {BASE_URI} from '../../constants/config';
import {authHeaders} from '../../api/utils';
import {
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Arrow from '../../navigations/BackNavigationIcon';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ItemSeparator, EmptyList, CheckBox} from '../../components';
import ProgressCircle from 'react-native-svg-charts';

class LabScreen extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      placeIsLoading: true,
      place: null,
      allplace: null,
      item: null,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const item = navigation.getParam('item', {});
    fetch(`${BASE_URI}/v1/place?skip=0`, {
      method: 'GET',
      headers: await authHeaders(),
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          place: res.content,
          allplace: res.content,
          placeIsLoading: false,
          item: item,
        });
      });
  }

  onSearch(text) {
    const news = [];
    if (text == '') {
      this.setState({
        place: this.state.allplace,
      });
    } else {
      this.state.allplace.forEach(element => {
        if (element.fullName.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          news.push(element);
        }
      });
      this.setState({
        place: news,
      });
    }
  }

  onPress = (route, item) => {
    item = {
      ...this.state.item,
      place: item,
    };
    this.props.navigation.navigate(route, {item});
  };

  render() {
    const {item} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#FFF', flexDirection: 'row'}}>
          <Arrow />
          <View style={{width: '90%', marginLeft: '-10%', padding: 10}}>
            <StepIndicator
              stepCount={4}
              labels={[
                item ? item.service.name : '',
                item ? item.name : '',
                'Local',
                'Confirmar',
              ]}
              currentPosition={2}
              customStyles={{
                labelColor: '#000',
                separatorFinishedColor: '#94ADEE',
                separatorUnFinishedColor: '#94ADEE',
                stepStrokeCurrentColor: '#94ADEE',
                currentStepLabelColor: '#000',
                stepIndicatorUnFinishedColor: '#94ADEE',
                stepIndicatorFinishedColor: '#94ADEE',
                stepIndicatorLabelCurrentColor: '#000',
              }}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: 1 / 2,
            marginHorizontal: '2%',
            borderColor: '#000',
            marginVertical: '1%',
            marginTop: '-2%',
            opacity: 0.1,
          }}
        />

        <View
          style={{
            border: 1,
            borderColor: '#000',
            marginTop: 10,
            marginLeft: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name={'search'}
              size={22}
              color={'#595959'}
              style={{
                marginTop: Platform.OS == 'ios' ? -2 : 10,
                marginLeft: 10,
              }}
            />
            <TextInput
              style={{
                marginLeft: 4,
                marginBottom: 5,
                color: '#595959',
                fontSize: 18,
              }}
              ref="searchBar"
              placeholderTextColor={'#595959'}
              onChangeText={text => this.onSearch(text)}
              hideBackground={true}
              placeholder={'Buscar local'}
            />
          </View>
          <View
            style={{
              borderWidth: 1 / 2,
              marginHorizontal: '1%',
              borderColor: '#595959',
              marginVertical: '1%',
              marginTop: Platform.OS == 'ios' ? '2%' : '-2%',
              opacity: 0.1,
              marginLeft: '1%',
              marginRight: '4%',
            }}
          />
        </View>

        <FlatList
          style={{paddingLeft: 10, backgroundColor: '#fff'}}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                onPress={() => this.onPress('ServiceCalendarScreen', item)}>
                <View style={{marginTop: 22, marginEnd: 10, margin: 4}}>
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
                    {item.fullName}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#595959',
                      fontSize: 14,
                      paddingLeft: 19,
                    }}>
                    {item.street}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 19,
                      paddingBottom: 22,
                    }}>
                    <View style={{marginLeft: '73%', marginTop: '-12%'}}>
                      <View>
                        <Thumbnail
                          source={{
                            uri:
                              item.thumbnail != null
                                ? item.thumbnail.uri
                                : 'https://jornalggn.com.br/sites/default/files/u16/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1 / 2,
                  marginHorizontal: '2%',
                  borderColor: '#000',
                  marginVertical: '1%',
                  marginTop: '-2%',
                  opacity: 0.1,
                }}
              />
            </>
          )}
          refreshing={this.state.placeIsLoading}
          keyExtractor={({id}) => id.toString()}
          data={this.state.place}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={() =>
            this.state.placeIsLoading ? null : (
              <EmptyList message={'Não há dados disponíveis'} />
            )
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default LabScreen;
