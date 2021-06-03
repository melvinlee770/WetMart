/**
 * WetMart-Seller
 * author: Lee Yong Zun
 */

import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button } from 'react-native';
import { Card } from 'react-native-shadow-cards'

import Background from '../img/big.jpeg'

export default function logIn({ navigation }) {

  const buttonToLogin = () => {
    navigation.navigate('homeScreen')
  }

  const buttonToSignUp = () => {
    navigation.navigate('signupScreen')
  }
  const buttonToReset = () => {
    navigation.navigate('resetpasswordScreen')
  }

  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  return (
    <ImageBackground source={Background} style={styles.container}>

      <Text style={{ fontFamily: 'Montserrat-Black', color: '#86B7B9', fontSize: 70, textAlign: 'center' }}>WetMart</Text>
      <Text style={{ fontFamily: 'Montserrat-Regular', color: 'black', fontSize: 30, textAlign: 'center', marginBottom: '10%' }}>Merchant</Text>

      <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../img/email.png')} style={{ marginLeft: '5%' }} />
        <TextInput placeholder="Email" placeholderTextColor='#808080'
          value={'' + email} onChangeText={function (text) { updateEmail(text) }} />
      </Card>

      <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', marginBottom: '5%', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../img/lock.png')} style={{ marginLeft: '5%' }} />
        <TextInput placeholder="Password" placeholderTextColor='#808080'
          value={'' + password} onChangeText={function (text) { updatePassword(text) }} />
      </Card>

      <Card style={styles.login_signup_button}>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign: 'center' }}
          onPress={buttonToLogin}>LOG IN</Text>
      </Card>

      <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 'auto', marginRight: 'auto' }}>Or</Text>

      <Card style={styles.login_signup_button}>
        <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} onPress={buttonToSignUp}>SIGN UP</Text>
      </Card>

      <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 15, marginLeft: 'auto', marginRight: 'auto' }} onPress={buttonToReset}>Forget Password? Reset</Text>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  login_signup_button: {
    height: '6%',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A9896'
  }
})
