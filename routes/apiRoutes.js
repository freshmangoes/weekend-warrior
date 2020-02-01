var db = require('../models');
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
		db.Example.destroy({
			where: { id: req.params.id }
		}).then(function(dbExample) {
			res.json(dbExample);
		});
	});
};
