// Call API

// leave as "" for null value 
var city = "London"
var apiKey = "c6853d2002a12eaec2efc01b665b157c";

// current weather: city name, date, an icon for weathes conditions, temperature, humidity, wind speed, and UV index

var getWeather = function(city) {
// format the github api url
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};

getWeather(city);