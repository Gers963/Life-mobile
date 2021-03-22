import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyList = ({ message }) => (
  <View style={styles.container}>
    <Icon name={"cloud"} size={48} color={"#777"}/>
    <Text style={styles.text}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 160,
    width: 60,
    height: 49,
  },
  text: {
    color: '#777'
    //marginTop: 34
  }
})

export default EmptyList