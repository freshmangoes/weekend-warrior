// Dependencies
// =============================================================

// // Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// // Creates a "adventure" model that matches up with DB
// var adventure = sequelize.define("adventure", {
//   searches: Sequelize.INTEGER,
//   destination_name: Sequelize.STRING
// });

// // Syncs with DB
// // adventure.sync();

// // Makes the adventure Model available for other files (will also create a table)
// module.exports = adventure;

module.exports = function(sequelize, DataTypes) {
	var destination_search = sequelize.define('destination_search', {
		searches: DataTypes.INTEGER,
		destination_name: DataTypes.STRING
	});
	return destination_search;
};
