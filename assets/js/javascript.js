var apiKey = "c6853d2002a12eaec2efc01b665b157c";

$(document).ready(function () {

    //when page loads display all user city inputs

    // when button is clicked
    $('.btn').click(function () {

        // variable for inputed city 
        var city = $('#userCity').val();
        var location = $('#userCity').attr('name');

        // store inputs
        localStorage.setItem(location, city);

        // display city name 
        $("#weatherInfo").append(city);

        // display current date 
        var date = moment().format('MMM Do YYYY');
        $("#weatherInfo").append(" (" + date + ")");

        getWeather(city);

        

        //prevent button click from sending browser to new url
        return false; 

    });

});

var getWeather = function(city) {

    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    var info = {
        "async": true,
        "crossDomain": true,
        "url": apiUrl,
        "method": "GET"
    }

    $.ajax(info).done(function (response) {
    console.log(response);

    // display icon for current weather condition 
    var url = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    $("#weatherInfo").append($('<img>',{id:'temp',src:url}));

    // display temperature
    var temp = response.main.temp;
    $("#temp").append("Temp: " + temp + "°F");

    // display humidity 
    var humidity = response.main.humidity;
    $("#humidity").append("Humidity: " + humidity);

    // display wind speed
    var windSpeed = response.wind.speed; 
    $("#wind").append("Wind Speed: " + windSpeed);

    // variables for uv index api call
    var long = response.coord.lon;
    var lat = response.coord.lat;

    getUV(long, lat);

    getFive(long, lat);

    });
};

var getUV = function(long, lat) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=imperial";

    var info = {
        "async": true,
        "crossDomain": true,
        "url": apiUrl,
        "method": "GET"
    }

    $.ajax(info).done(function (response) {
    console.log(response);

        // display uv index
        var uv = response.current.uvi;
        $("#uvIndex").append("UV Index: " + uv);

        if (uv < 3) {
            $("#uvIndex").css({'background-color':'green'});
        };

        // else if (uv > 9) {
        //     $("#uvIndex").css({'background-color':'red'});
        // };

        // else if {
        //     $("#uvIndex").css({'background-color':'yellow'});
        // };
    });
};

var getFive = function(long, lat) {
     // format the github api url
     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,alerts&appid=" + apiKey;
     
     var info = {
         "async": true,
         "crossDomain": true,
         "url": apiUrl,
         "method": "GET"
     }
 
     $.ajax(info).done(function (response) {
     console.log(response);
     

    });

};
