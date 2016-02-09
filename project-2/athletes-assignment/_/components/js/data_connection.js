// firebase connection
var firebaseRef = new Firebase("https://cmd-project2-ctolite.firebaseio.com/"),
    usersRef = firebaseRef.child('users');

// current user
var currentUser = "jenny",
    currentUserRef = usersRef.child(currentUser);

// -------------------- //
// ------- Time ------- //
// -------------------- //

// get currentdate
var d = new Date(),
    dd = d.getDate(),
    mm = d.getMonth() + 1,
    yyyy = d.getFullYear();
if (dd < 10) {dd = '0' + dd; }
if (mm < 10) {mm = '0' + mm; }
var currentDate = dd + '-' + mm + '-' + yyyy;
var todayRef = currentUserRef.child(currentDate);

// get current time
var currentHour,
    currentMinute;

function alarmSwitchClick() {
    'use strict';
    currentUserRef.update({
        "dbAlarmSet" : alarmSwitch.checked
    });
}

// -------------------- //
// -- Send Sequence --- //
// -------------------- //

// sleep

function sendSleepTime() {
    'use strict';
    var sleepTime = document.getElementById("sleepTime").value;
    todayRef.update({
        "dbSleepTime" : sleepTime
    });
}

// sleep quality
function sendSleepQuality() {
    'use strict';
    var sleepQualitySelector = document.getElementsByName('sleepQualitySelector'),
        sleepQualityComment = document.getElementById('sleepQualityComment').value,
        i,
        length,
        sleepQuality;

    for (i = 0, length = sleepQualitySelector.length; i < length; i++) {
        if (sleepQualitySelector[i].checked) {
            sleepQuality = sleepQualitySelector[i].value;
            todayRef.update({
                "dbSleepQuality" : sleepQuality,
                "dbSleepQualityComment" : sleepQualityComment
            });
            break;
        }
    }
}

// mood quality
function sendMoodQuality() {
    'use strict';
    var moodQualitySelector = document.getElementsByName('moodQualitySelector'),
        moodQualityComment = document.getElementById('moodQualityComment').value,
        i,
        length,
        moodQuality;

    for (i = 0, length = moodQualitySelector.length; i < length; i++) {
        if (moodQualitySelector[i].checked) {
            moodQuality = moodQualitySelector[i].value;
            todayRef.update({
                "dbMoodQuality" : moodQuality,
                "dbMoodQualityComment" : moodQualityComment
            });
            break;
        }
    }
}

// recovery quality
function sendRecoveryQuality() {
    'use strict';
    var recoveryQualitySelector = document.getElementsByName('recoveryQualitySelector'),
        recoveryQualityComment = document.getElementById('recoveryQualityComment').value,
        i,
        length,
        recoveryQuality;

    for (i = 0, length = recoveryQualitySelector.length; i < length; i++) {
        if (recoveryQualitySelector[i].checked) {
            recoveryQuality = recoveryQualitySelector[i].value;
            todayRef.update({
                "dbRecoveryQuality" : recoveryQuality,
                "dbRecoveryQualityComment" : recoveryQualityComment
            });
            break;
        }
    }
}

// hartrate
function sendHeartRate() {
    'use strict';
    todayRef.update({
        "dbHeartRateData" : heartRateData,
        "dbSequenceCompleted" : "true"
    });
}


// -------------------- //
// -- Read Sequence --- //
// -------------------- //