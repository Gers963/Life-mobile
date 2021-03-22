import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';
import styles from './Styles';
import Arrow from '../../navigations/BackNavigationIcon';

export default class EditCard extends Component {

  static navigationOptions = () => {
    return null
  };


  render() {
    return (
      <SafeAreaView style={{backgroundColor:"#fff", flex: 1,}}>
        <View style={{ backgroundColor: "#FFF", flexDirection: 'row' }}>
          <Arrow color={"#828fff"}/>
          <View style={{ backgroundColor: "#FFF", alignSelf: 'center', width: "80%", }}>
            <Text style={{ fontFamily: 'Roboto', borderWidth: 0, color: '#828fff', fontWeight: "bold", fontSize: 18, alignSelf: "center" }}>Editar Cartão</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1 / 2, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', opacity: 0.1 }} />

        <View style={{ marginTop: 20, flex: 1 }}>
          <CreditCardInput
            autoFocus

            requiresName
            requiresCVC

            useVertical={true}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onFocus={this._onFocus}
            onChange={this._onChange} />


          <TouchableOpacity style={[styles.buttonLogin]}>
            <View style={styles.buttonArea}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Editar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDelete]}>
            <View style={styles.buttonArea}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Excluir Cartão</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
