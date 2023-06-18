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

let recommended;
let comments;

function block() {
	recommended = document.querySelectorAll(
		"#items > ytd-compact-video-renderer"
	); // recommended
	comments = document.getElementsByTagName("ytd-comment-renderer"); // comments

	if (document.location.pathname === "/watch") {
		setInterval(() => {
			for (let i = 0; i < recommended.length || i < comments.length; i++) {
				KEYWORD.forEach((element) => {
					if (
						i < recommended.length &&
						recommended[i]
							.querySelector("#video-title")
							?.ariaLabel?.toLowerCase()
							.includes(element[0])
					) {
						recommended[i]
							.querySelector(".yt-core-image")
							.classList.add("shush-blocked-sm-thumb");
						if (document.querySelectorAll("[dark]")[0]) {
							recommended[i]
								.querySelector("#video-title")
								.classList.add("shush-blocked-text");
						} else {
							recommended[i]
								.querySelector("#video-title")
								.classList.add("light-shush-blocked-text");
						}
						recommended[i].querySelector("#video-title").title = "blocked";
					}
					if (
						i < comments.length &&
						comments[i]
							.querySelector("#content-text")
							?.innerHTML?.toLowerCase()
							.includes(element[0])
					) {
						if (document.querySelectorAll("[dark]")[0]) {
							comments[i]
								.querySelector("#content-text")
								.classList.add("shush-blocked-text");
						} else {
							comments[i]
								.querySelector("#content-text")
								.classList.add("light-shush-blocked-text");
						}
					}
				});
			}
		}, 1000);
	}
}

setTimeout(() => {
	setInterval(() => {
		if (url !== document.location.pathname) {
			url = document.location.pathname;
			location.reload();
		}
	}, 500);
}, 1000);
