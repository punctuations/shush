const port = chrome.runtime.connect({name: "inquire"});

document.getElementsByTagName("form")[0].addEventListener('submit', (e) => {
    e.preventDefault();
    updateKeyword();
})

// document.addEventListener("onclick", (e) => {
//     e.
//     deleteKeyword(parseInt(element.getAttribute("index")))
// })

port.onMessage.addListener((message) => {
    if (typeof message === "object") {
        if (message.data) {
            document.getElementById("keywords").innerHTML = message.data.map((k, i) => {
                return `<li>${k}<span index="${i}">-</span></li>`
            }).join(" ")
            document.querySelectorAll("span").forEach((element) => {
                element.addEventListener("click", () => {
                    console.log("minus clicked")
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
    console.log(`keyword deleting with at index ${index}`)
    port.postMessage({type: "delete", payload: index})
}

function updateKeyword() {
    console.log(`keyword updating with value of ${document.getElementsByTagName("input")[0].value.toLowerCase()}`)
    port.postMessage({type: "post", payload: document.getElementsByTagName("input")[0].value.toLowerCase()})
}

function fetch() {
    port.postMessage({type: "get"})
}

fetch()