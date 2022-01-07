const port = chrome.runtime.connect({name: "inquire"})
let KEYWORD;

let url = document.location.href;

port.onMessage.addListener((message) => {
    if (typeof message === "object") {
        if (message.data) {
            console.log(message.data)
            KEYWORD = message.data;
        }
    }
})

function getKeyword() {
    port.postMessage({type: "get"})
}

getKeyword()

let recommended;

if (KEYWORD !== "" && KEYWORD) {
    recommended = document.querySelectorAll("#items > ytd-compact-video-renderer") // recommended
    comments = document.getElementsByTagName("ytd-comment-renderer") // comments

    if (document.location.pathname === "/watch") {
        console.log("on video page")
        setInterval(() => {
            for (let i = 0; i < recommended.length || i < comments.length; i++) {
                KEYWORD.forEach(element => {
                    if (i < recommended.length && recommended[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(element)) {
                        console.log("blocking...")
                        recommended[i].querySelector("#img").classList.add("shush-blocked-sm-thumb")
                        if (document.querySelectorAll("[dark=true]")[0]) {
                            recommended[i].querySelector("#video-title").classList.add("shush-blocked-text")
                        } else {
                            recommended[i].querySelector("#video-title").classList.add("light-shush-blocked-text")
                        }
                        recommended[i].querySelector("#video-title").title = "blocked"
                    }
                    if (i < comments.length && comments[i].querySelector("#content-text").innerHTML.toLowerCase().includes(element)) {
                        if (document.querySelectorAll("[dark=true]")[0]) {
                            comments[i].querySelector("#content-text").classList.add("shush-blocked-text")
                        } else {
                            comments[i].querySelector("#content-text").classList.add("light-shush-blocked-text")
                        }
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