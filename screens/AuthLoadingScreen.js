import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';

class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this._bootstrapAsync();
	}
	async _bootstrapAsync() {
		let userToken = await AsyncStorage.getItem('USER_TOKEN');
		if (userToken) {
			userToken = JSON.parse(userToken).accessToken;
		}
		this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
	}
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		);
	}
}

const mapState = state => ({});

export default connect(mapState)(AuthLoadingScreen);
