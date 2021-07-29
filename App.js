import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import loginScreen from './screens/logIn'
import signupScreen from './screens/signUp1'
import signupScreen2 from './screens/signUp2'
import signupScreen3 from './screens/signUp3'
import signupScreen4 from './screens/signUp4'
import signupScreen5 from './screens/signUp5'
import resetpasswordScreen from './screens/resetPassword'
import resetpasswordScreen2 from './screens/resetPassword-2'
import homeScreen from './screens/home'
import ordersScreen from './screens/orders'
import profileScreen from './screens/profile'
import editprofileScreen from './screens/editprofile'
import editprofilepicScreen from './screens/changeprofilepic'
import changepasswordScreen from './screens/changePassword'
import Navbar from './components/navbar'
import testAuth from './screens/testAuth'
import changepassword from './screens/changePassword';
import productsScreen from './screens/products'
import productDScreen from './screens/productdetails'
import productAScreen from './screens/productadd'
import productEScreen from './screens/productedit'
import financeScreen from './screens/finance'
import financeDetails from './screens/financedetails'

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="loginScreen"
          component={loginScreen}
        />
        <Stack.Screen
          options={{
            title: 'Sign Up',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="signupScreen"
          component={signupScreen} />
        <Stack.Screen
          options={{
            title: 'Sign Up',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="signupScreen2"
          component={signupScreen2} />
        <Stack.Screen
          options={{
            title: 'Sign Up',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="signupScreen3"
          component={signupScreen3} />
        <Stack.Screen
          options={{
            title: 'Sign Up',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="signupScreen4"
          component={signupScreen4} />
        <Stack.Screen
          options={{
            title: 'Sign Up',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="signupScreen5"
          component={signupScreen5} />
        <Stack.Screen
          options={{
            title: 'Forget Password?',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
            }
          }}
          name="resetpasswordScreen"
          component={resetpasswordScreen} />
        <Stack.Screen
          options={{
            title: 'Reset Password',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
            }
          }}
          name="resetpasswordScreen2"
          component={resetpasswordScreen2} />
        <Stack.Screen                           //tab navigation
          options={{
            title: 'Navbar',
            headerTransparent: true,
            headerTitle: false,
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#67ACAD',
              height: 115
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
            },
          }}
          name="Navbar"
          component={Navbar} />
        <Stack.Screen
          options={{
            title: false,
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
            }
          }}
          name="homeScreen"
          component={homeScreen} />
        <Stack.Screen
          options={{
            title: 'Products',
            headerLeft: null,
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="productsScreen"
          component={productsScreen} />
        <Stack.Screen
          options={{
            title: 'Products',
            headerLeft: null,
            headerShown: false,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="productDScreen"
          component={productDScreen} />
        <Stack.Screen
          options={{
            title: 'Products',
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="productAScreen"
          component={productAScreen} />
        <Stack.Screen
          options={{
            title: 'Products',
            headerLeft: null,
            headerTransparent: true,
            headerShown: false,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="productEScreen"
          component={productEScreen} />
        <Stack.Screen
          options={{
            title: 'Finances',
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="financeScreen"
          component={financeScreen} />
        <Stack.Screen
          options={{
            title: 'Bank Account Details',
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="financeDetails"
          component={financeDetails} />
        <Stack.Screen
          options={{
            title: 'Orders',
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="ordersScreen"
          component={ordersScreen} />
        <Stack.Screen
          options={{
            title: 'Account',
            headerLeft: null,
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="profileScreen"
          component={profileScreen} />
        <Stack.Screen
          options={{
            title: 'Edit Account',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="editprofileScreen"
          component={editprofileScreen} />
        <Stack.Screen
          options={{
            title: 'Edit Profile Picture',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="editprofilepicScreen"
          component={editprofilepicScreen} />
        <Stack.Screen
          options={{
            title: 'Change Password',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize: 25
            }
          }}
          name="changepasswordScreen"
          component={changepasswordScreen} />
        <Stack.Screen
          options={{
            title: 'Reset Password',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
            }
          }}
          name="testAuth"
          component={testAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack

