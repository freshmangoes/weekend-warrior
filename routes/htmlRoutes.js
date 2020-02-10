const db = require('../models');
const axios = require('axios');

const getComboData = async (search, radius) => {
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

	const getCampgrounds = async (lat, lon, radius) => {
		const apiKey = process.env.hikingProject;
		// get url for campsite data
		//  uses lat, lon, and a max distance of 50mi
		const campsitesUrl = `https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lon}&maxDistance=${radius}&key=${apiKey}`;
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

	const getTrails = async (lat, lon, radius) => {
		const apiKey = process.env.hikingProject;
		const trailUrl = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${radius}&key=${apiKey}`;
		let data;
		try {
			data = await axios.get(trailUrl);
		} catch (err) {
			console.error('err::', err);
		}
		return data.data;
	};

	// get weather data :)
	const weatherData = await getWeather(search);

	// coordinates for hikingproject search
	const coords = weatherData.coord;

	// get campsite data :)
	const campsiteData = await getCampgrounds(coords.lat, coords.lon, radius);
	// get trail data :)
	const trailData = await getTrails(coords.lat, coords.lon, radius);

	return { weatherData, campsiteData, trailData };
};

module.exports = function(app) {
	// Load index page
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/location/:search&:radius', async (req, res) => {
		let search = req.params.search;
		let radius = req.params.radius;

		console.log(`radius:: ${radius}`);
		console.log('search::', search);
		
		// variables to determine what data is getting rendered
		let renderTrails = true;
		let renderCamps = true;

		const data = await getComboData(search, radius);
		console.log(data.weatherData);

		// check whether any campgrounds get get pulled from the api
		if (!data.campsiteData.campgrounds.length) {
			renderCamps = false;
			console.log(`No campsites`);
		}

		// check whether any trails get pulled from the api
		if (!data.trailData.trails.length) {
			renderTrails = false;
			console.log(`No trails`);
		}

		res.render('combination', {
			weatherMain: data.weatherData.main,
			weatherWind: data.weatherData.wind,
			weatherOV: data.weatherData.weather[0],
			trails: data.trailData,
			camps: data.campsiteData,
			renderTrails: renderTrails,
			renderCamps: renderCamps
		});
	});

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
