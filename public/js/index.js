$(document).ready(function() {
	// Get references to page elements
	const $searchText = $('#search-text');
	const $searchTextAdd = $('#search-text');
	const $submitBtn = $('#submit');
	const $searchRadius = $('#search-radius');
	
	const handleAddButton = function(event) {
		event.preventDefault();

		let search = $searchText.val().trim();
		let searchRadius = $searchRadius.val();
		console.log(`searchRadius:: ${searchRadius}`);
		if (!search) {
			alert('You must enter a city or town to search nearby!');
			return;
		}

		let url = `/location/${search}&${searchRadius}`;

		console.log('hello');
		var data_row;
		var count;
		var data_id;

		let searchTextAddVal = $searchTextAdd
			.val()
			.split(' ')
			.join('');

		//this funtion adds up the number of searches
		$.get('api/get/' + searchTextAddVal, function(data) {
			console.log('data');
			console.log(data);
			// console.log("searches" + data.searches)
			// console.log("ID" + data.id)
			if (Object.keys(data).length === 0) {
				count = 1;
				data_row = {
					searches: count,
					destination_name: searchTextAddVal
				};
				console.log('adding row');
				$.post('/api/add', data_row);
			} else {
				count = data[0].searches + 1;
				console.log('dataid' + data[0].id);
				console.log('updating row');
				console.log('count' + count);
				data_id = data[0].id;
				data_row = {
					id: data[0].id,
					searches: count,
					destination_name: searchTextAddVal
				};
				// $.put("/api/update/", data_row)
				//there is no such thing as $.put, so we use an
				//ajax call instead
				$.ajax({
					method: 'PUT',
					url: '/api/update/',
					data: data_row
				}).then(function() {
					console.log('updated');
				});
			}
		});
		if (!searchTextAddVal) {
			alert('You must enter a city or town to search nearby!');
			return;
		}
		location.replace(url);
	};

	// Add event listeners to the submit and delete buttons
	// $submitBtn.on('click', handleAddButton);
	$submitBtn.on('click', handleAddButton);
});
