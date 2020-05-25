// User will select a state from a dropdown list
// need to search the API by stateCode and then can input the 2-letter state code (ie, TX, CA, etc)

// API call to the OpenWeather API
// function parkWeather (lat, lon)
// var lat = "";
// var lon = "";
const weatherqueryURL = "api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "lon=" + lon;
// api.openweathermap.org/data/2.5/forecast?lat=35&lon=139


// API call to the NPS
// parkCode = whatever the clicked park is - that code
const APIkey = "UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo";
var NPSqueryURL = "https://developer.nps.gov/api/v1/parks?" + parkCode + "&api_key=UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo";
$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // var latVal = response.datea.latitude
    // var lonVal = response.data.longitude
    // parkWeather(latVal, lonVal)
});