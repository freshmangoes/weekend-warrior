var db = require('../models');
// let request = require('request');
let request = require('request-promise');

module.exports = function(app) {
	// get request for openweather api
	app.get('/location/:search', async (req, res) => {
		// async function to get weather data
		let getWeather = async (search) => {
			// city search parameter
			let city = search;
			// api key from dotenv
			let apiKey = process.env.openWeather;
			//options for request-promise
			let options = {
				method: `GET`,
				json: true,
				uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
			};
			// initialize data to be returned at the end
			let data;
			// es8 form factor promise to get data from api
			try {
				data = await request(options);
			} catch (err) {
				console.log('err', err);
			}
			return data;
		};
		// get weather data :)
    let weatherData = await getWeather(req.params.search);

    console.log(weatherData);
    
    // example relevant data
    let coords = weatherData.coord;
    let temp = weatherData.main.temp;
    let wind = weatherData.wind;
    console.log(`Coords: ${coords}`);
    console.log(`Temp:: ${temp}`);
    console.log(`Wind:: ${wind}`);
    
    // pass back weatherData to the browser
		res.json(weatherData);
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
