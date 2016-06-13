var items = document.getElementsByClassName("accordion");
for (var i = 0; i < items.length; i++) {
    items[i].onclick = function(){
    	for (var j = 0; j < this.childNodes.length; j++) {
		    if (this.childNodes[j].className == "open-card-togle-icon" || this.childNodes[j].className == "open-card-togle-icon open") {
			    this.childNodes[j].classList.toggle("open");
			    this.childNodes[j].nextElementSibling.classList.toggle("show");
		    }        
		}
    }
}
document.getElementById("loader").style.display = "none";
document.getElementsByTagName("main")[0].classList.remove("prevent-loading");