import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withDecay } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCarrot, faHome, faShoppingBag, faUser, faWallet} from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ route }) {
    const navigation = useNavigation()
    const NavigateHome = () => {
        navigation.navigate(`homeScreen`);
    }
    // navigation.navigate(`Stores`, { MarketId: `${market_id}`, MarketName: `${market_name}`, Buyeremail: `${buyer_email}` })
    const NavigateFollow = () => {
        // navigation.navigate(`loginScreen`);
        navigation.navigate(`productsScreen`);
    }

    const NavigateOrders = () => {
        navigation.navigate(`ordersScreen`);
    }

    const NavigateCart = () => {
        navigation.navigate(`financeScreen`);
    }

    const NavigateProfile = () => {
        navigation.navigate(`profileScreen`);
    }

    return (
        <View style={styles.navbarContainer}>
                <TouchableOpacity onPress={() => NavigateHome()}  style={styles.iconStyle}>
                    <FontAwesomeIcon icon={faHome} size={32} style={{ color: '#A2A5A8' }} />
                    <Text style={styles.iconName}>Home</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.iconStyle}
                    onPress={() => NavigateFollow()} >
                    <FontAwesomeIcon icon={faCarrot} size={32} style={{ color: '#A2A5A8' }} />
                    <Text style={styles.iconName}>Products</Text>
                </TouchableOpacity>


            <TouchableOpacity style={styles.iconStyle}
                onPress={() => NavigateOrders()} >
                <FontAwesomeIcon icon={faShoppingBag} size={32} style={{ color: '#A2A5A8' }} />
                <Text style={styles.iconName}>Orders</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.iconStyle}
                onPress={() => NavigateCart()} >
                <FontAwesomeIcon icon={faWallet} size={32} style={{ color: '#A2A5A8' }} />
                <Text style={styles.iconName}>Finance</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.iconStyle}
                onPress={() => NavigateProfile()} >
                <FontAwesomeIcon icon={faUser} size={32} style={{ color: '#A2A5A8' }} />
                <Text style={styles.iconName}>Account</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        height: '7.7%',
        alignContent: 'center',
    },
    iconName: {
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
        color: 'grey'
    },
    iconStyle: {
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        alignContent: 'center', 
        alignItems: 'center'
    }
});