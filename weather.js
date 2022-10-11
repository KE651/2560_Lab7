//API for forecast for minneapolis: api.weather.gov/gridpoints/MPX/116,72/forecast
console.log("found the js file")

let minneapolisForecastUrl = "https://api.weather.gov/gridpoints/MPX/116,72/forecast"
let weatherForecastTableElement = document.querySelector("#weather-forecast")
fetch(minneapolisForecastUrl)
    //js promises that it will give you the data or let you know that it didn't work. data download takes time.
    // response contains json but it also has other components such as a status code
    .then(weatherResponse => weatherResponse.json() ) // also returns a promise because data conversion takes time
    // response is the name that we are giving it
    //weatherResponse.json is a promise, should resolve into weatherJson
    .then(weatherJson => {
        console.log(weatherJson)
        displayForecastInTable(weatherJson)
    })
.catch( error => {
    console.log(error)
    alert("Sorry, there was an error.")
})

function displayForecastInTable(weatherJSON) {
    // alert("hello, this is the function")
    let weatherForecastPeriods = weatherJSON.properties.periods
    console.log(weatherForecastPeriods)
    // this gives an array with just the forecast information

    weatherForecastPeriods.forEach(forecast => {
        // equivalent to forEach(function(forecast){
        let forecastPeriodName = forecast.name
        // console.log(forecastPeriodName)
        let temperature = forecast.temperature
        let temperatureUnit = forecast.temperatureUnit
        let forecastIconUrl = forecast.icon // URL string for the icon
        let detailedForecast = forecast.detailedForecast
        let windSpeed = forecast.windSpeed
        let windDirection = forecast.windDirection
        // get detailed forecast, wind speed, and wind direction

        let forecastRow=document.createElement('tr') //create table row and add to table
        weatherForecastTableElement.appendChild(forecastRow)

        //create table data for period
        let forecastPeriodTableData = document.createElement('td')  // table data
        forecastPeriodTableData.innerHTML = forecastPeriodName

        let forecastTemperatureTableData = document.createElement('td')
        forecastTemperatureTableData.innerHTML = `   ${temperature} ${temperatureUnit}`

        let forecastIconTableData = document.createElement('td')
        let forecastIconImg = document.createElement('img')
        forecastIconImg.src = forecastIconUrl
        forecastIconTableData.appendChild(forecastIconImg)  // adds image to td element

        let detailedForecastTableData = document.createElement('td')
        detailedForecastTableData.innerHTML = detailedForecast

        let windTableData = document.createElement('td')
        let windTableText = `${windSpeed} from ${windDirection}`
        windTableData.innerHTML = windTableText

        // add table data to current row
        forecastRow.appendChild(forecastPeriodTableData)
        forecastRow.appendChild(forecastTemperatureTableData)
        forecastRow.appendChild(forecastIconTableData)
        forecastRow.appendChild(detailedForecastTableData)
        forecastRow.appendChild(windTableData)
        // continue for detailed forecast
        // extra credit: windspeed and wind direction, need to add column to table

    })

}