// User will select a state from a dropdown list
var select = document.getElementById("selectState");

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

for (var i = 0; i < stateCode.length; i++) {
  var opt = stateCode[i];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt; // stateCode instead of opt?
  select.appendChild(el); // select is defined above on 2 and also here?
}
// ^^^ i think we need to assign a option value so we can pull the selected item by that value....just a thought.
// ^

// Why do we have 77-83? it doesnt really do anything....? at this time...maybe after we get the stateCode value...
// call for the search button to activate the function to search for the state and city info
// $(document).on("click", "#search", function () {
//   let NPSqueryURL = $(".form-control").val();
//   stateCode = $("#selectState").val();
//   console.log(stateCode);
//   console.log(NPSqueryURL);
// });

$(document).ready(function () {
  $("submitBtn").on("click", function () {
    stateCode[i] = $("#selectState").find("option:selected").val();
    stateCode[i] = $(this).val();
  });
});
// $("select").val("option-value");
// stateCode = $(this).children("option:value").val();
// stateCode = $("#selectState option:selected").text();
// stateCode = $("#selectState").val("option");

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

  $("#selectState").val(stateCode);
  stateCode.push(response.data.contacts.fullName);
  //----------------------
  var parkList = response.data.contacts.fullName;
  // for (var i = 0; i < parkList.length; i++) {
  //   var opt = parkList[i];
  //   var el = document.createElement("option");
  //   el.textContent = opt;
  //   el.value = opt;
  //   select.appendChild(el);
  // }

  // need to validate the latitude and longitude

  // const lat = response.data.latitude;
  // const lon = response.data.longitude;
  // call on the weather function and pass these values through
  console.log(response);
  //-----verify functionality later:	parkPage(lat, lon);
  // we need to find a way to stringify the latlon combo in the json selecting thing. They dont have seperate lat and lon
});

function parkPage(response) {
  stateCode = stateCode(response.data.fullName);

  //make: response = stateCode(response.xxxxxxxxx)
  // pull up parks
  // var city so we can pull up the weather using .dotation
}

// -------API call to the OpenWeather API---------------This code is fully functional.-----
//--------No need to modify the weather section att.--------------------------------
// const WapiKey = "&appid=bf815721c88bed0e2f63277265b25b11";
// const WqueryURL =
//   "https://api.openweathermap.org/data/2.5/weather?lat=" +
//   lat +
//   "&lon=" +
//   lon +
//   "&appid=" +
//   WapiKey;
// $.ajax({
//   url: queryUrl,
//   method: "GET",
// }).then(function (response) {
//   // select city of park pulled up
//   parkWeather(response);
// });

// function parkWeather(response) {
//   // get the temperature and convert to fahrenheit
//   let tempF = (response.main.temp - 273.15) * 1.8 + 32;
//   tempF = Math.floor(tempF);
//   // pulling lon and lat for the UVIndex
//   var lon = response.coord.lon;
//   var lat = response.coord.lat;
//   $("#currentCity").empty();

//   // get and set the content
//   const card = $("<div>").addClass("card");
//   const cardBody = $("<div>").addClass("card-body");
//   const city = $("<h4>").addClass("card-title").text(response.name);
//   const parkName = $("<h4>");
//   //  .addClass("card-title")
//   //  .text(date.toLocaleDateString("en-US"));
//   const temperature = $("<p>")
//     .addClass("card-text current-temp")
//     .text("Temperature: " + tempF + " °F");
//   const humidity = $("<p>")
//     .addClass("card-text current-humidity")
//     .text("Humidity: " + response.main.humidity + "%");
//   const wind = $("<p>")
//     .addClass("card-text current-wind")
//     .text("Wind Speed: " + response.wind.speed + " MPH");
//   //  const image = $("<img>").attr(
//   //  "src",
//   //  "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
//   //  );
//   // add to page
//   city.append(parkName, image);
//   cardBody.append(city, temperature, humidity, wind);
//   card.append(cardBody);
//   //  select the id we use to display weather
//   $("").append(card);
//   //   * UV index
//   // Pulling lon, lat info to uvIndex
//   uvIndex(lon, lat);

//   function uvIndex(lon, lat) {
//     // SEARCHES
//     var UVQuery =
//       "http://api.openweathermap.org/data/2.5/uvi?" +
//       WapiKey +
//       "&lat=" +
//       lat +
//       "&lon=" +
//       lon;

//     $.ajax({
//       url: UVQuery,
//       method: "GET",
//     }).then(function (response) {
//       const uvFinal = response.value;
//       // then append button with uvFinal printed to it
//       // select the id we use to display weather
//       $("").append(card);
//       var badge = $("<div>")
//         .addClass(badge)
//         .text("UV Index: " + uvFinal);
//       $("").append(badge);
//       // then style uvFinal button with below
//       if (uvFinal < 3) {
//         // IF RETURN IS 0-2 SYLE GREEN
//         badge.attr("class", " badge-pill badge-success");
//       } else if (uvFinal < 6) {
//         // IF 3-5 STYLE YELLOW
//         badge.attr("class", "badge-pill badge-warning");
//       } else if (uvFinal < 8) {
//         // IF 6-7 STYLE ORANGE
//         badge.attr("class", "badge-pill badge-warning");
//       } else if (uvFinal < 11) {
//         // IF 8-10 STYLE RED
//         badge.attr("class", "badge-pill badge-danger");
//       } else {
//         // IF 11+ STYLE VIOLET
//         badge.attr("class", "badge-pill badge-dark");
//       }
//     });
//   }
// }
