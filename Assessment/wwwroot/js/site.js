// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const OPEN_WEATHER_API_KEY = "4c117afbf64a2ec77bacf322f42bb68d";
function citySubmitHandler() {
    const city = $("#inputCityName").val();
    const reqUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

    fetchWeatherData(reqUrl)
        .then(renderWeatherData);
}

function fetchWeatherData(reqUrl) {
    return $.ajax({
        method: "GET",
        url: reqUrl,
        error: function () {
            // Error handling for data fetching

        }
    })
}

function renderWeatherData(data, textStatus, jqXHR) {
    const weatherData = {
        City: data.name,
        Timezone: data.timezone,
        CurrentTemp: data.main.temp,
        LowTemps: data.main.temp_min,
        HighTemp: data.main.temp_max,
        FeelsTemp: data.main.feels_like,
        Humidity: data.main.humidity,
    }
    $.ajax({
        method: "POST",
        url: "/Home/WeatherData",
        data: weatherData,
        dataType: "html",
        success: function (response) {
            $("#weatherDataContainer").html(response);
        }
    })
}

$(function () {
    // Bind event handler to button
    $("#btnSubmitCityWeatherQuery").on("click", citySubmitHandler);
})
