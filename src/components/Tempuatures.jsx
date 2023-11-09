import React from "react";

export default function Temperatures(props) {

    let temperatureUnit = props.temperatureUnit
    let maxTemperature = props.data.main.temp_max
    let minTemperature = props.data.main.temp_min

    const mainTemp = props.data ? props.data.main.temp : ''
    function tempInCelcius(temp) {
        let celcius = temp
        celcius -= 273.15
        celcius = (Math.round(celcius * 100) / 100).toFixed(2);
        return celcius
    }
    
    
    function tempInFahrenheit(temp) {
        let farhrenheit =((temp-273.15)*1.8)+32
        farhrenheit = (Math.round(farhrenheit * 100) / 100).toFixed(2)
        return farhrenheit
    }

    function maxTemps(unit) {
        let maxTemp = 0
        temperatureUnit === 'Celsius' ? maxTemp = tempInCelcius(unit) :
         maxTemp = tempInFahrenheit(unit)
        return maxTemp
    }

    function minTemps(unit) {
        let minTemp = 0
        temperatureUnit === 'Celsius' ? minTemp = tempInCelcius(unit) :
         minTemp = tempInFahrenheit(unit)
        return minTemp
    }

    return (
        <div>
        {temperatureUnit === 'Celsius' ? <h1 className="temp-in-celsius"> {tempInCelcius(mainTemp)} &deg; Celsius</h1> :
        <h1 className="temp-in-fahrenheit">{tempInFahrenheit(mainTemp)} &deg; Fahrenheit</h1>}
        
        <h1>Max Temp {maxTemps(maxTemperature)}</h1>
        <h1>Min Temp {minTemps(minTemperature)}</h1>
        </div>
    )
}