// ---------------------MAPS CODE begin HERE----------------------
// Google Maps API key = AIzaSyBcw9pJVFgt3Cf1WVVXPeepdHhCKO0rMns

var map;
function initMap() {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));
	map = new google.maps.Map(document.getElementById('map-display'), {
		center: {lat, lng},
		zoom: 8
	  });
}

// update map function - will update the lat and lng values up there ^