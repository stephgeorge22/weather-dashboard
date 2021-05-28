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
        $("#temp").append(city);

        // display current date 
        var date = moment().format('MMM Do YYYY');
        $("#temp").append(date);

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
    $("#temp").append($('<img>',{id:'temp',src:url}));

    // display temperature
    var temp = response.main.temp;
    $("#temp").append("Temp:" + temp + "°F");

    // display humidity 
    var humidity = response.main.humidity;
    $("#temp").append("Humidity:" + humidity);

    // display wind speed
    var windSpeed = response.wind.speed; 
    $("#temp").append("Wind Speed:" + windSpeed);


    });

    // display uv index 

        // add color for favorable, moderate or severe conditions

};
