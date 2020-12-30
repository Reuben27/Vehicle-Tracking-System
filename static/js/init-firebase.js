// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBGY4NS2f7IQoj6DTJZmF2DdA_hmuh5dLw",
    authDomain: "poiuyt123.firebaseapp.com",
    databaseURL: "https://poiuyt123-default-rtdb.firebaseio.com",
    projectId: "poiuyt123",
    storageBucket: "poiuyt123.appspot.com",
    messagingSenderId: "1077239669792",
    appId: "1:1077239669792:web:5c9a6c66dd730329204845"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//For reading data
//var ref = firebase.database().ref("");

firebase.database().ref('poiuyt123-default-rtdb').on('value',(snap)=>{
    console.log(snap.val());
});
/*
ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});
*/