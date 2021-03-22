import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, ScrollView } from 'react-native';

export default class CardExample extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
      <Container>
        <Content>
          <Card style={{margin: 10, paddingLeft: 10, borderRadius: 10, shadowColor: '#000', borderColor: 'gray'}}>
            <CardItem>
              <Body style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                <Text style={{fontWeight: 'bold'}}>
                   Consulta Neurologica
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body style={{flexDirection: "row", marginTop: '-2%'}}>
              <Icon size={20} name={"map-marker-outline"} color={"green"}/>
                <Text style={{marginLeft: 4}}>
                   Shopping Difusora - CEOFT
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body style={{flexDirection: "row", marginTop: '-5%'}}>
              <Icon size={20} name={"calendar-month-outline"} color={"green"}/>
                <Text style={{marginLeft: 4}}>
                   20/02/2020
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
      </ScrollView>
    );
  }
}