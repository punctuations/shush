chrome.runtime.onConnect.addListener((port) => {
    console.assert(port.name === "inquire");
    port.onMessage.addListener(async (message) => {
        if (message.type === "get") {
            console.log("get keyword received")
            await chrome.storage.sync.get(["data"], (kw) => {
                port.postMessage(kw)
            })
        }

        if (message.type === "post") {
            console.log(`post keyword received - payload: ${message.payload}`)
            await chrome.storage.sync.get(["data"], (kw) => {
                console.log(kw)
                let arr = [];
                arr.push(...kw.data ?? "")
                arr.push(message.payload)
                console.log(arr)
                chrome.storage.sync.set({data: arr}, () => {
                    port.postMessage(true)
                })
            })
        }

        if (message.type === "delete") {
            console.log(`delete keyword command received, index of ${message.payload}`)
            await chrome.storage.sync.get(["data"], (kw) => {
                console.log(message.payload)
                let arr = [];
                arr.push(...kw.data ?? "")
                arr.splice(message.payload, 1)
                console.log(arr)
                chrome.storage.sync.set({data: arr}, () => {
                    port.postMessage(true)
                })
            })
        }
    })
})

