var mainTag=document.getElementsByTagName("main")[0],alarmSwitch=document.getElementById("alarmSwitch"),alarmTimeInput=document.getElementById("alarmTimeInput"),alarmTime=document.getElementById("alarmTime"),alarmTimeTill=document.getElementById("alarmTimeTill"),notifications=document.getElementById("notifications"),notificationSet,firebaseRef=new Firebase("https://cmd-project2-ctolite.firebaseio.com/"),usersRef=firebaseRef.child("users"),currentUser="jenny",currentUserRef=usersRef.child(currentUser),d=new Date,dd=d.getDate(),mm=d.getMonth()+1,yyyy=d.getFullYear();10>dd&&(dd="0"+dd),10>mm&&(mm="0"+mm);var currentDate=dd+"-"+mm+"-"+yyyy,todayRef=currentUserRef.child(currentDate);if(currentUserRef.on("value",function(a){"use strict";var b,c,e,f,g,h=a.val(),i=h.dbAlarmTime.split(":"),j=d.getHours(),k=d.getMinutes(),l=parseInt(j),m=parseInt(k),n=parseInt(i[0]),o=parseInt(i[1]),p=document.createElement("li"),q=document.createElement("a"),r=document.createElement("img"),s=document.createElement("h2");if(alarmTimeInput&&(alarmTimeInput.value=h.dbAlarmTime),alarmTime&&(alarmTime.innerHTML=h.dbAlarmTime),alarmTimeTill){for(d=new Date,e=0,f=i.length;f>e;e++)m>o?c=60-m+o:o>m?c=o-m:o==m&&(c=0),l>n?b=24-l+n:n>l&&o>=m?b=n-l:n>l&&m>o?b=n-l-1:n==l&&m>o?b=23:n==l&&o>m?b=0:n==l&&o==m&&(b=24);alarmTimeTill.innerHTML=b+" uur en "+c+" minuten tot afgaan"}alarmSwitch&&(alarmSwitch.checked=h.dbAlarmSet),alarmTimeInput&&alarmTimeInput.addEventListener("change",function(){currentUserRef.update({dbAlarmTime:alarmTimeInput.value})}),todayRef.on("value",function(a){g=a.val().dbSequenceCompleted}),notificationSet!==!0&&notifications&&("true"==g?(p.appendChild(q),q.appendChild(r),q.appendChild(s),q.className+="button_bar",q.className+=" open_item",q.className+=" icon_link",q.href="schema_fake_uitklapje.html",r.src="./_/images/check.svg",s.innerHTML="Vragen ingevuld",notifications.appendChild(p),notificationSet=!0):"true"!==g&&notifications&&(p.appendChild(q),q.appendChild(r),q.appendChild(s),q.className+="button_bar",q.className+=" open_item",q.className+=" icon_link",q.href="sequence1.html",r.src="./_/images/cross.svg",s.innerHTML="Vragen niet ingevuld",notifications.appendChild(p),notificationSet=!0)),document.getElementById("loader").style.display="none",mainTag.classList.remove("prevent-loading")}),"wekker_wijzig.html"==location.pathname.split("/").slice(-1)){var alarmTimeInput=document.getElementById("alarmTimeInput");alarmTimeInput.addEventListener("focus",function(){"use strict";document.getElementById("toutchToEdit").style.color="#888"},!0)}