const port = chrome.runtime.connect({name: "inquire"})
let KEYWORD;

let url = document.location.href;

port.onMessage.addListener((message) => {
    if (typeof message === "object") {
        if (message.data) {
            console.log(message.data)
            KEYWORD = message.data;
            block()
        }
    }
})

function getKeyword() {
    port.postMessage({type: "get"})
}

getKeyword()

let search;

function block() {
    console.log("keyword is valid")
    search = document.getElementsByTagName("ytd-video-renderer") // search

    if (document.location.pathname === "/results") {
        console.log("on search page")
        setInterval(() => {
            console.log("interval is called", search.length)
            for (let i = 0; i < search.length; i++) {
                KEYWORD.forEach(element => {
                    if (search[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(element)) {
                        console.log("blocking...")
                        search[i].querySelector("#img").classList.add("shush-blocked-sm-thumb")
                        if (document.querySelectorAll("[dark=true]")[0]) {
                            search[i].querySelector("#video-title").classList.add("shush-blocked-text")
                        } else {
                            search[i].querySelector("#video-title").classList.add("light-shush-blocked-text")
                        }
                        search[i].querySelector("#video-title").title = "blocked"
                    }
                })
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
