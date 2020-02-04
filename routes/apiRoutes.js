var db = require('../models');
<<<<<<< HEAD
const weather = require(`openweather-apis`);

module.exports = function(app) {
	// api route for openweather api
	// searches for weather in the area, using the path as the search term
	app.get('/:search', async (req, res) => {
		// function to get and *currently* pass weather to the user as json
		var getWeather = async (search) => {
			// api key
			weather.setAPPID(process.env.openWeatherKey);
			// setting the city to the desired search
			weather.setCity(search);
			// setting units to imperial
			weather.setUnits(`imperial`);
			// magic api call to do things
			weather.getAllWeather((err, data) => {
				if (err) throw err;
				// pass the json from the api to the user
				res.json(data);
			});
		};

		getWeather(req.params.search);
=======
const axios = require('axios');

module.exports = function(app) {
	// get request for openweather api
  app.get('/api/location/:search', async (req, res) => {
		// async function to get weather data
		const getWeather = async (search) => {
			// city search parameter
			const city = search;
			// api key from dotenv
			const apiKey = process.env.openWeather;
			// get url for weather
			//  uses a search for a city
			const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
			// initialize data to be returned at the end
			let data;
			// es8 form factor promise to get data from api
			try {
				data = await axios.get(weatherUrl);
			} catch (err) {
				console.error('err::', err);
			}
			// return relevant json from data
			return data.data;
		};

		const getCampgrounds = async (lat, lon) => {
			const apiKey = process.env.hikingProject;
			// get url for campsite data
			//  uses lat, lon, and a max distance of 50mi
			const campsitesUrl = `https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lon}&maxDistance=50&key=${apiKey}`;
			// initialize data to be returned at the end
			let data;
			// es8 form factor promise to get data from api
			try {
				data = await axios.get(campsitesUrl);
			} catch (err) {
				console.error('err::', err);
			}
			// return relevant json from data
			return data.data;
		};

		const getTrails = async (lat, lon) => {
			const apiKey = process.env.hikingProject;
			const trailUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${apiKey}`;
			let data;
			try {
				data = await axios.get(trailUrl);
			} catch (err) {
				console.error('err::', err);
			}
			return data.data;
		};

		// get weather data :)
		const weatherData = await getWeather(req.params.search);

		// example relevant data
		const coords = weatherData.coord;
		const temp = weatherData.main.temp;
		const wind = weatherData.wind;
		console.log(`Coords: ${JSON.stringify(coords, null, 2)}`);
		console.log(`Temp:: ${temp}`);
		console.log(`Wind:: ${JSON.stringify(wind, null, 2)}`);
		// get campsite data :)
		const campsiteData = await getCampgrounds(coords.lat, coords.lon);
		// get trail data :)
		const trailData = await getTrails(coords.lat, coords.lon);
		// pass back weatherData, campsiteData, trailData to the browser
		res.json({ weatherData, campsiteData, trailData });
>>>>>>> ebdc69670b1c4012266757d0e8482a7cfcb927a1
	});

	// Get all examples
	app.get('/api/examples', function(req, res) {
		db.Example.findAll({}).then(function(dbExamples) {
			res.json(dbExamples);
		});
	});

	// Create a new example
	app.post('/api/examples', function(req, res) {
		db.Example.create(req.body).then(function(dbExample) {
			res.json(dbExample);
		});
	});

	// Delete an example by id
	app.delete('/api/examples/:id', function(req, res) {
<<<<<<< HEAD
		db.Example.destroy({
			where: { id: req.params.id }
		}).then(function(dbExample) {
=======
		db.Example.destroy({ where: { id: req.params.id } }).then(function(
			dbExample
		) {
>>>>>>> ebdc69670b1c4012266757d0e8482a7cfcb927a1
			res.json(dbExample);
		});
	});
};
