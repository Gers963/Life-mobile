import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView, Image, flashScrollIndicators } from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-search-bar'
import PropTypes from 'prop-types'
import StepIndicator from 'react-native-step-indicator';
import { cooperatorList, cooperatorCurrent } from '../../actions/professional'
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

import Modal from "react-native-modal";
import Bagde from '../../components/Badge';
import { ItemSeparator, RadioButton, CheckBox } from '../../components';

export default class TempScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      endereco: 'Avenida Agamenon Magalhães',
      local: 'Shopping Difusora'
    };
   this.funcao1 = this.funcao1.bind(this);
   this.funcao2 = this.funcao2.bind(this)
   this.funcao3 = this.funcao3.bind(this)
  }

  funcao1 () {
    this.setState({
        endereco : 'Rua pio x',
        local: 'FAFICA'
    });
  }

  funcao2 () {
    this.setState({
        endereco : 'Rua Adjair José',
        local: 'UNIMED, Caruaru'
    });
  }

  funcao3 () {
    this.setState({
        endereco : 'Avenida Agamenon Magalhães, 1009',
        local: 'Santa Efigenia, Caruaru'
    });
  }

  
  render(){
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.container}>
             
              <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLjxcze6pnNr8Zn8EGR7UBoQHOTmB0DqX6eZze6Osrn4YPBTXZ&usqp=CAU'}}
             style={{width: 130, height: 130, marginHorizontal: 6, marginTop: 10, alignSelf: "center", borderRadius: 3}} />
              <Text style={{textAlign: 'justify',color:'#000', marginHorizontal: 14, fontWeight: "bold", fontSize: 19, textAlign: "center", marginTop: 19}}> Dr. Gustavo Motta </Text> 
            <Text style={{textAlign: 'justify',color:'#000', marginHorizontal: 20, fontSize: 15, marginTop: 5}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
             and scrambled.  </Text> 
      
             <View style={{borderWidth: 1/4, marginHorizontal: '2%', borderColor: '#000', marginVertical: '1%', marginTop: '2%'}}/>
           
           <View style={{marginTop: 20, shadowColor: "#000",  shadowOpacity: 0.41,  elevation: 14, paddingRight: 12}}>
      
            <ScrollView horizontal showsHorizontalScrollIndicator={true}  
                  style={{marginLeft: 10}}
                  contentContainerStyle={{paddingRight: 10, paddingBottom: 13}}> 
                     <Ionicons size={25} color="#0077B6" name={"ios-arrow-back"} style={{paddingRight: 10}} />
                <TouchableOpacity style={{marginRight: 5}}>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.funcao1()}>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                  <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 2</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.funcao2()}>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 3</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.funcao3()}>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 4</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 17, paddingLeft: 5}}>Endereço 6</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{borderColor: "gray", borderWidth: 1, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <IconOcticons size={16} color="#0077B6" name={"location"} />
                    <Text style={{fontFamily: 'Titillium Web', color: 'blue', fontSize: 14, paddingLeft: 5, fontWeight: "bold"}}>Endereço 1</Text>
                  </View>
                </TouchableOpacity>
              
                </ScrollView>
                </View>
              
                <View>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, paddingRight: 20}}>
                <IconOcticons size={20} color="gray" name={"location"} style={{marginTop: 15}} />
                <Text style={{fontFamily: 'Titillium Web', fontSize: 17, padding: 5}}> { this.state.endereco } </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, paddingRight: 20}}>
                <Text style={{fontFamily: 'Titillium Web', fontSize: 15, color: "gray", padding:21, marginTop: "-13%"}}> { this.state.local } </Text>
                </View>
                </View>
      
                <View >
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, paddingRight: 20, marginTop: "-4%"}}>
                <IconOcticons size={22} color="gray" name={"calendar"} style={{marginTop: 8}} />
                <Text style={{fontFamily: 'Titillium Web', fontSize: 17, padding: 5, color: "gray"}}>Próxima data:</Text>
                <Text style={{fontFamily: 'Titillium Web', fontSize: 17, padding: 2}}>15/02/2020</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: "-2%"}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}  
                  style={{marginLeft: 37}}
                  contentContainerStyle={{paddingRight: 10, paddingBottom: 13}}> 
                    
                <TouchableOpacity style={{marginRight: 5}}>
                  <View style={{borderRadius: 3, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#CAF0F8', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 19, paddingLeft: 5}}>09:30</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5}}>
                <View style={{borderRadius: 3, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#CAF0F8', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 19, paddingLeft: 5}}>10:30</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5}}>
                <View style={{borderRadius: 3, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#CAF0F8', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 19, paddingLeft: 5}}>11:30</Text>
                  </View>
                </TouchableOpacity>        
                <TouchableOpacity style={{marginRight: 5}}>
                <View style={{borderRadius: 3, fontWeight: "bold", flexDirection: 'row', alignItems: 'center', backgroundColor: '#CAF0F8', padding: 2, paddingLeft: 8, paddingRight: 8}}> 
                    <Text style={{fontFamily: 'Titillium Web', color: '#0077B6', fontSize: 19, paddingLeft: 5}}>mais <Ionicons size={17} color="#0077B6" name={"ios-arrow-forward"} style={{paddingRight: 10}} /></Text>
                  </View>
                </TouchableOpacity> 
                </ScrollView>
                </View>
                </View>
              </View>
            </SafeAreaView>
        );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  item: {
   backgroundColor: 'white',
   flex: 1,
   borderRadius: 5,
   padding: 10,
   marginRight: 10,
   marginTop: 17,
   //height: 80
 },

 });