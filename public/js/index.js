// Get references to page elements
const $searchText = $('#search-text');
const $submitBtn = $('#submit');
// const $trailCheck = $('#trailCheck:checkbox');
// const $campCheck = $('#campCheck:checkbox');

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = async function(event) {
	event.preventDefault();

	let search = $searchText.val().trim();
	if (!search) {
		alert('You must enter a city or town to search nearby!');
		return;
	}

	let url = `/location/${search}`;
	location.replace(url);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
