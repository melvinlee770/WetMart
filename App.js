/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import Background from './img/big.jpeg'

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={Background} style={styles.container}>
        <View>
        <Text style={styles.app_name}>WetMart</Text>
        <Text style={styles.app_ver}>Merchant</Text>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  app_name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 70,
    color: '#86B7B9'
  },
  app_ver: {
    textAlign: 'center',
    marginBottom: 400,
    fontSize: 20
  }
})


