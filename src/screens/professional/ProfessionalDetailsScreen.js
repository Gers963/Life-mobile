import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import SearchBar from 'react-native-search-bar'
import PropTypes from 'prop-types'

import { cooperatorList, current } from '../../actions/professional'
import EmptyList from '../../components/EmptyList';
import DrawerNavigationIcon from '../../navigations/DrawerNavigationIcon';

import Modal from "react-native-modal";
import Bagde from '../../components/Badge';
import { ItemSeparator, RadioButton } from '../../components';

const mapStateToProps = state => {
  return {
    cooperator: state.professional,
  }
}

class ProfessionalDetailsScreen extends Component {

  static propTypes = {
    current: PropTypes.func.isRequired,
    state: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      reached: true,
      refreshing: false,
      isModalFilter: false
    };
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', position: 'absolute', left: 5, top: 20, padding: 10, zIndex: 1}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Icon size={32} name={"chevron-left"} color={"#000"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Image style={{ width: '100%', height: '100%' }} source={require("../../assets/images/office.png")}></Image>
        </View>
        <Image style={styles.avatar} source={{uri: (this.props.cooperator.current.thumbnail != null ? this.props.cooperator.current.thumbnail.uri : '')}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.cooperator.current.fullName}</Text>
            <Text style={styles.info}>{this.props.cooperator.current.register}</Text>
            { this.props.cooperator.current.services != null && (<>
              <ScrollView showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{paddingRight: 10, paddingBottom: 13}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 10}}>
                {this.props.cooperator.current.services.map((item, index) => {
                  return (<>
                    <View key={index} style={{borderRadius: 8, alignItems: 'center', backgroundColor: '#777', padding: 2, paddingLeft: 8, paddingRight: 8, opacity: 0.8, margin: 4}}>
                      <Text style={{fontFamily: 'Titillium Web', color: '#fff', fontSize: 12}}>{item.description}</Text>
                    </View>
                  </>);
                })}
                </View>
                <Text style={styles.description}>{this.props.cooperator.current.annotation}</Text>
              </ScrollView>
            </>)}
          </View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5FCFF'
 },
 header:{
  backgroundColor: "#00BFFF",
  height:150,
},
avatar: {
  width: 130,
  height: 130,
  borderRadius: 63,
  borderWidth: 4,
  borderColor: "white",
  marginBottom:10,
  alignSelf:'center',
  position: 'absolute',
  marginTop:100
},
info: {
  fontFamily: 'Titillium Web',
  marginTop: -6
},
name:{
  fontFamily: 'Cairo',
  fontSize: 16,
  fontWeight: '600',
},
body:{
  marginTop:50,
},
bodyContent: {
  alignItems: 'center',
  padding:10,
},
description:{
  fontFamily: 'Titillium Web',
  fontSize: 14,
  //color: "#696969",
  marginTop:10,
}
});

export default connect(mapStateToProps, { current })(ProfessionalDetailsScreen)