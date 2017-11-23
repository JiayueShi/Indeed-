window.onload = function() {
    initApp();
    document.getElementById('search').addEventListener('click', clickSearch);

};



// $( document ).ready(function() {
//     initApp();
   
// });

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.       
        var email = user.email;   
        var uid = user.uid;   

        document.getElementById('left2').innerHTML = (email); 
        document.getElementById('left1').innerHTML = ("Log Out"); 

    // ...
    } else {
    // User is signed out.
    // ...
  }
})
};

function a1(){
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
       document.getElementById("left2").href="user.html";
        

    } else {
      // No user is signed in.
      document.getElementById("left2").href="index.html";
    }

}

function a2(){
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
      document.getElementById("left1").href="index.html";
    }
    
}

function clickSearch() {
    var searchKeywords = document.getElementById('searchKeywords').value;
    var place = document.getElementById('place').value;

    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
        var uid = user.uid;   
        firebase.database().ref('search' + uid).push({
        searchKeywords: searchKeywords,
        place: place    
    });

    } else {
      // No user is signed in.
    }

    

};



