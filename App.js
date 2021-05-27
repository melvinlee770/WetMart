import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import loginScreen from './screens/logIn'
import signupScreen from './screens/signUp'
import resetpasswordScreen from './screens/resetPassword'

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
            title: 'Reset Password',
            headerTransparent: true,
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold'
            }
          }}
          name="resetpasswordScreen"
          component={resetpasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack