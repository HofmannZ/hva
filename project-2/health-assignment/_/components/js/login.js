// login
var patientIdField = document.getElementById("patientIdField"),
    passwordField = document.getElementById("passwordField"),
    loginButton = document.getElementById("loginButton"),
    errorText = document.getElementById("errorText");

function login() {
    var tempUser = patientIdField.value.toLowerCase(),
        tempUserRef = usersRef.child(tempUser),
        passwordHash = passwordField.value.hashCode(),
        serverPasswordHash;

    tempUserRef.on("value", function (snapshot) {
        'use strict';
        var changedData = snapshot.val();

        if (!changedData) {
            errorText.className = "error neutral";
            errorText.innerHTML = "De combinatie van je gebruikersnaam en wachtwoord is onjuist. Probeer het nog eens.";
        }

        serverPasswordHash = changedData.dbPassword;

        if (passwordHash == serverPasswordHash) {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.currentUser = tempUser;
                currentUserRef = usersRef.child(sessionStorage.currentUser);
                window.location.assign("./index.html");
            } else {
                errorText.className = "error bad";
                errorText.innerHTML = "Sorry, je browser ondersteunt geen web storage...\n We kunnen niet bij houden of je ingelogd bent, we geven je een test account.";
                currentUserRef = usersRef.child("test-person");
            }
            return true;
        } else {
            errorText.className = "error neutral";
            errorText.innerHTML = "De combinatie van je gebruikersnaam en wachtwoord is onjuist. Probeer het nog eens.";
            return false;
        }
    });
}

if (loginButton) {
    loginButton.onclick = function () {
        // setPopup("Test", "<p>Popuptest</p>", true);
        console.log("Click");
        login();
        return false;
    }
}