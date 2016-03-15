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
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/rain.png" />');
              break;
            case "partly-cloudy-day":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/partly-cloudy-day.png" />');
              break;
            case "clear-day":
              $('#' + id).prepend('<img class="img-responsive sub-img" class="img-center" src="img/clear-day.png" />');
              break;
            case "clear-night":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/clear-night.png" />');
              break;
            case "cloudy":
              $('#' + id).prepend('<img class="img-responsive sub-img" class="img-center" src="img/cloudy.png" />');
              break;
            case "fog":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/fog.png" />');
              break;
            case "sleet":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/sleet.png" />');
              break;
            case "snow":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/snow.png" />');
              break;
            case "wind":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/wind.png" />');
              break;
            case "partly-cloudy-day":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/partly-cloudy-day.png" />');
              break;
            case "partly-cloudy-night":
              $('#' + id).prepend('<img class="img-responsive sub-img" src="img/partly-cloudy-night.png" />');
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
        $("#day-one").html(weather.daily.data[2].time);
        $("#day-one-cond").html(weather.daily.data[2].summary);
        $("#day-one-temp-min").html(Math.round(weather.daily.data[2].temperatureMin) + '\u2109');
        $("#day-one-temp-max").html(Math.round(weather.daily.data[2].temperatureMax) + '\u2109');
        $('#day-one-cond-icon').html(getIcons(weather.daily.data[2].icon, 'day-one-cond-icon'));
        // Day Two
        $("#day-two").html(weather.daily.data[3].time);
        $("#day-two-cond").html(weather.daily.data[3].summary);
        $("#day-two-temp-min").html(Math.round(weather.daily.data[3].temperatureMin) + '\u2109');
        $("#day-two-temp-max").html(Math.round(weather.daily.data[3].temperatureMax) + '\u2109');
        $('#day-two-cond-icon').html(getIcons(weather.daily.data[3].icon, 'day-two-cond-icon'));
        // Day Three
        $("#day-three").html(weather.daily.data[4].time);
        $("#day-three-cond").html(weather.daily.data[4].summary);
        $("#day-three-temp-min").html(Math.round(weather.daily.data[4].temperatureMin) + '\u2109');
        $("#day-three-temp-max").html(Math.round(weather.daily.data[4].temperatureMax) + '\u2109');
        $('#day-three-cond-icon').html(getIcons(weather.daily.data[4].icon, 'day-three-cond-icon'));
        // Day Four
        $("#day-four").html(weather.daily.data[5].time);
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
          $("#day-three-temp-max").html(Math.round(weather.daily.data[4].temperatureMax)  + '\u2109');
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
      });
    } // getWeather();
    $("#chk-weather").click(getWeather);

  });
  getLocation();
};
//Window.onload
