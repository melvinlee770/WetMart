import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, SafeAreaView, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-native-shadow-cards'
import Navbar from '../components/navbar';
import { host } from '../common'

export default function profile({ navigation }) {

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
    const [sellerStoreDescription, setsellerStoreDescription] = useState('')

    const drawer = async () => {
        try {
            let defg = await AsyncStorage.getItem('stroringID')
            setcallsellerid(defg)
            const showSellerProfileURL = host + '/seller/show/profile?seller_id=' + Number(defg)

            fetch(showSellerProfileURL)
                .then((response) => response.json())
                .then((json) => {
                    setsellerProfileRatingInfo(sellerProfileRatingInfo => sellerProfileRatingInfo = json[0].rating)

                    setsellerProfilePic(sellerProfilePic => sellerProfilePic = json[0].store_image_id)

                    setsellerProfileEmail(sellerProfileEmail => sellerProfileEmail = json[0].email)

                    setsellerProfileStoreName(sellerProfileStoreName => sellerProfileStoreName = json[0].store_name)

                    setsellerProfileFirstName(sellerProfileFirstName => sellerProfileFirstName = json[0].first_name)

                    setsellerProfileLastName(sellerProfileLastName => sellerProfileLastName = json[0].last_name)

                    setsellerProfileMobile(sellerProfileMobile => sellerProfileMobile = json[0].mobile_number)

                    setsellerProfileAddress(sellerProfileAddress => sellerProfileAddress = json[0].address)

                    setsellerProfileUnitNumber(sellerProfileUnitNumber => sellerProfileUnitNumber = json[0].unit_number)

                    setsellerStoreDescription(sellerStoreDescription => sellerStoreDescription = json[0].store_description)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            drawer()
            return () => {
                null
            }
        }, []))

    const buttonToChangePassword = () => {
        navigation.navigate('changepasswordScreen', { pass_id: callsellerid })
    }

    const buttonToEditProfile = () => {
        navigation.navigate('editprofileScreen', {
            pass_id: callsellerid, pass_rating: sellerProfileRatingInfo, pass_imgURL: sellerProfilePic, pass_email: sellerProfileEmail,
            pass_storeName: sellerProfileStoreName, pass_firstName: sellerProfileFirstName, pass_lastName: sellerProfileLastName, pass_mobile: sellerProfileMobile,
            pass_address: sellerProfileAddress, pass_unitNumber: sellerProfileUnitNumber, pass_description: sellerStoreDescription
        })
    }

    const buttonToLogOut = () => {
        navigation.navigate('loginScreen')
    }

    const buttonToChangePic = () => {
        navigation.navigate('editprofilepicScreen', {pass_id_pic: callsellerid, pass_imgURL_edit: sellerProfilePic})
    }

    return (
        // <SafeAreaView >
        // <View style={{ marginTop: '10%', alignItems: 'center'}}>
        <View style={{ height: '100%' }}>
            <ScrollView style={{ marginTop: '10%' }}>
                <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 20, }}>
                        Seller Rating : {sellerProfileRatingInfo}
                    </Text>
                </View>

                {/* <Card style={{ height: '20%', width: '80%', borderRadius: 23, }}> */}
                <View>
                    <Image source={{ uri: `${sellerProfilePic}` }} style={{ width: '80%', height: 150, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
                </View>


                <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
                    <TouchableOpacity onPress ={buttonToChangePic}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, textDecorationLine: 'underline' }}>
                            Change Profile Picture
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faEnvelope} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileEmail}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileStoreName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faUser} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileFirstName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faUser} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileLastName}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faPhone} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileMobile}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faMapMarker} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileAddress}
                    </Text>
                </View>
                {/* </Card> */}

                {/* <Card style={{ marginTop: '3%', borderRadius: 10, width: '85%', padding: '2%', flexDirection: 'row' }}> */}
                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faMapMarker} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerProfileUnitNumber}
                    </Text>
                </View>
                {/* </Card> */}

                <View style={styles.eachProfileInfo}>
                    <FontAwesomeIcon icon={faMapMarker} size={25} style={{ color: '#5A9896' }} />
                    <Text style={styles.eachProfileInfoText}>
                        {sellerStoreDescription}
                    </Text>
                </View>

                <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
                    <TouchableOpacity onPress={buttonToChangePassword}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, textDecorationLine: 'underline', color: 'black'  }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <TouchableOpacity onPress={buttonToEditProfile}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17, textDecorationLine: 'underline', color: 'black' }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <Card style={{ marginTop: '10%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896' }}> */}
                <View style={{ marginBottom: '5%', marginTop: '5%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                    <TouchableOpacity onPress={buttonToLogOut}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* </Card> */}
            </ScrollView>
            <Navbar style={{ marginBottom: '40%' }}></Navbar>
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