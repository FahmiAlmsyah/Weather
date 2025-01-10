async function getWeather(latitude = -7.2492, longitude = 112.7508) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();

    // Change weather info
    const currentTemp = document.querySelector("#temperature");
    const currentHumidity = document.querySelector("#humidity");
    const currentWind = document.querySelector("#wind");
    const currentTempFeel = document.querySelector("#feelLike");

    // Condition
    const currentCond = document.querySelector("#cond");
    const condIcon = document.querySelector("#condIcon");
    const currentCode = data.current.weather_code;
    currentCond.innerHTML = code[currentCode].description;
    condIcon.innerHTML = code[currentCode].icon;

    // Math
    const mathTemp = Math.round(data.current.temperature_2m);
    const mathHumidity = Math.round(data.current.relative_humidity_2m);
    const mathWind = Math.round(data.current.wind_speed_10m);
    const mathTempFeel = Math.round(data.current.apparent_temperature);

    currentTemp.innerHTML = mathTemp + "&deg;";
    currentHumidity.innerHTML = mathHumidity + "%";
    currentWind.innerHTML = mathWind + "km/h";
    currentTempFeel.innerHTML = mathTempFeel + "&deg;";
    } catch (error) {
        console.log(error);
      }
    }