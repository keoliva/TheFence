import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';

const USER_TOKEN = 'TheFenceUserToken';

export default class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this._bootstrapAsync();
	}
	async _bootstrapAsync() {
		const userToken = await AsyncStorage.getItem(USER_TOKEN);
		this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
	}
	render() {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}
}
