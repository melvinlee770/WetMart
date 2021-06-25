import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-native-shadow-cards'
import Navbar from '../components/navbar';
import { call } from 'react-native-reanimated';

export default function orders() {

    const [callsellerid, setcallsellerid] = useState('')
    const [buttonColorLeft, setbuttonColorLeft] = useState('#5A9896')
    const [buttonColorRight, setbuttonColorRight] = useState('white')


    const [noOfOrders, setnoOfOrders] = useState([])
    const [noCompleteOrders, setnoCompleteOrders] = useState([])

    useEffect(() => {
        drawer()
    }, [buttonColorLeft, buttonColorRight])

    const drawer = async () => {
        try {
            let defg = await AsyncStorage.getItem('stroringID')
            setcallsellerid(defg)
            const showSellerLeftOrder_URL = 'http://192.168.1.66:3000/seller/show/order/pending?seller_id=' + Number(defg)
            const showSellerRightOrder_URL = 'http://192.168.1.66:3000/seller/show/order/completed?seller_id=' + Number(defg)

            if (buttonColorLeft == '#5A9896' && buttonColorRight == 'white') {
                fetch(showSellerLeftOrder_URL)
                    .then((response) => response.json())
                    .then((json) => {
                        while (noOfOrders.length > 0) {
                            noOfOrders.pop()
                        }
                        setnoOfOrders(json)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else if (buttonColorLeft == 'white' && buttonColorRight == '#5A9896') {
                fetch(showSellerRightOrder_URL)
                    .then((response) => response.json())
                    .then((json) => {
                        while (noCompleteOrders.length > 0) {
                            noCompleteOrders.pop()
                        }
                        setnoCompleteOrders(json)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    const changeLeftButtonColor = () => {
        if (buttonColorLeft == 'white' && buttonColorRight == '#5A9896') {
            setbuttonColorLeft('#5A9896')
            setbuttonColorRight('white')
        }
        ShowTheOrderList()
    }
    const changeRightButtonColor = () => {
        if (buttonColorRight == 'white' && buttonColorLeft == '#5A9896') {
            setbuttonColorRight('#5A9896')
            setbuttonColorLeft('white')
        }
        ShowTheOrderList()
    }

    function ShowTheOrderList() {       //show the order list on pending status
        if (buttonColorLeft == '#5A9896' && buttonColorRight == 'white') {
            return (
                <FlatList
                    keyExtractor={(item => item.order_id)}
                    data={noOfOrders}
                    renderItem={({ item }) =>
                        <Card style={[styles.EachSales]}>

                            <Text style={{ fontSize: 25, marginLeft: '3%', fontFamily: 'Montserrat-Bold' }}>Order ID: {item.order_id}</Text>

                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faPlayCircle} size={32} style={{ color: '#5A9896', marginLeft: '60%' }} />
                            </TouchableOpacity>
                        </Card>}
                />
            )
        }
        else if (buttonColorLeft == 'white' && buttonColorRight == '#5A9896') {
            return (
                <FlatList
                    keyExtractor={(item => item.order_id)}
                    data={noCompleteOrders}
                    renderItem={({ item }) =>
                        <Card style={[styles.EachSales]}>

                            <Text style={{ fontSize: 25, marginLeft: '3%', fontFamily: 'Montserrat-Bold' }}>Order ID: {item.order_id}</Text>

                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faPlayCircle} size={32} style={{ color: '#5A9896', marginLeft: '60%' }} />
                            </TouchableOpacity>
                        </Card>}
                />
            )
        }
    }
    /////

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginTop: '15%', marginLeft: 'auto', marginRight: 'auto' }}>
                <TouchableOpacity onPress={changeLeftButtonColor} style={[styles.orderButton, { backgroundColor: buttonColorLeft, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 5 }]}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, textAlign: 'center' }}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={changeRightButtonColor} style={[styles.orderButton, { backgroundColor: buttonColorRight, borderTopRightRadius: 20, borderBottomRightRadius: 20, elevation: 5 }]}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, textAlign: 'center' }}>Past</Text>
                </TouchableOpacity>
            </View>
            <ShowTheOrderList></ShowTheOrderList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    orderButton: {
        width: '35%',
    },
    EachSales: {
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
    },
})