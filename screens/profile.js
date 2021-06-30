import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, SafeAreaView, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-native-shadow-cards'
import Navbar from '../components/navbar';

export default function profile() {

    const [callsellerid, setcallsellerid] = useState('')
    const [sellerProfileRatingInfo, setsellerProfileRatingInfo] = useState('')
    const [sellerProfilePic, setsellerProfilePic] = useState('../img/up.png')
    const [sellerProfileEmail, setsellerProfileEmail] = useState('')
    const [sellerProfileStoreName, setsellerProfileStoreName] = useState('')
    const [sellerProfileFirstName, setsellerProfileFirstName] = useState('')
    const [sellerProfileLastName, setsellerProfileLastName] = useState('')
    const [sellerProfileMobile, setsellerProfileMobile] = useState('')
    const [sellerProfileAddress, setsellerProfileAddress] = useState('')

    useEffect(() => {
        drawer()
    }, [])

    const drawer = async () => {
        try {
            let defg = await AsyncStorage.getItem('stroringID')
            setcallsellerid(defg)
            const showSellerProfileURL = 'http://192.168.1.66:3000/seller/show/profile?seller_id=' + Number(defg)

            fetch(showSellerProfileURL)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setsellerProfileRatingInfo(sellerProfileRatingInfo => sellerProfileRatingInfo = "Seller Rating -" + json[0].rating)

                    setsellerProfilePic(sellerProfilePic => sellerProfilePic = json[0].store_image_id)

                    setsellerProfileEmail(sellerProfileEmail => sellerProfileEmail = json[0].email)

                    setsellerProfileStoreName(sellerProfileStoreName => sellerProfileStoreName = json[0].store_name)

                    setsellerProfileFirstName(sellerProfileFirstName => sellerProfileFirstName = json[0].first_name)

                    setsellerProfileLastName(sellerProfileLastName => sellerProfileLastName = json[0].last_name)

                    setsellerProfileMobile(sellerProfileMobile => sellerProfileMobile = json[0].mobile_number)

                    setsellerProfileAddress(sellerProfileAddress => sellerProfileAddress = json[0].address)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: '10%', alignItems: 'center', height: '100%' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 25, }}>
                    {sellerProfileRatingInfo}
                </Text>

                <Card style={{ height: '20%', width: '80%', borderRadius: 23, }}>
                    <Image source={{ uri: `${sellerProfilePic}` }} style={{ width: '100%', height: '100%', marginLeft: 'auto', marginRight: 'auto' }} />
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faEnvelope} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileEmail}
                    </Text>
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faStore} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileStoreName}
                    </Text>
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faUser} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileFirstName}
                    </Text>
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faUser} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileLastName}
                    </Text>
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faPhone} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileMobile}
                    </Text>
                </Card>

                <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}>
                    <FontAwesomeIcon icon={faMapMarker} size={32} style={{ color: '#5A9896' }} />
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Montserrat-Regular', fontSize: 25 }}>
                        {sellerProfileAddress}
                    </Text>
                </Card>

                <Card style={{ marginTop: '10%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896' }}>
                    <TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'white' }}>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>

        </SafeAreaView>
    )
}