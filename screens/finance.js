import React, { useState, useEffect, } from 'react';
import { LogBox,FlatList,StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {host} from '../common'
export default function finances({ route,navigation }) {
    LogBox.ignoreAllLogs()
    const isFocused = useIsFocused();
    const [walletamt, setamt] = useState(0)
    const [fullname, setname] = useState('')
    const [bank, setbank] = useState('')
    const [accno, setaccno] = useState('')
    const [data, setData] = useState([])
    useEffect(()=>[
        x()
    ],[isFocused])
    const x = async() => {
        try{
            const defg = await AsyncStorage.getItem('stroringID')
            fetch(host+ "/seller/list/finance?sellerid="+Number(defg),
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response)=>response.json())
            .then((json)=>{
                console.log(json)
                setamt(json[0].amount)
                setname(json[0].full_name)
                setbank(json[0].bank)
                setaccno(json[0].bank_account)
            })
            .catch((error => { console.log('Error' + error) }))

            fetch(host + "/seller/list/transactions?sellerid="+Number(defg),
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
        <Card style={styles.Cards}>
            <View>
                <Text style={[styles.CardText, { fontSize: 20, marginLeft: '5%', marginTop:'5%',fontWeight:'bold'}]}>{(item.type_of_transaction=="Income") ? "Daily Profit" : "Withdrawal"}</Text>
                <Text style={[styles.CardText, { fontSize: 13, marginLeft: '5%'}]}>Type of Transaction - {item.type_of_transaction}</Text>
                <Text style={[styles.CardText, { fontSize: 13, marginLeft: '5%'}]}>{item.date}</Text>
                <Text style={[styles.CardText, { fontSize: 20, marginLeft: '5%',fontWeight:'bold'}]}>${item.amount}</Text>
            </View>
        </Card>
    );

    return(
        <SafeAreaView style={{ flex: 1, height:'100%' }}>
            <Card style={styles.SalesAmount}>
                <Text style={[styles.SalesAmountText, { fontSize: 15, textAlign: 'center' }]}>Total Wallet Amount</Text>
                <Text style={[styles.SalesAmountText, { fontSize: 45, marginLeft: '5%' }]}> <FontAwesomeIcon icon={faWallet} size={32} style={styles.SalesAmount_icon} /> $ {walletamt}</Text>
            </Card>
            <View style={{ marginBottom: '5%', marginTop: '5%', borderRadius: 10, padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'auto', elevation: 3 }}>
                <TouchableOpacity onPress={()=>navigation.navigate('financeDetails',{fullname:fullname,bank:bank,accno:accno})}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                        BANK ACCOUNT DETAILS
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'grey' }}>Past transaction</Text>
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
    SalesAmount: {
        height: '15%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20%',
        backgroundColor: '#5A9896',
        justifyContent: 'center',
    },
    Cards: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
        flexDirection: 'row',
    },
    CardText: {
        color: 'black',
        fontFamily: 'Montserrat-Regular',
    },
    SalesAmount_icon: {
        color: 'white',
    },
    SalesAmountText: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
})