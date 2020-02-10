$(document).ready(function() {
	// Get references to page elements
	const $searchText = $('#search-text');
	const $submitBtn = $('#submit');
	const $searchRadius = $('#search-radius');

	const handleAddButton = function(event) {
		event.preventDefault();

		let search = $searchText.val().trim();
		let searchRadius = $searchRadius.val();
		console.log(`searchRadius:: ${searchRadius}`);
		
		if (!search) {
			console.log('bad search');
			swal.fire({
				title: 'Error!',
				text: 'You must enter a location to search!',
				icon: 'error',
				confirmButtonText: 'Understood'
			});
			return;
		}

		let url = `/location/${search}&${searchRadius}`;

		//this funtion adds up the number of searches
		$.get('api/get/' + search, function(data) {
			let data_row, count;

			if (Object.keys(data).length === 0) {
				count = 1;
				data_row = {
					searches: count,
					destination_name: search
				};
				console.log('adding row');
				$.post('/api/add', data_row);
			} else {
				count = data[0].searches + 1;
				data_id = data[0].id;
				data_row = {
					id: data[0].id,
					searches: count,
					destination_name: search
				};

				$.ajax({
					method: 'PUT',
					url: '/api/update/',
					data: data_row
				}).then(function() {
					console.log('updated');
				});

			}
		});

		location.replace(url);

	};

	// Add event listeners to the submit and delete buttons
	$submitBtn.on('click', handleAddButton);
});
