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

    // HOURLY WEATHER
    const weatherHourly = document.querySelector("#weatherHourly");
    weatherHourly.innerHTML = "";
    const currentHour = new Date(data.current.time).getHours();
    const currentTimeIndex = data.hourly.time.findIndex((time) => {
      const hour = new Date(time).getHours();
      return hour === currentHour;
    });
    const futureData = data.hourly.time.slice(
        currentTimeIndex,
        currentTimeIndex + 24
      );
      futureData.forEach((time, i) => {
        const hour = new Date(time).getHours();
        const loopedCode = data.hourly.weather_code[currentTimeIndex + i];
        const tempHourly = Math.round(
          data.hourly.temperature_2m[currentTimeIndex + i]
        );
  
        const label = i === 0 ? "NOW" : hour;
  
        weatherHourly.innerHTML += `
      <div class="d-flex flex-column gap-3 align-items-center" style="max-width: fit-content">
        <div class="hourly">${label}</div>
        <div class="hourly cl">${code[loopedCode].icon}</div>
        <div class="hourly">${tempHourly}&deg;</div>
      </div>
      `;
      });

       // sunset sunrise element
    const sunrise = document.querySelector("#sunrise");
    const sunset = document.querySelector("#sunset");
    const todaySunrise = new Date(data.daily.sunrise[0]).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }
    );
    const todaySunset = new Date(data.daily.sunset[0]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    sunrise.innerHTML = `Sunrise: ${todaySunrise}`;
    sunset.innerHTML = todaySunset;

    // looping 7 forecast
    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "";
    data.daily.time.forEach((time, i) => {
      const formattedDate = new Date(time).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
      });

      const loopedCode = data.daily.weather_code[i];
      const minTemp = Math.round(data.daily.temperature_2m_min[i]);
      const maxTemp = Math.round(data.daily.temperature_2m_max[i]);

      forecast.innerHTML += `
        <div
                class="d-flex justify-content-between gap-2 border-bottom mt-4"
              >
                <div class="days">${formattedDate}</div>
                <div class="d-flex gap-2">
                  <div class="days">${code[loopedCode].icon}</div>
                  <div class="days">${minTemp}</div>
                  <div class="days">/</div>
                  <div class="days">${maxTemp}&deg;</div>
                </div>
              </div>
        `;
    });
    } catch (error) {
        console.log(error);
      }
    }