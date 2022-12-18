function showTime() {
  let now = new Date();
  let hour = now.getHours();
  let minit = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let time = document.querySelector("#time");
  time.innerHTML = `${day} ${hour}:${minit}`;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputPassword2");
  let cityBig = document.querySelector("#big-city");
  cityBig.innerHTML = `${searchInput.value}`;
  let apiKey = "61b1ac8421d64c213cde1e9b5856144a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

showTime();

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#tempreture");
  currentTemp.innerHTML = temp;
  let weatDescription = document.querySelector("#description");
  weatDescription.innerHTML = response.data.weather[0].description;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = response.data.wind.speed;
  let city = document.querySelector("#big-city");
  city.innerHTML = response.data.name;
}

function handlePosition(position) {
  console.log(position);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "61b1ac8421d64c213cde1e9b5856144a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showLocation);
