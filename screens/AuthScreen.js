import React from 'react';
import LoginButton from '../components/SpotifyLoginButton';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../store';
import styles from '../styles';

class AuthScreen extends React.Component {
	constructor() {
		super();
		this._signInAsync = this._signInAsync.bind(this);
	}
	async _signInAsync() {
		const result = await this.props.signIn();
		if (result.type !== 'success') {
			Alert.alert(
				'Login Required',
				"The Fence requires access to the song you're currently playing " +
					'as well as the ability to play a song on your active Spotify ' +
					'device. Both actions only you can prompt.',
				[{ text: 'OK' }]
			);
		}
		this.props.navigation.navigate('AuthLoading');
	}
	render() {
		return (
			<View style={styles.container}>
				<LoginButton onPress={this._signInAsync} />
			</View>
		);
	}
}

const mapDispatch = dispatch => ({
	signIn: () => dispatch(signIn()),
});

export default connect(
	null,
	mapDispatch
)(AuthScreen);
