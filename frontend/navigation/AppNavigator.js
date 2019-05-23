import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import LoginScreen from '../screens/LoginScreen.js';

const stackNavigator = createStackNavigator({
        HomeScreen,
        RegisterScreen,
        LoginScreen
    },
{
        initialRouteName: 'HomeScreen'
    }
    );

export default createAppContainer(stackNavigator);