var locationParamValue=location.search.split("&")[0].replace("?","").split("=")[1],oefeningenRef=firebaseRef.child("exercises"),oefeningNaam=document.getElementById("oefeningNaam"),oefeningOmschrijfing=document.getElementById("oefeningOmschrijfing");oefeningenRef.on("value",function(a){"use strict";var b=a.val(),c=b[locationParamValue];oefeningNaam.innerHTML=c.dbExerciseName,oefeningOmschrijfing.innerHTML=c.dbExerciseDescription,document.getElementById("loader").style.display="none",document.getElementsByTagName("main")[0].classList.remove("prevent-loading")});