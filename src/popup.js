const port = chrome.runtime.connect({ name: "shush" });

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
	e.preventDefault();
	updateKeyword();
});

port.onMessage.addListener((message) => {
	if (typeof message === "object") {
		if (message.data) {
			document.getElementById("keywords").innerHTML = message.data
				.map((k, i) => {
					return `<li><header><h5>${k[0]}</h5><p>${new Date(
						k[1]
					).toLocaleString("en-US", {
						month: "short",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
					})}</p></header><span index="${i}">Revoke</span></li>`;
				})
				.join(" ");
			document.querySelectorAll("span").forEach((element) => {
				element.addEventListener("click", () => {
					deleteKeyword(parseInt(element.getAttribute("index")));
				});
			});
		}
	}

	if (typeof message === "boolean") {
		fetch();
	}
});

function deleteKeyword(index) {
	port.postMessage({ type: "delete", payload: index });
}

function updateKeyword() {
	let input = document.getElementsByTagName("input")[0];

	if (input !== "" && input !== " ") {
		port.postMessage({
			type: "post",
			payload: [input.value.toLowerCase(), new Date()],
		});
	}

	input.value = "";
}

function fetch() {
	port.postMessage({ type: "get" });
}

fetch();
