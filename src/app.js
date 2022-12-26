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

function displayForcast(response) {
  console.log(response.data.daily);
  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forcastElement = document.querySelector("#forcast");

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
      <div class="col-2">
        <div class="weather-forcast-day">${day}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
          alt="weather image"
          width="50"
        />
        <div class="weather-temperature-forcast">
          <span class="weather-forcast-temperature-max">18°</span>
          <span class="weather-forcast-temperature-min">12°</span>
        </div>
      </div>
            `;
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
function displayCelsiusTemperature(event) {
  event.preventDefault();
  // remve the active class from the fahrenhite link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  // remve the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Ahvaz");
