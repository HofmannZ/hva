// wekoms bericht
var userFirstName = document.getElementById("userFirstName"),

// beweging teller
    bewegingTellerCircle = new ProgressBar.Circle('#bewegingTeller', {
    color: '#83a7d9',
    trailColor: '#f0f3f4',
    strokeWidth: 2,
    trailWidth: 1,
    duration: 1500,
    text: {
        value: '0',
        style: null
    },
    step: function(state, bar) {
        bar.setText("<h2>" + ((bar.value() * 100) * 0.3).toFixed(0) + "</h2><p> min</p>");
    }
}),
// bewegings teller
    bewegingTeller = document.getElementById("bewegingTeller"),
    bewegingMessege = document.getElementById("bewegingMessege"),
    bewegingTellerValue;

// weer 
var settingsRef = currentUserRef.child("settings"),
    settingShowColorsInWeather;

settingsRef.once("value", function (snapshot) {
    'use strict';
    var changedData = snapshot.val();
    settingShowColorsInWeather = changedData.dbShowColorsInWeather;
});

var weatherLocation = document.getElementById("weatherLocation"),
    weatherCondition = document.getElementById("weatherCondition"),
    weatherTemprature = document.getElementById("weatherTemprature"),
    weatherHumitity = document.getElementById("weatherHumitity"),
    weatherWindspeed = document.getElementById("weatherWindspeed"),
    weerVandaagButton = document.getElementById("weerVandaagButton"),
    weerWeekButton = document.getElementById("weerWeekButton"),
    weerVandaag = document.getElementById("weerVandaag"),
    weerWeek = document.getElementById("weerWeek"),
    weerButtonSpan = document.getElementById("weerButtonSpan"),
    weerCard = document.getElementById("weerCard"),
    latitude,
    longitude,
    weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl&appid=eba50e31d94c44e02d93b33b9725cbe3',
    weatherObject = JSON.parse(getAPI(weatherApiUrl));

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}
getLocation();

function updateWeatherInfo() {
    weatherLocation.innerHTML = weatherObject.name;
    weatherCondition.innerHTML = weatherObject.weather[0].description;
    weatherTemprature.innerHTML = (weatherObject.main.temp - 273.15).toFixed(0) + "&deg;";
    weatherHumitity.innerHTML = weatherObject.main.humidity.toFixed(0);
    weatherWindspeed.innerHTML = weatherObject.wind.speed.toFixed(0);

    settingsRef.once("value", function (snapshot) {
        'use strict';
        var changedData = snapshot.val();
        
        if (changedData.dbShowColorsInWeather) {
            var humidityValue = weatherObject.main.humidity.toFixed(0),
                tempValue = (weatherObject.main.temp - 273.15).toFixed(0);

            if (humidityValue < 35 || humidityValue > 65) {
                weatherHumitity.classList.add("bad");
            } else if (humidityValue > 40 && humidityValue < 60) {
                weatherHumitity.classList.add("good");
            } else {
                weatherHumitity.classList.add("neutral");
            }

            if (tempValue < 0 || tempValue > 32) {
                weatherTemprature.classList.add("bad");
            } else if (tempValue > 5 && tempValue < 25) {
                weatherTemprature.classList.add("good");
            } else {
                weatherTemprature.classList.add("neutral");
            }

            if (tempValue < 0 || tempValue > 32) {
                weatherTemprature.classList.add("bad");
            } else if (tempValue > 5 && tempValue < 25) {
                weatherTemprature.classList.add("good");
            } else {
                weatherTemprature.classList.add("neutral");
            }
        } // if (settingShowColorsInWeather)
    });
} // function updateWeatherInfo()
updateWeatherInfo();

function showPosition(position) {
    latitude = position.coords.latitude, 
    longitude = position.coords.longitude;  
    var locationApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true',
        locationObject = JSON.parse(getAPI(locationApiUrl)),
        cityName = locationObject.results[0].address_components[3].long_name,
        countryCode = locationObject.results[0].address_components[6].short_name.toLowerCase();
    weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',' + countryCode + '&appid=eba50e31d94c44e02d93b33b9725cbe3';
    weatherObject = JSON.parse(getAPI(weatherApiUrl));
    updateWeatherInfo();
}

function getAPI(apiUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",apiUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

// weer slider
var openWeerWeek = function () {
    weerWeek.style.left = "0";
    weerVandaag.style.left = "-80vw";
    weerButtonSpan.style.transform = "translateX(45vw)";
};

var openWeerVandaag = function () {
    weerVandaag.style.left = "0";
    weerWeek.style.left = "80vw";
    weerButtonSpan.style.transform = "translateX(0)";
};

weerVandaagButton.onclick = openWeerVandaag;

weerWeekButton.onclick = openWeerWeek;

weerCard.addEventListener('swr',openWeerVandaag,false);
weerCard.addEventListener('swl',openWeerWeek,false);

// firebase connection
if (getLocationPath() == "index.html" || getLocationPath() == "gezondheidsopdracht") {
    currentUserRef.on("value", function (snapshot) {
        'use strict';
        var changedData = snapshot.val();

        // bewegings teller
        bewegingTellerValue = changedData.dbAmountOfMovement;

        if (bewegingTellerValue >= 30) {
            bewegingTellerCircle.animate(1, function() {
                bewegingTellerCircle.setText("<p>Voltooid!</p>");
            });
            bewegingMessege.innerHTML = "Goed gedaan! Je hebt vandaag " + bewegingTellerValue + " minuten bewogen!"; 
        } else if (bewegingTeller) {
            bewegingTellerCircle.animate(bewegingTellerValue / 30, function() {
                bewegingTellerCircle.setText("<h2>" + bewegingTellerValue + "</h2><p> min</p>");
            });
        }

        
        if (userFirstName) {
            userFirstName.innerHTML = "Welkom " + changedData.dbFirstName + ",";
        }

        // loadting icon
        document.getElementById("loader").style.display = "none";
        document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
    });
}