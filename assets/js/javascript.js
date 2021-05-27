var apiKey = "c6853d2002a12eaec2efc01b665b157c";

// current weather: city name, date, an icon for weathes conditions, temperature, humidity, wind speed, and UV index

$(document).ready(function () {

    //when page loads display all user city inputs

    // when button is clicked
    $('.btn').click(function () {

        // variable for inputed city 
        var city = $('#userCity').val();
        var location = $('#userCity').attr('name');

        // store inputs
        localStorage.setItem(location, city);

        getWeather(city);

        //prevent button click from sending browser to new url
        return false; 

    });

});

//global city variable

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
