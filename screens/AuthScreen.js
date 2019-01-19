import React from 'react';
import LoginButton from '../components/SpotifyLoginButton';
import { connect } from 'react-redux';
import { signIn } from '../store';

class AuthScreen extends React.Component {
	constructor() {
		super();
		this._signInAsync = this._signInAsync.bind(this);
	}
	async _signInAsync() {
		await this.props.signIn();
		this.props.navigation.navigate('Main');
	}
	render() {
		return <LoginButton onPress={this._signInAsync} />;
	}
}

const mapDispatch = dispatch => ({
	signIn: () => dispatch(signIn()),
});

export default connect(
	null,
	mapDispatch
)(AuthScreen);
