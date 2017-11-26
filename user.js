window.onload = function() {
    initApp();
};

function a1() {
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        document.getElementById("left2").href = "user.html";


    } else {
        // No user is signed in.
        // document.getElementById("left2").href = "index.html";
        window.location.href = "index.html";
    }

}

function a2() {
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        firebase.auth().signOut();
        alert("You have log out!");
        
        window.location.href="main.html";
        // document.getElementById("left1").href="index.html";

    } else {
        // No user is signed in.
        // document.getElementById("left1").href = "index.html";
        window.location.href = "index.html";
    }

};

function initApp() {

    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {

    if (user){
        var email = user.email;
        var uid = user.uid;

        document.getElementById('left2').innerHTML = (email);
        document.getElementById('left1').innerHTML = ("Log Out");
      	
        // User is signed in.
        var uid = user.uid;
        var database = firebase.database();

        var ref = firebase.database().ref('search' + uid);
        var keywords = [];
        var places = [];
        
        ref.child("keyword").once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val()['searchKeywords'];
                    // console.log(key);
                    keywords.push(childData);
                    // console.log(childData);


                });
                var three = 3;
                kLength = keywords.length;
                var j = 1;

                for(var i = kLength - 1; i > kLength - 4; i --){

                    document.getElementById('k'+j).innerHTML = (keywords[i]);
                    three--;
                    j++;
                }
            }
            );

        ref.child("place").once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val()['place'];
                    // console.log(key);
                    places.push(childData);
                    // console.log(childData);


                });
                console.log(places[0]);
                var three = 3;
                pLength = places.length;
                var j = 1
                for(var i = pLength - 1; i > pLength - 4; i --){

                    document.getElementById('p'+j).innerHTML = (places[i]);
                    three--;
                    j++;
                }

            }
            
            );


        
        


        // console.log(keywords[0]);
        // console.log(places);

        
       

        } else {
            // No user is signed in.
            console.log('log out');
            window.location.href="main.html";

        }
    })
    };