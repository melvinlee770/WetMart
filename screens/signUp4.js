import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'
import {host} from '../common'

export default function signUp({ navigation, route }) {

    const [fourpassImgUrl, setfourpassImgUrl] = useState(route.params.thirdpageImgUrl)
    const [fourpassEmail, setfourpassEmail] = useState(route.params.thirdpageEmail)
    const [fourpassStoreName, setfourpassStoreName] = useState(route.params.thirdpageStoreName)
    const [fourpassPassword, setfourpassPassword] = useState(route.params.thirdpagePassword)
    const [fourpassSelectedMarket, setfourpassSelectedMarket] = useState(route.params.thirdpageSelectedMarket)
    const [fourpassSelectedStoreCat, setfourpassSelectedStoreCat] = useState(route.params.thirdpageSelectedStoreCat)
    const [fourpassFirstName, setfourpassFirstName] = useState(route.params.thirdpageFirstName)
    const [fourpassLastName, setfourpassLastName] = useState(route.params.thirdpageLastName)
    const [fourpassGender, setfourpassGender] = useState(route.params.thirdpageGender)
    const [fourpassDOB, setfourpassDOB] = useState(route.params.thirdpageDOB)
    const [fourpassAddress, setfourpassAddress] = useState(route.params.thirdpageAddress)
    const [fourpassUnitNumber, setfourpassUnitNumber] = useState(route.params.thirdpageUnitNumber)
    const [fourpassMobile, setfourpassMobile] = useState(route.params.thirdpageMobile)
    const [fourpassBank, setfourpassBank] = useState(route.params.thirdpage_bank)
    const [fourpassBankNum, setfourpassBankNum] = useState(route.params.thirdpage_bankaccountnum)
    const [fourpassFullName, setfourpassFullName] = useState(route.params.thirdpage_fullname)

    const registerurl = host + "/seller/register"


    const nextScreen = () => {
        if (storedescription.length == 0) {
            alert('Please input some store description')
        }
        else if (storedescription !== 0) {
            fetch(registerurl,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        store_image_id: fourpassImgUrl,
                        email: fourpassEmail,
                        store_name: fourpassStoreName,
                        password: fourpassPassword,
                        market_id: fourpassSelectedMarket,
                        store_category_id: fourpassSelectedStoreCat,
                        first_name: fourpassFirstName,
                        last_name: fourpassLastName,
                        gender: fourpassGender,
                        date_of_birth: fourpassDOB,
                        address: fourpassAddress,
                        unit_number: fourpassUnitNumber,
                        mobile_number: fourpassMobile,
                        bank: fourpassBank,
                        bank_account: fourpassBankNum,
                        store_description: storedescription,
                        full_name: fourpassFullName
                    })
                })
                .then(response => response.json())
                .then(json => {
                    console.log('sucess register')
                    console.log(json.command)
                    navigation.navigate('signupScreen5')
                })
                .catch((error => { console.log(error) }))
        }
        // console.log(fourpassImgUrl)
        // console.log(fourpassEmail)
        // console.log(fourpassStoreName)
        // console.log(fourpassPassword)
        // console.log(fourpassSelectedMarket)
        // console.log(fourpassSelectedStoreCat)
        // console.log(fourpassFirstName)
        // console.log(fourpassLastName)
        // console.log(fourpassGender)
        // console.log(fourpassDOB)
        // console.log(fourpassAddress)
        // console.log(fourpassUnitNumber)
        // console.log(fourpassMobile)
        // console.log(fourpassBank)
        // console.log(fourpassBankNum)
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    const [storedescription, setstoredescription] = useState('')

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <TextInput placeholder="Store Description (optional)" placeholderTextColor='#808080' style={{ height: 300, width: '80%', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }} multiline={true}
                    value={'' + storedescription} onChangeText={function (text) { setstoredescription(text) }} />
            </Card>
            <Card style={{
                height: '6%',
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%',
                backgroundColor: '#5A9896'
            }}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} onPress={nextScreen}>Submit</Text>
            </Card>
            <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 16, alignSelf: 'center', marginTop: '3%' }}>
                Already have an account? <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={loginScreen}>Sign In</Text>
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
    cardcontainer: {
        flex: 1,
    },
    imageStyle: {
        flexGrow: 1,
        width: "50%",
        height: "20%",
        alignSelf: 'center',
    },
    userStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular'
    },
})
