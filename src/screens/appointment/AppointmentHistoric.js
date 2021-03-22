import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Left, Body, Title, Right } from 'native-base';
import { View, TouchableOpacity, Image } from 'react-native';
import Tab1 from './TabOne';
import Tab2 from './TabTwo';
export default class TabsAdvancedExample extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Container>
      <Header style={{backgroundColor: "#fff"}}>
          <Body style={{textAlign: 'center', alignContent: 'center', alignItems: 'center'}}>
            <Title style={{color: '#000', textAlign: 'center', alignContent: 'center', alignItems: 'center'}}>Consultas</Title>
          </Body>
  
        </Header>
        <View style={{borderColor: "gray"}}></View>
        <Tabs >
          <Tab heading='Em andamento' tabStyle={{backgroundColor: '#2F9084'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#2F9084'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <Tab1 />
          </Tab>
          <Tab heading='Realizadas' tabStyle={{backgroundColor: '#2F9084'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#2F9084'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
      </View>
    );
  }
}