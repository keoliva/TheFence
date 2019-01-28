export default class Spotify {
	static async getCurrentlyPlayingTrack(accessToken) {
		let status;
		try {
			const track = await fetch(
				'https://api.spotify.com/v1/me/player/currently-playing',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
				}
			).then(res => {
				status = res.status;
				return res.json();
			});
			return Spotify.formatForDatabase(track);
		} catch (error) {
			if (status === 204) {
				return { message: 'No Active Device Found' };
			}
		}
	}

	static formatForDatabase(track) {
		return {
			trackURI: track.item.uri,
			trackName: track.item.name,
			trackArtist: track.item.artists[0].name,
			trackProgress: track.progress_ms,
		};
	}

	static async playTrack(accessToken, track) {
		try {
			const result = await fetch('https://api.spotify.com/v1/me/player/play', {
				method: 'PUT',
				body: JSON.stringify({
					uris: [track.trackURI],
					position_ms: parseInt(track.trackProgress),
				}),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken,
				},
			}).then(res => res.json());
		} catch (error) {
			if (error.status === 404) {
				return { message: 'No Active Device Found' };
			} else if (error.status === 403) {
				return { message: 'Spotify Premium Account Required' };
			}
		}
	}
}
