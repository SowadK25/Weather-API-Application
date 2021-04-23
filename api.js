var city = document.querySelector(".city");
var summary = document.querySelector(".description");
var temperature = document.querySelector(".temp");
var pic = document.querySelector(".icon");
var humid = document.querySelector(".humidity");
var winds = document.querySelector(".wind");
var button = document.querySelector(".search button");
var searchBar = document.querySelector(".search-bar");
var load = document.querySelector(".weather");
let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        searchBar,
    {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name']
    });
    autocomplete.addListener('place_changed', () => {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        else {
            weather.search();
        }
    })
}

let weather = {
    "apikey": "ed37dbadd55d7c1f7bdfc1e1717c632c",
    getWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {country} = data.sys;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, country, icon, description, temp, humidity, speed);
        city.innerText = name + ", " + country;
        pic.src = "http://openweathermap.org/img/wn/" + icon + ".png";
        summary.innerText = description;
        temperature.innerText = temp + "°C"
        humid.innerText = "Humidity: " + humidity + "%";
        winds.innerText = "Wind speed: " + speed + "km/h";
        load.classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/featured/?" + name + "')";
    },
    search: function() {
        this.getWeather(searchBar.value);
    }
};

button.addEventListener("click", function() {
    weather.search();
});

searchBar.addEventListener("keyup", function(e) {
    if (e.key == "Enter") {
        weather.search();
    }
});

weather.getWeather("Waterloo");
