import { connect } from 'react-redux';
import { fetchCurrentLocation } from '../store';

export default class Geolocation {
	constructor() {
		this.markers = [];
	}

	async addBlurb(coords, track) {
		console.log('ABOUT TO ADD ', coords, track);
		const point = await fetch(
			'http://the-fence.herokuapp.com/api/blurbs/create',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...coords, ...track }),
			}
		).then(res => res.json());
		this.addNewMarkers([point], true);
	}

	async fetchBlurbsCloseBy({ latitude, longitude }) {
		try {
			const points = await fetch('http://the-fence.herokuapp.com/api/blurbs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					latitude,
					longitude,
				}),
			}).then(res => res.json());
			this.addNewMarkers(points);
		} catch (err) {
			console.error(err);
		}
	}

	addNewMarkers(points, concat = false) {
		const newMarkers = points.map(point => {
			const [latitude, longitude] = point.location.coordinates;
			return { coordinate: { latitude, longitude }, ...point };
		});
		if (concat) {
			this.markers = this.markers.concat(newMarkers);
		} else {
			this.markers = newMarkers;
		}
	}
}

// const mapState = state => ({
// 	location: state.location,
// });

// const mapDispatch = dispatch => ({
// 	fetchLocation: () => dispatch(fetchCurrentLocation()),
// });

// export default connect(
// 	mapState,
// 	mapDispatch
// )(Geolocation);
