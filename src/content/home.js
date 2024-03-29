const port = chrome.runtime.connect({ name: "shush" });
let KEYWORD;

let url = document.location.pathname;

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
	videos = document.getElementsByClassName("ytd-rich-item-renderer"); // home

	if (document.location.pathname === "/") {
		setInterval(() => {
			for (let i = 0; i < videos.length; i++) {
				KEYWORD.forEach((element) => {
					if (
						videos[i]
							.querySelector("#video-title")
							?.ariaLabel?.toLowerCase()
							.includes(element[0])
					) {
						videos[i]
							.querySelector(".yt-core-image")
							.classList.add("shush-blocked-img");
						if (document.querySelectorAll("[dark]")[0]) {
							videos[i]
								.querySelector("#video-title")
								.classList.add("shush-blocked-text");
						} else {
							videos[i]
								.querySelector("#video-title")
								.classList.add("light-shush-blocked-text");
						}
						videos[i].querySelector("#video-title-link").title = "blocked";
					}
				});
			}
		}, 1000);
	}
}

setInterval(() => {
	if (url !== document.location.pathname) {
		url = document.location.pathname;
		location.reload();
	}
}, 500);
