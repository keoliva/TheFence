import { AuthSession } from 'expo';
import { AsyncStorage } from 'react-native';
import secret from '../secrets';
import base64 from 'react-native-base64';

/**
 * ACTION TYPES
 */
const GOT_USER_TOKEN = 'GOT_USER_TOKEN';
const LOG_OUT = 'LOG_OUT';

/**
 * ACTION CREATORS
 */
const gotUserToken = userToken => ({
	type: GOT_USER_TOKEN,
	payload: userToken,
});

export const logout = () => ({
	type: LOG_OUT,
});

/**
 * THUNK CREATORS
 */
// implementation with the help of https://blog.expo.io/firebase-github-authentication-with-react-native-2543e32697b4
const REDIRECT_URL = AuthSession.getRedirectUrl();
const spotify = {
	id: '9ba6f7d5f13a4441b16cefba57cbdef6',
	secret,
};

const createToken = async (code, refreshToken) => {
	let body;
	if (code) {
		body =
			'grant_type=authorization_code' +
			`&code=${code}` +
			`&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;
	} else {
		body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
	}
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		json: true,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded', // WTF!
			Authorization:
				'Basic ' + base64.encode(spotify.id + ':' + spotify.secret),
		},
		body,
	});
	return res.json();
};

export const signIn = () => async dispatch => {
	try {
		const fields = [
			'user-read-currently-playing',
			'user-modify-playback-state',
		];
		const { params } = await AuthSession.startAsync({
			authUrl:
				'https://accounts.spotify.com/authorize' +
				`?client_id=${spotify.id}` +
				`&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
				`&response_type=code` +
				`&scope=${encodeURIComponent(fields.join(' '))}`,
		});
		const { access_token, refresh_token } = await createToken(params.code);
		dispatch(
			gotUserToken({
				accessToken: access_token,
				refreshToken: refresh_token,
				timeReceived: new Date(),
			})
		);
	} catch (error) {
		console.error(error);
	}
};

export const refreshTokenForRequest = () => async (dispatch, getState) => {
	// I'll use this if I already have an access token in my AsyncStorage
	let { accessToken, refreshToken } = getState().userToken;
	try {
		let userToken = await AsyncStorage.getItem('USER_TOKEN').then(token =>
			JSON.parse(token)
		);
		const secondsPassed = Math.round(
			(new Date() - new Date(userToken.timeReceived)) / 1000
		);
		// if it's within 59 minutes of receiving the access token
		if (secondsPassed <= 3540) {
			dispatch(gotUserToken(userToken));
			return;
		}
		const { access_token } = await createToken(null, refreshToken);
		dispatch(
			gotUserToken({
				accessToken: access_token,
				timeReceived: new Date(),
			})
		);
	} catch (error) {
		console.error(error);
	}
};

/**
 * INITIAL STATE
 */
// retrieve initial state from localStorage or supply empty object if nothing stored in localStorage
const initialState = {
	accessToken: null,
	refreshToken: null,
	timeReceived: null,
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
	switch (action.type) {
		case GOT_USER_TOKEN:
			return { ...state, ...action.payload };
		case LOG_OUT:
			return { ...state, accessToken: null };
		default:
			return state;
	}
};
