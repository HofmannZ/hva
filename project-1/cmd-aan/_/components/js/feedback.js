//firebase connection
var firebaseRef = new Firebase("https://cmd-project-1-deel-2.firebaseio.com/");
    
//set push data
function sendFeedback() {
    "use strict";
    var feedbackRef = firebaseRef.child('feedback'),
        feedbackEmail = document.getElementById("feedbackEmail").value,
        feedbackFeedback = document.getElementById("feedbackText").value,
        feedbackName = document.getElementById("feedbackName").value;

    //push to firebase
    feedbackRef.push().set({
        email: feedbackEmail,
        feedback: feedbackFeedback,
        name: feedbackName
    });
}

//redirect
document.getElementById("sendFeedback").onclick = function () {
    "use strict";
    location.href = "thankyou.html";
};
