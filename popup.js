function updateKeyword() {
    chrome.storage.sync.set({keyword: document.getElementsByTagName("input")[0].value})
}

const kw = chrome.sync.storage.get(['keyword'])
document.getElementById("keywords").innerHTML += `<li>${kw}</li>`