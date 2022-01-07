const port = chrome.runtime.connect({name: "inquire"});

document.getElementsByTagName("form")[0].addEventListener('submit', (e) => {
    e.preventDefault();
    updateKeyword();
})

document.querySelector("form > p").addEventListener("click", () => {
    updateKeyword()
})

port.onMessage.addListener((message) => {
    if (typeof message === "object") {
        if (message.data) {
            document.getElementById("keywords").innerHTML = message.data.map((k, i) => {
                return `<li>${k}<span index="${i}">-</span></li>`
            }).join(" ")
            document.querySelectorAll("span").forEach((element) => {
                element.addEventListener("click", () => {
                    deleteKeyword(parseInt(element.getAttribute("index")))
                })
            })
        }
    }

    if (typeof message === "boolean") {
        fetch()
    }
})

function deleteKeyword(index) {
    port.postMessage({type: "delete", payload: index})
}

function updateKeyword() {
    port.postMessage({type: "post", payload: document.getElementsByTagName("input")[0].value.toLowerCase()})
}

function fetch() {
    port.postMessage({type: "get"})
}

fetch()