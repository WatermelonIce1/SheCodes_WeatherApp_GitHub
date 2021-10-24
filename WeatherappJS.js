//Date Definition

let now = new Date();

let h5 = document.querySelector("h5");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h5.innerHTML = ` ${day}, ${month} ${date} ${year} ${hours}:${minutes} `;

//searchCityresult

function searchCity(event) {
  event.preventDefault();
  let apiKey = "bcce68a433d5a8c9240f3cdd82e592a0";
  let searchInput = document.querySelector("#search-text-input");
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let button = document.querySelector("#search");
button.addEventListener("click", searchCity);

let textfield = document.querySelector("#search-text-input");
textfield.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

console.log(searchCity);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bcce68a433d5a8c9240f3cdd82e592a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//currentLocationplusTemp

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let locateButton = document.querySelector("#currentLocation");
locateButton.addEventListener("click", showCurrentPosition);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
console.log(iconElement);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let place = response.data.sys.country;
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;

  let temp = document.querySelector("#currentTemperature");
  temp.innerHTML = `Current Temperature: ${temperature}˚C`;
  let location = document.querySelector("#city");
  location.innerHTML = `${city}, ${place} - ${day}, ${month} ${date} ${year}`;

  let todaycondition = document.querySelector("#condition");
  todaycondition.innerHTML = ` Condition: ${condition}`;
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `Humidity: ${humidity}%`;

  console.log(humidity);
}
