var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

let map;
let markers = [];

//To add markers and remove one by one.
function initMap() {
    const mumbai = { lat:19.0760,lng:72.8777 }; 
    var client = new HttpClient();
    var obj; 
    var lati;
    var longi;
    var time;
    var prev;

    client.get('https://api.thingspeak.com/channels/1271022/feeds.json?results=2', function(response) {
        console.log(response);
        console.log("Hemlo");
        obj = JSON.parse(response);
        console.log(obj["feeds"]);
        console.log(obj.feeds[1].field1);

        lati = parseFloat(obj.feeds[1].field1);
        console.log(typeof(lati));
        console.log("Latitude = " + lati);

        longi = parseFloat(obj.feeds[1].field2);
        console.log("Longitude = " + longi);

        time = obj.feeds[1].created_at;
        console.log("Location Last Updated in");
        console.log(time);
    });

    setTimeout(function(){
        console.log(typeof(lati));
        console.log(lati);
        var curr = {lat: lati, lng: longi };
        prev = curr;

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: curr,
            mapTypeId: "terrain",
        }); 
        
        addMarker(curr);
    }, 5000);

    console.log("Hey everybody what you gonna do today!!");

    setInterval(function(){
        client.get('https://api.thingspeak.com/channels/1271022/feeds.json?results=2', function(response) {
            console.log(response);
            console.log("Hemlo");
            obj = JSON.parse(response);
            console.log(obj["feeds"]);
            console.log(obj.feeds[1].field1);

            lati = parseFloat(obj.feeds[1].field1);
            console.log(typeof(lati));
            console.log("Latitude = " + lati);

            longi = parseFloat(obj.feeds[1].field2);
            console.log("Longitude = " + longi);

            time = obj.feeds[1].created_at;
            console.log("Location Last Updated in");
            console.log(time);
        });

        setTimeout(function(){
            console.log(typeof(lati));
            console.log(lati);
            curr = {lat: lati, lng: longi };
            if (curr != prev){
                addMarker(curr);
                deletemarker(0);
                map.setCenter(curr);
                prev = curr;
            }
        }, 5000);
    }, 15000);
    
}

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
