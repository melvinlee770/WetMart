/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import Background from './img/big.jpeg'

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={Background} style={styles.container}>

        <Text style={{ fontFamily: 'Montserrat-Black', color: '#86B7B9', fontSize: 70, textAlign: 'center' }}>WetMart</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: 'black', fontSize: 30, textAlign: 'center', marginBottom: '10%' }}>Merchant</Text>

        <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('./img/email.png')} style={{marginLeft: '5%'}}/>
          <TextInput placeholder="Email" placeholderTextColor='#808080'/>
        </Card>

        <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',marginTop: '5%', flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('./img/lock.png')} style={{marginLeft: '5%'}}/>
          <TextInput placeholder="Password" placeholderTextColor='#808080' />
        </Card>

        <Card style={{height:'6%', 
                      width: '70%', 
                      marginLeft: 'auto', 
                      marginRight: 'auto', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginTop: '5%',
                      backgroundColor: '#5A9896'}}>
          <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20}}>LOG IN</Text>
        </Card>
        <Text style={{color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 'auto', marginRight: 'auto'}}>Or</Text>
        <Card style={{height:'6%', 
                      width: '70%', 
                      marginLeft: 'auto', 
                      marginRight: 'auto', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      backgroundColor: '#5A9896'}}>
          <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20}}>SIGN UP</Text>
        </Card>
        <Text style={{color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 15, marginLeft: 'auto', marginRight: 'auto'}}>Forget Password? Reset</Text>

      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'Montserrat-ExtraLight'
  },
})


