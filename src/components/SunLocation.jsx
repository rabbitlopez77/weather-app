import React from "react";

export default function SunLocation(props) {

    function sunriseAndSunset(time) {
        let unix_timestamp = time;

        var date = new Date(unix_timestamp * 1000);

        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        var seconds = "0" + date.getSeconds();


        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime

    }
    


    return (
        <div>
            <h3>{`Sunrise: ${sunriseAndSunset(props.sunrise)}`}</h3>
            <h3>{`Sunset: ${sunriseAndSunset(props.sunset)}`}</h3>
        </div>
    )
}