// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    /*
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
    */
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//For reading data
var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});