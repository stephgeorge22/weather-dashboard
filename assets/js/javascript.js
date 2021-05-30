var apiKey = "c6853d2002a12eaec2efc01b665b157c";

$(document).ready(function () {

    //when page loads display all user city inputs

    keys = Object.keys(localStorage);
    for (i=0; i < keys.length; i++) {
        // append city to buttons
        $('#storage').append('<button type="submit" id="' + keys[i] + '" value="' + keys[i] + '" class="btn btn-stored" >' + keys[i] + '</button>');
    };
    
    // button click for stored stock tickers
    $('.btn-stored').click(function () {
        // find city value
        var city = $(this).attr('value');

        getWeather(city);

    });

    // when button is clicked
    $('#newInput').click(function () {

        keys = Object.keys(localStorage);

        // variable for inputed city 
        var city = $('#userCity').val();
        var location = $('#userCity').attr('name');

        // do not store null values
        if (!city) {
            return false
        };

        //create button for unique searched stock
        var checkKeys = jQuery.inArray( city, keys);

        // unique value < 0 , repeat value > 0
        if (checkKeys < 0) {
            
            //local storage 
            localStorage.setItem(city, "");

            $('#storage').append('<button type="submit" id="' + city + '" value="' + city + '" class="btn btn-stored" >' + city + '</button>');
        };

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

    // display city name 
    $("#weatherInfo").empty().append(city);
    
    // display current date 
    var date = moment().format('MMM Do YYYY');
    $("#weatherInfo").append(" (" + date + ")");

    // display icon for current weather condition 
    var url = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    $("#weatherInfo").append($('<img>',{id:'temp',src:url}));

    //display temperature
    var temp = response.main.temp;
    $("#temperature").empty().append("Temp: " + temp + "°F");

    // display humidity 
    var humidity = response.main.humidity;
    $("#humidity").empty().append("Humidity: " + humidity);

    // display wind speed
    var windSpeed = response.wind.speed; 
    $("#wind").empty().append("Wind Speed: " + windSpeed);

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
        $("#uvIndex").empty().append("UV Index: " + uv);

        if (uv < 3) {
            $("#uvIndex").css({'background-color':'green'});
        }

        else if (uv > 9) {
            $("#uvIndex").css({'background-color':'red'});
        }

        else {
            $("#uvIndex").css({'background-color':'yellow'});
        };
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
        var date = (new Date((response.daily[0].dt)*1000)).toDateString();
        $("#weatherDate1").empty().append(date);

        // display icon for current weather condition 
        var url = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon+ "@2x.png";
        $("#weatherIcon1").empty().append($('<img>',{id:'temp',src:url}));

        //display temp
        var temp = response.daily[0].temp.day;
        $("#temp1").empty().append("Temp: " + temp + "°F");

        //display wind speed
        var windSpeed = response.daily[0].wind_speed; 
        $("#wind1").empty().append("Wind Speed: " + windSpeed);

        //display humidity 
        var humidity = response.daily[0].humidity;
        $("#humidity1").empty().append("Humidity: " + humidity);

        // Date 2
        var date = (new Date((response.daily[1].dt)*1000)).toDateString();
        $("#weatherDate2").empty().append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon+ "@2x.png";
        $("#weatherIcon2").empty().append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[1].temp.day;
        $("#temp2").empty().append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[1].wind_speed; 
        $("#wind2").empty().append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[1].humidity;
        $("#humidity2").empty().append("Humidity: " + humidity);

        // Date 3
        var date = (new Date((response.daily[2].dt)*1000)).toDateString();
        $("#weatherDate3").empty().append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon+ "@2x.png";
        $("#weatherIcon3").empty().append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[2].temp.day;
        $("#temp3").empty().append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[2].wind_speed; 
        $("#wind3").empty().append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[2].humidity;
        $("#humidity3").empty().append("Humidity: " + humidity);

        // Date 4
        var date = (new Date((response.daily[3].dt)*1000)).toDateString();
        $("#weatherDate4").empty().append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon+ "@2x.png";
        $("#weatherIcon4").empty().append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[3].temp.day;
        $("#temp4").empty().append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[3].wind_speed; 
        $("#wind4").empty().append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[3].humidity;
        $("#humidity4").empty().append("Humidity: " + humidity);

        // Date 5
        var date = (new Date((response.daily[4].dt)*1000)).toDateString();
        $("#weatherDate5").empty().append(date);
    
        var url = "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon+ "@2x.png";
        $("#weatherIcon5").empty().append($('<img>',{id:'temp',src:url}));
    
        var temp = response.daily[4].temp.day;
        $("#temp5").empty().append("Temp: " + temp + "°F");
    
        var windSpeed = response.daily[4].wind_speed; 
        $("#wind5").empty().append("Wind Speed: " + windSpeed);
    
        var humidity = response.daily[4].humidity;
        $("#humidity5").empty().append("Humidity: " + humidity);
    });
};
