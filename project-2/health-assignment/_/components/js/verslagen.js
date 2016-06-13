// firebase connection
if (getLocationPath() == "verslagen.html") {
    var verslagenRef = currentUserRef.child('reports');

    verslagenRef.on("value", function (snapshot) {
        'use strict';
        var data = snapshot.val(),
            lengthOfArray = data.length;

        for (var i = 0; i < lengthOfArray; i++) {
            var verslagen = document.getElementById("verslagen"),
                changedData = data[i],

                newCard = document.createElement("section"),
                newAncor = document.createElement("a"),
                newCardContainer = document.createElement("div"),
                newVerslagIconGood = document.createElement("div"),
                newVerslagIconNeutral = document.createElement("div"),
                newVerslagIconBad = document.createElement("div"),
                openCardIcon = document.createElement("div"),
                newH2 = document.createElement("h2");

            newCard.classList.add("card", "verslag");
            newAncor.setAttribute("href", "./verslag.html?verslag=" + i);
            newCardContainer.classList.add("card-container");
            newVerslagIconGood.classList.add("verslag-icon", "good");
            newVerslagIconNeutral.classList.add("verslag-icon", "neutral");
            newVerslagIconBad.classList.add("verslag-icon", "bad");
            openCardIcon.classList.add("open-card-icon");

            newCard.appendChild(newAncor);
            newAncor.appendChild(newCardContainer);
            if (changedData.dbReportQuality == "good") {
                newCardContainer.appendChild(newVerslagIconGood);
            } else if (changedData.dbReportQuality == "neutral") {
                newCardContainer.appendChild(newVerslagIconNeutral);
            } else if (changedData.dbReportQuality == "bad") {
                newCardContainer.appendChild(newVerslagIconBad);
            }
            newCardContainer.appendChild(newH2);
            newCardContainer.appendChild(openCardIcon);

            newH2.innerHTML = "Verslag Revalidatie - " + changedData.dbReportName;

            verslagen.appendChild(newCard);
        }

        document.getElementById("loader").style.display = "none";
        document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
    });
}