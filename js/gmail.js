window.$(document).ready(function() {
    console.log("READY!");

    if(document.URL === "https://mail.google.com/mail/u/0/#inbox"){
        console.log($("title").text());

        var title = $("title").text();
        if(title.indexOf("(") != -1) {
            var split = title.split("(");

            var count = 0;
            var unread = "";
            while(count < split[1].length) {
                if(split[1].charAt(count) == ")") {
                    break;
                }
                unread = unread.concat(split[1].charAt(count));
                count++;
            }
            console.log(unread + "<<<< UNREAD");
        }
    }
});
