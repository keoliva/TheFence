export default class Geolocation {
	constructor() {
		this.state = {
			markers: [],
		};
	}

	async fetchBlurbsCloseBy(location) {
		console.log('ABOUT TO FETCH CLOSE BY BLURBS: ', location);

		// addGeofencing for each marker
	}

	addNewMarkers(points) {
		points.forEach(point => console.log(point));
		// this.setState({
		// 	markers: points.map(point => ({coordinate: point.coords, key: point.id}))
		// });
	}
}
