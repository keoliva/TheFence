import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { refreshTokenForRequest } from '../store';

class FetchUserInfo extends React.Component {
	constructor() {
		super();
		this.handlePress = this.handlePress.bind(this);
	}

	async getCurrentlyPlayingTrack() {
		const { progress_ms, item } = await fetch(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.props.accessToken,
				},
			}
		).then(res => res.json());
		console.log(progress_ms, item.name);
	}

	async handlePress() {
		await this.props.refreshToken();
		await this.getCurrentlyPlayingTrack();
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
});

export default connect(
	mapState,
	mapDispatch
)(FetchUserInfo);
