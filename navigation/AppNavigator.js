import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthScreen from '../screens/AuthScreen';
import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
	createSwitchNavigator({
		AuthLoading: AuthLoadingScreen,
		Auth: AuthScreen,
		Main: HomeScreen,
	})
);
