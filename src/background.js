chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "shush");
  port.onMessage.addListener(async (message) => {
    if (message.type === "get") {
      await chrome.storage.sync.get(["data"], (kw) => {
        port.postMessage(kw);
      });
    }

    if (message.type === "post") {
      await chrome.storage.sync.get(["data"], (kw) => {
        let arr = [];
        arr.push(...(kw.data ?? ""));
        arr.push(message.payload);
        chrome.storage.sync.set({ data: arr }, () => {
          port.postMessage(true);
        });
      });
    }

    if (message.type === "delete") {
      await chrome.storage.sync.get(["data"], (kw) => {
        let arr = [];
        arr.push(...(kw.data ?? ""));
        arr.splice(message.payload, 1);
        chrome.storage.sync.set({ data: arr }, () => {
          port.postMessage(true);
        });
      });
    }
  });
});
