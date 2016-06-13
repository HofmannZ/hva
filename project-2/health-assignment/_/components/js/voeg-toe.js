var amountOfMovement;

currentUserRef.on("value", function (snapshot) {
    'use strict';
    var data = snapshot.val();
    amountOfMovement = parseInt(data.dbAmountOfMovement);
    console.log(amountOfMovement);
    document.getElementById("loader").style.display = "none";
    document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
});

var hoeveelheidBeweging = document.getElementById("hoeveelheidBeweging"),
    emotieBeweging = document.getElementById("emotieBeweging"),
    qualityBad = document.getElementById("qualityBad"),
    qualityNeutral = document.getElementById("qualityNeutral"),
    qualityGood = document.getElementById("qualityGood"),
    toevoegenButton = document.getElementById("toevoegenButton");

function save() {
    amountOfMovement += parseInt(hoeveelheidBeweging.value);
    currentUserRef.update({
        "dbAmountOfMovement": amountOfMovement
    }, function(error) {
        if (error) {
            alert("Data could not be saved." + error);
        } else {
            window.location.assign("./index.html");
        }
    });
};

toevoegenButton.onclick = function () {
    save();
    return false;
};