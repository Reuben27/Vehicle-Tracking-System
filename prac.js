let map;
let markers = [];

//To add markers and remove one by one.
function initMap() {
  const mumbai = { lat:19.0760,lng:72.8777 };
  const miraroad = {lat: 19.2856, lng: 72.8691};
  const southbombay = {lat: 18.9912, lng: 72.8145};
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: mumbai,
    mapTypeId: "terrain",
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });

  // Adds a marker at the center of the map.
  addMarker(miraroad);
  setTimeout(function() { 
    addMarker(southbombay);
    deletemarker(0);}, 10000);
  //setTimeout(function() { deletemarker(0);}, 5000);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  markers.push(marker);
}

function deletemarker(i){
    markers[i].setMap(null);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
