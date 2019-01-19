import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { refreshTokenForRequest, fetchCurrentLocation } from '../store';

class FetchUserInfo extends React.Component {
	constructor() {
		super();
		this.handlePress = this.handlePress.bind(this);
	}

	getCurrentlyPlayingTrack() {
		return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.accessToken,
			},
		}).then(res => res.json());
	}

	async handlePress() {
		await this.props.refreshToken();
		const [track] = await Promise.all([
			this.getCurrentlyPlayingTrack(),
			this.props.fetchLocation(),
		]);
		Alert.alert(
			`"${track.item.name}" by ${track.item.artists[0].name}`,
			'Would you like to save the track you were listening to at this spot?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]
		);
		// send location (coords.latitude, coords.longitude)
		// track (track.item.uri, track.progress_ms) to server
	}

	render() {
		return <Button title="FETCH USER INFO" onPress={this.handlePress} />;
	}
}

const mapState = state => ({
	accessToken: state.userToken.accessToken,
});
const mapDispatch = dispatch => ({
	refreshToken: () => dispatch(refreshTokenForRequest()),
	fetchLocation: () => dispatch(fetchCurrentLocation()),
});

export default connect(
	mapState,
	mapDispatch
)(FetchUserInfo);
