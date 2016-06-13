// firebase connection
if (getLocationPath() == "oefeningen.html") {
    var oefeningenRef = firebaseRef.child('exercises');

    oefeningenRef.on("value", function (snapshot) {
        'use strict';
        var data = snapshot.val(),
            lengthOfArray = data.length;

        for (var i = 0; i < lengthOfArray; i++) {
            var oefeningen = document.getElementById("oefeningen"),
                changedData = data[i],

                newCard = document.createElement("section"),
                newAncor = document.createElement("a"),
                newCardContainer = document.createElement("div"),
                newOefeningIcon = document.createElement("div"),
                newOefeningInfo = document.createElement("div"),
                openCardIcon = document.createElement("div"),
                newH2 = document.createElement("h2"),
                newH3 = document.createElement("h3"),
                newH4 = document.createElement("h4");

            newCard.classList.add("card", "oefening");
            newAncor.setAttribute("href", "./oefening.html?oefening=" + i);
            newCardContainer.classList.add("card-container");
            newOefeningIcon.classList.add("oefening-icon");
            newOefeningInfo.classList.add("oefening-info");
            openCardIcon.classList.add("open-card-icon");

            var backgroundUrl = "url('./_/images/exercises/" + i + ".jpg')";

            newOefeningIcon.style.backgroundImage = backgroundUrl;

            newCard.appendChild(newAncor);
            newAncor.appendChild(newCardContainer);
            newCardContainer.appendChild(newOefeningIcon);
            newCardContainer.appendChild(newOefeningInfo);
            if (changedData.dbIsNewExercise == true) {
                newOefeningInfo.appendChild(newH3);
                newOefeningInfo.appendChild(newH4);
            } else {
                newOefeningInfo.appendChild(newH4);
            }
            newCardContainer.appendChild(newH2);
            newCardContainer.appendChild(openCardIcon);

            newH2.innerHTML = changedData.dbExerciseName;

            if (changedData.dbIsNewExercise == true) {
                newH3.innerHTML = "Nieuw";
                newH4.innerHTML = " - " + changedData.dbExerciseTime + "min";
            } else {
                newH4.innerHTML = changedData.dbExerciseTime + "min";
            }
            oefeningen.appendChild(newCard);
        }

        document.getElementById("loader").style.display = "none";
        document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
    });    
}