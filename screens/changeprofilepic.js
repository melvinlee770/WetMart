import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import { host } from '../common'

export default function changeprofilepic({ route, navigation }) {

    const [passparamsImgURL, setpassparamsImgURL] = useState(route.params.pass_imgURL_edit)
    const [passselleridpic, setpassselleridpic] = useState(route.params.pass_id_pic)

    const changePic = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };

        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('user cancel the image picker')
            }
            else if (response.error) {
                console.log('Imagepicker Error: ', response.error)
            }
            else {
                // console.log(response.assets[0].base64)
                // console.log(response.assets[0].fileName)
                // console.log(response.assets[0].type)
                // console.log(response.assets[0].uri)
                var replaceHTTP_1 = passparamsImgURL.replace(/(^\w+:|^)\/\//, '');
                var replaceHTTP_2 = replaceHTTP_1.split("/").pop();
                fetch(host + '/images?key=' + replaceHTTP_2, {
                    method: 'DELETE'
                })
                // setpassparamsImgURL(passparamsImgURL => passparamsImgURL = response.assets[0].uri)
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
                        setpassparamsImgURL(passparamsImgURL => passparamsImgURL = json.imagePath)
                        fetch(host + '/update/seller/image/new?seller_id=' + passselleridpic, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                store_image_id: json.imagePath
                            })
                        })
                            .then((response) => response.json())
                            .then((json) => {
                                console.log('change profile pic on database')
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        console.log('successs')
                    })
                    .catch((error) => {
                        console.log('Error for upload image')
                        console.log(error)
                    })
            }
        })
    }


    // fetch(host + '/update/seller/image?seller_id=' + passparamsSellerID,
    //     {
    //         method: 'PUT'
    //     })
    //     .then((response) => {
    //         if (response.status == 200) {
    //             const options = {
    //                 storageOptions: {
    //                     skipBackup: true,
    //                     path: 'images',
    //                 },
    //                 includeBase64: true
    //             };
    //             launchImageLibrary(options, (response) => {
    //                 if (response.didCancel) {
    //                     setpassparamsImgURL(passparamsImgURL => passparamsImgURL = 'https://www.logolynx.com/images/logolynx/2a/2a71ec307740510ce1e7300904131154.png')
    //                 }
    //                 else if (response.error) {
    //                     console.log('Imagepicker Error: ', response.error)
    //                 }
    //                 else {
    //                     // console.log(response.assets[0].base64)
    //                     // console.log(response.assets[0].fileName)
    //                     // console.log(response.assets[0].type)
    //                     // console.log(response.assets[0].uri)


    return (
        <View style={{ height: '100%' }}>
            <ScrollView style={{ marginTop: '20%' }}>
                <View>
                    <Image source={{ uri: `${passparamsImgURL}` }} style={{ width: '80%', height: 150, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
                </View>

                <View style={{ marginBottom: '5%', marginTop: '5%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                    <TouchableOpacity onPress={changePic}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                            Change New Profile image
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

