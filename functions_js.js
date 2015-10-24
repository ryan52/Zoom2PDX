function initMap() {
	//make it a local later
	window.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.5200, lng: 122.6819},
						 zoom: 6
						});
	var infoWindow = new google.maps.InfoWindow({map: window.map});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {lat: position.coords.latitude,
							   lng: position.coords.longitude
							  };

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found.');
			window.map.setCenter(pos);
			}, function() {handleLocationError(true, infoWindow, window.map.getCenter()); });
		}
		else {
		// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, window.map.getCenter());

		}
	myApp();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}
