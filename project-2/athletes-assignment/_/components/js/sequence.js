function sequenceJS() {
    'use strict';
    var nextButton = document.getElementById("nextButton"),
        commentArea = document.getElementById("commentArea");
    if (nextButton) {
        nextButton.style.opacity = "0";
    }

    if (commentArea) {
        commentArea.style.opacity = "0";
    }
    
    function checked(element) {
        if (element.checked == true) {
            commentArea.style.opacity = "1";
            nextButton.style.visibility = "visible";
            setTimeout(function () {nextButton.style.opacity = "1"; }, 300);
        }
    }

    document.addEventListener("click", function () {
        var fileName = location.pathname.split("/").slice(-1);
        if (fileName == "sequence2.html") {
            checked(document.getElementById("sleepQualityBad"));
            checked(document.getElementById("sleepQualityNeutral"));
            checked(document.getElementById("sleepQualityGood"));
        } else if (fileName == "sequence3.html") {
            checked(document.getElementById("moodQualityBad"));
            checked(document.getElementById("moodQualityNeutral"));
            checked(document.getElementById("moodQualityGood"));
        } else if (fileName == "sequence4.html") {
            checked(document.getElementById("recoveryQualityBad"));
            checked(document.getElementById("recoveryQualityNeutral"));
            checked(document.getElementById("recoveryQualityGood"));
        }
    });
    
    if (location.pathname.split("/").slice(-1) == "sequence1.html") {
        var sleepTime = document.getElementById("sleepTime");
        
        sleepTime.addEventListener("focus", function () {
            document.getElementById("toutchToEdit").style.color = "#888";
        }, true);
    }
}
document.onpageshow = sequenceJS();

var heartRateData;
if (location.pathname.split("/").slice(-1) == "sequence5.html") {
    var element = document.getElementById("clock-container"),
        seconds = new ProgressBar.Circle(element, {
            duration: 950,
            color: "#e51d1f",
            trailColor: "#333"
        }),
        heartRateDataForm = document.getElementById("heartRateDataForm"),
        nextButton = document.getElementById("nextButton");
    
    if (nextButton) {
        nextButton.style.opacity = "0";
    }

    var currentSecond = 0;

    var runStopwatch = false;

    var stopwatchInterval;
    
    function stopwatch() {
        'use strict';
        if (runStopwatch == true) {
            stopwatchInterval = setInterval(function () {
                currentSecond++;
                seconds.animate(currentSecond / 15, function () {
                    seconds.setText(currentSecond);
                });
                if (currentSecond == 15) {
                    clearInterval(stopwatchInterval);
                    heartRateDataForm.style.opacity = "1";
                    document.getElementById("countedHeartRate").focus();
                    document.getElementById("countedHeartRate").addEventListener("blur", function () {
                        heartRateData = document.getElementById("countedHeartRate").value * 4;
                        document.getElementById("heartRateData").innerHTML = "Je hartslag is <strong>" + heartRateData + "</strong> BPM";
                        document.getElementById("heartRateData").style.opacity = "1";
                    });
                    nextButton.style.visibility = "visible";
                    setTimeout(function () {
                        nextButton.style.opacity = "1";
                    }, 300);
                }
            }, 1000);
        } else if (runStopwatch == false) {
            clearInterval(stopwatchInterval);
        }
    } ;

    var startButton = document.getElementById("startButton");

    function startStopwatch() {
        'use strict';
        if (runStopwatch == false) {
            runStopwatch = true;
            currentSecond = 0;
            startButton.className = "reset";
            startButton.innerHTML = "Reset";
            stopwatch();
        } else if (runStopwatch == true) {
            runStopwatch = false;
            stopwatch();
            startButton.className = "start";
            startButton.innerHTML = "Start";
            seconds.animate(0, function () {
                seconds.setText("0");
            });
        }
    } ;
}
