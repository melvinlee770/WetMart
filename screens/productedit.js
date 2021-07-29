import React, { useState, useEffect, } from 'react';
import { Button,StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-community/picker';
import { launchImageLibrary } from 'react-native-image-picker'
import {host} from '../common'
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
            fetch(host + "/seller/list/product/edit",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    productid: _productid,
                    productimage: imgshowinform,
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

        fetch(host + "/seller/list/product/delete",
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
    
    const handleChoosePhoto = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('Imagepicker Error: ', response.error)
            }
            else {
                // console.log(response.assets[0].base64)
                // console.log(response.assets[0].fileName)
                // console.log(response.assets[0].type)
                // console.log(response.assets[0].uri)
                const fd = new FormData()
                fd.append("file", {
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                    data: response.assets[0].base64,
                    uri:
                        Platform.OS === 'android' ? response.assets[0].uri : response.assets[0].uri.replace("file://", "")
                })
                fetch(host + "/images", {
                    method: "POST",
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'multipart/form-data',
                    },
                    body: fd
                })
                    .then((response) => response.json())
                    .then(json => {
                        console.log(json.imagePath)
                        setimgshowinform(json.imagePath)
                        updatesignup_imglink(json.imagePath)
                        console.log('successs')
                    })
                    .catch((error) => {
                        console.log('Error for upload image')
                        console.log(error)
                    })
            }
        })
    }

    const [imgshowinform, setimgshowinform] = useState(_imgsource)

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
            <View style={{ marginBottom: '2%', marginTop: '3%', borderRadius: 10, width: '40%', padding: '1%', backgroundColor: '#5A9896', marginLeft: 'auto',marginRight:'3%', elevation: 3 }}>
                <TouchableOpacity onPress={()=>{deleteProduct();}}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 18, color: 'white' }}>
                        Delete Product
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <Card onPress={() => { console.log('onclick') }} style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.cardcontainer}>
                <Image source={{ uri: `${imgshowinform}` }} style={styles.imageStyle} />
                <Button title="Upload Photo of Image" style={styles.userStyle} onPress={handleChoosePhoto}></Button>
            </View>
        </Card>
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
    cardcontainer: {
        flex: 1,
    },
    imageStyle: {
        flexGrow: 1,
        width: "50%",
        height: "18%",
        alignSelf: 'center',
    },
});