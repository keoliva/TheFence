export default class Spotify {
	getCurrentlyPlayingTrack(accessToken) {
		return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		}).then(res => res.json());
	}
}
