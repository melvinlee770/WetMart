import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-community/picker';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faHome, faMobile, faUser } from '@fortawesome/free-solid-svg-icons';
import { event } from 'react-native-reanimated';
import { fdatasync } from 'fs';
import { fontWeight } from 'styled-system';

export default function signUp({ route, navigation }) {

    const [passtoImgUrl, setpasstoImgUrl] = useState(route.params.store_imgurl)
    const [passtoEmail, setpasstoEmail] = useState(route.params.store_email)
    const [passtoStoreName, setpasstoStoreName] = useState(route.params.store_storename)
    const [passtoPassword, setpasstoPassword] = useState(route.params.store_password)
    const [passtoSelectedMarket, setpasstoSelectedMarket] = useState(route.params.store_marketselected)
    const [passtoSelectedCat, setpasstoSelectedCat] = useState(route.params.store_storecatselected)

    const nextScreen = () => {
        let fistnamerjx = /^[a-zA-z]+$/
        let lastnamerjx = /^[a-zA-z]+$/
        let mobile_rjx = /^[0-9]{8}$/gm
        let firstnameisValid = fistnamerjx.test(signup_firstname)
        let lastnameisValid = lastnamerjx.test(signup_lastname)
        let mobileisValid = mobile_rjx.test(signup_mobilenumber)

        if (signup_firstname.length == 0) {
            alert('Please input your first name')
        }
        else if (!firstnameisValid) {
            alert('First name only input by using alphabet')
        }
        else if (signup_lastname.length == 0) {
            alert('Please input your last name')
        }
        else if (!lastnameisValid) {
            alert('Last name only input by using alphabet')
        }
        else if (selectedGenderValue == "Please pick one of the gender in the list") {
            alert('Please pick one of the gender in the list')
        }
        else if (signup_dob.length == 0) {
            alert('Please choose your date of birth')
        }
        else if (signup_address.length == 0) {
            alert('Please input your address')
        }
        else if (signup_levelnumber.length == 0) {
            alert('Please input your house level number')
        }
        else if (signup_houseunit.length == 0) {
            alert('Please input your house unit number')
        }
        else if (signup_mobilenumber.length == 0) {
            alert('Please input your mobile number')
        }
        else if (!mobileisValid) {
            alert('Please input the correct mobile number')
        }
        else if (signup_firstname.length !== 0 && !!firstnameisValid && signup_lastname.length !== 0 && !!lastnameisValid && selectedGenderValue !== "Please pick one of the gender in the list" && signup_dob.length !== 0 && signup_address.length !== 0 && signup_levelnumber !== 0 && signup_houseunit !== 0) {
            navigation.navigate('signupScreen3', {
                secondpage_imgurl: passtoImgUrl, secondpage_email: passtoEmail, secondpage_storename: passtoStoreName, secondpage_password: passtoPassword, secondpage_selectedmarket: passtoSelectedMarket, secondpage_selectedstorecat: passtoSelectedCat,
                secondpage_firstname: signup_firstname, secondpage_lastname: signup_lastname, secondpage_gender: selectedGenderValue, secondpage_dob: signup_dob, secondpage_address: signup_address, secondpage_houselevel: signup_levelnumber, secondpage_houseunit: signup_houseunit, secondpage_mobile: signup_mobilenumber
            })
        }
        // navigation.navigate('signupScreen3')
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    const [signup_firstname, updatesignup_firstname] = useState('')
    const [signup_lastname, updatesignup_lastname] = useState('')
    const [signup_dob, updatesignup_dob] = useState('')
    const [signup_address, updatesignup_address] = useState('')
    const [signup_levelnumber, updatesignup_levelnumber] = useState('')
    const [signup_houseunit, updatesignup_houseunit] = useState('')
    const [signup_mobilenumber, updatesignup_mobilenumber] = useState('')



    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('(Press the icon)')
    const [textcolor, setTextColor] = useState('#808080')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate()
        setText(fDate)
        setTextColor('black')
        updatesignup_dob(fDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [selectedGenderValue, setSelectedGenderValue] = useState("Please pick one of the gender in the list");

    return (
        <ImageBackground source={Background} style={styles.container}>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faUser} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="First Name" placeholderTextColor='#808080'
                    value={'' + signup_firstname} onChangeText={function (text) { updatesignup_firstname(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faUser} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Last Name" placeholderTextColor='#808080'
                    value={'' + signup_lastname} onChangeText={function (text) { updatesignup_lastname(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faUser} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <Picker
                    selectedValue={selectedGenderValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedGenderValue(itemValue)}
                >
                    <Picker.Item label="Please pick one of the gender in the list" value="Please pick one of the gender in the list" />
                    <Picker.Item label="Male" value="m" />
                    <Picker.Item label="Female" value="f" />
                </Picker>
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faCalendarAlt} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} onPress={showDatepicker} />
                <TextInput placeholder={text} placeholderTextColor={textcolor} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faHome} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Address" placeholderTextColor='#808080'
                    value={'' + signup_address} onChangeText={function (text) { updatesignup_address(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faHome} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Unit Level" placeholderTextColor='#808080' keyboardType='numeric'
                    value={'' + signup_levelnumber} onChangeText={function (text) { updatesignup_levelnumber(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faHome} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Unit Number" placeholderTextColor='#808080' keyboardType='numeric'
                    value={'' + signup_houseunit} onChangeText={function (text) { updatesignup_houseunit(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <FontAwesomeIcon icon={faMobile} size={22} style={{ color: '#5A9896', marginLeft: '2%' }} />
                <TextInput placeholder="Mobile Number" placeholderTextColor='#808080' keyboardType='numeric'
                    value={'' + signup_mobilenumber} onChangeText={function (text) { updatesignup_mobilenumber(text) }} />
            </Card>

            <TouchableOpacity onPress={nextScreen} style={{
                height: '6%',
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%',
                backgroundColor: '#5A9896'
            }}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} >NEXT</Text>
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
