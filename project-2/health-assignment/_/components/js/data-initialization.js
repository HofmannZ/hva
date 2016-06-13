// Refresh iOS ofline chache
function updateSite(event) {
    window.applicationCache.swapCache();
}
window.applicationCache.addEventListener('updateready', updateSite, false);

// Swipe events by cocco
// From this site: http://stackoverflow.com/questions/17567344/detect-left-right-swipe-on-touch-devices-but-allow-up-down-scrolling
window.onload=function(){
    (function(d){
        var
        ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
        nm=true,sp={x:0,y:0},ep={x:0,y:0},
        touch={
            touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
            touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
            touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
            touchcancel:function(e){nm=false}
        };
        for(var a in touch){d.addEventListener(a,touch[a],false);}
    })(document);
}

// firebase connection
var firebaseRef = new Firebase("https://breathing-cloud.firebaseio.com/"),
    usersRef = firebaseRef.child('users'),
    currentUser,
    currentUserRef;

// Hash function
// From this site: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// get last element from any array
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// get window location path
function getLocationPath() {
    var pathArray = window.location.pathname.split( '/' ),
        pathArrayLength = pathArray.length,
        locationPath = pathArray[pathArrayLength - 1];
    return locationPath;
}

// session check
if (typeof(Storage) !== "undefined") {
    if (sessionStorage.currentUser) {
        currentUserRef = usersRef.child(sessionStorage.currentUser);
    } else if ((getLocationPath() !== "login.html") && (getLocationPath() !== "wachtwoordvergeten.html")) {
        window.location.assign("./login.html");
    } 
} else {
    alert("Sorry, je browser ondersteunt geen web storage...\n We kunnen niet bij houden of je ingelogd bent, we geven je een test account.");
    currentUserRef = usersRef.child("test-person");
}

// logout
function logout() {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.currentUser = false;
        window.location.assign("./login.html");
    }
}