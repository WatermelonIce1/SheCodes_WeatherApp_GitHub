//Date Definition

let now = new Date();

let h5 = document.querySelector("h5");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;
let year = now.getFullYear();

let temperature;

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

function showTemperature(response) {
  temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let place = response.data.sys.country;
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let temp = document.querySelector("#currentTemperature");
  temp.innerHTML = `Current Temperature: ${temperature}˚C`;
  let location = document.querySelector("#city");
  location.innerHTML = `${city}, ${place} - ${day}, ${month} ${date} ${year}`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}`;
  let todaycondition = document.querySelector("#condition");
  todaycondition.innerHTML = ` Condition: ${condition}`;
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `Humidity: ${humidity}%`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(iconElement);
  console.log(humidity);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#currentTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  console.log(temperature);
  let fahrenheitTemp = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `Current Temperature: ${Math.round(
    fahrenheitTemp
  )} ˚F`;
  console.log(temperatureElement);
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = `Current Temperature: ${Math.round(
    temperature
  )} ˚C`;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
