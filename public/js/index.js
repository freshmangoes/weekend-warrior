// Get references to page elements
var $searchText = $('#search-text');
var $submitBtn = $('#submit');
// var $exampleDescription = $('#example-description');
// var $exampleList = $('#example-list');


// function to retrieve weather, campsite, and trail data
// from openweather and hikingproject apis
var getCombinationData = (searchTerm) => {
	return $.ajax({
		url: `api/location/${searchTerm}`,
		type: 'GET'
	});
}

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = async function(event) {
	event.preventDefault();

	let search = $searchText.val().trim();
	if(!search) {
		alert('You must enter a city or town to search nearby!');
		return;
	}

	console.log('search::', search);
	let data = await getCombinationData(search);
	console.log('weather data::', data.weatherData);
	console.log('trail data::', data.trailData);
	console.log('campsite data::', data.campsiteData);


};


// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
