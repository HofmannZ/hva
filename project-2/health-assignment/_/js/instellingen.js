function appleHealtClick(){appleHealtSwitch.checked?(appleHelathNoti.classList.remove("ah-off"),appleHelathNoti.classList.add("ah-on")):(appleHelathNoti.classList.remove("ah-on"),appleHelathNoti.classList.add("ah-off")),settingsRef.update({dbAppleHealt:appleHealtSwitch.checked})}function appleHealtNotiClick(){settingsRef.update({dbAppleHealtNoti:appleHealtNotiSwitch.checked})}function smartWatchClick(){settingsRef.update({dbSmartWatch:smartWatchSwitch.checked})}function zorgverlenerClick(){settingsRef.update({dbZorgverlener:zorgverlenerSwitch.checked})}function showColorsInWeatherClick(){settingsRef.update({dbShowColorsInWeather:showColorsInWeatherSwitch.checked})}var appleHealtSwitch=document.getElementById("appleHealtSwitch"),appleHealtNotiSwitch=document.getElementById("appleHealtNotiSwitch"),smartWatchSwitch=document.getElementById("smartWatchSwitch"),zorgverlenerSwitch=document.getElementById("zorgverlenerSwitch"),showColorsInWeatherSwitch=document.getElementById("showColorsInWeatherSwitch"),appleHelathNoti=document.getElementById("appleHelathNoti"),settingsRef=currentUserRef.child("settings");settingsRef.once("value",function(a){"use strict";var b=a.val();appleHealtSwitch.checked=b.dbAppleHealt,appleHealtSwitch.checked?(appleHealtNotiSwitch.checked=b.dbAppleHealtNoti,appleHelathNoti.classList.remove("ah-off"),appleHelathNoti.classList.add("ah-on")):appleHealtNotiSwitch.checked=b.dbAppleHealtNoti,smartWatchSwitch.checked=b.dbSmartWatch,zorgverlenerSwitch.checked=b.dbZorgverlener,showColorsInWeatherSwitch.checked=b.dbShowColorsInWeather,document.getElementById("loader").style.display="none",document.getElementsByTagName("main")[0].classList.remove("prevent-loading")});