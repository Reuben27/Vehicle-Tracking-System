function initMap(){
    //Shows the google map with its center at the given coordinates.
    var options = {
      zoom:8,
      center: {lat:19.0760,lng:72.8777} //Coordinates of Mumbai
    }
    
    //Map object.
    var map = new google.maps.Map(document.getElementById('map'), options);

    //Bus locations.
    var bus = [
        {
            location: {lat: 19.2856, lng: 72.8691} //Mira Road
        },
        {
            location: {lat: 18.9912, lng: 72.8145} //South Bombay
        }
    ];

    // Loop through the bus locations.
    for(var i = 0;i < bus.length;i++){
        // Add marker
        addMarker(bus[i]);
      }

    //Function to add markers dynamically.
    function addMarker(buses){
        var marker = new google.maps.Marker({
            position: buses.location,
            map:map,
        });
    }
    
    /*
    var marker = new google.maps.Marker({
      position:{lat:19.0760,lng:72.8777},
      map:map,
      //custom icon //icon: 'map-pin.svg'
    });
    */
}