function idleTimer(){function a(){"undefined"!=typeof Storage&&(sessionStorage.currentUser=!1,window.location.assign("./login.html"))}function b(){clearTimeout(c),c=setTimeout(a,25e3)}var c;window.onload=b,window.onmousemove=b,window.onmousedown=b,window.onclick=b,window.onscroll=b,window.onkeypress=b}function checkDevice(){"use strict";"true"!==sessionStorage.deviceCheck&&(0==iOS?(window.alert("Deze website wordt het beste weergegeven op een mobiel."),sessionStorage.deviceCheck="true"):0==("standalone"in window.navigator&&window.navigator.standalone)&&1==iOS?(window.alert("Deze website kun je het beste bekijken als 'beginscherm app'. Zo voeg je de site toe aan je beginscherm:\n1. Druk op het delen icoon.\n2. Druk op 'Zet in beginscherm'.\n3. Druk op 'Voeg toe'.\n4. Open de app Breathing Cloud vanaf het beginscherm"),sessionStorage.deviceCheck="true"):"standalone"in window.navigator&&window.navigator.standalone&&1==iOS&&(window.alert("Je bekijkt onze website vanaf je beginscherm. Hierdoor heb je de beste ervaring met onze website.\nDankjewel!"),sessionStorage.deviceCheck="true"))}idleTimer();var iOS=/iPad|iPhone|iPod/.test(navigator.platform);if(checkDevice(),"standalone"in window.navigator&&window.navigator.standalone){var noddy,remotes=!1;document.addEventListener("click",function(a){"use strict";for(noddy=a.target;"A"!==noddy.nodeName&&"HTML"!==noddy.nodeName;)noddy=noddy.parentNode;"href"in noddy&&-1!==noddy.href.indexOf("http")&&(-1!==noddy.href.indexOf(document.location.host)||remotes)&&(a.preventDefault(),document.location.href=noddy.href)},!1)}