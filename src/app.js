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

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDiscription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let data = formatDate(response.data.dt * 1000);
  let weatherIcon = response.data.weather[0].icon;

  document.querySelector("#current-temperature").innerHTML = temperature;
  document.querySelector("#city").innerHTML = city;
  document.querySelector("#description").innerHTML = weatherDiscription;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#date").innerHTML = data;
  document
    .querySelector("#main-temperature-icon")
    .setAttribute(
      "src",
      ` http://openweathermap.org/img/wn/${weatherIcon}.png`
    );
}
function search(city) {
  let apiKey = "3ee42c7bb4064d140b4cd8b3cb917db0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityName = cityInput.value;
  search(cityName);
}
search("Ahvaz");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
