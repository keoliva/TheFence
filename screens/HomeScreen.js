import React from 'react';
import { View } from 'react-native';
import { logout, refreshTokenForRequest } from '../store';
import styles from '../styles';
import { connect } from 'react-redux';
import TabButton from '../components/BottomTabButton';
import SongMarker from '../components/SongMarker';

import { MapView } from 'expo';
import SpotifyAPI from '../api/Spotify';
import GeolocationHelper from '../api/Geolocation';

class HomeScreen extends React.Component {
	constructor() {
		super();
		this.locationAPI = new GeolocationHelper();
		this.lastLocation = null;

		this.state = {
			markers: [],
		};

		this.logout = this.logout.bind(this);
		this.onAddMarkerPress = this.onAddMarkerPress.bind(this);
	}

	componentDidMount() {
		let watchId = navigator.geolocation.watchPosition(
			async position => {
				await this.locationAPI.fetchBlurbsCloseBy(position.coords);
				this.setState({
					markers: this.locationAPI.markers,
				});
			},
			err => console.log(err),
			{ distance: 100 }
		);
		this.setState(prevState => ({
			...prevState,
			watchId,
		}));
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.state.watchId);
	}

	logout() {
		this.props.logout();
		this.props.navigation.navigate('AuthLoading');
	}

	async onAddMarkerPress() {
		// await Promise.all([
		// 	this.props.fetchCurrentLocation(),
		// 	this.props.refreshToken(),
		// ]);
		await this.props.refreshToken();
		const track = await SpotifyAPI.getCurrentlyPlayingTrack(
			this.props.accessToken
		);
		if (!this.lastLocation || !track) {
			console.log('coordinates missing', this.lastLocation);
		} else {
			await this.locationAPI.addBlurb(this.lastLocation, track);
			this.setState({
				markers: this.locationAPI.markers,
			});
		}
	}

	render() {
		return (
			<View>
				<MapView
					style={styles.mapView}
					showsUserLocation
					followsUserLocation
					onRegionChangeComplete={region => {
						this.lastLocation = region;
					}}
				>
					{this.state.markers.map(marker => (
						<SongMarker
							key={marker.id}
							marker={marker}
							play={() => SpotifyAPI.playTrack(this.props.accessToken, marker)}
						/>
					))}
				</MapView>
				<View style={styles.bottomTab}>
					<View style={styles.bottomSubTab}>
						<TabButton name="power-settings-new" onPress={this.logout} />
						<TabButton
							name="arrow-drop-down-circle"
							onPress={this.onAddMarkerPress}
						/>
					</View>
				</View>
			</View>
		);
	}
}
const mapState = state => ({
	accessToken: state.userToken.accessToken,
});
const mapDispatch = dispatch => ({
	logout: () => dispatch(logout()),
	refreshToken: () => dispatch(refreshTokenForRequest()),
});
export default connect(
	mapState,
	mapDispatch
)(HomeScreen);
