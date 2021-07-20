/**
 * WetMart-Seller
 * author: Lee Yong Zun
 */

import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'


export default function logIn({ navigation }) {

  // use props to use back the useState data
  function SellerLoginButton(props) {
    const seller_email = props.login_email
    const seller_password = props.login_password
    const seller_id = []

    function submitLogin() {
      fetch("http://192.168.1.66:3000/seller/login",    //seller login
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: seller_email,
            password: seller_password
          })
        })
        .then(response => response.json())
        .then(json => {
          if (json.status == 404) {
            console.log('Email cannot be found')
            Alert.alert(
              "Email is not use",
              "Please input correct email",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ],
              { cancelable: false }
            )
            return false
          }
          else if (json.status == 403) {
            console.log('Password is incorrect')
            Alert.alert(
              "Password incorrect",
              "Please input correct password",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ],
              { cancelable: false }
            )
            return false
          }
          else {
            console.log('Login success')
            // console.log(json)
            // console.log(jwt_decode(json.accessToken))
            const value = json.accessToken
            // storing the jwt token response into the async storage
            const jsonValue = JSON.stringify(value)
            AsyncStorage.setItem('token', jsonValue)
            AsyncStorage.setItem('testing', 'halo')
            AsyncStorage.setItem('stroring1', login_email)
            console.log('Success to store token ')

            const getSellerIDURL = 'http://192.168.1.66:3000/seller/id/login?seller_email=' + seller_email
            fetch(getSellerIDURL)
              .then(response => response.json())
              .then(json => {
                while (seller_id.length >0) {
                  seller_id.pop()
                }
                seller_id.push(json[0].seller_id)
                AsyncStorage.setItem('stroringID', String(seller_id[0]))
                console.log("using seller id: "+seller_id[0])
              })
              .catch(error => console.log(error))
              loginNavigate()
          }
        })
        .catch((error => { console.log(error) }))
    }

    /**
     * ========================== navigation to the home page =========================
     */

    function loginNavigate() {                //do not delete
      setTimeout(function () { navigation.navigate('homeScreen', { email: login_email, id: seller_id[0]}) }, 2000)
    }
    return (
      <Card style={styles.login_signup_button}>
        <TouchableOpacity onPress={() => { submitLogin(); }}>
          <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign: 'center' }}>LOG IN</Text>
        </TouchableOpacity>
      </Card>

    )
  }

  const buttonToSignUp = () => {
    navigation.navigate('signupScreen')
  }
  const buttonToReset = () => {
    navigation.navigate('resetpasswordScreen')
  }

  const [login_email, updateLoginEmail] = useState('')
  const [login_password, updateLoginPassword] = useState('')

  return (
    <ImageBackground source={Background} style={styles.container}>

      <Text style={{ fontFamily: 'Montserrat-Black', color: '#86B7B9', fontSize: 70, textAlign: 'center' }}>WetMart</Text>
      <Text style={{ fontFamily: 'Montserrat-Regular', color: 'black', fontSize: 30, textAlign: 'center', marginBottom: '10%' }}>Merchant</Text>

      <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../img/email.png')} style={{ marginLeft: '5%' }} />
        <TextInput placeholder="Email" placeholderTextColor='#808080' 
          value={'' + login_email} onChangeText={function (text) { updateLoginEmail(text) }} />
      </Card>

      <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%', marginBottom: '5%', flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../img/lock.png')} style={{ marginLeft: '5%' }} />
        <TextInput placeholder="Password" placeholderTextColor='#808080'
          value={'' + login_password} onChangeText={function (text) { updateLoginPassword(text) }} />
      </Card>

      {/* useState data pass to SellerLoginButton */}
      <SellerLoginButton login_email={login_email} login_password={login_password}></SellerLoginButton>

      <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 18, marginLeft: 'auto', marginRight: 'auto' }}>Or</Text>

      <Card style={styles.login_signup_button}>
        <TouchableOpacity onPress={buttonToSignUp}>
          <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }}>SIGN UP</Text>
        </TouchableOpacity>
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
