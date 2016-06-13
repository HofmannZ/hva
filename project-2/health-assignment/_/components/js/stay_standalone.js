// voor de markt presentatie :
function idleTimer() {
   var t;
   window.onload = resetTimer;
   window.onmousemove = resetTimer;
   window.onmousedown = resetTimer; // catches touchscreen presses
   window.onclick = resetTimer;     // catches touchpad clicks
   window.onscroll = resetTimer;    // catches scrolling with arrow keys
   window.onkeypress = resetTimer;

   function redirect() {
	   	if (typeof(Storage) !== "undefined") {
	        sessionStorage.currentUser = false;
	        window.location.assign("./login.html");
	    }
   }

   function resetTimer() {
       clearTimeout(t);
       t = setTimeout(redirect, 25000);  // time is in milliseconds
   }
}
idleTimer();

var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
function checkDevice() {
    'use strict';
    if (sessionStorage.deviceCheck !== "true") {
        if (iOS == false) {
            window.alert("Deze website wordt het beste weergegeven op een mobiel.");
            sessionStorage.deviceCheck = "true";
        } else if (((("standalone" in window.navigator) && window.navigator.standalone) == false) && (iOS == true)) {
            window.alert("Deze website kun je het beste bekijken als 'beginscherm app'. Zo voeg je de site toe aan je beginscherm:\n1. Druk op het delen icoon.\n2. Druk op 'Zet in beginscherm'.\n3. Druk op 'Voeg toe'.\n4. Open de app Breathing Cloud vanaf het beginscherm");
            sessionStorage.deviceCheck = "true";
        } else if (("standalone" in window.navigator) && window.navigator.standalone && iOS == true) {
            window.alert("Je bekijkt onze website vanaf je beginscherm. Hierdoor heb je de beste ervaring met onze website.\nDankjewel!");
            sessionStorage.deviceCheck = "true";
        }
    }
}
checkDevice();

// Mobile Safari in standalone mode
// From this site: https://gist.github.com/kylebarrow/1042026
if (("standalone" in window.navigator) && window.navigator.standalone) {
    
    // If you want to prevent remote links in standalone web apps opening Mobile Safari, change 'remotes' to true
	var noddy, remotes = false;
	
	document.addEventListener('click', function(event) {
		'use strict';
		noddy = event.target;
		
		// Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
		while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
	        noddy = noddy.parentNode;
	    } if ('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
			event.preventDefault();
			document.location.href = noddy.href;
		}
	
	}, false);
}