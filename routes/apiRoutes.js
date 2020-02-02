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
      const trailUrl = `https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=${apiKey}`;
      let data;
      try {
        data = await axios.get(trailUrl);
      } catch(err) {
        console.error('err::', err);
      }
      return data.data;
    };

		// get weather data :)
    const weatherData = await getWeather(req.params.search);
    
		console.log(weatherData);
    
		// example relevant data
		const coords = weatherData.coord;
		const temp = weatherData.main.temp;
		const wind = weatherData.wind;
		console.log(`Coords: ${coords}`);
		console.log(`Temp:: ${temp}`);
		console.log(`Wind:: ${wind}`);
    // get campsite data :)
    const campsiteData = await getCampgrounds(coords.lat, coords.lon);
    // get trail data :)
    const trailData = await getTrails(coords.lat, coords.lon);
		// pass back weatherData, campsiteData, trailData to the browser
		res.json({weatherData, campsiteData, trailData});
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
