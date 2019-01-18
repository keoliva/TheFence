import React from 'react';
import {} from 'react-native';
import LoginButton from '../components/SpotifyLoginButton';
import { AuthSession } from 'expo';
import secret from 'secrets';

const REDIRECT_URL = AuthSession.getRedirectUrl();
const spotify = {
	id: '9ba6f7d5f13a4441b16cefba57cbdef6',
	secret,
};

export default class AuthScreen extends React.Component {
	async _signInAsync() {}
	render() {
		return <LoginButton onPress={this._signInAsync} />;
	}
}
