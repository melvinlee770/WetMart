import React, { Component, useState,useEffect } from 'react';
import { LogBox, StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, SafeAreaView, FlatList, StatusBar, renderItem, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/navbar';
import { useIsFocused } from "@react-navigation/native";

export default function products({route, navigation}){
    const isFocused = useIsFocused();
    LogBox.ignoreAllLogs()
    const [data, setData] = useState([])
    /* 
    const [sellerid, setID] = useState('')
     const readData = async () => {
        try {
            const defg = await AsyncStorage.getItem('stroringID')
            setID(defg)
            console.log(defg)
            console
        } catch (e) {
          alert('Failed to fetch the data from storage')
        }
      }
    
    useEffect(() => {
        readData()
        fetch("http://192.168.1.23:3000/seller/list/product?sellerid="+sellerid,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log('Able to view products')
                    return response.json()
                }
                else if (response.status == 404) {
                    console.log('No products can be found')
                }
                console.log("HGeLp")
            })
            .then((response) => {
                setData(response.rows)
                console.log(data)
            })
            .catch((error => { console.log('Error' + error) }))
    }, []) */

    useEffect(()=>[
        x()
    ],[isFocused])
    const x = async() => {
        try{
            const defg = await AsyncStorage.getItem('stroringID')
            fetch("http://192.168.1.66:3000/seller/list/product?sellerid="+Number(defg),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status == 200) {
                    console.log('Able to view products')
                    return response.json()
                }
                else if (response.status == 404) {
                    console.log('No products can be found')
                }
                console.log("HGeLp")
            })
            .then((response) => {
                setData(response.rows)
            })
            .catch((error => { console.log('Error' + error) }))
        }
        catch(error){
            console.log(error)
        }
    }

    const renderItem = ({ item }) => (
        <Card style={styles.SalesAmount}>
            <Image source={{ uri: `${item.product_image_id}` }} style={{ width: 100, height: 100, paddingTop: 60 }} />
            <View>
                <Text style={[styles.SalesAmountText, { fontSize: 20, marginLeft: '5%', marginTop:'5%',fontWeight:'bold'}]}>{item.product_name}</Text>
                <Text style={[styles.SalesAmountText, { fontSize: 15, marginLeft: '5%'}]}>Product ID - {item.product_id}</Text>
                <Text style={[styles.SalesAmountText, { fontSize: 15, marginLeft: '5%'}]}>{item.availability ? "Available":"Unavailable"}</Text>
                <Text style={[styles.SalesAmountText, { fontSize: 20, marginLeft: '5%',fontWeight:'bold'}]}>${item.price}</Text>
            </View>
            <View style={{paddingTop:'10%',paddingLeft:'10%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('productDScreen',{productid: item.product_id})}>
                    <FontAwesomeIcon icon={faPlayCircle} size={32} style={{ color: '#5A9896'}} />
                </TouchableOpacity>
            </View>
        </Card>
    );
    return(
            <SafeAreaView style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop:'3%',marginLeft:'5%'}}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'black' }}>
                            Products
                        </Text>
                    </View>
                    <View style={{ marginBottom: '5%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'3%', elevation: 3 }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('productAScreen')}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                                Add Product
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={data => data.market_image_id}
            />
            <Navbar></Navbar>
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        flex: 1,
        margin: 1,
    },
    title: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    SalesAmount: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
        flexDirection: 'row',
    },
    SalesAmountText: {
        color: 'black',
        fontFamily: 'Montserrat-Regular',
    },
});