const port = chrome.runtime.connect({name: "inquire"});

document.getElementsByTagName("form")[0].addEventListener('submit', (e) => {
    e.preventDefault();
    updateKeyword();
})

port.onMessage.addListener((message) => {
    if (typeof message === "string") {
        document.getElementById("keywords").innerHTML = `<li>${message}</li>`
    }

    if (typeof message === "boolean") {
        fetch()
    }
})

async function updateKeyword() {
    console.log(`keyword updating with value of ${document.getElementsByTagName("input")[0].value}`)
    port.postMessage({type: "post", payload: document.getElementsByTagName("input")[0].value})
}

function fetch() {
    port.postMessage({type: "get"})
}

fetch()