import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import loginScreen from './screens/logIn'
import signupScreen from './screens/signUp1'
import signupScreen2 from './screens/signUp2'
import signupScreen3 from './screens/signUp3'
import signupScreen4 from './screens/signUp4'
import resetpasswordScreen from './screens/resetPassword'
import resetpasswordScreen2 from './screens/resetPassword-2'
// import homeScreen from './screens/home'

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack

