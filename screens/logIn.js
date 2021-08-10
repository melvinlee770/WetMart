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
import { host } from '../common'


export default function logIn({ navigation }) {

  const [seller_id, updateseller_id] = useState('')

  // use props to use back the useState data
  function SellerLoginButton(props) {
    const seller_email = props.login_email
    const seller_password = props.login_password

    function submitLogin() {
      fetch(host + "/seller/login",    //seller login
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
            AsyncStorage.setItem('stroring1', login_email)
            console.log('Success to store token ')

            const getSellerIDURL = host + '/seller/id/login?seller_email=' + seller_email
            fetch(getSellerIDURL)
              .then(response => response.json())
              .then(json => {
                console.log(json[0])
                updateseller_id(seller_id => seller_id = json[0].seller_id)
                AsyncStorage.setItem('stroringID', String(json[0].seller_id))
                loginNavigate(json[0].seller_id, seller_email)
              })
              .catch(error => console.log(error))

          }
        })
        .catch((error => { console.log(error) }))
    }

    /**
     * ========================== navigation to the home page =========================
     */

    function loginNavigate(seller_id, seller_email) {
      alert("using seller id:" + seller_id + " using seller email:" + seller_email)             //do not delete
      navigation.navigate('homeScreen', { email: seller_email, id: seller_id })
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

      <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 15, marginLeft: 'auto', marginRight: 'auto' }}>If you have any issue</Text>
      <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 15, marginLeft: 'auto', marginRight: 'auto' }}>Please email to </Text>
      <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 15, marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold' }}>wetmart.sg@gmail.com</Text>

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
