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
    const [sellerProfileUnitNumber, setsellerProfileUnitNumber] = useState('')

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

                    setsellerProfileUnitNumber(sellerProfileUnitNumber => sellerProfileUnitNumber = json[0].unit_number)
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
        // <SafeAreaView >
        // <View style={{ marginTop: '10%', alignItems: 'center'}}>
        <View style={{ height: '100%' }}>
            <ScrollView style={{ marginTop: '10%' }}>
                <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 20, }}>
                        {sellerProfileRatingInfo}
                    </Text>
                </View>

                {/* <Card style={{ height: '20%', width: '80%', borderRadius: 23, }}> */}
                <View>
                    <Image source={{ uri: `${sellerProfilePic}` }} style={{ width: '80%', height: 150, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, elevation: 3 }}>
                    <FontAwesomeIcon icon={faEnvelope} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileEmail}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, elevation: 3 }}>
                    <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileStoreName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={ styles.eachProfileInfo }>
                    <FontAwesomeIcon icon={faUser} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileFirstName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={ styles.eachProfileInfo }>
                    <FontAwesomeIcon icon={faUser} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileLastName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={ styles.eachProfileInfo }>
                    <FontAwesomeIcon icon={faPhone} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileMobile}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={ styles.eachProfileInfo }>
                    <FontAwesomeIcon icon={faMapMarker} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileAddress}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={ styles.eachProfileInfo }>
                    <FontAwesomeIcon icon={faMapMarker} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileUnitNumber}
                    </Text>
                </View>
                {/* </Card> */}

                <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, textDecorationLine: 'underline' }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, textDecorationLine: 'underline' }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <Card style={{ marginTop: '10%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896' }}> */}
                <View style={{marginBottom: '5%', marginTop: '5%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                    <TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* </Card> */}
            </ScrollView>
            <Navbar style={{marginBottom: '40%'}}></Navbar>
        </View>

        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eachProfileInfo: {
        marginTop: '3%', 
        borderRadius: 10, 
        width: '85%', 
        padding: '2%', 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        borderRadius: 10, 
        elevation: 3 
    },
    eachProfileInfoText: {
        marginLeft: 'auto', 
        marginRight: 'auto', 
        fontFamily: 'Montserrat-Regular', 
        fontSize: 23 
    }
})