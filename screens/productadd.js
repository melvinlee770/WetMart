import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from 'react-native-shadow-cards'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faEnvelope, faLocationArrow, faMapMarker, faPhone, faPlayCircle, faStore, faUser, faWallet, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';

export default function productdetails({ route,navigation }) {

    const categories = []
    const [items, setItems] = useState([]);
    const [categoryid,setcategory]=useState(0);
    function insertMarketList() {
        fetch("http://192.168.1.66:3000/seller/list/category")
            .then(response => response.json())
            // .then(json => { console.log(json) })
            .then(json => {
                for (let i = 0; i < json[0].length; i++) {
                    categories.push(json[0][i])
                    items.push({ label: categories[i].category_name, value: categories[i].product_category_id })
                }
            })
            .catch((error) => { console.log('Error') })
    }

    function CategoryListForm() {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);

        return (
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                dropDownDirection="TOP"
                onChangeValue={(value) => {
                    setcategory(value);
                }}
                style={{ borderColor: 'transparent' }}
            />
        );
    }

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
        insertMarketList()
        retrieveID()
        console.log(sellerid)
    },[])

    function AddButton(props){
        const name=props.productname
        const price=props.price
        const weight=props.weight
        const description=props.productdescription

        function submit(){
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
            fetch("http://192.168.1.66:3000/seller/list/product/add",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sellerid: sellerid._W,
                    categoryid: categoryid,
                    productimage: "https://i.ibb.co/80kCwq5/c721459d-3826-4461-9e79-c077d5cf191e-3-ca214f10bb3c042f473588af8b240eca.jpg",
                    productname: name,
                    price: price,
                    productdescription: description,
                    weight: weight
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
                    ADD
                </Text>
                </TouchableOpacity>
            </View>
        )
    }


    const [productname, updatename] = useState()
    const [price, updateprice] = useState()
    const [weight, updateweight] = useState()
    const [productdescription, updatedescription] = useState()

    return(
        <SafeAreaView style={styles.container}>

        <View>
            <Image source={require('../img/up.png')} style={{ width: 100, height: 100, marginLeft: 'auto', marginRight: 'auto', marginTop: 60 }} />
        </View>
        <View>
            <Text style={{fontFamily: 'Montserrat-Regular',fontSize:16,marginLeft:'auto',marginRight:'auto'}}>
                Upload Photo of Product
            </Text>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updatename(text) }} value={productname} style={styles.eachProfileInfoText} placeholder="Product Name" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updateprice(text) }} value={price} style={styles.eachProfileInfoText} placeholder="Price" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',alignSelf:'center' }} />
            <TextInput onChangeText={function (text) { updateweight(text) }} value={weight} style={styles.eachProfileInfoText} placeholder="Weight" placeholderTextColor='#808080'/>
        </View>
        <View style={styles.eachProfileInfo}>
            <CategoryListForm></CategoryListForm>
        </View>
        <View style={styles.eachProfileInfo2}>
            <FontAwesomeIcon icon={faStore} size={25} style={{ color: '#5A9896',marginTop:10}} />
            <TextInput onChangeText={function (text) { updatedescription(text) }} value={productdescription} multiline numberOfLines={3} style={styles.eachProfileInfoText2} placeholder="Product Description" placeholderTextColor='#808080'/>
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