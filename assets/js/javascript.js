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
     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";
     
     var info = {
         "async": true,
         "crossDomain": true,
         "url": apiUrl,
         "method": "GET"
     }
 
     $.ajax(info).done(function (response) {
     console.log(response);

        // DAY 1
        // display date 
        var date = new Date(response.daily[0].dt);
        $("#weatherDate1").append(date);

        // display icon for current weather condition 
        var url = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon+ "@2x.png";
        $("#weatherIcon1").append($('<img>',{id:'temp',src:url}));

        //display temp
        var temp = response.daily[0].temp.day;
        $("#temp1").append("Temp: " + temp + "°F");

        //display wind speed
        var windSpeed = response.daily[0].wind_speed; 
        $("#wind1").append("Wind Speed: " + windSpeed);

        //display humidity 
        var humidity = response.daily[0].humidity;
        $("#humidity1").append("Humidity: " + humidity);

        // Date 2
        var date = new Date(response.daily[1].dt);
        $("#weatherDate2").append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon+ "@2x.png";
        $("#weatherIcon2").append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[1].temp.day;
        $("#temp2").append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[1].wind_speed; 
        $("#wind2").append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[1].humidity;
        $("#humidity2").append("Humidity: " + humidity);

        // Date 3
        var date = new Date(response.daily[2].dt);
        $("#weatherDate3").append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon+ "@2x.png";
        $("#weatherIcon3").append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[2].temp.day;
        $("#temp3").append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[2].wind_speed; 
        $("#wind3").append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[2].humidity;
        $("#humidity3").append("Humidity: " + humidity);

        // Date 4
        var date = new Date(response.daily[3].dt);
        $("#weatherDate4").append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon+ "@2x.png";
        $("#weatherIcon4").append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[3].temp.day;
        $("#temp4").append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[3].wind_speed; 
        $("#wind4").append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[3].humidity;
        $("#humidity4").append("Humidity: " + humidity);

        // Date 5
        var date = new Date(response.daily[4].dt);
        $("#weatherDate5").append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon+ "@2x.png";
        $("#weatherIcon5").append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[4].temp.day;
        $("#temp5").append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[4].wind_speed; 
        $("#wind5").append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[4].humidity;
        $("#humidity5").append("Humidity: " + humidity);
     

    });

};
