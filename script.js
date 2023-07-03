const api = {
    key : "0c11cb8ca4b42356ec64692b806d6df5",
    base : "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress",setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

    changeBackgroundImage(weather.weather[0].main);
}

function dateBuilder(d){
    let months = [
        "January","February","March","April","May","June","July","August","September","October","November","December"
    ];

    let days = [
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


// Get a reference to the body element
const body = document.querySelector('body');

// Function to change the background image based on the weather type
function changeBackgroundImage(weatherType) {
  // Remove any existing classes from the body element
    body.classList.remove("haze","mist","sunny","clear","clouds","drizzle","rain","thunderstorm","snow");

    switch(weatherType){
        case "Haze":
            body.classList.add("haze");
            break;
        case "Mist":
            body.classList.add("mist");
            break;
        case "Sunny":
            body.classList.add("sunny");
            break;
        case "Clear":
            body.classList.add("clear");
            break;
        case "Clouds":
            body.classList.add("clouds");
            break;
        case "Drizzle":
            body.classList.add("drizzle");
            break;
        case "Rain":
            body.classList.add("rain");
            break;
        case "Thunderstorm":
            body.classList.add("thunderstorm");
            break;
        case "Snow":
            body.classList.add("snow");
            break;
        default:

    }
}
