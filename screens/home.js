import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { onChange, set } from 'react-native-reanimated';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { Card } from 'react-native-shadow-cards'
import Background from '../img/big.jpeg'
import { WellArchitected } from 'aws-sdk';

export default function home({ route, navigation }) {

    const seller_home_email = route.params.email       //pass the data from the login page  // const { email } = route.params
    const seller_home_id = route.params.id                                                  // const { id } = route.params

    const showSellerName_URL = 'http://192.168.1.66:3000/seller/home/show/name?seller_email=' + seller_home_email
    const showSellerSales_URL = 'http://192.168.1.66:3000/seller/home/show/amount?seller_id=' + seller_home_id
    const showSellerOrder_URL = 'http://192.168.1.66:3000/seller/home/show/order?seller_id=' + seller_home_id

    const [nameOfSeller, setnameOfSeller] = useState('')
    const [nameOfStore, setnameOfStore] = useState('')
    const [noOfSales, setnoOfSales] = useState('')
    const [noOfOrders, setnoOfOrders] = useState([])
    const [noOfSalesBox, setnoOfSalesBox] = useState(false)


    useEffect(() => {
        fetch(showSellerName_URL)
            .then((response) => response.json())
            .then(json => {
                setnameOfSeller(nameOfSeller => nameOfSeller = '')
                setnameOfStore(nameOfStore => nameOfStore = '')
                setnameOfSeller(nameOfSeller => nameOfSeller + 'Welcome, ' + json[0].first_name)
                setnameOfStore(nameOfStore => nameOfStore + json[0].store_name)
            })
            .catch((error) => {
                console.log(error)
            })

        fetch(showSellerSales_URL)
            .then((response) => response.json())
            .then(json => {
                setnoOfSales(noOfSales => noOfSales = 0)
                setnoOfSales(noOfSales => noOfSales + json[0].amount)
                setnoOfSalesBox(noOfSalesBox => noOfSalesBox = true)
            })
            .catch((error) => {
                console.log(error)
            })

        fetch(showSellerOrder_URL)
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
    }, [])

    // function OrderDetails(a) {
    //     const showSellerOrderDetails_URL = 'http://192.168.1.66:3000/seller/home/show/order/details?seller_id=' + seller_home_id + '&order_id=' + a

    //     fetch(showSellerOrderDetails_URL)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json)
    //             console.log('success')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    function Orderlist() {
        // const showSellerOrderDetails_URL = 'http://192.168.1.66:3000/seller/home/show/order/details?seller_id=' + seller_home_id + '&order_id=' + {}
        return (
            <FlatList
                keyExtractor={(item => item.order_id)}
                data={noOfOrders}
                renderItem={({ item }) =>
                    <Card style={styles.EachSales}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 25, marginLeft: '3%', fontFamily: 'Montserrat-Bold' }}>Order ID: {item.order_id}</Text>
                        </TouchableOpacity>
                    </Card>}
            />
        )
    }

    return (
        <SafeAreaView style={{ height: '100%' }}>

            <Card style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '7%', elevation: 0, backgroundColor: 'transparent' }}>
                <Text style={{ fontSize: 28, fontFamily: 'Montserrat-Bold' }}>{nameOfSeller}</Text>
                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Regular' }}>{nameOfStore}</Text>
            </Card>

            {noOfSalesBox ? (
                <Card style={styles.SalesAmount}>
                    <Text style={[styles.SalesAmountText, { fontSize: 15, textAlign: 'center' }]}>Total Wallet Amount (this month)</Text>
                    <Text style={[styles.SalesAmountText, { fontSize: 45, marginLeft: '5%' }]}> <FontAwesomeIcon icon={faWallet} size={32} style={styles.SalesAmount_icon} /> $ {noOfSales}</Text>
                </Card>
            ) : null}

            <Orderlist></Orderlist>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SalesAmount: {
        height: '15%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
        backgroundColor: '#5A9896',
        justifyContent: 'center',
    },
    SalesAmount_icon: {
        color: 'white',
    },
    SalesAmountText: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
    EachSales: {
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        height: 80,
        justifyContent: 'center',
    },
})

// style={{ fontSize: 25, textAlign: 'center', fontFamily: 'Montserrat-Regular', }}