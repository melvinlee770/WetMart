import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { Picker } from '@react-native-community/picker';
import { launchImageLibrary } from 'react-native-image-picker'
import Background from '../img/big.jpeg';
import { host } from '../common'


export default function signUp({ navigation }) {

    const markets = []
    const [items, setItems] = useState([]);
    const storecats = []
    const [storecatsItems, setstorecatsItems] = useState([])

    useEffect(() => {  
        console.log('heelo')                                 //fetch the market list when the screen loaded
        fetch(host + "/seller/list/market")
            .then(response => response.json())
            // .then(json => { console.log(json) })
            .then(json => {
                while (markets.length > 0) {
                    markets.pop()
                }
                markets.push({ key: 0, label: 'Please pick one of the market', value: 'Please pick one of the matket' })
                while (items.length > 0) {
                    items.pop()
                }
                for (let i = 0; i < json[0].length; i++) {
                    markets.push({ key: i + 1, label: json[0][i].market_name, value: json[0][i].market_id })
                }
                setItems(items => items = markets)
            })
            .catch((error) => { console.log('Error for listing the market ') })

        fetch(host + '/seller/list/store/category')
            .then(response => response.json())
            .then(json => {
                while (storecats.length > 0) {
                    storecats.pop()
                }
                storecats.push({ key: 0, label: 'Please pick one of the store category', value: 'Please pick one of the store category' })
                while (storecatsItems.length > 0) {
                    storecatsItems.pop()
                }
                for (let i = 0; i < json[0].length; i++) {
                    storecats.push({ key: i + 1, label: json[0][i].category_name, value: json[0][i].store_category_id })
                }
                setstorecatsItems(storecatsItems => storecatsItems = storecats)
            })
            .catch((error) => { console.log('Error for listing store category') })
    }, [])

    const [selectedValue, setSelectedValue] = useState("Please pick one of the market");

    function MarketListForm() {

        return (
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                {items.map(move => {
                    return <Picker.Item label={move.label} value={move.value} key={move.key} />
                })}
            </Picker>
        );
    }

    const [selectedCatValue, setSelectedCatValue] = useState("Please pick one of the store category");

    function StoreCatListForm() {

        return (
            <Picker
                selectedValue={selectedCatValue}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => setSelectedCatValue(itemValue)}>
                {storecatsItems.map(move => {
                    return <Picker.Item label={move.label} value={move.value} key={move.key} />
                })}
            </Picker>
        );
    }


    const handleChoosePhoto = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('Imagepicker Error: ', response.error)
            }
            else {
                // console.log(response.assets[0].base64)
                // console.log(response.assets[0].fileName)
                // console.log(response.assets[0].type)
                // console.log(response.assets[0].uri)
                const fd = new FormData()
                fd.append("file", {
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                    data: response.assets[0].base64,
                    uri:
                        Platform.OS === 'android' ? response.assets[0].uri : response.assets[0].uri.replace("file://", "")
                })
                fetch("http://192.168.1.66:3000/images", {
                    method: "POST",
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'multipart/form-data',
                    },
                    body: fd
                })
                    .then((response) => response.json())
                    .then(json => {
                        console.log(json.imagePath)
                        setimgshowinform(json.imagePath)
                        updatesignup_imglink(json.imagePath)
                        console.log('successs')
                    })
                    .catch((error) => {
                        console.log('Error for upload image')
                        console.log(error)
                    })
            }
        })
    }

    const loginScreen = () => {
        navigation.navigate('loginScreen')
    }

    function NextRegisterButton() {

        const nextScreen = () => {
            let emailrjx = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/gm
            let emailisValid = emailrjx.test(signup_email)
            let password_rjx = /[a-zA-Z0-9]{8,}/gm
            let passwordisValid = password_rjx.test(signup_password)
            if (signup_imglink.length == 0) {
                alert('Please upload an image for your profile')
            }
            else if (signup_email.length == 0) {
                alert('Please input your email address')
            }
            else if (!emailisValid) {
                alert('Please input your email in a correct format')
            }
            else if (signup_storeName.length == 0) {
                alert('Please input your store name')
            }
            else if (signup_password.length == 0) {
                alert('Please input your password')
            }
            else if (!passwordisValid) {
                alert('Please input the password with correct format, at least have 8 character and only contain alphabet nad number')
            }
            else if (signup_retypePassword.length == 0) {
                alert('Please input your password again')
            }
            else if (signup_password !== signup_retypePassword) {
                alert('The password and retype password must be same')
            }
            else if (selectedValue == "Please pick one of the market") {
                alert('Please choose one of the market in the list')
            }
            else if (selectedCatValue == "Please pick one of the store category") {
                alert('Please choose one of the store category in the list')
            }
            else if (signup_imglink.length !== 0 && !!emailisValid && signup_email.length !== 0 && signup_storeName.length !== 0 && signup_password.length !== 0 && signup_retypePassword !== 0 && selectedValue !== "Please pick one of the market" && selectedCatValue !== "Please pick one of the store category") {
                console.log('Success for the part 1 register')
                // console.log(signup_imglink)
                // console.log(signup_email)
                // console.log(signup_storeName)
                // console.log(signup_password)
                // console.log(signup_retypePassword)
                // console.log(selectedValue)
                navigation.navigate('signupScreen2', { store_imgurl: signup_imglink, store_email: signup_email, store_storename: signup_storeName, store_password: signup_password, store_marketselected: selectedValue, store_storecatselected: selectedCatValue })
            }
            // navigation.navigate('signupScreen2')
        }

        return (
            <TouchableOpacity style={{ height: '6%', width: '70%', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', justifyContent: 'center', marginTop: '5%', backgroundColor: '#5A9896' }}
                onPress={nextScreen}>
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }} >NEXT</Text>
            </TouchableOpacity>
        )
    }

    const [signup_imglink, updatesignup_imglink] = useState('')
    const [signup_email, updateSignUpEmail] = useState('')
    const [signup_storeName, updateSignUpStoreName] = useState('')
    const [signup_password, updateSignUpPassword] = useState('')
    const [signup_retypePassword, updateSignUpRetypePassword] = useState('')

    const [imgshowinform, setimgshowinform] = useState('https://www.logolynx.com/images/logolynx/2a/2a71ec307740510ce1e7300904131154.png')

    return (
        <ImageBackground source={Background} style={styles.container}>
            <Card onPress={() => { console.log('onclick') }} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <View style={styles.cardcontainer}>
                    <Image source={{ uri: `${imgshowinform}` }} style={styles.imageStyle} />
                    <Button title="Upload Photo of Store" style={styles.userStyle} onPress={handleChoosePhoto}></Button>
                </View>
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <Image source={require('../img/email.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Email" placeholderTextColor='#808080'
                    value={'' + signup_email} onChangeText={function (text) { updateSignUpEmail(text) }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <Image source={require('../img/email.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Store Name" placeholderTextColor='#808080'
                    value={'' + signup_storeName} onChangeText={function (text) { updateSignUpStoreName(text) }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <Image source={require('../img/lock.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Password" placeholderTextColor='#808080'
                    value={'' + signup_password} onChangeText={function (text) { updateSignUpPassword(text) }} />
            </Card>
            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <Image source={require('../img/lock.png')} style={{ marginLeft: '3%' }} />
                <TextInput placeholder="Confirm Password" placeholderTextColor='#808080'
                    value={'' + signup_retypePassword} onChangeText={function (text) { updateSignUpRetypePassword(text) }} />
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <MarketListForm></MarketListForm>
            </Card>

            <Card style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                <StoreCatListForm></StoreCatListForm>
            </Card>

            <NextRegisterButton></NextRegisterButton>

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
