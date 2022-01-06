const port = chrome.runtime.connect({name: "inquire"})
let KEYWORD;

port.onMessage.addListener((message) => {
    if (typeof message === "string") {
        console.log(message)
        KEYWORD = message;
    }
})

function getKeyword() {
    port.postMessage({type: "get"})
}

getKeyword()



if (KEYWORD !== "" || KEYWORD) {
    console.log("keyword is valid")
    if (document.location.host === "www.youtube.com") {
        console.log("host is youtube")
        const videos = document.getElementsByClassName('ytd-rich-item-renderer') // home
        const recommended = document.getElementsByClassName("ytd-compact-video-renderer") // recommended

        if (videos.length > 0) {
            console.log("on home page")
            vInterval = setInterval(() => {
                for (let i = 0; i < videos.length; i++) {
                    if (videos[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(KEYWORD)) {
                        console.log("blocking...")
                        videos[i].querySelector("#img").classList.add("shush-blocked-img")
                        if (document.querySelectorAll("[dark=true]")[0]) {
                            videos[i].querySelector("#video-title").classList.add("shush-blocked-text")
                        } else {
                            videos[i].querySelector("#video-title").classList.add("light-shush-blocked-text")
                        }
                        videos[i].querySelector("#video-title-link").title = "blocked"
                    }
                }
            }, 1000)
        }

        if (recommended.length > 0) {
            console.log("on video page")
            rInverval = setInterval(() => {
                for (let i = 0; i < recommended.length; i++) {
                    if (recommended[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(KEYWORD)) {
                        console.log("blocking...")
                        recommended[i].querySelector("#img").classList.add("shush-blocked-sm-thumb")
                        recommended[i].querySelector("#video-title").classList.add("shush-blocked-text")
                        recommended[i].querySelector("#video-title").title = "blocked"
                    }
                }
            }, 1000)
        }
    }
}
