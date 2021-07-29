import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import { host } from '../common'

export default function changeprofilepic({ route, navigation }) {

    const [passparamsImgURL, setpassparamsImgURL] = useState(route.params.pass_imgURL_edit)

    return (
        <View style={{ height: '100%' }}>
            <ScrollView style={{ marginTop: '20%' }}>
                <View>
                    <Image source={{ uri: `${passparamsImgURL}` }} style={{ width: '80%', height: 150, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
                </View>

                <View style={{ marginBottom: '5%', marginTop: '5%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                    <TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                            Change New Profile image
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

// const options = {
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
//     includeBase64: true
// };

// launchImageLibrary(options, (response) => {

//     if (response.didCancel) {
//         // setpassparamsImgURL(passparamsImgURL => passparamsImgURL = 'https://www.logolynx.com/images/logolynx/2a/2a71ec307740510ce1e7300904131154.png')
//         console.log('user cancel the image picker')
//     }
//     else if (response.error) {
//         console.log('Imagepicker Error: ', response.error)
//     }
//     else {
//         // console.log(response.assets[0].base64)
//         // console.log(response.assets[0].fileName)
//         // console.log(response.assets[0].type)
//         // console.log(response.assets[0].uri)
//         setpassparamsImgURL(passparamsImgURL => passparamsImgURL = response.assets[0].uri)
//     }
// })