import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import {host} from '../common'

export default function productdetails({ route,navigation }) {

    const productid = route.params.productid
    const [data, setData] = useState([])

    const x = async() => {
        try{
            fetch(host + "/seller/list/product/details?productid="+productid)
                .then((response)=>response.json())
                .then((json)=>{
                    setData(data=>data=json[0])
                })
        }
        catch(error){
            console.log(error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            x()
            return () => {
                null
            }
        }, []))

    /* useEffect(() => {

        fetch("http://192.168.1.23:3000/seller/list/product/details?productid="+productid,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log('Able to view product details')
                    return response.json()
                }
                else if (response.status == 404) {
                    console.log('????')
                }
            })
            .then((response) => {
                var x = JSON.stringify(response)
                var y = x.substring(1)
                var z = y.slice(0,-1)
                ssetData(z)
                console.log(JSON.parse(sdata).product_name)
            })
            .catch((error => { console.log('Error' + error) }))
    }, []) */

    return(
        <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View style={{marginTop:'3%',marginLeft:'5%'}}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'black' }}>
                    Products
                </Text>
            </View>
            <View style={{ marginBottom: '5%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'3%', elevation: 3 }}>
                <TouchableOpacity onPress={()=>navigation.navigate('productEScreen',{productid:productid,image:data.product_image_id,name:data.product_name,price:data.price,weight:data.weight,desc:data.product_description,availability:data.availability})}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                        Edit Product
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Image source={{ uri: `${data.product_image_id}` }} style={{ width: 100, height: 100, marginLeft: 'auto', marginRight: 'auto', marginTop: 5 }} />
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
            <Text style={styles.eachProfileInfoText}>
                {data.product_name}
            </Text>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
            <Text style={styles.eachProfileInfoText}>
                ${+data.price}
            </Text>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
            <Text style={styles.eachProfileInfoText}>
                {data.weight}
            </Text>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
            <Text style={styles.eachProfileInfoText}>
                {data.availability ? "Available" : "Unavailable"}
            </Text>
        </View>
        <View style={styles.eachProfileInfo2}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896' }} />
            <Text style={styles.eachProfileInfoText}>
                {data.product_description}
            </Text>
        </View>
        <Navbar></Navbar>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
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
        elevation: 3,        
    },
    eachProfileInfoText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        flex: 1
    },
    eachProfileInfo2: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        padding: '2%',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom:'auto',
        borderRadius: 10,
        elevation: 3
    },
});