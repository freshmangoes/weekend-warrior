var db = require('../models');
const axios = require('axios');

module.exports = function(app) {
	// get request for openweather api
	app.get('/location/:search', async (req, res) => {
		// async function to get weather data
		const getWeather = async (search) => {
			// city search parameter
			const city = search;
			// api key from dotenv
      const apiKey = process.env.openWeather;
      // get url
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
			// initialize data to be returned at the end
			let data;
			// es8 form factor promise to get data from api
			try {
        data = await axios.get(weatherUrl);
			} catch (err) {
        console.log('err', err);
			}
      return data;
		};
		// get weather data :)
    const weatherData = await getWeather(req.params.search);
    const result = weatherData.data;

		console.log(weatherData);

		// example relevant data
		const coords = result.coord;
		const temp = result.main.temp;
		const wind = result.wind;
		console.log(`Coords: ${coords}`);
		console.log(`Temp:: ${temp}`);
		console.log(`Wind:: ${wind}`);

		// pass back weatherData to the browser
		res.json(result);
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
		db.Example.destroy({ where: { id: req.params.id } }).then(function(
			dbExample
		) {
			res.json(dbExample);
		});
	});
};
