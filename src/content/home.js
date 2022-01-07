const port = chrome.runtime.connect({name: "inquire"})
let KEYWORD;

let url = document.location.href;

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

let videos;

if (KEYWORD !== "" || KEYWORD) {
    console.log("keyword is valid")
    videos = document.getElementsByTagName('ytd-rich-item-renderer') // home

    if (document.location.pathname === "/") {
        console.log("on home page")
        setInterval(() => {
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
}

setInterval(() => {
    if (url !== document.location.href) {
        url = document.location.href
        location.reload()
    }
}, 500)