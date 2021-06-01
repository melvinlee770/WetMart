import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'

import Background from '../img/big.jpeg'

export default function resetPassword2 ({ navigation }) {
    return (
        <ImageBackground source={Background} style={styles.container}>

            <Image source={require('../img/confirmation.png')} style={{ marginLeft: 'auto', marginRight: 'auto' }} />

            <Text style={styles.reset_email}>A email to reset your password has been sent to your
            email.Please check your inbox.
            </Text>

            <Card style={{
                height: '6%',
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#5A9896',
            }}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} onPress={() => navigation.navigate('loginScreen')}>DONE</Text>
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
    reset_email: {
        fontSize: 25,
        width: '80%',
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        color: '#A2A5A8',
        marginBottom: '20%',
        fontFamily: 'Montserrat-Regular'
    }
})
