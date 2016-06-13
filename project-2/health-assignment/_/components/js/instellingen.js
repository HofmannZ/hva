var appleHealtSwitch = document.getElementById("appleHealtSwitch"),
	appleHealtNotiSwitch = document.getElementById("appleHealtNotiSwitch"),
	smartWatchSwitch = document.getElementById("smartWatchSwitch"),
	zorgverlenerSwitch = document.getElementById("zorgverlenerSwitch"),
    showColorsInWeatherSwitch = document.getElementById("showColorsInWeatherSwitch"),
	appleHelathNoti = document.getElementById("appleHelathNoti");

// firebase connection
var settingsRef = currentUserRef.child("settings");

settingsRef.once("value", function (snapshot) {
    'use strict';
    var changedData = snapshot.val();

    appleHealtSwitch.checked = changedData.dbAppleHealt;

    if (appleHealtSwitch.checked) {
    	appleHealtNotiSwitch.checked = changedData.dbAppleHealtNoti;
    	appleHelathNoti.classList.remove("ah-off");
    	appleHelathNoti.classList.add("ah-on");
    } else {
    	appleHealtNotiSwitch.checked = changedData.dbAppleHealtNoti;
    }
    
    smartWatchSwitch.checked = changedData.dbSmartWatch;
    zorgverlenerSwitch.checked = changedData.dbZorgverlener;
    showColorsInWeatherSwitch.checked = changedData.dbShowColorsInWeather;

    // loadting icon
    document.getElementById("loader").style.display = "none";
    document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
});

function appleHealtClick() {
	if (appleHealtSwitch.checked) {
    	appleHelathNoti.classList.remove("ah-off");
    	appleHelathNoti.classList.add("ah-on");
    } else {
    	appleHelathNoti.classList.remove("ah-on");
    	appleHelathNoti.classList.add("ah-off");
    }

	settingsRef.update({
		"dbAppleHealt" : appleHealtSwitch.checked
	});
};

function appleHealtNotiClick() {
	settingsRef.update({
		"dbAppleHealtNoti" : appleHealtNotiSwitch.checked
	});
};

function smartWatchClick() {
	settingsRef.update({
		"dbSmartWatch" : smartWatchSwitch.checked
	});
};

function zorgverlenerClick() {
	settingsRef.update({
		"dbZorgverlener" : zorgverlenerSwitch.checked
	});
};

function showColorsInWeatherClick() {
    settingsRef.update({
        "dbShowColorsInWeather" : showColorsInWeatherSwitch.checked
    });
};