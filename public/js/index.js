// Get references to page elements
const $searchText = $('#search-text');
const $submitBtn = $('#submit');

// function to retrieve weather, campsite, and trail data
// from openweather and hikingproject apis
const getCombinationData = (searchTerm) => {
	return $.ajax({
		url: `api/location/${searchTerm}`,
		type: 'GET'
	});
}

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = async function(event) {
	event.preventDefault();

	let search = $searchText.val().trim();
	if(!search) {
		alert('You must enter a city or town to search nearby!');
		return;
	}

	// debug statement for relevant data, making sure it gets passed to 
	// the front end
	console.log('search::', search);
	let data = await getCombinationData(search);
	console.log('weather data::', data.weatherData);
	console.log('trail data::', data.trailData);
	console.log('campsite data::', data.campsiteData);


};


// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
