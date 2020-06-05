// User will select a state from a dropdown list
var select = document.getElementById("selectState");
// Array of available states.
var stateCode = [
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

// Populates the dropdown with array from stateCode.
// This will prevent the appendChild function from causing errors
if (select) {
  for (var i = 0; i < stateCode.length; i++) {
    var opt = stateCode[i];
    var el = document.createElement("option");
    el.setAttribute("value", opt);
    el.textContent = opt;
    select.appendChild(el);
  }
}

// Makes submit button only targed the specific state.
$(document).ready(function () {
  $("#submitBtn").on("click", function () {
    let stateCode = $("#selectState option:selected").text();
    // Makes the api only pull data for the state selected.
    populateState(stateCode);
  });
});
$("select").val("option-value");

// Ajax for State
function populateState(stateCode) {
  const NPSAPIkey = "UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo";
  const NPSqueryURL =
    "https://developer.nps.gov/api/v1/parks?api_key=UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo" +
    "&stateCode=" +
    stateCode;

  // append a loading icon here
  $(".loaderIcon").append(`<div class="indeterminate"></div>`);
  $(".txtLoading").html("LOADING...");

  $.ajax({
    url: NPSqueryURL,
    method: "GET",
  }).then(function (response) {
    // remove the loading icon here
    $(".loaderIcon").remove("div");

    $("#state-name").text(stateCode);

    var parks = parkPage(response);
    $(".parks").append(`
		<div class="row" id="myCard"></div>
	`);

    parks.forEach(function (park) {
      $("#myCard").append(park);
    });
    $("#selectState").val(stateCode);
    stateCode.push(response.data.contacts.fullName);
  });
}
//function is called when ajax function runs inside the populateState function.
function parkPage(parksArray) {
  // park page will take in an array of many parks and their info and return an array of ONLY the park names
  return parksArray.data.map(function (park) {
    console.log(park);
    const parkName = park.fullName;
    const hours = park.operatingHours[0].standardHours.monday;
    const directions = park.directionsUrl;
    const lon = park.longitude;
    const lat = park.latitude;
    const description = park.description;

    console.log(parkName);
    console.log(hours);
    console.log(directions);
    // console.log(item.activities[""].names);
    console.log(lon);
    console.log(lat);

    return `
		<div class="col s12 m6 l4">
		<div class="card small">
			<div class="card-content">
				<h4>${parkName}</h4>
			</div>
			<div class="card-content">
			<span class="card-title activator grey-text text-darken-4">${hours}<i class="material-icons right">more_vert</i></span>
			<p><a href="${directions}">Directions</a></p>
			<p><a href="info.html?lat=${lat}&lng=${lon}">Weather, Map, and Photos</a></p>
		  </div>
		  <div class="card-reveal">
			<span class="card-title grey-text text-darken-4">${parkName}<i class="material-icons right">close</i></span>
			<p>${description}</p>
		  </div>		
		  </div>
		  </div>
		`;
  });
}

function showParkInfo(e) {
  console.log(e);
  $(e).siblings(".parkInfo").toggle();
}

//----------------------------before this is a branch-master dispute------------------

// -------API call to the OpenWeather API---------------This code is fully functional.-----
// --------No need to modify the weather section att.--------------------------------
const WapiKey = "&appid=bf815721c88bed0e2f63277265b25b11";
const WqueryURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  WapiKey;
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  // select city of park pulled up
  parkWeather(response);
});

$(document).ready(function () {
  $(".slider").slider();
});

//on click event to get the data val of lon lat
//----------------------------this is a branch-master dispute------------------
// google maps api
var map = new google.maps.Map(document.getElementById("map"), {
  //  fix to pull from above lat/lon
  center: { lat, lon },
  zoom: 8,
});

// ---------------------MAPS CODE begin HERE----------------------
// Google Maps API key = AIzaSyBcw9pJVFgt3Cf1WVVXPeepdHhCKO0rMns

var map;
function initMap() {
  const params = new URLSearchParams(window.location.search);
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));
  map = new google.maps.Map(document.getElementById("map-display"), {
    center: { lat, lng },
    zoom: 8,
  });
}
// update map function - will update the lat and lng values up there ^

//----------------------------before this is a branch-master dispute------------------

// -------API call to the OpenWeather API---------------This code is fully functional.-----
// --------No need to modify the weather section att.--------------------------------
const WapiKey = "&appid=bf815721c88bed0e2f63277265b25b11";
const WqueryURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  WapiKey;
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  // select city of park pulled up
  parkWeather(response);
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
  // uvIndex(lon, lat);

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
        .addClass(badge)
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
