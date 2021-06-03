/**
 * WetMart-Seller
 * author: Lee Yong Zun
 */
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'

import Background from '../img/big.jpeg'

export default function resetPassword({ navigation }) {

    const buttonSendResetEmail = () => {
        navigation.navigate('resetpasswordScreen2')
    }

    const [reset_email, updateResetEmail] = useState('')
    return (
        <ImageBackground source={Background} style={styles.container}>

            <Text style={styles.reset_instruction}>Please enter your email:</Text>

            <Card style={{ width: '70%', marginBottom: '60%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../img/email.png')} style={{ marginLeft: '5%' }} />
                <TextInput placeholder="Email" placeholderTextColor='#808080'
                    value={'' + reset_email} onChangeText={function (text) { updateResetEmail(text) }} />
            </Card>

            <Card style={styles.reset_email_button}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign: 'center' }}
                    onPress={buttonSendResetEmail}>RESET</Text>
            </Card>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    reset_instruction: {
        fontSize: 30,
        textAlign: 'center',
        color: '#A2A5A8',
        marginBottom: '5%',
        fontFamily: 'Montserrat-Regular'
    },
    reset_email_button: {
        height: '6%',
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5A9896'
    }
})

