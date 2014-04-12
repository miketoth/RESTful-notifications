(function query(){
    setTimeout(function() {
        if (localStorage.accessToken) {
            var graphUrl = "https://graph.facebook.com/562093799/notifications?" + localStorage.accessToken;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = JSON.parse(xmlhttp.responseText);
                getNotifications(response);
                }
            }

            xmlhttp.open("GET", graphUrl, true);
            xmlhttp.send();
        }
        query(); // recurse
    }, 10000);
})();

// make sure that if you don't respond to it that it backsoff exponentially
function getNotifications(response) {

    // get current time and compare it to most recent notification
    var current_time = new Date().getTime() / 1000;

    // get the time of the most recent notification and compare it to the current time
    // if the difference is less than N than notify the user
    // where N is how frequently the user wants to be notified -- exponential backoff
    var notification_time = new Date(response.data[0].updated_time).getTime() / 1000;
    console.log(notification_time + " " + current_time);

    // if less than 500 it is current enough that the user should be notified
    if(current_time - notification_time < 500 || true) {
        // make a sound!
        var audio = new Audio("sounds/water-droplets-1.wav");
        audio.play();
    }
}
