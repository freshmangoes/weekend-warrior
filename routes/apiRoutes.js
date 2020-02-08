var db = require('../models');
module.exports = function(app) {
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