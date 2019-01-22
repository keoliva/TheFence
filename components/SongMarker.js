import React from 'react';
import { Alert } from 'react-native';
import { MapView } from 'expo';

const MapViewMarker = ({ marker, play }) => {
	const [latitude, longitude] = marker.location.coordinates;
	const handlePress = () => {
		Alert.alert(
			`"${marker.trackName}" by ${marker.trackArtist}`,
			'Would you like to listen to this track you saved at this spot?',
			[{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: play }]
		);
	};
	return (
		<MapView.Marker
			coordinate={{ latitude, longitude }}
			title={`"${marker.trackName}" by ${marker.trackArtist}`}
			onPress={handlePress}
		/>
	);
};

export default MapViewMarker;
