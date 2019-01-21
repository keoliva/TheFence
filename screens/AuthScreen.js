import React from 'react';
import LoginButton from '../components/SpotifyLoginButton';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../store';
import styles from '../styles';

class AuthScreen extends React.Component {
	constructor() {
		super();
		this._signInAsync = this._signInAsync.bind(this);
	}
	async _signInAsync() {
		await this.props.signIn();
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
