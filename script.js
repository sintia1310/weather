$(document).ready(function () {

    //Current Date Header
    $("#cityHeader").empty();
    let currentDate = dayjs().format("D MMM YYYY");
    document.getElementById("cityHeader").text = currentDate;
    $("#cityHeader").append(currentDate);
    
    //Openweather API key
    const apiKey = "04fd169e0aae8bb627a82ef7c675ce19";
    
    //Search button
    const searchBtn = document.querySelector("button.searchBtn");

    //Kick it off
    $(searchBtn).on("click", getForecast);
    
    function getCity() {
        return localStorage.getItem(JSON.parse(choice));
    }
    
    function updateHTML() {
        let city = getCity();

    }
    
    function setCity() {
        // Gets input value
        let city = document.getElementById("searchInput").value;

        let choice = {
            searchedCity: city.trim()
        };
        // Saves data to retrieve later
        localStorage.setItem("searchedCity", JSON.stringify(choice));
        
        let search = $("#searchHistory");
        let savedCity = $("<h5>");
        savedCity.append(city);
        search.append(savedCity);
        // Updates HTML
        updateHTML();
    }
    

    //Search Openweather API with user input
    function getForecast() {
        let city = document.getElementById("searchInput").value;
        let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            showCurrentWeather(response);
            console.log(response);
        })
        setCity();
        
        
    }
    
    
    //Search oneCall API and append forecast date to the page
    function showCurrentWeather(data) {
        
        let temp = "Temperature: " + (1.8 * (data.main.temp - 273) + 32).toFixed(0) + " F°";
        let humidity = "Humidity: " + data.main.humidity;
        let wind = "Wind Speed: " + data.wind.speed.toFixed(0) + "mph";
        
        //Make sure the text areas are empty
        $("#currentCity").empty();
        $("#temp").empty();
        $("#humidity").empty();
        $("#wind").empty();
        $("#uvIndex").empty();
        $(".dayDate").empty();
        $(".dayTemp").empty();
        $(".dayHumi").empty();
        $(".dayUvi").empty();
        
        //Put the date into place
        $("#currentCity").append(data.name);
        $("#temp").append(temp);
        $("#humidity").append(humidity);
        $("#wind").append(wind);
        

        
        //OneCall API
        let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey;
        
        $.ajax({
            url: oneCallUrl,
            method: "GET",
        }).then(function (oneCall) {
            console.log(oneCall);

            let uvi = "UV Index: " + oneCall.daily[0].uvi;
            $("#uvIndex").append(uvi);
            
            //5 day Forecast
            //Day 1    
            let day1Unix = oneCall.daily[1].dt * 1000;
            let day1DateObj = new Date(day1Unix);
            let day1Date = day1DateObj.toLocaleDateString("en-US");
            let day1Temp = "Temp: " + (1.8 * (oneCall.daily[1].temp.day - 273) + 32).toFixed(0) + " F°";
            let day1Humi = "Humidity: " + oneCall.daily[1].humidity;
            let day1Uvi = "UV Index: " + oneCall.daily[1].uvi;
            $("#date1").append(day1Date);
            $("#date1Temp").append(day1Temp);
            $("#date1Humi").append(day1Humi);
            $("#date1Uvi").append(day1Uvi);
            
            //Day2
            let day2Unix = oneCall.daily[2].dt * 1000;
            let day2DateObj = new Date(day2Unix);
            let day2Date = day2DateObj.toLocaleDateString("en-US");
            let day2Temp = "Temp: " + (1.8 * (oneCall.daily[2].temp.day - 273) + 32).toFixed(0) + " F°";
            let day2Humi = "Humidity: " + oneCall.daily[2].humidity;
            let day2Uvi = "UV Index: " + oneCall.daily[2].uvi;
            $("#date2").append(day2Date);
            $("#date2Temp").append(day2Temp);
            $("#date2Humi").append(day2Humi);
            $("#date2Uvi").append(day2Uvi);
            
            //Day 3
            let day3Unix = oneCall.daily[3].dt * 1000;
            let day3DateObj = new Date(day3Unix);
            let day3Date = day3DateObj.toLocaleDateString("en-US");
            let day3Temp = "Temp: " + (1.8 * (oneCall.daily[3].temp.day - 273) + 32).toFixed(0) + " F°";
            let day3Humi = "Humidity: " + oneCall.daily[3].humidity;
            let day3Uvi = "UV Index: " + oneCall.daily[3].uvi;
            $("#date3").append(day3Date);
            $("#date3Temp").append(day3Temp);
            $("#date3Humi").append(day3Humi);
            $("#date3Uvi").append(day3Uvi);
            
            //Day 4
            let day4Unix = oneCall.daily[4].dt * 1000;
            let day4DateObj = new Date(day4Unix);
            let day4Date = day4DateObj.toLocaleDateString("en-US");
            let day4Temp = "Temp: " + (1.8 * (oneCall.daily[4].temp.day - 273) + 32).toFixed(0) + " F°";
            let day4Humi = "Humidity: " + oneCall.daily[4].humidity;
            let day4Uvi = "UV Index: " + oneCall.daily[4].uvi;
            $("#date4").append(day4Date);
            $("#date4Temp").append(day4Temp);
            $("#date4Humi").append(day4Humi);
            $("#date4Uvi").append(day4Uvi);
            
            //Day 5
            let day5Unix = oneCall.daily[5].dt * 1000;
            let day5DateObj = new Date(day5Unix);
            let day5Date = day5DateObj.toLocaleDateString("en-US");
            let day5Temp = "Temp: " + (1.8 * (oneCall.daily[5].temp.day - 273) + 32).toFixed(0) + " F°";
            let day5Humi = "Humidity: " + oneCall.daily[5].humidity;
            let day5Uvi = "UV Index: " + oneCall.daily[5].uvi;
            $("#date5").append(day5Date);
            $("#date5Temp").append(day5Temp);
            $("#date5Humi").append(day5Humi);
            $("#date5Uvi").append(day5Uvi);
            
        })
        
    }

    //Clear the fields to clean up the page
    $("#searchInput").empty();

    
});