function switchActive(){verslagSwitchKwaliteid.classList.toggle("active"),verslagSwitchHoeveelheid.classList.toggle("active"),kwaliteidChartElement.classList.toggle("active"),hoeveelheidChartElement.classList.toggle("active")}var hoeveelheidData={labels:["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],datasets:[{label:"hoeveelheid dataset",fillColor:"rgba(131,167,217,0.6)",strokeColor:"rgba(131,167,217,1)",highlightFill:"rgba(131,167,217,0.4)",highlightStroke:"rgba(131,167,217,0.8)"}]},hoeveelheidCtx=document.getElementById("hoeveelheidChart").getContext("2d"),herstelData={labels:["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"],datasets:[{label:"herstel dataset",fillColor:"rgba(131,167,217,0)",strokeColor:"rgba(131,167,217,1)",pointColor:"rgba(131,167,217,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(131,167,217,1)"}]},herstelCtx=document.getElementById("herstelChart").getContext("2d"),kwaliteidData=[{color:"rgba(52,198,59,1)",highlight:"rgba(52,198,59,0.9)",label:"Goed"},{color:"rgba(255,168,55,1)",highlight:"rgba(255,168,55,0.9)",label:"Matig"},{color:"rgba(238,80,80,1)",highlight:"rgba(238,80,80,0.9)",label:"Slecht"}],kwaliteidOptions={animationSteps:85,animationEasing:"easeOutQuad"},kwaliteidCtx=document.getElementById("kwaliteidChart").getContext("2d"),verslagSwitchKwaliteid=document.getElementById("verslagSwitchKwaliteid"),verslagSwitchHoeveelheid=document.getElementById("verslagSwitchHoeveelheid"),kwaliteidChartElement=document.getElementById("kwaliteidChart"),hoeveelheidChartElement=document.getElementById("hoeveelheidChart"),herstelChartElement=document.getElementById("herstelChart"),locationParamValue=location.search.split("&")[0].replace("?","").split("=")[1],verslagenRef=currentUserRef.child("reports"),verslagNaam=document.getElementById("verslagNaam"),verslagKwaliteid=document.getElementById("verslagKwaliteid");verslagenRef.on("value",function(a){"use strict";var b=a.val(),c=b[locationParamValue];verslagNaam.innerHTML=c.dbReportName,"good"==c.dbReportQuality?(verslagKwaliteid.innerHTML="goed",verslagKwaliteid.className="goed"):"neutral"==c.dbReportQuality?(verslagKwaliteid.innerHTML="neutraal",verslagKwaliteid.className="neutraal"):"bad"==c.dbReportQuality&&(verslagKwaliteid.innerHTML="slecht",verslagKwaliteid.className="slecht"),kwaliteidData[0].value=c.dbReportQualityPerDay.dbGood,kwaliteidData[1].value=c.dbReportQualityPerDay.dbNeutral,kwaliteidData[2].value=c.dbReportQualityPerDay.dbBad,hoeveelheidData.datasets[0].data=c.dbAmountOfMovementPerDay,herstelData.datasets[0].data=c.dbExerciseAmountPerDay;new Chart(kwaliteidCtx).Pie(kwaliteidData,kwaliteidOptions),new Chart(herstelCtx).Line(herstelData);document.getElementById("loader").style.display="none",document.getElementsByTagName("main")[0].classList.remove("prevent-loading")}),verslagSwitchKwaliteid.onclick=function(){switchActive();new Chart(kwaliteidCtx).Pie(kwaliteidData,kwaliteidOptions)},verslagSwitchHoeveelheid.onclick=function(){switchActive();new Chart(hoeveelheidCtx).Bar(hoeveelheidData)};