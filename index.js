function initMap(){
    //Shows the google map with its center at the given coordinates.
    var options = {
      zoom:8,
      center: {lat:19.0760,lng:72.8777} //Coordinates of Mumbai
    }
    

     //Function to add markers dynamically.

     function addMarker(buses){
            var marker = new google.maps.Marker({
                position: buses.location,
                map:map,
            });

            //Check whether icon has been customized.
            if(buses.iconImage){
                marker.setIcon(buses.iconImage);
            }
      
            //Check whether extra info is given.
            if(buses.info){
                var infoWindow = new google.maps.InfoWindow({
                    content: buses.info
                });

                marker.addListener('click', function(){
                    infoWindow.open(map, marker);
                });
            }
        }
    
    //Map object.
    var map = new google.maps.Map(document.getElementById('map'), options);

    var buses = [[90,90],[45,45],[180,180],[60,60]];
    var counter=0; 
    //coord keeps updating from database
    var delay = 5000; //marker updates every 5 seconds
    
    var temp = 1000000; //for testing
    var temp_ctr = 0; 
    while(true){
        //flag = fetch user input (if true break out of loop else continue)
        temp_ctr += 0.1; if(temp_ctr==temp)break; //varna infi loop (for testing only)

        //Bus locations and info.
        var bus = [
            {
                location: {lat:buses[counter][0] , lng: buses[counter][1]} 
            }
           
        ];
        
        addMarker(bus[counter]);

        setTimeout(() => { counter++ ; }, delay); 

    
    }//while loop
    //************************************************************************

    /*
    var marker = new google.maps.Marker({
      position:{lat:19.0760,lng:72.8777},
      map:map,
      //custom icon //icon: 'map-pin.svg'
    });
    */
}