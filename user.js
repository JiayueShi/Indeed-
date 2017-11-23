window.onload = function() {
    initApp();
    

};



function initApp() {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      var uid = user.uid;   
      var database = firebase.database();
      
        

    } else {
      // No user is signed in.
     
    }
};