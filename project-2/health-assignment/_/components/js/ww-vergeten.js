// Aanvragen
var aanvragenButton = document.getElementById("aanvragenButton");

if (aanvragenButton) {
    aanvragenButton.onclick = function () {
        window.location.assign("./login.html");
        return false;
    }
}