// ==/UserScript==
// @name         Kingdom Bot
// @namespace    https://github.com/jeevan608/youlikehitsbot
// @version      0.4.1
// @description  Interacts with YLH automatically whereever possible.
// @author       jeevan
// @match        *://kingdomlikes.com/free_points/youtube-views
// @grant        GM.getValue
// @grant        GM.setValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require      https://cdn.jsdelivr.net/gh/naptha/tesseract.js/dist/tesseract.min.js
// ==/UserScript==

(() => {
    const J = jQuery.noConflict(true);
    const globalInterval = 20000;
    let previousVideo = "";
    let shownWarnings = [];
    setInterval(() => {
        if (J("*:contains('503 Service Unavailable')").length) {
            console.log("Server Error! reloading...");
            location.reload();
        } else if (J("*:contains('not logged in!')").length) {
            window.location.href = "login.php"
        } else if (J("*:contains('Failed. You did not successfully solve the problem.')").length) {
            J("a:contains('Try Again')")[0].click()
        } else {
                switch (document.location.pathname) {
                    case "free_points/youtube-views":
                        if (J('body:contains("failed")').length) location.reload();
                        if (J(".button").length) {
                            let vidID = () => { return J(".button").first().parent().children("span[id*='count']").attr("id") };
                            let patienceKiller = (prev) => { setTimeout( () => { if (vidID() == prev) { J(".button").parent().children("a:contains('Skip')").click(); newWin.close(); }}, 1000 * 135)};
                            if (vidID() != previousVideo) {
                                previousVideo = vidID();
                                if (window.eval("typeof(window.newWin) !== 'undefined'")) {
                                    if (newWin.closed) {
                                        console.log("Watching one Video!");
                                        J(".button")[0].click();
                                        patienceKiller(previousVideo)
                                    }
                                } else {
                                    console.log("Watching one Video!");
                                    J(".button")[0].click();
                                    patienceKiller(previousVideo)

                                }
                            }
                        }
                }


        }
    }, globalInterval);
})();
