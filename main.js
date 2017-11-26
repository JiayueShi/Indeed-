$(document).ready(function() {
    initApp();
    document.getElementById('search').addEventListener('click', clickSearch);

    // $( "#skill-chart" ).hide();

    // clickSearch(true);
    if (annyang) {
        // Let's define a command.
        var commands = {
            'search *term in *loc area': function(term, loc) {
                // alert(term);
                showToast('On it, ' + term + ' near ' + loc + '...')
                jobSearch(term, loc);
            },
            'show me a cat': function() {
                $('#cat_img').animate({
                    bottom: '0px'
                });

                // send cat back
                setTimeout(function() {
                    $('#cat_img').animate({
                        bottom: '-500px'
                    });
                }, 4500);
                console.log('cat appear!');
            },

        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening.
        annyang.start();
    }

    jobSearch('Data Engineer', 'Los Angeles');

});

function toggleVis() {
    var x = document.getElementById("skill-chart");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


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

function parseSkills(skillData, jobCount) {
    var totalCount = 0;
    var othersCount = 0;
    var topTenList = [];
    var count = 0;
    // var jobCount = Object.keys(skillData).length;
    console.log('jobCount:' + jobCount);

    // sort skill data
    skillData.sort(function(a, b) {
        return parseFloat(b.count) - parseFloat(a.count);
    });
    console.log(skillData);

    for (key in skillData) {
        // totalCount += skill[]
        curSkill = skillData[key]
        console.log(curSkill);
        curCount = curSkill.count;
        totalCount += curCount;
        topTenList.push({
            "name": curSkill.name,
            'y': curCount * 100.0 / jobCount,
            'drilldown': curSkill.name
        });
        count += 1;
        if (count == 10) {
            break;
        }
    }

    return topTenList;
};


function initSkillChart(skills, jobCount, keyWord, location) {
    var parsedSkills = parseSkills(skills, jobCount);
    // console.log(parsedSkills);

    if (location.length < 2) {
        location = 'United States'
    }

    // Create the chart
    Highcharts.chart('skill-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Most desired skills for ' + keyWord + ' in ' + location
        },
        subtitle: {
            text: 'Source: <a href="https://www.indeed.com/">Indeed.com</a>, scraped by Ji</a>.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent for skill per Jobs'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total skill required<br/>'
        },

        series: [{
            name: 'Skills',
            colorByPoint: true,
            data: parsedSkills
        }]
    });

}


function showToast(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 1500);
}


function jobSearch(searchKeywords, place) {
    console.log(searchKeywords, place);

    var $jobPanel = $('#job-post-panel');
    // empty job panel for new searchKeywords
    $jobPanel.empty();

    var jobTemplate = "" + '<div class="job-post-card card-1" >' +
        '<div class="job-title"><a href="{{url}}">{{jobtitle}}</a></div> <h5 class="text-muted">' +
        '<span class="company" style="color:gray;"><a href="https://www.indeed.com/cmp/{{company}}">{{company}}</a></span>' +
        '<span class="location" style="margin-left:5px;"> - {{formattedLocationFull}}</span> </h5> ' +
        '<div class="job-snip">{{snippet}}</div> <div class="job-date" style="color:gray;"> {{formattedRelativeTime}} </div> </div>'

    function addPosts(post) {
        $jobPanel.append(Mustache.render(jobTemplate, post));
    };


    var url = "https://indeed-jz.herokuapp.com/indeed/?term=" + encodeURI(searchKeywords) + "&loc=" + 　encodeURI(place);
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

            // init the skill chart
            initSkillChart(skills, jobPosts.length, searchKeywords, place);

        },
        fail: function() {
            console.log('failed');
        },
    });
    //  end of api call

}



function clickSearch() {
    // if (firstLoad == true) {
    //     var searchKeywords = 'Data Engineer';
    //     var place = 'Los Angeles, CA';
    // } else {
    var searchKeywords = document.getElementById('searchKeywords').value;
    var place = document.getElementById('place').value;
     var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        var uid = user.uid;
        firebase.database().ref('search' + uid).child("keyword").push({
            searchKeywords: searchKeywords
        });
        firebase.database().ref('search' + uid).child("place").push({        
            place: place
        });
    } else {
        // No user is signed in.
    }

    jobSearch(searchKeywords, place);


};
