import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { logout, fetchCurrentLocation, refreshTokenForRequest } from '../store';
import { connect } from 'react-redux';
import TabButton from '../components/BottomTabButton';
import SongMarker from '../components/SongMarker';

import { MapView } from 'expo';
import SpotifyHelper from '../api/Spotify';
import GeolocationHelper from '../api/Geolocation';

const styles = StyleSheet.create({
	bottomTab: {
		position: 'absolute',
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
	},
	bottomSubTab: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	mapView: {
		alignSelf: 'stretch',
		height: Dimensions.get('window').height,
	},
});

class HomeScreen extends React.Component {
	constructor() {
		super();
		this.locationAPI = new GeolocationHelper();
		this.spotifyAPI = new SpotifyHelper();

		this.state = {
			markers: [],
		};

		this.logout = this.logout.bind(this);
		this.onAddMarkerPress = this.onAddMarkerPress.bind(this);
	}

	componentDidMount() {
		let watchId = navigator.geolocation.watchPosition(
			async position => {
				console.log('new position found');
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
		await Promise.all([
			this.props.fetchCurrentLocation(),
			this.props.refreshToken(),
		]);
		const track = await this.spotifyAPI.getCurrentlyPlayingTrack(
			this.props.accessToken
		);
		if (!this.props.location.coords || !track) {
			console.log(
				'was supposed to make a new point, but either location or track information missing',
				this.props.location.coords,
				track
			);
		} else {
			await this.locationAPI.addBlurb(this.props.location.coords, track);
			this.setState({
				markers: this.locationAPI.markers,
			});
		}
	}

	render() {
		return (
			<View>
				<MapView style={styles.mapView} showsUserLocation followsUserLocation>
					{this.state.markers.map(marker => (
						<SongMarker key={marker.id} marker={marker} />
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
	location: state.location,
	accessToken: state.userToken.accessToken,
});
const mapDispatch = dispatch => ({
	logout: () => dispatch(logout()),
	fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
	refreshToken: () => dispatch(refreshTokenForRequest()),
});
export default connect(
	mapState,
	mapDispatch
)(HomeScreen);
