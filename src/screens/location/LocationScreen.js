import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

class LocationScreen extends Component {


  render() {
    return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
        <DrawerNavigationIcon />
        <View style={{ backgroundColor: "#FFF", alignSelf: 'center', width: "80%", }}>
          <Text style={{ fontFamily: 'Roboto', borderWidth: 0, color: '#828fff', fontWeight: "bold", fontSize: 18, alignSelf: "center" }}>Localização</Text>
        </View>
      </View>

      <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '-2%', opacity: 0.1 }} />

      <View  style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", padding: 5 }}>SHOPPING DIFUSORA</Text>
          <Text>Empresarial Difusora -Avenida Agamenon Magalhães 444 - 10º Andar - Salas 501-506 -  Maurício de Nassau, Caruaru - PE, 55012-290</Text>
      </View>

      <View  style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", padding: 5 }}>CARUARU SHOPPING</Text>
        <Text>Av. Adjar da Silva Casé, 800 - Piso Inferior Loja - 18 - Indianópolis, Caruaru - PE, 55024-740 (em frente ao Boliche)</Text>
      </View>
      
      <Image style={ styles.mapImage } source={require('../../assets/images/mapa.png')} />

    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  mapImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  }
});

export default LocationScreen;