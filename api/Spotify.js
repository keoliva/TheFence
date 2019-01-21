export default class Spotify {
	async getCurrentlyPlayingTrack(accessToken) {
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
		return this.formatForDatabase(track);
	}

	formatForDatabase(track) {
		return {
			trackURI: track.item.uri,
			trackName: track.item.name,
			trackArtist: track.item.artists[0].name,
			trackProgress: track.progress_ms,
		};
	}
}
