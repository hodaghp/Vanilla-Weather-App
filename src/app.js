function formatDate(timestemp) {
  let date = new Date(timestemp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}  ${hour}:${minutes}`;
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  console.log(response.data.daily);
  let forcastHTML = `<div class="row">`;

  let forcastElement = document.querySelector("#forcast");

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML += `
      <div class="col-2">
        <div class="weather-forcast-day">${formatDay(forcastDay.time)}</div>
        <img
          src= "${forcastDay.condition.icon_url}"
          alt="weather image"
          width="50"
        />
        <div class="weather-temperature-forcast">
          <span class="weather-forcast-temperature-max">${Math.round(
            forcastDay.temperature.maximum
          )}°</span>
          <span class="weather-forcast-temperature-min">${Math.round(
            forcastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
            `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  //console.log(coordinates);
  let apiKey = "0e93tea8c21386bobfdd3fceaad47a24";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
  //console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let weatherDiscription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let data = formatDate(response.data.time * 1000);
  let weatherIcon = response.data.condition.icon_url;

  celsiusTemperature = temperature;

  document.querySelector("#current-temperature").innerHTML = temperature;
  document.querySelector("#city").innerHTML = city;
  document.querySelector("#description").innerHTML = weatherDiscription;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#date").innerHTML = data;
  document
    .querySelector("#main-temperature-icon")
    .setAttribute("src", weatherIcon);

  getForcast(response.data.coordinates);
}
function search(city) {
  let apiKey = "0e93tea8c21386bobfdd3fceaad47a24";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityName = cityInput.value;
  search(cityName);
}
// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   // remve the active class from the fahrenhite link
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   document.querySelector("#current-temperature").innerHTML =
//     Math.round(celsiusTemperature);
// }

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   // remve the active class from the celsius link
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   document.querySelector("#current-temperature").innerHTML = Math.round(
//     fahrenheitTemperature
//   );
// }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Ahvaz");
