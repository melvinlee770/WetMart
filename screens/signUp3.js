import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-community/picker';
import Background from '../img/big.jpeg'
import { PI } from 'aws-sdk';

export default function signUp({ navigation, route }) {

    // const [thirdpassImgUrl, setthirdpassImgUrl] = useState(route.params.secondpage_imgurl)
    // const [thirdpassEmail, setthirdpassEmail] = useState(route.params.secondpage_email)
    // const [thirdpassStoreName, setthirdpassStoreName] = useState(route.params.secondpage_storename)
    // const [thirdpassPassword, setthirdpassPassword] = useState(route.params.secondpage_password)
    // const [thirdpassSelectedMarket, setthirdpassSelectedMarket] = useState(route.params.secondpage_selectedmarket)
    // const [thirdpassSelectedStoreCat, setthirdpassSelectedStoreCat] = useState(route.params.secondpage_selectedstorecat)
    // const [thirdpassFirstName, setthirdpassFirstName] = useState(route.params.secondpage_firstname)
    // const [thirdpassLastName, setthirdpassLastName] = useState(route.params.secondpage_lastname)
    // const [thirdpassGender, setthirdpassGender] = useState(route.params.secondpage_gender)
    // const [thirdpassDOB, setthirdpassDOB] = useState(route.params.secondpage_dob)
    // const [thirdpassAddress, setthirdpassAddress] = useState(route.params.secondpage_address)
    // const [thirdpassUnitNumber, setthirdpassUnitNumber] = useState(route.params.secondpage_houselevel + "-" + route.params.secondpage_houseunit)
    // const [thirdpassMobile, setthirdpassMobile] = useState(route.params.secondpage_mobile)

    const [signup_bankaccountnum, updatesignup_bankaccountnum] = useState('')


    const nextScreen = () => {
        // if (selectedBankValue == 'Please pick one of the bank in the list') {
        //     alert('Please pick one of the bank in the list')
        // }
        // else if (signup_bankaccountnum.length == 0) {
        //     alert('Please input your bank account number')
        // }
        // else if (selectedBankValue !== 'Please pick one of the bank in the list' && signup_bankaccountnum.length !== 0)
        //     navigation.navigate('signupScreen4', {
        //         thirdpageImgUrl: thirdpassImgUrl, thirdpageEmail: thirdpassEmail, thirdpageStoreName: thirdpassStoreName, thirdpagePassword: thirdpassPassword, thirdpageSelectedMarket: thirdpassSelectedMarket, thirdpageSelectedStoreCat: thirdpassSelectedStoreCat,
        //         thirdpageFirstName: thirdpassFirstName, thirdpageLastName: thirdpassLastName, thirdpageGender: thirdpassGender, thirdpageDOB: thirdpassDOB, thirdpageAddress: thirdpassAddress, thirdpageUnitNumber: thirdpassUnitNumber, thirdpageMobile: thirdpassMobile,
        //         thirdpage_bank: selectedBankValue, thirdpage_bankaccountnum: signup_bankaccountnum
        //     })
        navigation.navigate('signupScreen4')
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    const [selectedBankValue, setSelectedBankValue] = useState("Please pick one of the bank in the list");

    return (
        <ImageBackground source={Background} style={styles.container}>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faPiggyBank} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <Picker
                    selectedValue={selectedBankValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedBankValue(itemValue)}
                >
                    <Picker.Item label="Please pick one of the bank in the list" value="Please pick one of the bank in the list" />
                    <Picker.Item label="DBS" value="DBS" />
                    <Picker.Item label="UOB" value="UOB" />
                    <Picker.Item label="OCBC" value="OCBC" />
                    <Picker.Item label="HSBC" value="HSBC" />
                </Picker>
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faLock} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Bank Account Number" placeholderTextColor='#808080' keyboardType='numeric'
                    value={'' + signup_bankaccountnum} onChangeText={function (text) { updatesignup_bankaccountnum(text) }} />
            </Card>

            <TouchableOpacity
                onPress={nextScreen}
                style={{
                    height: '6%',
                    width: '70%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10%',
                    backgroundColor: '#5A9896'
                }}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }}>Next</Text>
            </TouchableOpacity>
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
