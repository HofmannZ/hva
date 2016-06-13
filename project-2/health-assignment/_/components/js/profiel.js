// firebase connection
if (getLocationPath() == "profiel.html") {
    currentUserRef.on("value", function (snapshot) {
        'use strict';
        var changedData = snapshot.val();

        var patientsName = document.getElementById("patientsName"),
            patientsCity = document.getElementById("patientsCity"),
            patientsEmail = document.getElementById("patientsEmail"),
            patientsPhone = document.getElementById("patientsPhone");

        patientsName.innerHTML = changedData.dbFirstName + " " + changedData.dbLastName;
        patientsCity.innerHTML = changedData.dbCity;
        patientsEmail.innerHTML = changedData.dbEmail;
        patientsPhone.innerHTML = changedData.dbPhone;

        // loadting icon
        document.getElementById("loader").style.display = "none";
        document.getElementsByTagName("main")[0].classList.remove("prevent-loading");
    });
}