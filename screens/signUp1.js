import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'

export default function signUp({navigation}){

    const nextScreen = () => {
        navigation.navigate('signupScreen2')
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    const [signup_email, updateSignUpEmail] = useState('')
    const [signup_storeName, updateSignUpStoreName] = useState('')
    const [signup_password, updateSignUpPassword] = useState('')
    const [signup_retypePassword, updateSignUpRetypePassword] = useState('')
    const [signup_firstname, updateSignUpFirstName] = useState('')
    const [signup_lastname, updateSignUpLastName] = useState('')
    const [signup_dateofbirth, updateSignUpDateOfBirth] = useState('')
    const [signup_address, updateSignUpAddress] = useState('')
    const [signup_postalcode, updateSignUpPostalCode] = useState('')
    const [signup_unitnumber, updateSignUpUnitNumber] = useState('')
    const [signup_mobilenumber, updateSignUpMobileNumber] = useState('')
    const [signup_gender, updateSignUpGender] = useState('')
    const [signup_fullname, updateSignUpFullName] = useState('')
    const [signup_bank, updateSignUpBank] = useState('')
    const [signup_bank_account, updateSignUpBankAccount] = useState('')

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Card onPress = {() => {console.log('onclick')}} style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.cardcontainer}>
                    <Image source={require('../img/up.png')} style={styles.imageStyle}/>
                    <Text style={styles.userStyle}>Upload Photo of Store</Text>
                </View>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '5%'}}>
                <Image source={require('../img/email.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Email" placeholderTextColor='#808080'
                value={''+signup_email} onChangeText={function (text) {updateSignUpEmail}}/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '5%'}}>
                <Image source={require('../img/email.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Store Name" placeholderTextColor='#808080'
                value={''+signup_storeName} onChangeText={function (text) {updateSignUpStoreName}}/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '5%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Password" placeholderTextColor='#808080'
                value={''+signup_password} onChangeText={function(text) {updateSignUpPassword}}/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '5%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Confirm Password" placeholderTextColor='#808080'
                value={''+signup_retypePassword} onChangeText={function(text) {updateSignUpRetypePassword}}/>
            </Card>
            <Card style={{height:'6%', 
                       width: '70%', 
                       marginLeft: 'auto', 
                       marginRight: 'auto', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       marginTop: '10%',
                       backgroundColor: '#5A9896'}}>
           <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20}} onPress={nextScreen}>NEXT</Text>
         </Card>
         <Text style={{color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 16, alignSelf:'center',marginTop:'3%'}}>
             Already have an account? <Text style={{color:'blue',textDecorationLine: 'underline'}} onPress={loginScreen}>Sign In</Text>
         </Text>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        fontFamily: 'Montserrat-ExtraLight'
    },
    cardcontainer:{
        flex: 1,
    },
    imageStyle: {
        flexGrow:1,
        width:"50%",
        height:"20%",
        alignSelf: 'center',
    },
    userStyle:{
        fontSize:18,
        color:'black',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular'
    },
  })
