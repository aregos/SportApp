import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import CongratScreen from '../screens/CongratScreen.js';

const stackNavigator = createStackNavigator({
        HomeScreen,
        RegisterScreen,
        LoginScreen,
        CongratScreen
    },
{
        initialRouteName: 'HomeScreen'
    }
    );

export default createAppContainer(stackNavigator);