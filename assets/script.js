// requiered variables and values for this app
let stateCode = [
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
],
  select = $('#selectState'),
  stateSelect = '',
  // lat = '',
  // lon = '',
  parkInfo = [],
  zz = -1,
  npsAPIkey = "UOZg2ZNMkNetItkWpIxQwpmJ7DHBTIjPiNZQjxYo",
  wAPIkey = "bf815721c88bed0e2f63277265b25b11";
// bread crumbs are put in for the state and the national park name
$('#ifStateSelected').hide();
$('#ifParkSelected').hide();

// show all state for selection
if (select) {
  for (let i = 0; i < stateCode.length; i++) {
    let el = $('<option>').attr('value', stateCode[i]).text(stateCode[i]);
    select.append(el);
  }
}

$('#submitBtn').on('click', () => {
  stateSelect = $(select).val();
  populateState(stateSelect);
});

populateState = (x) => {
  const npsQueryURL = `https://developer.nps.gov/api/v1/parks?api_key=${npsAPIkey}&stateCode=${x}`;
  // show loader
  $("#container").append(`
      <div id="loadingIcon" class="progress">
          <div class="indeterminate"></div>
      </div>
  `);

  $.ajax({
    url: npsQueryURL,
    method: 'GET',
  }).then((res) => {
    parkInfo = res;
    loadThisParks(x);
  })
}
// using the function for more park info, 
function loadThisParks(x) {
  $("#loadingIcon").hide();//hide loader
  $("header").hide();//hide header
  $('#ifStateSelected').show(); // breadcrumbs
  $('#showStateName').text(x); //also breadcrumbs
  $(".parks").append(`
      <div class="row" id="myCard"></div>
  `);
  let parks = parkPage(parkInfo);
  parks.forEach(function (park) {
    $("#myCard").append(park);
  }); // the park info is taken from our global var to be used here line 114
}
// park page creates an individual card and we are putting it one by one for each card 
function parkPage(x) {
  return x.data.map(function (park) {
    zz++;
    console.log(park);
    // let parkCallBtn = JSON.parse(park);
    const parkName = park.fullName;
    console.log(parkName);

    const hours = park.operatingHours[0].standardHours.monday,
      directions = park.directionsUrl,
      description = park.description;
    lon = park.longitude;
    lat = park.latitude;

    return `
      <div class="col s12 m6 l4">
          <div class="card small">
            <div class="card-content">
              <h4>${parkName}</h4>
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${hours}<i class="material-icons right">more_vert</i></span>
                      <button><a href="${directions}">Directions</a></button>
                <button class="learnMoreThisPark" value ="${zz}" onclick="dosomething(this.value)">Explore More ></button>
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

dosomething = (x) => {
  let y = parkInfo.data[x];
  $('#ifParkSelected').show();
  $('#showParkName').text(y.fullName);
  $('#myCard').hide();

  let xx = y.latitude;
  let yy = y.longitude;
  console.log(xx);
  console.log(yy);




  $(".parks").append(`
      <div class="row" id="myPark">
          <div class = "col s12">
              <div class="card">
                  <div style="background-image: url('${y.images[0].url}');height:300px;background-attachment:fixed;background-position:bottom;background-repeat:no-repeat;
                  background-size:cover;">
                      
                  </div>
              </div>
              <div class="card">
                  <div class="card-content"  style="text-align:center;">
                      <h2>${y.fullName}</h2>
                      <h4>${y.designation}</h4>
                      <h5><a href="${y.url}" target="_blank">${y.url}</a></h5>
                      <h4>PHONE: <span style='color:red;'>${y.contacts.phoneNumbers[0].phoneNumber}</span></h4>
                  </div>  
              </div>
              <div class="card">
                  <div class="card-content">
                      <div style="padding:20px;">
                          <h4><span style='color:red;'>DIRECTION:</span> ${y.directionsInfo}
                          <br/>
                          </h4>
                          <h6>Plan Your Visit Here:
                          <a href="${y.directionsUrl}" target="_blank">${y.directionsUrl}</a>
                          </h6>
                          <br/><br/>
                          <div id="map" style="height:500px; width:100%;"></div>
                      </div>
                  </div>
              </div>
              <div class="card">
                  <div class="card-content">
                      <div style="padding:20px;">
                          <h4><span style='color:red;'>WEATHER:</span> ${y.weatherInfo}</h4>
                          <h4 id="date"></h4>
                          <div class="weather row">
                            <div class="col s4">
                            <img id="icon">
                            </div>
                            <div class="col s4">
                              <h6 id="temp-today"></h6>
                            </div>
                            <div class= "col s4">
                              <h6 id="feels-like"></h6>
                            </div>
                          </div>
                          <div class="weather row">
                            <div class= "col s6">
                              <h6 id="wind-today"></h6>
                            </div>
                            <div class= "col s6">
                              <h6 id="hum-today"></h6>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `);

  initWeather(xx, yy);
  initMap(xx, yy);
}


var map;
function initMap(x, y) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(x, y),
    mapTypeId: 'terrain'
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //     'Error: The Geolocation service failed.' :
  //     'Error: Your browser doesn\'t support geolocation.');
  //   infoWindow.open(map);
  // }

  window.eqfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
  }
}

function initWeather(x, y) {
  const wQueryURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${wAPIkey}`

  $.ajax({
    url: wQueryURL,
    method: "GET",
  }).then(function (response) {
    // select city of park pulled up
    console.log(response);
    parkWeather(response);
    let icon = response.weather[0].icon;
    $("#icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
  });
}

function parkWeather(response) {
  // todays date:
  $("#date").html(moment().format("dddd, MMMM Do YYYY"));
  // get the temperature and convert to fahrenheit
  let tempF = (response.main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);
  const displayTodayTemp = $("<p>").text("Temperature: " + tempF + " °F");
    $("#temp-today").html(displayTodayTemp);
  // get the feels like temperature and convert to fahrenheit
  let feelsLike = Math.floor((response.main.feels_like - 273.15) * 1.8 + 32);
  const displayFeelsLike = $("<p>").text("Feels like: " + feelsLike + " °F");
   $("#feels-like").html(displayFeelsLike);

  //  get the wind speed, display it with units, and put it in the right column
  let windSpeed = response.wind.speed;
  $("#wind-today").html("Wind Speed: " + windSpeed + " MPH");

  //  get the wind speed, display it with units, and put it in the right column
  var humToday = response.main.humidity
  $("#hum-today").html("Humidity: " + humToday + "%");
}