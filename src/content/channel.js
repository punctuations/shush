const port = chrome.runtime.connect({ name: "shush" });
let KEYWORD;

let url = document.location.href;

port.onMessage.addListener((message) => {
  if (typeof message === "object") {
    if (message.data) {
      KEYWORD = message.data;
      block();
    }
  }
});

function getKeyword() {
  port.postMessage({ type: "get" });
}

getKeyword();

let videos;

function block() {
  videos = document.getElementsByTagName("ytd-grid-video-renderer"); // channel videos

  if (document.location.pathname.startsWith("/c")) {
    setInterval(() => {
      for (let i = 0; i < videos.length; i++) {
        KEYWORD.forEach((element) => {
          if (
            videos[i]
              .querySelector("#video-title")
              ?.ariaLabel?.toLowerCase()
              .includes(element[0])
          ) {
            videos[i].querySelector("#img").classList.add("shush-blocked-img");
            if (document.querySelectorAll("[dark]")[0]) {
              videos[i]
                .querySelector("#video-title")
                .classList.add("shush-blocked-text");
            } else {
              videos[i]
                .querySelector("#video-title")
                .classList.add("light-shush-blocked-text");
            }
            videos[i].querySelector("#video-title").title = "blocked";
          }
        });
      }
    }, 1000);
  }
}

setInterval(() => {
  if (url !== document.location.href) {
    url = document.location.href;
    location.reload();
  }
}, 500);
