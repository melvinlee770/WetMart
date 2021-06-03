import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'

export default function signUp({navigation}){

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Image source={require('../img/tick.png')} style={{alignSelf:'center'}}/>
            <Text style={{color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 18,marginTop:'10%' ,marginLeft: 'auto', marginRight: 'auto',alignSelf:'center'}}>
                Your Seller Account application has been received. Application will take up to 2 to 3 working days to be processed.
            </Text>
            <Text style={{color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 18,marginTop:'10%' ,marginLeft: 'auto', marginRight: 'auto',alignSelf:'center'}}>
                You will be notified via email upon approval.
            </Text>
            <Card style={{height:'6%', 
                       width: '70%', 
                       marginLeft: 'auto', 
                       marginRight: 'auto', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       marginTop: '10%',
                       backgroundColor: '#5A9896'}}>
           <Text style={{color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20}} onPress={loginScreen}>DONE</Text>
         </Card>
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
