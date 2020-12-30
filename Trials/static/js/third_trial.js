//Third try for showing live location. Addition of markers followed by the removal of the redundant markers
let map;
let markers = [];

//To add markers and remove one by one.
function initMap() {
  const mumbai = { lat:19.0760,lng:72.8777 };
  const miraroad = {lat: 19.2856, lng: 72.8691};
  const southbombay = {lat: 18.9912, lng: 72.8145};
  const navimumbai = {lat: 19.0330, lng: 73.0297};

  const input_variables = [[19.2856, 72.8691], [19.0330, 73.0297], [19.1856, 72.8592]];

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: mumbai,
    mapTypeId: "terrain",
  });

  var curr = {lat: input_variables[0][0], lng: input_variables[0][1]};
  addMarker(curr);

  setTimeout(function(){
    curr = {lat: input_variables[1][0], lng: input_variables[1][1]};
    addMarker(curr);
    deletemarker(0);
  }, 10000);
  
  setTimeout(function(){
    curr = {lat: input_variables[2][0], lng: input_variables[2][1]};
    addMarker(curr);
    deletemarker(1);
  }, 20000);
  
  /*for(var i = 1; i < 3; i++){
      delay(i, input_variables);
  }*/
  /*curr = {lat: input_variables[1][0], lng: input_variables[1][1]};
  addMarker(curr);
  curr = {lat: input_variables[2][0], lng: input_variables[2][1]};
  addMarker(curr);
  deletemarker(2);
  */
  /*for(var i = 0; i < 3; i++){
    curr = {lat: input_variables[i][0], lng: input_variables[i][1]};
    addMarker(curr);
  }*/

  // This event listener will call addMarker() when the map is clicked.
  /*map.addListener("click", (event) => {
    addMarker(event.latLng);
  });*/

  // Adds a marker at the center of the map.
  /*addMarker(miraroad);
  setTimeout(function() { 
    addMarker(southbombay);
    deletemarker(0);}, 10000);*/
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

function delay(i, input_variables){
    setTimeout(function() { 
        var cur = {lat: input_variables[i][0], lng: input_variables[i][1]};
        addMarker(cur);
        deletemarker(i-1);}, 10000);
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