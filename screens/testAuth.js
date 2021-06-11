import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-shadow-cards'

import Background from '../img/big.jpeg'

export default function testAuth() {

    function testingAuthentication() {
        const getback = async () => {
            try {
                let abcd = await AsyncStorage.getItem('token')
                console.log(abcd)
            }
            catch (error) {
                console.log(error)
            }
        }
        
        const myHeaders = new Headers()
        const defg = 'Bearer ' + getback

        myHeaders.append('CONTENT-TYPE', 'application/json')
        myHeaders.append('Authorization', defg)

        fetch("http://192.168.1.66:3000/seller/testing/auth", {
            method: 'GET',
            headers: 'Ahthorization', defg
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
            .catch(error => console.log(error))

    }

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Card style={styles.login_signup_button}>
                <TouchableOpacity>
                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign: 'center' }} onPress={testingAuthentication()}>TEST AUTH</Text>
                </TouchableOpacity>
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