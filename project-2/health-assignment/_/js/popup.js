function setPopup(a,b,c){console.log("popup functie is bezig 1"),popupHeader.innerHTML=a,popupContent.innerHTML=b,0==c&&(console.log("popup functie is bezig 2"),popupClose.style.visibility="hidden"),popup.classList.add("activePopup"),console.log("popup functie is bezig 3"),popupClose.onclick=function(){popup.classList.remove("activePopup")}}var popup=document.getElementById("popup"),popupHeader=document.getElementById("popupHeader"),popupClose=document.getElementById("popupClose"),popupContent=document.getElementById("popupContent");