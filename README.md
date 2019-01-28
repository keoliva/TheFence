# TheFence
The user can save the Spotify song they were listening to at a certain location. Once they're 100 meters within the marker they left before, they will be able to see it again. If they have Spotify Premium, they will have the option to listen to it right away, from wherever in the song they were in.

Once you download the Expo Client application from either the Apple Store or the Google Play Store, [you can experiment with the app](https://expo.io/@kolivakepo/TheFence)

I wrote the backend using Express, and deployed it as a heroku application. Here's the file with the two API endpoints that this application interacts with for now:
```javascript
const router = require('express').Router();
const { Blurb } = require('../db/models');
const Sequelize = require('sequelize');
module.exports = router;

router.post('/', async (req, res, next) => {
	try {
		const blurbs = await Blurb.findAll({
			where: Sequelize.where(
				Sequelize.fn(
					'ST_Distance_Sphere',
					Sequelize.fn(
						'ST_MakePoint',
						parseFloat(req.body.latitude),
						parseFloat(req.body.longitude)
					),
					Sequelize.col('location')
				),
				'<=',
				parseFloat(100) // meters
			),
		});
		res.json(blurbs);
	} catch (err) {
		next(err);
	}
});

router.post('/create', async (req, res, next) => {
	try {
		const point = {
			type: 'Point',
			coordinates: [req.body.latitude, req.body.longitude],
		};
		const blurb = await Blurb.create({
			location: point,
			trackURI: req.body.trackURI,
			trackName: req.body.trackName,
			trackArtist: req.body.trackArtist,
			trackProgress: req.body.trackProgress,
		});
		res.status(201).json(blurb);
	} catch (err) {
		next(err);
	}
});
```
