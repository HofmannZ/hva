// hoeveelheidChart
var hoeveelheidData = {
    labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    datasets: [
        {
            label: "hoeveelheid dataset",
            fillColor: "rgba(131,167,217,0.6)",
            strokeColor: "rgba(131,167,217,1)",
            highlightFill: "rgba(131,167,217,0.4)",
            highlightStroke: "rgba(131,167,217,0.8)"
        }
    ]
};
var hoeveelheidCtx = document.getElementById("hoeveelheidChart").getContext("2d");

// herstelChart
var herstelData = {
    labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    datasets: [
        {
            label: "herstel dataset",
            fillColor: "rgba(131,167,217,0)",
            strokeColor: "rgba(131,167,217,1)",
            pointColor: "rgba(131,167,217,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(131,167,217,1)"
        }
    ]
};
var herstelCtx = document.getElementById("herstelChart").getContext("2d");

// kwaliteidChart
var kwaliteidData = [
    {
        color: "rgba(52,198,59,1)",
        highlight: "rgba(52,198,59,0.9)",
        label: "Goed"
    },
    {
        color: "rgba(255,168,55,1)",
        highlight: "rgba(255,168,55,0.9)",
        label: "Matig"
    },
    {
        color: "rgba(238,80,80,1)",
        highlight: "rgba(238,80,80,0.9)",
        label: "Slecht"
    }
];
var kwaliteidOptions = {
    //Number - Amount of animation steps
    animationSteps : 85,

    //String - Animation easing effect
    animationEasing : "easeOutQuad"
};
var kwaliteidCtx = document.getElementById("kwaliteidChart").getContext("2d");

// elements
var verslagSwitchKwaliteid = document.getElementById("verslagSwitchKwaliteid"),
	verslagSwitchHoeveelheid = document.getElementById("verslagSwitchHoeveelheid"),
	kwaliteidChartElement = document.getElementById("kwaliteidChart"),
	hoeveelheidChartElement = document.getElementById("hoeveelheidChart"),
    herstelChartElement = document.getElementById("herstelChart");

function switchActive() {
	verslagSwitchKwaliteid.classList.toggle("active");
	verslagSwitchHoeveelheid.classList.toggle("active");
	kwaliteidChartElement.classList.toggle("active");
	hoeveelheidChartElement.classList.toggle("active");
};

// firebase connection
var locationParamValue = location.search.split("&")[0].replace("?","").split("=")[1],
    verslagenRef = currentUserRef.child('reports'),
    verslagNaam = document.getElementById("verslagNaam"),
    verslagKwaliteid = document.getElementById("verslagKwaliteid");

verslagenRef.on("value", function (snapshot) {
    'use strict';
    var data = snapshot.val(),
        changedData = data[locationParamValue];
    verslagNaam.innerHTML = changedData.dbReportName;

    if (changedData.dbReportQuality == "good") {
        verslagKwaliteid.innerHTML = "goed";
        verslagKwaliteid.className = "goed";
    } else if (changedData.dbReportQuality == "neutral") {
        verslagKwaliteid.innerHTML = "neutraal";
        verslagKwaliteid.className = "neutraal";
    } else if (changedData.dbReportQuality == "bad") {
        verslagKwaliteid.innerHTML = "slecht";
        verslagKwaliteid.className = "slecht";
    }

    kwaliteidData[0].value = changedData.dbReportQualityPerDay.dbGood;
    kwaliteidData[1].value = changedData.dbReportQualityPerDay.dbNeutral;
   	kwaliteidData[2].value = changedData.dbReportQualityPerDay.dbBad;
    hoeveelheidData.datasets[0].data = changedData.dbAmountOfMovementPerDay;
    herstelData.datasets[0].data = changedData.dbExerciseAmountPerDay;

    var kwaliteidChart = new Chart(kwaliteidCtx).Pie(kwaliteidData, kwaliteidOptions);
    var herstelChart = new Chart(herstelCtx).Line(herstelData);

    document.getElementById("loader").style.display = "none";
	document.getElementsByTagName("main")[0].classList.remove("prevent-loading"); 
});

verslagSwitchKwaliteid.onclick = function () {
	switchActive();
	var kwaliteidChart = new Chart(kwaliteidCtx).Pie(kwaliteidData, kwaliteidOptions);
};
verslagSwitchHoeveelheid.onclick = function () {
	switchActive();
	var hoeveelheidChart = new Chart(hoeveelheidCtx).Bar(hoeveelheidData);
};