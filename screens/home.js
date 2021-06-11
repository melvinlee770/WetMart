import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default function home({ route, navigation }) {

    const showSellerSales_URL = 'http://192.168.1.66:3000/seller/home/show/amount' + '?seller_id=' +


        useEffect(insertMarketList)

    const { email } = route.params       //pass the data from the login page
    const homeScreenUseEmail = route.params.email

    return (
        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>Hello Home Page</Text>
            <Text style={{ textAlign: 'center' }}>{email}</Text>
        </View>
    )
}