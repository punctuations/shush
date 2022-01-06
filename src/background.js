chrome.runtime.onConnect.addListener((port) => {
    console.assert(port.name === "inquire");
    port.onMessage.addListener(async (message) => {
        if (message.type === "get") {
            console.log("get keyword received")
            await chrome.storage.sync.get(["keyword"], (kw) => {
                port.postMessage(kw.keyword)
            })
        }

        if (message.type === "post") {
            console.log(`post keyword received - payload: ${message.payload}`)
            await chrome.storage.sync.set({keyword: message.payload}, () => {
                port.postMessage(true)
            })
        }
    })
})

