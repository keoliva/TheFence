import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { logout } from '../store';
import { connect } from 'react-redux';
import TabButton from '../components/BottomTabButton';
import FetchInfoButton from '../components/FetchUserInfoButton';

import { MapView, Marker } from 'expo';
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
		this.location = new GeolocationHelper();

		let watchId = navigator.geolocation.watchPosition(
			async function(position) {
				await this.location.fetchBlurbsCloseBy(position.coords);
				console.log('DONT TELL ME YOU DONT KNOW WHAT THIS IS ', this);
				this.setState({
					markers: this.location.state.markers,
				});
			},
			null,
			{ distance: 100 }
		);

		this.state = {
			watchId,
			markers: [],
		};
		this.logout = this.logout.bind(this);
	}

	componentWillUnmount() {
		navigator.geolocation.stopWatch(this.state.watchId);
	}
	logout() {
		this.props.logout();
		this.props.navigation.navigate('AuthLoading');
	}

	render() {
		return (
			<View>
				<MapView style={styles.mapView} showsUserLocation>
					{this.state.markers.map(marker => (
						<MapView.Marker coordinate={marker.coordinate} key={marker.key} />
					))}
				</MapView>
				<View style={styles.bottomTab}>
					<View style={styles.bottomSubTab}>
						<TabButton name="power-settings-new" onPress={this.logout} />
						<TabButton
							name="arrow-drop-down-circle"
							onPress={() => console.log('SUN O PRESSED')}
						/>
					</View>
				</View>
			</View>
		);
	}
}
const mapDispatch = dispatch => ({
	logout: () => dispatch(logout()),
});
export default connect(
	null,
	mapDispatch
)(HomeScreen);
