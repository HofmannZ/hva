// JavaScript Document
// auteur: Sanne 't Hooft


/******************************************************/
/* in dit bestand hoef je niets te wijzigen           */
/* dat mag natuurlijk wel als je net iets anders wilt */
/******************************************************/


// self invoking function
(function() {
	// starten met het laden van het bestand met de persoonlijke map-data
	loadScript ("_/myMapJS/myMapData.js", loadMapsAPI);
})();


// laden van het bestand met de persoonlijke map-data
// in the callback wordt de Google Maps API geladen 
function loadScript (url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src =  url;
	script.onload = callback;
	document.body.appendChild(script);
}


// laden van de Google Maps API 
// in the callback wordt de div met id 'myMap' gevuld met de kaart
function loadMapsAPI () {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?key='+myMapKey+'&language=en&callback=initMap';
	document.body.appendChild(script);
}


// de map initialiseren en de locaties toevoegen
function initMap(initialLocation) {
	var bounds = new google.maps.LatLngBounds();
	var infoWindow = new google.maps.InfoWindow();
    var marker, i, infoWindowContent;
	
	var mapOptions = {
	  zoom: 11,
      center: new google.maps.LatLng(52.373611, 4.891398) // midden op de dam
	};
	
	// de API de div laten vullen met de kaart
	// om te beginnen zoom factor 10 en als centrum van de kaart De Dam
    var map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
	
	
	// de locaties toevoegen - de info staat in myMapData.js
    for (i = 0; i < myMapLocations.length; i++) {  
     	// voor elke marker de volgende stappen
		
		// de basic marker opties: latlng (GPS positie) en de map
		var markerOptions = {
			position: new google.maps.LatLng(myMapLocations[i][1], myMapLocations[i][2]),
			map: map
		}
		
		// eigen plaatje toevoegen aan de marker opties (of niet)
		// check of de variabele bestaat en of de variabele een waarde heeft
		if ( typeof myMapImage !== 'undefined' && myMapImage.length != 0) {
    		var myMapImagePath = '_/myMapJS/images/'+ myMapImage;
			markerOptions.icon = myMapImagePath;
		}
		
		// de marker toevoegen aan de map
		marker = new google.maps.Marker(markerOptions);
		
	  	// de positie van de marker toevoegen aan de variabele bounds - die wordt straks gebruikt om de kaart te centreren en te laten inzoomen op alle markers
 		bounds.extend(marker.position);
		
		// click event toevoegen een de marker om het info eindow te tonen
      	google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
          		infoWindowContent = '<h2>'+myMapLocations[i][0]+'</h2>'
				// omschrijving toevoegen als die bestaat
				if (typeof myMapLocations[i][3] != 'undefined') {
					infoWindowContent += '<p>'+myMapLocations[i][3]+'</p>';
				}
				// link toevoegen als die bestaat
				if (typeof myMapLocations[i][4] != 'undefined') {
					infoWindowContent += '<a href="'+myMapLocations[i][4]+'">naar '+myMapLocations[i][0]+'</a>';
				}
				infoWindow.setContent(infoWindowContent);
          		infoWindow.open(map, marker);
        	}
      	})(marker, i));
	}
	
	// de gevulde variabele bounds gebruiken om in zoomen en te centreren op alle markers
	map.fitBounds(bounds);
	
	// indien voor GPS gekozen is proberen om de huidige locatie het center van de map te maken
	var myMapStartLocationUpper = myMapStartLocation.toUpperCase()
	if(navigator.geolocation && myMapStartLocationUpper == 'GPS') {
		navigator.geolocation.getCurrentPosition(function(position) {
			var newLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.panTo(newLocation);
		}, function() {
			// GPS bepalen mislukt
		});	
	} else {
		// Browser ondersteunt geen Geolocation
	}
	
}