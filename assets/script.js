// User will select a state from a dropdown list
const searchBtn = $("search");
var city = "";
var select = document.getElementById("selectNumber");

let stateCode = "",
	lat = "",
	lon = "";
var state = [
	"AL",
	"AK",
	"AS",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FM",
	"FL",
	"GA",
	"GU",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MH",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"MP",
	"OH",
	"OK",
	"OR",
	"PW",
	"PA",
	"PR",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VI",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];
for (var i = 0; i < state.length; i++) {
	var opt = state[i];
	var el = document.createElement("option");
	el.textContent = opt;
	el.value = opt;
	select.appendChild(el);
}
// call for the search button to activate the function to search for the state and city info
$(document).on("click", "#search", function () {
	let NPSqueryURL = $(".form-control").val();
	stateCode = $("#selectNumber").val();

	console.log(stateCode);
	console.log(NPSqueryURL);
});

$("#searchBtn").on("click", function () {
	stateCode = $("#selectState").val().trim();
	city = $("searchCity").val().trim();
});

// Ajax for State
const NPSAPIkey = "UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo";
const NPSqueryURL =
	"https://developer.nps.gov/api/v1/parks?api_key=UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo" +
	"&stateCode=" +
	stateCode;

$.ajax({
	url: NPSqueryURL,
	method: "GET",
}).then(function (response) {
	console.log(response);
	parkPage(response);
	lat = response.data.latitude;
	lon = response.data.longitude;
});
function parkPage(response) {}
// pull up parks
// var city so we can pull up the weather using .dotation
// API call to the OpenWeather API
const WapiKey = "&appid=bf815721c88bed0e2f63277265b25b11";
const WqueryURL =
	"https://api.openweathermap.org/data/2.5/weather?lat=" +
	lat +
	"&lon=" +
	lon +
	"&appid=" +
	WapiKey;
$.ajax({
	url: WqueryURL,
	method: "GET",
}).then(function (response) {
	// select city of park pulled up
	// parkWeather(response);
	console.log(response);
});

function parkWeather(response) {
	// get the temperature and convert to fahrenheit
	let tempF = (response.main.temp - 273.15) * 1.8 + 32;
	tempF = Math.floor(tempF);
	// pulling lon and lat for the UVIndex
	var lon = response.coord.lon;
	var lat = response.coord.lat;
	$("#currentCity").empty();

	// get and set the content
	const card = $("<div>").addClass("card");
	const cardBody = $("<div>").addClass("card-body");
	const city = $("<h4>").addClass("card-title").text(response.name);
	const parkName = $("<h4>");
	//  .addClass("card-title")
	//  .text(date.toLocaleDateString("en-US"));
	const temperature = $("<p>")
		.addClass("card-text current-temp")
		.text("Temperature: " + tempF + " °F");
	const humidity = $("<p>")
		.addClass("card-text current-humidity")
		.text("Humidity: " + response.main.humidity + "%");
	const wind = $("<p>")
		.addClass("card-text current-wind")
		.text("Wind Speed: " + response.wind.speed + " MPH");
	//  const image = $("<img>").attr(
	//  "src",
	//  "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
	//  );
	// add to page
	city.append(parkName, image);
	cardBody.append(city, temperature, humidity, wind);
	card.append(cardBody);
	//  select the id we use to display weather
	$("").append(card);
	//   * UV index
	// Pulling lon, lat info to uvIndex
	uvIndex(lon, lat);

	function uvIndex(lon, lat) {
		// SEARCHES
		var UVQuery =
			"http://api.openweathermap.org/data/2.5/uvi?" +
			WapiKey +
			"&lat=" +
			lat +
			"&lon=" +
			lon;

		$.ajax({
			url: UVQuery,
			method: "GET",
		}).then(function (response) {
			const uvFinal = response.value;
			// then append button with uvFinal printed to it
			// select the id we use to display weather
			$("").append(card);
			var badge = $("<div>")
				.addClass("badge")
				.text("UV Index: " + uvFinal);
			$("").append(badge);
			// then style uvFinal button with below
			if (uvFinal < 3) {
				// IF RETURN IS 0-2 SYLE GREEN
				badge.attr("class", " badge-pill badge-success");
			} else if (uvFinal < 6) {
				// IF 3-5 STYLE YELLOW
				badge.attr("class", "badge-pill badge-warning");
			} else if (uvFinal < 8) {
				// IF 6-7 STYLE ORANGE
				badge.attr("class", "badge-pill badge-warning");
			} else if (uvFinal < 11) {
				// IF 8-10 STYLE RED
				badge.attr("class", "badge-pill badge-danger");
			} else {
				// IF 11+ STYLE VIOLET
				badge.attr("class", "badge-pill badge-dark");
			}
		});
	}
}
