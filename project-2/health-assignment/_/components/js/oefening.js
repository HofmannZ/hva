// firebase connection
var locationParamValue = location.search.split("&")[0].replace("?","").split("=")[1],
    oefeningenRef = firebaseRef.child('exercises'),
    oefeningNaam = document.getElementById("oefeningNaam"),
    oefeningOmschrijfing = document.getElementById("oefeningOmschrijfing");

oefeningenRef.on("value", function (snapshot) {
    'use strict';
    var data = snapshot.val(),
        changedData = data[locationParamValue];

    oefeningNaam.innerHTML = changedData.dbExerciseName;
    oefeningOmschrijfing.innerHTML = changedData.dbExerciseDescription;

    document.getElementById("loader").style.display = "none";
    document.getElementsByTagName("main")[0].classList.remove("prevent-loading");  
});


