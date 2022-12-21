function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDiscription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#current-temperature").innerHTML = temperature;
  document.querySelector("#city").innerHTML = city;
  document.querySelector("#description").innerHTML = weatherDiscription;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
}

let apiKey = "3ee42c7bb4064d140b4cd8b3cb917db0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

//let time = document.querySelector("#date");
// time.innerHTML = formatDate();
axios.get(apiUrl).then(displayTemperature);
