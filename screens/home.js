import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlayCircle, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons'
// import { onChange, set } from 'react-native-reanimated';
// import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { Card } from 'react-native-shadow-cards'
import Navbar from '../components/navbar';
// import Background from '../img/big.jpeg'
// import { parse } from '@babel/core';
// import { PresignedPost } from 'aws-sdk/clients/s3';
// import Animated, { color } from 'react-native-reanimated';
// import { WellArchitected } from 'aws-sdk';

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
    const [first_detailsItem, setfirst_detailsItem] = useState([])
    const [second_detailsItem, setsecond_detailsItem] = useState([])
    const [spe_order_id, setspe_order_id] = useState('')
    const posts = first_detailsItem
    const secondposts = second_detailsItem


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

        fetch(showSellerOrder_URL)              //non repeat
            .then((response) => response.json())
            .then((json) => {
                while (noOfOrders.length > 0) {
                    noOfOrders.pop()
                }
                setnoOfOrders(json)
            })
            .then()
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const ModalPoup = ({ visible, children }) => {
        const [showModal, setShowModal] = useState(visible)
        return (
            <Modal transparent visible={showModal}>
                <View style={styles.modalBackGround}>
                    <View style={styles.modalContainer}>
                        {children}
                    </View>
                </View>
            </Modal>
        )
    }

    const [visible, setVisible] = useState(false)

    function OrderDetails(order_id) {
        const tmpJsonarr = []
        var tmpTotalArr = 0
        const tmpPriceArr = []
        var totalPrice = 0
        setspe_order_id(order_id)

        const allproductAquantityarr = []    //array for the useState
        const allinfoarr = []       //array for the useState
        const showSellerOrderDetails_URL = 'http://192.168.1.66:3000/seller/home/show/order/details?seller_id=' + seller_home_id + '&order_id=' + order_id
        fetch(showSellerOrderDetails_URL)
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    tmpJsonarr.push({
                        id: i + 1,
                        product_name: json[i].weight + "g of " + json[i].product_name,
                        each_product_quantity: json[i].product_quantity,
                        product_pic: json[i].product_image_id,
                        product_id: json[i].product_id,
                        product_price: json[i].product_price
                    })

                    tmpTotalArr += json[i].product_quantity

                    var p_price = json[i].product_price
                    var convert_price = Number(p_price.replace(/[^0-9.-]+/g, ""))
                    tmpPriceArr.push(convert_price)

                    totalPrice += json[i].product_quantity * (tmpPriceArr[i])

                }
                while (allproductAquantityarr.length > 0) {
                    allproductAquantityarr.pop()
                }
                while (allinfoarr.length > 0) {
                    allinfoarr.pop()
                }
                for (let i = 0; i < tmpJsonarr.length; i++) {               //push the product name and product's quantity to the array prepare
                    allproductAquantityarr.push(tmpJsonarr[i])
                }
                allinfoarr.push({                                           //push the total price of all the product to the array prepare
                    id: 1,      // for the use of map(must have one id)
                    total_quantity: tmpTotalArr,
                    total_price: "$ " + totalPrice.toFixed(2)
                })
                setfirst_detailsItem(allproductAquantityarr)    //product name and each product quantity
                setsecond_detailsItem(allinfoarr)       //total quantity and total price
                setVisible(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function Orderlist() {
        return (
            <FlatList
                keyExtractor={(item => item.order_id)}
                data={noOfOrders}
                renderItem={({ item }) =>
                    <Card style={[styles.EachSales]}>

                        <Text style={{ fontSize: 25, marginLeft: '3%', fontFamily: 'Montserrat-Bold' }}>Order ID: {item.order_id}</Text>

                        <TouchableOpacity onPress={() => OrderDetails(item.order_id)}>
                            <FontAwesomeIcon icon={faPlayCircle} size={32} style={{ color: '#5A9896', marginLeft: '60%' }} />
                        </TouchableOpacity>
                    </Card>}
            />
        )
    }

    function ShowFirstModalContent(props) {

        const content = props.posts.map((post) =>
            <Card key={post.id} style={{ marginTop: '5%', flexDirection: 'row', width: '100%' }}>
                <Image source={{ uri: `${post.product_pic}` }} style={{ width: 100, height: 100 }} />
                <View>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>- {post.product_name}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 18 }}>Order quantity: {post.each_product_quantity}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 18 }}>Product id - {post.product_id}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>{post.product_price}</Text>
                </View>
            </Card>
        )
        return (
            <View>{content}</View>
        )
    }
    function ShowSecondModalContent(props) {

        const secondcontent = props.secondposts.map((secondpost) =>
            <View key={secondpost.id}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, marginTop: '5%' }}>Total Quantity: </Text>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>{secondpost.total_quantity}</Text>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, marginTop: '5%' }}>Total Price: </Text>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>{secondpost.total_price}</Text>
            </View>
        )
        return (
            <View>{secondcontent}</View>
        )
    }

    const buttonToUpdateOrder = () => {
        const updateOrderURL = 'http://192.168.1.66:3000/seller/home/update/order?order_id=' + spe_order_id
        fetch(updateOrderURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_status: "completed" }),
        })
            .then(response => response.json())
            .then((json) => {
                console.log('update success')
                console.log(json.command)
                fetch(showSellerOrder_URL)              //non repeat
                    .then((response) => response.json())
                    .then((json) => {
                        while (noOfOrders.length > 0) {
                            noOfOrders.pop()
                        }
                        setnoOfOrders(json)
                        setVisible(false)
                    })
                    .then()
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error + "Fail")
            })
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
            <ModalPoup visible={visible}>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <FontAwesomeIcon icon={faWindowClose} size={32} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 30, textDecorationLine: 'underline' }}>Order Details</Text>
                    <ShowFirstModalContent posts={posts}></ShowFirstModalContent>
                    <ShowSecondModalContent secondposts={secondposts}></ShowSecondModalContent>
                    <Card style={{ height: '10%', width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5A9896' }}>
                        <TouchableOpacity onPress={buttonToUpdateOrder}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }}>PACKED</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </ModalPoup>
        
        <Navbar></Navbar>
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
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        height: '85%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})


