/**
 * ACTION TYPES
 */
const GOT_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';

/**
 * ACTION CREATORS
 */
const gotCurrentLocation = location => ({
	type: GOT_CURRENT_LOCATION,
	payload: location,
});

/**
 * THUNK CREATORS
 */
export const fetchCurrentLocation = () => async dispatch => {
	await navigator.geolocation.getCurrentPosition(
		position => {
			dispatch(gotCurrentLocation(position));
		},
		error => console.error(error),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
	);
};

/**
 * INITIAL STATE
 */
const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case GOT_CURRENT_LOCATION:
			return action.payload;
		default:
			return state;
	}
};
