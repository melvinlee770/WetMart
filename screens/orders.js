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
    const [spe_order_id, setspe_order_id] = useState('')
    const [first_detailsItem, setfirst_detailsItem] = useState([])
    const [second_detailsItem, setsecond_detailsItem] = useState([])
    const posts = first_detailsItem
    const secondposts = second_detailsItem

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

    const buttonToUpdateOrder = () => {
        const updateOrderURL = 'http://192.168.1.66:3000/seller/update/order?order_id=' + spe_order_id
        const showSellerOrder_URL = 'http://192.168.1.66:3000/seller/show/order/pending?seller_id=' + callsellerid
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
                console.log(json)
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

    function PackedButtonControl() {
        if (buttonColorLeft == '#5A9896' && buttonColorRight == 'white') {
            return (
                <TouchableOpacity onPress={buttonToUpdateOrder}>
                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }}>PACKED</Text>
                </TouchableOpacity>
            )
        }
        else if (buttonColorLeft == 'white' && buttonColorRight == '#5A9896') {
            return (
                <Text style={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: 20 }}>completed</Text>
            )
        }
    }

    function OrderDetails(order_id) {
        const tmpJsonarr = []
        var tmpTotalArr = 0
        const tmpPriceArr = []
        var totalPrice = 0
        setspe_order_id(order_id)

        const allproductAquantityarr = []    //array for the useState
        const allinfoarr = []       //array for the useState
        const showSellerOrderDetails_URL = 'http://192.168.1.66:3000/seller/show/order/details?seller_id=' + callsellerid + '&order_id=' + order_id
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
            .catch((error) => { console.log(error) })
    }

    function ShowTheOrderList() {       //show the order list on pending status
        if (buttonColorLeft == '#5A9896' && buttonColorRight == 'white') {      //pending order
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
        else if (buttonColorLeft == 'white' && buttonColorRight == '#5A9896') {         //completed order
            return (
                <FlatList
                    keyExtractor={(item => item.order_id)}
                    data={noCompleteOrders}
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
    }
    
    //show the front end of the app
    return (
        <SafeAreaView style={{ height: '100%' }}>
            <View style={{ flexDirection: 'row', marginTop: '15%', marginLeft: 'auto', marginRight: 'auto' }}>
                <TouchableOpacity onPress={changeLeftButtonColor} style={[styles.orderButton, { backgroundColor: buttonColorLeft, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, elevation: 5 }]}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, textAlign: 'center' }}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={changeRightButtonColor} style={[styles.orderButton, { backgroundColor: buttonColorRight, borderTopRightRadius: 20, borderBottomRightRadius: 20, elevation: 5 }]}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, textAlign: 'center' }}>Past</Text>
                </TouchableOpacity>
            </View>
            <ShowTheOrderList></ShowTheOrderList>
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
                        <PackedButtonControl></PackedButtonControl>
                    </Card>
                </View>
            </ModalPoup>

            <Navbar></Navbar>
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