//firebase connection
var FirebaseRef = new Firebase("https://cmd-project-1-deel-2.firebaseio.com/");

//time
function addZero(i) {
    "use strict";
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var d = new Date(),
    currentHour = addZero(d.getHours()),
    currentMinute = addZero(d.getMinutes()),
    hour = currentHour;

var time = document.getElementById('time');
time.innerHTML = hour + '.' + currentMinute;


//timeline
var timelineRef = FirebaseRef.child('timeline'),
    timeline = document.getElementById('timeline-section-list');

var reloadTimeline = function () {
    "use strict";
    var hourKey = timelineRef.child(hour);
    
    hourKey.on('child_added', function (snapshot) {
        var k = snapshot.key(),
            v = snapshot.val(),
            newLi = document.createElement("li"),
            newSection = document.createElement("section"),
            newH2 = document.createElement("h2"),
            newSmall = document.createElement("small"),
            newP = document.createElement("p");

        newLi.appendChild(newSection);
        newSection.appendChild(newH2);
        newSection.appendChild(newSmall);
        newSection.appendChild(newP);

        newH2.innerHTML = v.title;
        newSmall.innerHTML = v.author;
        newP.innerHTML = v.content;

        timeline.appendChild(newLi);
    });
};
reloadTimeline();


//refresh loop
var intervalFunction = function () {
    "use strict";
    console.log('loop');
    d = new Date();
    currentHour = addZero(d.getHours());
    currentMinute = addZero(d.getMinutes());
    hour = currentHour;

    time.innerHTML = hour + '.' + currentMinute;

    if (d.getMinutes() === '00') {
        timeline.innerHTML = "";
        reloadTimeline();
    }
};

var refreshLoop = setInterval(intervalFunction, 1000);
refreshLoop;


//custom time
var showNextHour = document.getElementById('showNextHour'),
    showPrevHour = document.getElementById('showPrevHour'),
    showCurrentHour = document.getElementById('showCurrentHour');

showCurrentHour.style.display = 'none';

showNextHour.onclick = function () {
    "use strict";
    if (hour < 10) {
        hour = addZero(parseInt(hour, 10) + 1);
    } else {
        hour += 1;
        if (hour > 23) {
            hour = "00";
        }
    }
    

    time.innerHTML = hour + '.' + currentMinute;
    showCurrentHour.style.display = 'block';
    
    clearInterval(refreshLoop);
    console.log('loop stoped');
    
    timeline.innerHTML = "";
    reloadTimeline();
};

showPrevHour.onclick = function () {
    "use strict";
    hour -= 1;
    if (hour < 0) {
        hour = 23;
    }
    hour = addZero(hour);
    
    time.innerHTML = hour + '.' + currentMinute;
    showCurrentHour.style.display = 'block';
    
    clearInterval(refreshLoop);
    console.log('loop stoped');
    
    timeline.innerHTML = "";
    reloadTimeline();
};

showCurrentHour.onclick = function () {
    "use strict";
    showCurrentHour.style.display = 'none';
    
    d = new Date();
    currentHour = addZero(d.getHours());
    currentMinute = addZero(d.getMinutes());
    hour = currentHour;

    time.innerHTML = hour + '.' + currentMinute;
    
    timeline.innerHTML = "";
    reloadTimeline();
    
    window.refreshLoop = setInterval(intervalFunction, 1000);
    console.log('loop started');
};