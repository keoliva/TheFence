import React from 'react';
import { MapView } from 'expo';

const MapViewMarker = ({ marker }) => {
	const [latitude, longitude] = marker.location.coordinates;
	return <MapView.Marker coordinate={{ latitude, longitude }} />;
};

export default MapViewMarker;
