// store the value of the input
let city;

// store api key
const apiKey = "&appid=bf815721c88bed0e2f63277265b25b11";

let date = new Date();

// this adds the current day and time on the page using moment
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
$("#currentTime").text(moment().format("LT"));

$("#searchCity").keypress(function (event) {
	// enter key
	if (event.keyCode === 13) {
		event.preventDefault();
		$("#searchBtn").click();
	}
});

// populates history on page
listCities();
function listCities() {
	$("#cityList").html("");
	var cities = JSON.parse(localStorage.getItem("cities")) || [];
	console.log(cities);
	for (var i = 0; i < cities.length; i++)
		$(".list").append('<li class="list-item">' + cities[i] + "</li>");
}
// localStorage
function makeList() {
	var cities = JSON.parse(localStorage.getItem("cities")) || [];
	if (cities.indexOf(city) === -1) {
		cities.push(city);
		console.log(cities);
	}
	localStorage.setItem("cities", JSON.stringify(cities));
	listCities();
}

// sets on click for the list of cities in the history list
$(".list-item").on("click", function () {
	city = $(this).text();
	$("#searchCity").val(city);
	$("#searchBtn").click();
});

// searching a city
$("#searchBtn").on("click", function () {
	// get the value of the input from user
	city = $("#searchCity").val().trim();

	// clear input box
	$("#searchCity").val("");

	// full url to call api
	const queryUrl =
		"https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
	$.ajax({
		url: queryUrl,
		method: "GET",
	}).then(function (response) {
		getCurrentConditions(response);
		getCurrentForecast(response);
		makeList();
	});

	function getCurrentConditions(response) {
		// get the temperature and convert to fahrenheit
		let tempF = (response.main.temp - 273.15) * 1.8 + 32;
		tempF = Math.floor(tempF);
		// pulling lon and lat for the UVIndex
		var lon = response.coord.lon;
		var lat = response.coord.lat;
		$("#currentCity").empty();

		// get and set the content in card
		const card = $("<div>").addClass("card");
		const cardBody = $("<div>").addClass("card-body pb-0 pl-2");
		const city = $("<h4>").addClass("card-title").text(response.name);
		const cityDate = $("<h6>")
			.addClass("card-title")
			.text(date.toLocaleDateString("en-US"));
		const temperature = $("<p>")
			.addClass("card-text current-temp")
			.text("Temperature: " + tempF + " °F");
		const humidity = $("<p>")
			.addClass("card-text current-humidity")
			.text("Humidity: " + response.main.humidity + "%");
		const wind = $("<p>")
			.addClass("card-text current-wind")
			.text("Wind Speed: " + response.wind.speed + " MPH");
		const image = $("<img>").attr(
			"src",
			"https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
		);
		const UVIndextxt = $("<p>")
			.addClass("card-text font-weight-light small")
			.text("UV Index: 0-4 low(green), 4-7 moderate(yellow), 8-11 high(red)");

		// add to page
		city.append(cityDate, image);
		cardBody.append(city, temperature, humidity, wind, UVIndextxt);
		card.append(cardBody);
		$("#currentCity").append(card);

		//   * UV index
		// Pulling lon, lat info to uvIndex
		uvIndex(lon, lat);

		function uvIndex(lon, lat) {
			// SEARCHES
			var UVQuery =
				"https://api.openweathermap.org/data/2.5/uvi?" +
				apiKey +
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
				$("#currentCity").append(card);
				const UVbadge = $("<div>")
					.addClass("badge mt-auto")
					.text("UV Index: " + uvFinal);
				$("#currentCity").append(UVbadge);
				// then style uvFinal button with below
				if (uvFinal < 4) {
					// if 0-4 green bagde
					UVbadge.addClass("badge-pill badge-success");
				} else if (uvFinal < 8) {
					// if 4-7 yellow bagde
					UVbadge.addClass("badge-pill badge-warning");
				} else if (uvFinal < 12) {
					// if 8-11 red badge
					UVbadge.addClass("badge-pill badge-danger");
				} else {
					// if 12+ dark badge
					UVbadge.addClass("badge-pill badge-dark");
				}
			});
		}
	}

	function getCurrentForecast() {
		$.ajax({
			url:
				"https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
			method: "GET",
		}).then(function (response) {
			$("#forecast").empty();
			$("#forecastH5").addClass("mt-3 mb-3 ml-2").text("5 Day Forecast:");
			// variable to hold response.list
			let results = response.list;

			for (let i = 0; i < results.length; i++) {
				let day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
				let hour = results[i].dt_txt.split("-")[2].split(" ")[1];

				if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
					// get the temperature and convert to fahrenheit
					let temp = (results[i].main.temp - 273.15) * 1.8 + 32;
					let tempF = Math.floor(temp);
					const card = $("<div>").addClass(
						"card col-md-2 ml-4 mb-4 text-black"
					);
					const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
					const cityDate = $("<h6>")
						.addClass("card-title")
						.text(moment(results[i].dt_txt).format("MM/DD/YYYY"));
					const temperature = $("<p>")
						.addClass("card-text forecastTemp")
						.text("Temperature: " + tempF + " °F");
					const humidity = $("<p>")
						.addClass("card-text forecastHumidity")
						.text("Humidity: " + results[i].main.humidity + "%");
					const image = $("<img>").attr(
						"src",
						"https://openweathermap.org/img/w/" +
							results[i].weather[0].icon +
							".png"
					);
					cardBody.append(cityDate, image, temperature, humidity);
					card.append(cardBody);
					$("#forecast").append(card);
				}
			}
		});
	}
});
