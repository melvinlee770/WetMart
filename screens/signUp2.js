import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'

export default function signUp({navigation}){

    const nextScreen = () => {
        navigation.navigate('signupScreen3')
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/email.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="First Name" placeholderTextColor='#808080'/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/email.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Last Name" placeholderTextColor='#808080'/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Date of Birth" placeholderTextColor='#808080'/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Address" placeholderTextColor='#808080'/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Postal Code" placeholderTextColor='#808080'/>
            </Card>
            <Card style={{width: '70%', marginLeft: 'auto', marginRight: 'auto',flexDirection: 'row', alignItems: 'center',marginTop: '3%'}}>
                <Image source={require('../img/lock.png')} style={{marginLeft: '3%'}}/>
                <TextInput placeholder="Unit Number" placeholderTextColor='#808080'/>
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
