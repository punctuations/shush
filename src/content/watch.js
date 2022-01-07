const port = chrome.runtime.connect({name: "inquire"})
let KEYWORD;

let url = document.location.href;

port.onMessage.addListener((message) => {
    if (typeof message === "object") {
        if (message.data) {
            KEYWORD = message.data;
            block()
        }
    }
})

function getKeyword() {
    port.postMessage({type: "get"})
}

getKeyword()

let recommended;

function block() {
    recommended = document.querySelectorAll("#items > ytd-compact-video-renderer") // recommended
    comments = document.getElementsByTagName("ytd-comment-renderer") // comments

    if (document.location.pathname === "/watch") {
        setInterval(() => {
            for (let i = 0; i < recommended.length || i < comments.length; i++) {
                KEYWORD.forEach(element => {
                    if (i < recommended.length && recommended[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(element)) {
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