import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import Background from '../img/big.jpeg';
import { RNS3 } from 'react-native-aws3';


export default function signUp({ navigation }) {

    const markets = []
    const [items, setItems] = useState([]);
    function insertMarketList() {                                   //fetch the market list when the screen loaded
        fetch("http://192.168.1.66:3000/seller/list/market")
            .then(response => response.json())
            // .then(json => { console.log(json) })
            .then(json => {
                for (let i = 0; i < json[0].length; i++) {
                    markets.push(json[0][i])
                    items.push({ label: markets[i].market_name, value: markets[i].market_id })
                }
            })
            .catch((error) => { console.log('Error') })
    }
    useEffect(insertMarketList)                                     //fetch the market list when the screen loaded


    function MarketListForm() {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);

        return (
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                dropDownDirection="TOP"
                style={{ borderColor: 'transparent' }}
            />
        );
    }

    function handleChoosePhoto() {
        const options = {}
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('Imagepicker Error: ', response.error)
            }
            else {
                console.log(response)
                const imgContent = {
                    path: response.assets[0].uri,
                    filename: response.assets[0].fileName,
                    type: 'image/type'
                }
                // const file = new FormData()
                // file.append(imgContent)
                fetch("http://192.168.1.66:3000/images", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    file: imgContent
                })
                .then((response) => response.json())
                .then(json => {
                    console.log(json)
                    // console.log(responseJson)
                })
                .catch((error) => {
                    console.log('Error')
                    console.log(error)
                })
                // const testdefg = {
                //     keyPrefix: 'uploads/',
                //     bucket: 'testwetmart-bucket',
                //     region: 'use-east-2',
                //     accessKey: 'AKIASX2RQ4PYBNZHVXKY',
                //     secretKey: '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',
                //     successActionStatus: 201
                // }
                // return RNS3.put(imgContent, testdefg)
                //     .then(response => {
                //         if (response.status !== 201) {
                //             console.log("Error")
                //         }
                //         console.log(response.status)
                //         console.log(response.body)
                //     })
                //     .catch(error => {
                //         console.log('fail')
                //         console.log(error)
                //     })
            }
        })
    }

    const nextScreen = async () => {
        navigation.navigate('signupScreen2')
        // try {
        //     let abcd = await AsyncStorage.getItem('token')
        //     let defg = await AsyncStorage.getItem('stroringID')
        //     console.log(abcd)
        //     console.log(defg)
        // }
        // catch (error) {
        //     console.log(error)
        // }
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
            <Card onPress={() => { console.log('onclick') }} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.cardcontainer}>
                    <Image source={require('../img/up.png')} style={styles.imageStyle} />
                    <Button title="Upload Photo of Store" style={styles.userStyle} onPress={() => { handleChoosePhoto(); }}></Button>
                </View>
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <Image source={require('../img/email.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Email" placeholderTextColor='#808080'
                    value={'' + signup_email} onChangeText={function (text) { updateSignUpEmail }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <Image source={require('../img/email.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Store Name" placeholderTextColor='#808080'
                    value={'' + signup_storeName} onChangeText={function (text) { updateSignUpStoreName }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <Image source={require('../img/lock.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Password" placeholderTextColor='#808080'
                    value={'' + signup_password} onChangeText={function (text) { updateSignUpPassword }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <Image source={require('../img/lock.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Confirm Password" placeholderTextColor='#808080'
                    value={'' + signup_retypePassword} onChangeText={function (text) { updateSignUpRetypePassword }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '5%' }}>
                <MarketListForm></MarketListForm>
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
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} onPress={nextScreen}>NEXT</Text>
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
