//Second try at dynamic addition and removal of markers on google maps.

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

  var buses = [[19.0760,72.8777],[25.0760,80.8777],[30.0760,85.8777],[34.0760,90.8777]];
  var counter=0; 

  //coord keeps updating from database
  var delay = 15000; //marker updates every 5 seconds
  
  var temp = 1000000; //for testing
  var temp_ctr = 0; 

  var tt=0;
  /*
  while(true){
    // flag = fetch user input (if true break out of loop else continue)
    // temp_ctr += 1; if(temp_ctr==temp)break; //varna infi loop (for testing only)
    // tt++; 
    // if(tt==1000000){
    //   addMarker(bus[counter]);
    //   counter++; 
    //   tt=0;
    // }
    //Bus locations and info.
    var bus = [
      {
        location: {lat:buses[counter][0] , lng: buses[counter][1]} 
      },        
    ];

    var i = 1;                  //  set your counter to 1
    function myLoop() {         //  create a loop function
      setTimeout(function() {   //  call a 3s setTimeout when the loop is called
        addMarker(bus[0])
        counter=counter+1;      //  your code here
        i++;                    //  increment the counter
        if (i < 10) {           //  if the counter < 10, call the loop function
          myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
      }, 5000)
    }

    // addMarker(bus[counter])
    // counter++; 
    // addMarker(bus[counter])
    // counter++; 

    myLoop(); 
    // addMarker(bus[counter]);

    // setTimeout(() => { counter++ ; }, delay);   
  } */
}