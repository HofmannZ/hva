// -------------------- //
// ------ Alarm ------- //
// -------------------- //
var mainTag = document.getElementsByTagName("main")[0],
    alarmSwitch = document.getElementById("alarmSwitch"),
    alarmTimeInput = document.getElementById("alarmTimeInput"),
    alarmTime = document.getElementById("alarmTime"),
    alarmTimeTill = document.getElementById("alarmTimeTill"),
    notifications = document.getElementById("notifications"),
    notificationSet;

// firebase connection
var firebaseRef = new Firebase("https://cmd-project2-ctolite.firebaseio.com/"),
    usersRef = firebaseRef.child('users');

// current user
var currentUser = "jenny",
    currentUserRef = usersRef.child(currentUser);

// get currentdate
var d = new Date(),
    dd = d.getDate(),
    mm = d.getMonth() + 1,
    yyyy = d.getFullYear();
if (dd < 10) {dd = '0' + dd; }
if (mm < 10) {mm = '0' + mm; }
var currentDate = dd + '-' + mm + '-' + yyyy;
var todayRef = currentUserRef.child(currentDate);

// data form Firebase
currentUserRef.on("value", function (snapshot) {
    'use strict';
    var changedData = snapshot.val(),
        alarmTimeArray = changedData.dbAlarmTime.split(":"),
        hh = d.getHours(),
        minutes = d.getMinutes(),
        currentHour = parseInt(hh),
        currentMinute = parseInt(minutes),
        hourDiff,
        minuteDiff,
        i,
        length,
        alarmTimeHour = parseInt(alarmTimeArray[0]),
        alarmTimeMinute = parseInt(alarmTimeArray[1]),
        sequenceCompleted,
        li = document.createElement("li"),
        anchor = document.createElement("a"),
        img = document.createElement("img"),
        h2 = document.createElement("h2");
    
    if (alarmTimeInput) {
        alarmTimeInput.value = changedData.dbAlarmTime;
    }
    if (alarmTime) {
        alarmTime.innerHTML = changedData.dbAlarmTime;
    }
    if (alarmTimeTill) {
        d = new Date();
                
        for (i = 0, length = alarmTimeArray.length; i < length; i++) {
                    
            if (alarmTimeMinute < currentMinute) {
                minuteDiff = (60 - currentMinute) + alarmTimeMinute;
            } else if (alarmTimeMinute > currentMinute) {
                minuteDiff = alarmTimeMinute - currentMinute;
            } else if (alarmTimeMinute == currentMinute) {
                minuteDiff = 0;
            }
                    
            if (alarmTimeHour < currentHour) {
                hourDiff = (24 - currentHour) + alarmTimeHour;
            } else if ((alarmTimeHour > currentHour) && (alarmTimeMinute >= currentMinute)) {
                hourDiff = alarmTimeHour - currentHour;
            } else if ((alarmTimeHour > currentHour) && (alarmTimeMinute < currentMinute)) {
                hourDiff = alarmTimeHour - currentHour - 1;
            } else if ((alarmTimeHour == currentHour) && (alarmTimeMinute < currentMinute)) {
                hourDiff = 23;
            } else if ((alarmTimeHour == currentHour) && (alarmTimeMinute > currentMinute)) {
                hourDiff = 0;
            } else if ((alarmTimeHour == currentHour) && (alarmTimeMinute == currentMinute)) {
                hourDiff = 24;
            }
        }
                
        alarmTimeTill.innerHTML = hourDiff + " uur en " + minuteDiff + " minuten tot afgaan";
    }
    
    if (alarmSwitch) {
        alarmSwitch.checked = changedData.dbAlarmSet;
    }
    
    if (alarmTimeInput) {
        alarmTimeInput.addEventListener("change", function () {
            currentUserRef.update({
                "dbAlarmTime" : alarmTimeInput.value
            });
        });
    }
    
    todayRef.on("value", function (snapshot) {
        sequenceCompleted = snapshot.val().dbSequenceCompleted;
    });
        
    if ((notificationSet !== true) && notifications) {
        if (sequenceCompleted == "true") {
            li.appendChild(anchor);
            anchor.appendChild(img);
            anchor.appendChild(h2);

            anchor.className += "button_bar";
            anchor.className += " open_item";
            anchor.className += " icon_link";
            anchor.href = "schema_fake_uitklapje.html";
            img.src = "./_/images/check.svg";
            h2.innerHTML = "Vragen ingevuld";

            notifications.appendChild(li);
            notificationSet = true;
        } else if ((sequenceCompleted !== "true") && notifications) {
            li.appendChild(anchor);
            anchor.appendChild(img);
            anchor.appendChild(h2);

            anchor.className += "button_bar";
            anchor.className += " open_item";
            anchor.className += " icon_link";
            anchor.href = "sequence1.html";
            img.src = "./_/images/cross.svg";
            h2.innerHTML = "Vragen niet ingevuld";

            notifications.appendChild(li);
            notificationSet = true;
        }
    }
    
    document.getElementById("loader").style.display = "none";
    mainTag.classList.remove("prevent-loading");
});

if (location.pathname.split("/").slice(-1) == "wekker_wijzig.html") {
    var alarmTimeInput = document.getElementById("alarmTimeInput");

    alarmTimeInput.addEventListener("focus", function () {
        'use strict';
        document.getElementById("toutchToEdit").style.color = "#888";
    }, true);
}