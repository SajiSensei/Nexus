import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import Welcome from './Screens/Welcome'
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import Home from './Screens/Home'


const Stack = createStackNavigator();

const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Mystack;