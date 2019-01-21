import { connect } from 'react-redux';
import { refreshTokenForRequest } from '../store';

class Spotify {
	async getCurrentlyPlayingTrack() {
		await this.props.refreshToken();
		return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.accessToken,
			},
		}).then(res => res.json());
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
)(Spotify);
