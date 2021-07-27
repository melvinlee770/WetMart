import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-community/picker';

export default function productdetails({ route,navigation }) {

    const _productid = route.params.productid
    const _imgsource = route.params.image
    const _name = route.params.name
    const _price = String(route.params.price)
    const _weight = String(route.params.weight)
    const _desc = route.params.desc
    const _availability = route.params.availability 
    const [items,setItems] = useState([
        {label: 'Available', value: true},
        {label: 'Unavailable', value: false}
    ]);
    const [sellerid,setID] = useState('')

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
        console.log("availability? "+_availability)
        console.log(sellerid)
    },[])

    const [selectedValue, setSelectedValue] = useState(_availability);

    function AvailabilityForm() {

        return (

            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue,itemPosition) => setSelectedValue(itemValue)}>
                {items.map(move => {
                    return <Picker.Item label={move.label} value={move.value} key={move.key} />
                })}
            </Picker>

        );
    }

    function AddButton(props){
        const name=props.productname
        const price=props.price
        const weight=props.weight
        const description=props.productdescription

        function submit(){
            console.log(_productid)
            console.log(name)
            console.log(price)
            console.log(description)
            console.log(weight)
            console.log(selectedValue)
            if(name==undefined||price==undefined||weight==undefined||description==undefined||name==""||price==""||weight==""||description==""){
                Alert.alert(
                    "Invalid inputs",
                    "Please key in valid inputs",
                    [{
                        text: "Cancel",
                        style: "cancel"
                    }],{cancelable:false}
                )
            }else{
            fetch("http://192.168.1.23:3000/seller/list/product/edit",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    productid: _productid,
                    productimage: "https://i.ibb.co/80kCwq5/c721459d-3826-4461-9e79-c077d5cf191e-3-ca214f10bb3c042f473588af8b240eca.jpg",
                    productname: name,
                    price: price,
                    productdescription: description,
                    weight: weight,
                    availability:selectedValue
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
                    console.log("product successfully added")
                    productNavigate()
                }
            })
            .catch((error=>{console.log(error);}))
        }
        }

        function productNavigate(){
            navigation.navigate('productsScreen')
        }

        return (
            <View style={{ marginBottom: '5%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'auto', elevation: 3 }}>
                <TouchableOpacity onPress={()=>{submit();}}>
                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                    EDIT
                </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function deleteProduct(){

        fetch("http://192.168.1.23:3000/seller/list/product/delete",
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                productid: _productid,
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
                console.log("product successfully deleted")
                navigation.navigate('productsScreen')
            }
        })
        .catch((error=>{console.log(error);}))
    }
    

    const [productname, updatename] = useState(_name)
    const [price, updateprice] = useState(_price)
    const [weight, updateweight] = useState(_weight)
    const [productdescription, updatedescription] = useState(_desc)

    return(
        <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View style={{marginTop:'3%',marginLeft:'5%'}}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, color: 'black' }}>
                    Products
                </Text>
            </View>
            <View style={{ marginBottom: '5%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'3%', elevation: 3 }}>
                <TouchableOpacity onPress={()=>{deleteProduct();}}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 18, color: 'white' }}>
                        Delete Product
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Image source={{ uri: `${_imgsource}` }} style={{ width: 100, height: 100, marginLeft: 'auto', marginRight: 'auto'}} />
        </View>
        <View>
            <Text style={{fontFamily: 'Montserrat-Regular',fontSize:16,marginLeft:'auto',marginRight:'auto'}}>
                Upload Photo of Product
            </Text>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updatename(text) }} defaultValue={productname} style={styles.eachProfileInfoText} placeholder="Product Name" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updateprice(text) }} defaultValue={price} style={styles.eachProfileInfoText} placeholder="Price" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updateweight(text) }} defaultValue={weight} style={styles.eachProfileInfoText} placeholder="Weight" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
        <AvailabilityForm></AvailabilityForm>
        </View>
        <View style={styles.eachProfileInfo2}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',marginTop:10}} />
            <TextInput onChangeText={function (text) { updatedescription(text) }} defaultValue={productdescription} multiline numberOfLines={3} style={styles.eachProfileInfoText2} placeholder="Product Description" placeholderTextColor='#808080'/>
        </View>
        <AddButton productname={productname} price={price} weight={weight} productdescription={productdescription}></AddButton>
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