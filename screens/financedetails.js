import React, { useState, useEffect, } from 'react';
import { FlatList,StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import { Picker } from '@react-native-community/picker';

export default function financedetails({ route,navigation }) {
    const fullname = route.params.fullname
    const bank = route.params.bank
    const accno = route.params.accno
    const [_fullname,setname]=useState(fullname)
    const [_bank,setbank]=useState(bank)
    const [_accno,setaccno]=useState('')
    const [sellerid,setID] = useState('')
    const [items,setItems] = useState([
        {label: 'DBS', value: 'DBS'},
        {label: 'OCBC', value: 'OCBC'},
        {label: 'UOB', value: 'UOB'}
    ]);
    
    const retrieveID = () =>{
        try{
            const value = AsyncStorage.getItem("stroringID")
            if(value!==null){
                setID(value)
            }
        } catch(e){
            console.log("bruh")
        }
    }
    useEffect(()=>{
        retrieveID()
        console.log(sellerid)
    },[])
    function BankForm() {

        return (
            <Picker
                selectedValue={_bank}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue,itemPosition) => setbank(itemValue)}>
                {items.map(move => {
                    return <Picker.Item label={move.label} value={move.value} key={move.key} />
                })}
            </Picker>
        )
    }

    function AddButton(props){
        const fullname=props.fullname
        const bank=props.bank
        const accno=props.accno

        function submit(){
            if(fullname==undefined||bank==undefined||accno==undefined||fullname==""||bank==""||accno==""){
                console.log(fullname)
                console.log(bank)
                console.log(accno)
                Alert.alert(
                    "Invalid inputs",
                    "Please key in valid inputs",
                    [{
                        text: "Cancel",
                        style: "cancel"
                    }],{cancelable:false}
                )
            }else{
            fetch("http://192.168.1.23:3000/seller/update/finance",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    bank:bank,
                    bank_account:accno,
                    full_name:fullname,
                    sellerid:sellerid._W
                  })
            })
            .then(response=>{
                if(response.status==404){
                    console.log("incorrect inputs")
                    Alert.alert(
                    "Invalid inputs",
                    "Please key in valid inputs",
                    [{
                        text: "Cancel",
                        style: "cancel"
                    }],{cancelable:false}
                    )
                    return false
                } else{
                    console.log("finances edited")
                    productNavigate()
                }
            })
            .catch((error=>{console.log(error);}))
        }
        }

        function productNavigate(){
            navigation.navigate('financeScreen')
        }

        return (
            <View style={{ marginBottom: '5%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'auto', elevation: 3 }}>
                <TouchableOpacity onPress={()=>{submit();}}>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                    SAVE
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <SafeAreaView style={{ flex: 1, height:'100%' }}>
            <View style={[styles.eachProfileInfo,{marginTop:'25%'}]}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { setname(text) }} defaultValue={fullname} style={styles.eachProfileInfoText} placeholder="Full Name" placeholderTextColor='#808080'/>
            </View>
            <View style={styles.eachProfileInfo}>
                <BankForm></BankForm>
            </View>
            <View style={styles.eachProfileInfo}>
                <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
                <TextInput onChangeText={function (text) { setaccno(text) }} defaultValue={accno} style={styles.eachProfileInfoText} placeholder="Bank Account No." placeholderTextColor='#808080'/>
            </View>
            <AddButton fullname={_fullname} bank={_bank} accno={_accno}></AddButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eachProfileInfo: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        paddingLeft: '2%',
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
    eachProfileInfoText2: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        flex: 1,
        textAlignVertical: 'top'
    },
    eachProfileInfo2: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        paddingLeft: '2%',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom:'auto',
        borderRadius: 10,
        elevation: 3,
        height: 100,
    },
});