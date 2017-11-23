window.onload = function() {
    initApp();
};

function initApp() {

    document.getElementById('btnIn').addEventListener('click', clickSignIn, false);
    document.getElementById('btnUp').addEventListener('click', clickSignUp, false);
    // document.getElementById('forgetPwd').addEventListener('click', sendPasswordReset, false);
};

// 


function clickSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( function(){ window.location.href="main.html"; })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('btnIn').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('btnIn').disabled = true;
    // window.location.href='main.html';
}


function clickSignUp() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( function(){ window.location.href="main.html"; })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

        // [END_EXCLUDE]
    });
    // [END createwithemail]
    
    document.getElementById('btnUp').disabled = true;
    // window.location.href='main.html';
}

// function sendPasswordReset() {
//     var email = document.getElementById('inputEmail').value;
//     // [START sendpasswordemail]
//     firebase.auth().sendPasswordResetEmail(email).then(function() {
//         // Password Reset Email Sent!
//         // [START_EXCLUDE]
//         alert('Password Reset Email Sent!');
//         // [END_EXCLUDE]
//     }).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         if (errorCode == 'auth/invalid-email') {
//             alert(errorMessage);
//         } else if (errorCode == 'auth/user-not-found') {
//             alert(errorMessage);
//         }
//         console.log(error);
//         // [END_EXCLUDE]
//     });
//     // [END sendpasswordemail];
// }