const KEYWORD = chorme.sync.storage.get(["keyword"])

if (KEYWORD !== "" || KEYWORD) {
    if (document.location.host === "www.youtube.com") {
        const videos = document.getElementsByClassName('ytd-rich-item-renderer') // home
        const recommended = document.getElementsByClassName("ytd-compact-video-renderer") // recommended

        if (videos.length > 0) {
            for (let i = 0; i < videos.length; i ++) {
                if (videos[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(KEYWORD)) {
                    videos[i].querySelector("#img").classList.add("shush-blocked-img")
                    videos[i].querySelector("#video-title").classList.add("shush-blocked-text")
                    videos[i].querySelector("#video-title-link").title = "blocked"
                }
            }
        }

        if (recommended.length > 0) {
            for (let i = 0; i < recommended.length; i ++) {
                if (recommended[i].querySelector("#video-title").ariaLabel.toLowerCase().includes(KEYWORD)) {
                    recommended[i].querySelector("#img").classList.add("shush-blocked-sm-thumb")
                    recommended[i].querySelector("#video-title").classList.add("shush-blocked-text")
                    recommended[i].querySelector("#video-title").title = "blocked"
                }
            }
        }
    }
}
