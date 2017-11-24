window.onload = function() {
    initApp();

    console.log('your sister')
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
        document.getElementById('left2').innerHTML = ("Sign In");
        document.getElementById('left1').innerHTML = ("Sign Up");

        // document.getElementById("left1").href="index.html";

    } else {
        // No user is signed in.
        // document.getElementById("left1").href = "index.html";
        window.location.href = "index.html";
    }

};

function initApp() {

    // var user = firebase.auth().currentUser;
    //        console.log('your sister outside of if user');

    firebase.auth().onAuthStateChanged(function(user) {
        var email = user.email;
        var uid = user.uid;

        document.getElementById('left2').innerHTML = (email);
        document.getElementById('left1').innerHTML = ("Log Out");
        console.log('your sister')
        // User is signed in.
        var uid = user.uid;
        var database = firebase.database();

        var ref = firebase.database().ref('search' + uid);

        var query = ref.orderByKey();
        ref.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    // var childData = childSnapshot.val();
                    alert(key);
                    console.log(key);
                    // console.log(childData);

                });
            });
        } else {
            // No user is signed in.
            console.log('log out');

        }
    };