var successURL = 'https://www.facebook.com/connect/login_success.html';

// login to facebook
function onFacebookLogin() {
    var update = 1; // make sure the token updates itself every two hours
    if (!localStorage.accessToken || update == 1) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
	                access = params.split('&')[0]
                    console.log(access);
                    localStorage.accessToken = access;
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    return;
                }
            }
        });
    }
}

// load and play the background noise
var audio = new Audio('sounds/Ocean_Relaxing_Surf.mp3');
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
audio.play();

chrome.tabs.onUpdated.addListener(onFacebookLogin);
