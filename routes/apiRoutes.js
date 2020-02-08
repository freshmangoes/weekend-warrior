var db = require('../models/');
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
	});



app.post("/api/add", function(req, res) {
	console.log (req.body)
    db.destination_search.create(req.body)
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

app.get("/api/get/:location_name", function(req, res) {

	db.destination_search.findAll({
		where: {
			destination_name: req.params.location_name
		}
	}).then(function(destination_search) {
		res.json(destination_search)
	})
});

app.put("/api/update/", function(req, res) {
	console.log("update body")
	console.log (req.body)
	db.destination_search.update(req.body,
		{
			where: {
				id: req.body.id
			}
		})
		.then(function(dbPost) {
			res.json(dbPost);
		});
	});
};