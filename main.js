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

function a1() {
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        document.getElementById("left2").href = "user.html";


    } else {
        // No user is signed in.
        document.getElementById("left2").href = "index.html";
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
        document.getElementById("left1").href = "index.html";
    }

};



function clickSearch() {

    var searchKeywords = document.getElementById('searchKeywords').value;
    var place = document.getElementById('place').value;

    var $jobPanel = $('#job-post-panel');
    // empty job panel for new searchKeywords
    $jobPanel.empty();

    var jobTemplate = "" + '<div class="job-post-card card-1" >' +
        '<h4><a href="{{url}}">{{jobtitle}}</a></h4> <h5 class="text-muted">' +
        '<span class="company" style="color:gray;"><a href="#">{{company}}</a></span>' +
        '<span class="location" style="margin-left:5px;"> - {{formattedLocationFull}}</span> </h5> ' +
        '<div class="job-snip">{{snippet}}</div> <div class="job-date" style="color:gray;"> {{formattedRelativeTime}} </div> </div>'

    function addPosts(post) {
        $jobPanel.append(Mustache.render(jobTemplate, post));
    };


    var url = "https://indeed-jz.herokuapp.com/indeed/" + encodeURI(searchKeywords);
    console.log(url);
    //  Pull data from our apiKey
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        // data: data,
        success: function(data) {
            jobPosts = data["result"]["job_results"]
            skills = data["result"]["skills_required"]

            $.each(jobPosts, function(i, post) {
                // clean snip text
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = post["snippet"];
                post["snippet"] = tempDiv.textContent;

                addPosts(post);
            });

            console.log(jobPosts);
            console.log(skills);
        },
        fail: function() {
            console.log('failed');
        },
    });
    //  end of api call

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

// function addSearchResult(place, keyWords) {
//     // var params = {
//     //     // Request parameters
//     //     "term": keyWords,
//     //     "loc": place,
//     // };
//
//     $.ajax({
//             url: "https://indeed-jz.herokuapp.com/indeed/",
//             // url: "https://indeed-jz.herokuapp.com/indeed/" + $.param(params),
//             type: "GET",
//             data: keyWords,
//         })
//         .done(function(data) {
//             // alert("success");
//             // console.log(data);
//             jobPosts = data["result"]["job_results"]
//             skills = data["result"]["skills_required"]
//
//             console.log(jobPosts);
//             console.log(skills);
//
//             return {
//                 "jobPosts": jobPosts,
//                 "skills": skills,
//             };
//         })
//         .fail(function(jqXHR, textStatus, errorThrown) {
//             // alert("error");
//             alert(textStatus);
//             alert(errorThrown);
//             console.log('error');
//             return 'failed';
//         });
// };
