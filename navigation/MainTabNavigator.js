//import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator({
	Home: HomeScreen,
});

export default HomeStack;
