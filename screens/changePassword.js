import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import {host} from '../common'

export default function changepassword({ navigation, route }) {

    const [passparamsSellerID, setpassparamsSellerID] = useState(route.params.pass_id)

    const [sellerOldPassword, setsellerOldPassword] = useState('')
    const [retypePassword, setretypePassword] = useState('')
    const [sellerNewPassword, setsellerNewPassword] = useState('')

    const updateSellerURL = host + '/seller/update/password?seller_id=' + passparamsSellerID

    const ChangePasswordButton = () => {
        if (sellerOldPassword != retypePassword) {
            Alert.alert(
                "Retype Password Not Match With Old Password",
                "Please re-enter the password",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ],
                { cancelable: false }
            )
        }
        else {
            fetch(updateSellerURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    old_password: sellerOldPassword,
                    new_password: sellerNewPassword
                })
            })
                .then(response => response.json())
                .then((json) => {
                    if (json.command == "UPDATE") {
                        navigation.navigate('profileScreen')
                    }
                    else if (json.code == "INCORRECT_PASSWORD") {
                        Alert.alert(
                            "Old Password Incorrect",
                            "Please re-enter the correct old password",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <View style={{ height: '100%' }}>
            <View style={[styles.eachProfileInfo, { marginTop: '40%' }]}>
                <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder="Old Password" value={'' + sellerOldPassword} onChangeText={function (text) { setsellerOldPassword(text) }} />
            </View>
            <View style={[styles.eachProfileInfo, { marginTop: '10%' }]}>
                <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder="Retype Old Password" value={'' + retypePassword} onChangeText={function (text) { setretypePassword(text) }} />
            </View>
            <View style={[styles.eachProfileInfo, { marginTop: '10%' }]}>
                <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder="New Password" value={'' + sellerNewPassword} onChangeText={function (text) { setsellerNewPassword(text) }} />
            </View>
            <View style={{ marginTop: '10%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                <TouchableOpacity onPress={ChangePasswordButton}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                        Change Password
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    eachProfileInfo: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        elevation: 3
    },
    eachProfileInfoText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 23
    },

})