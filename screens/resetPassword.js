/**
 * WetMart-Seller
 * author: Lee Yong Zun
 */
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import emailjs from 'emailjs-com';

import Background from '../img/big.jpeg'

export default function resetPassword({ navigation }) {

    // function sendEmail(e) {
    //     e.preventDefault();

    //     emailjs.sendForm('service_eolevcr', 'template_fp98dn1', e.target, 'user_A4mwaGLq6wI3CQPB8WYFE')
    //         .then((result) => {
    //             console.log(result.text);
    //         }, (error) => {
    //             console.log(error.text);
    //         });
    // }
    var data = {
        service_id: 'service_eolevcr',
        template_id: 'template_fp98dn1',
        user_id: 'user_A4mwaGLq6wI3CQPB8WYFE',
        template_params: {
            'email': { reset_email }
        }
    }; const buttonSendResetEmail = () => {
        console.log(reset_email)
        // const sendemailURL = 'https://api.emailjs.com/api/v1.0/email/send'
        // fetch(sendemailURL, {
        //     type: "POST",
        //     data: JSON.stringify(data),
        //     contentType: 'application/json'
        // })
        //     .then(response => response.json())
        //     .then((json) => {
        //         console.log(json)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        emailjs.init('user_A4mwaGLq6wI3CQPB8WYFE',"service_eolevcr","template_fp98dn1",{
            email: reset_email,
            });
        // emailjs.init('user_A4mwaGLq6wI3CQPB8WYFE')
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

            <TouchableOpacity style={styles.reset_email_button} onPress={buttonSendResetEmail}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign: 'center' }}>RESET</Text>
            </TouchableOpacity>


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

