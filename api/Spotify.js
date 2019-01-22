export default class Spotify {
	static async getCurrentlyPlayingTrack(accessToken) {
		const track = await fetch(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken,
				},
			}
		).then(res => res.json());
		return Spotify.formatForDatabase(track);
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
		await fetch('https://api.spotify.com/v1/me/player/play', {
			method: 'PUT',
			body: `context_uri=${track.trackURI}&position_ms=${track.trackProgress}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken,
			},
		});
	}
}
