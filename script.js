window.onload = function() {
  var x = document.getElementById("demo");
  var userLatitude = 0;
  var userLongitude = 0;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log(userLatitude);
    $("#your-loc").html();
  }

  function convertDate(value) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(value * 1000);
    // Hours part from the timestamp
    var day = date.getDay();
    console.log(day);
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        console.log("error");
        break;
    }
  }
  $(function() {
    function getWeather() {
      var apiKey = '204a0339756b548adbc86bc3e5674412';
      var url = 'https://api.forecast.io/forecast/';
      var weather;
      $.getJSON(url + apiKey + "/" + userLatitude + "," + userLongitude + "?callback=?", function(weather) {
        //console.log(weather);
        function getIcons(value, id) {
          var summary = value;
          console.log(summary);
          switch (summary) {
            case "rain":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/rain.png' />";
              break;
            case "partly-cloudy-day":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/partly-cloudy-day.png' />";
              break;
            case "clear-day":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/clear-day.png' />";
              break;
            case "clear-night":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img//clear-night.png' />";
              break;
            case "cloudy":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/cloudy.png.png' />";
              break;
            case "fog":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/fog.png' />";
              break;
            case "sleet":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/sleet.png' />";
              break;
            case "snow":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/snow.png' />";
              break;
            case "wind":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/wind.png' />";
              break;
            case "partly-cloudy-day":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/partly-cloudy-day.png' />";
              break;
            case "partly-cloudy-night":
              document.getElementById(id).innerHTML = "<img class='img-responsive sub-img' src='img/partly-cloudy-night.png' />";
              break;
            default:
              break;
          } // end of switch
        } //end of getIcons();
        // RIGHT NOW
        $("#current-temp").html(Math.round(weather.currently.temperature) + '\u2109');
        $("#feel-temp").html(Math.round(weather.currently.apparentTemperature) + '\u2109');
        $("#current-wind").html(Math.round(weather.currently.windSpeed));
        $("#current-cond-icon").html(getIcons(weather.currently.icon, 'current-cond-icon'));
        $("#current-cond").html(weather.currently.summary);
        $("#current-humidity").html(weather.currently.humidity);
        /* 4-Day forecast temperatureMin */
        // Day One
        $("#day-one").html(convertDate(weather.daily.data[2].time));
        $("#day-one-cond").html(weather.daily.data[2].summary);
        $("#day-one-temp-min").html(Math.round(weather.daily.data[2].temperatureMin) + '\u2109');
        $("#day-one-temp-max").html(Math.round(weather.daily.data[2].temperatureMax) + '\u2109');
        $('#day-one-cond-icon').html(getIcons(weather.daily.data[2].icon, 'day-one-cond-icon'));
        // Day Two
        $("#day-two").html(convertDate(weather.daily.data[3].time));
        $("#day-two-cond").html(weather.daily.data[3].summary);
        $("#day-two-temp-min").html(Math.round(weather.daily.data[3].temperatureMin) + '\u2109');
        $("#day-two-temp-max").html(Math.round(weather.daily.data[3].temperatureMax) + '\u2109');
        $('#day-two-cond-icon').html(getIcons(weather.daily.data[3].icon, 'day-two-cond-icon'));
        // Day Three
        $("#day-three").html(convertDate(weather.daily.data[4].time));
        $("#day-three-cond").html(weather.daily.data[4].summary);
        $("#day-three-temp-min").html(Math.round(weather.daily.data[4].temperatureMin) + '\u2109');
        $("#day-three-temp-max").html(Math.round(weather.daily.data[4].temperatureMax) + '\u2109');
        $('#day-three-cond-icon').html(getIcons(weather.daily.data[4].icon, 'day-three-cond-icon'));
        // Day Four
        $("#day-four").html(convertDate(weather.daily.data[5].time));
        $("#day-four-cond").html(weather.daily.data[7].summary);
        $("#day-four-temp-min").html(Math.round(weather.daily.data[5].temperatureMin) + '\u2109');
        $("#day-four-temp-max").html(Math.round(weather.daily.data[5].temperatureMax) + '\u2109');
        $('#day-four-cond-icon').html(getIcons(weather.daily.data[7].icon, 'day-four-cond-icon'));
        /* End of 4-day forecast */

        function convertToCelsius(value) {
          return (value - 32) * (5 / 9);
        }

        function enableFahrenheit() {
          $("#current-temp").html(Math.round(weather.currently.temperature) + '\u2109');
          $("#feel-temp").html(Math.round(weather.currently.apparentTemperature) + '\u2109');
          $("#day-one-temp-min").html(Math.round(weather.daily.data[2].temperatureMin) + '\u2109');
          $("#day-one-temp-max").html(Math.round(weather.daily.data[2].temperatureMax) + '\u2109');
          $("#day-two-temp-min").html(Math.round(weather.daily.data[3].temperatureMin) + '\u2109');
          $("#day-two-temp-max").html(Math.round(weather.daily.data[3].temperatureMax) + '\u2109');
          $("#day-three-temp-min").html(Math.round(weather.daily.data[4].temperatureMin) + '\u2109');
          $("#day-three-temp-max").html(Math.round(weather.daily.data[4].temperatureMax) + '\u2109');
          $("#day-four-temp-min").html(Math.round(weather.daily.data[5].temperatureMin) + '\u2109');
          $("#day-four-temp-max").html(Math.round(weather.daily.data[5].temperatureMax) + '\u2109');
        }

        function enableCelcius() {
          $("#current-temp").html(Math.round(convertToCelsius(weather.currently.temperature)) + '\u2103');
          $("#feel-temp").html(Math.round(convertToCelsius(weather.currently.apparentTemperature)) + '\u2103');
          $("#day-one-temp-min").html(Math.round(convertToCelsius(weather.daily.data[2].temperatureMin)) + '\u2103');
          $("#day-one-temp-max").html(Math.round(convertToCelsius(weather.daily.data[2].temperatureMax)) + '\u2103');
          $("#day-two-temp-min").html(Math.round(convertToCelsius(weather.daily.data[3].temperatureMin)) + '\u2103');
          $("#day-two-temp-max").html(Math.round(convertToCelsius(weather.daily.data[3].temperatureMax)) + '\u2103');
          $("#day-three-temp-min").html(Math.round(convertToCelsius(weather.daily.data[4].temperatureMin)) + '\u2103');
          $("#day-three-temp-max").html(Math.round(convertToCelsius(weather.daily.data[4].temperatureMax)) + '\u2103');
          $("#day-four-temp-min").html(Math.round(convertToCelsius(weather.daily.data[5].temperatureMin)) + '\u2103');
          $("#day-four-temp-max").html(Math.round(convertToCelsius(weather.daily.data[5].temperatureMax)) + '\u2103');
        }
        $("#celsius").click(enableCelcius);
        $("#fahrenheit").click(enableFahrenheit);
        // Get name of location
        var geocoder;
        initialize();
        codeLatLng();

        function initialize() {
          geocoder = new google.maps.Geocoder();
        }

        function codeLatLng() {
          var latlng = new google.maps.LatLng(userLatitude, userLongitude);
          geocoder.geocode({
            'latLng': latlng
          }, function(results, status) {
            document.getElementById("your-loc").innerHTML = '' + (results[4].formatted_address) + '';
          });
        } // codeLatLng
        //  End of get name of location
      });
    } // getWeather();
    $("#chk-weather").click(getWeather);
  });
  getLocation();
};
//Window.onload
