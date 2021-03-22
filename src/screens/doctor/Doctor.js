import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Card, CardItem } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import IconOcticons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default class HeaderTitleExample extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#fff"}}>
          <Left/>
          <Body>
            <Title style={{color: '#000'}}>Agenda</Title>
          </Body>
          <Right />
        </Header>

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 6}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Minhas Consultas</Text>
          </View>

        <View style={{flexDirection: "row", }}>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false} 
            style={{marginLeft: 10}}
          >
       
               <Card>
               <CardItem>
            <Body style={{flexDirection: "row"}}>
            <Icons size={13} name={"user"} color={"green"}/>
            <Text style={{marginLeft: 5}}>
                   Janaina Maria
                </Text>
              </Body>
            </CardItem>

            <CardItem>
            <Body style={{flexDirection: "row", marginTop: '-8%'}}>
              <Icon size={15} name={"map-marker-outline"} color={"green"}/>
              <Text style={{marginLeft: 4}}>
                   Shopping Difusora - Ceoft
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body style={{flexDirection: "row", marginTop: '-8%'}}>
              <Icon size={15} name={"calendar-month-outline"} color={"green"}/>
                <Text style={{marginLeft: 4}}>
                   20/05/2020
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Body style={{flexDirection: "row", marginTop: '-8%'}}>
            <Text style={{marginLeft: 4}}>
                   //Your text here
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   //Your text here
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   //Your text here
                </Text>
              </Body>
            </CardItem>
          </Card>
          </ScrollView>
        </View>
        
        
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 6}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Agenda</Text>
          </View>

        <ScrollView>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   //Your text here
                </Text>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}