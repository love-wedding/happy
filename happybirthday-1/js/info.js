function decodeData(e) {
    try {
        let a = e.replace(/-/g, "+").replace(/_/g, "/");
        for (; a.length % 4;) a += "=";
        const t = atob(a),
            s = new Uint8Array(t.length);
        for (let e = 0; e < t.length; e++) s[e] = t.charCodeAt(e);
        const i = pako.inflate(s, {
            to: "string"
        });
        return JSON.parse(i)
    } catch (e) {
        return console.error("Lỗi khi giải mã dữ liệu:", e), null
    }
}

function getUrlParameter(e) {
    const a = new URLSearchParams(window.location.search),
        t = a.get("c");
    if (t) {
        const a = decodeData(t);
        if (a) {
            if ("title" === e && a.title) return a.title;
            if ("music" === e && a.music) return a.music;
            if ("messages" === e && a.messages) return a.messages;
            if ("image" === e && a.image) return a.image;
            if ("popupMessage" === e && a.popupMessage) return a.popupMessage
        }
    }
    const s = a.get(e);
    return s ? decodeURIComponent(s) : null
}
const defaultData = {
    template: "love",
    data: {
        title: "Gửi Người Anh Yêu 💖",
        type_music: "link",
        music_id: "https://cdn.shopify.com/s/files/1/0757/9700/4572/files/tiktok-music-1772796431771-remj7g.mp3?v=1772796434",
        backgroundMusic: "https://cdn.shopify.com/s/files/1/0757/9700/4572/files/tiktok-music-1772796431771-remj7g.mp3?v=1772796434",
        popupMessage: "💖 Gửi em — người con gái khiến mỗi ngày của anh trở nên đáng nhớ. Cảm ơn em vì đã xuất hiện, đã yêu thương và đồng hành cùng anh. Dù tương lai phía trước có gì, anh chỉ mong được nắm tay em đi tiếp. Mãi yêu em 💝💕",
        messages: ["Gửi Em IU💖💕", "Người Anh Yêu Nhất 💝", "Mãi Bên Em 💖"],
        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]
    }
},
    urlParams = new URLSearchParams(window.location.search),
    cfgId = urlParams.get("id"),
    urlMusic = getUrlParameter("music"),
    urlMessages = getUrlParameter("messages"),
    urlImage = getUrlParameter("image"),
    urlTitle = getUrlParameter("title"),
    urlPopupMessage = getUrlParameter("popupMessage");
var defaultMessagesF = ["Gửi Em 💖💕", "Người Anh Yêu Nhất 💝", "Bé Iu Của Anh 💖"],
    defaultMessagesN = ["Gửi Anh 💖💕", "Người Em Yêu Nhất 💝", "Anh Iu Của Em 💖"],
    templatesF = {
        1: ["Gửi Em 💖💕", "Người Anh Yêu Nhất 💝", "Bé Iu Của Anh 💖"],
        2: ["Em iu ơi 💗", "Có một điều anh muốn nói", "Cảm ơn em đã ở bên anh", "Mãi là bé bỏng của anh 💕"],
        3: ["Hey bé iu 💖", "Dù xa hay gần", "Anh vẫn luôn nghĩ về em", "Mở ra xem nhé 💝"]
    },
    templatesN = {
        1: ["Gửi Anh 💖💕", "Người Em Yêu Nhất 💝", "Anh Iu Của Em 💖"],
        2: ["Anh iu ơi 💗", "Có một điều em muốn nói", "Cảm ơn anh đã ở bên em", "Mãi là cậu nhóc của em 💕"],
        3: ["Hey anh iu 💖", "Dù xa hay gần", "Em vẫn luôn nghĩ về anh", "Mở ra xem nhé 💝"]
    };

function getMessagesByTemplate(e, a) {
    var t = "n" === e ? templatesN : templatesF,
        s = "n" === e ? defaultMessagesN : defaultMessagesF;
    return a && t[a] ? t[a] : s
}

function applyConfig(e) {
    if (e.music && (window.dataChristmasTree.data.music_id = e.music, window.dataChristmasTree.data.backgroundMusic = e.music, window.Heartlove.data.music = e.music, window.dataValentine && window.dataValentine.data && (window.dataValentine.data.music = e.music)), e.messages && e.messages.length > 0 && (window.dataChristmasTree.data.messages = e.messages, window.Heartlove.data.messages = e.messages, window.dataValentine && window.dataValentine.data && (window.dataValentine.data.messages = e.messages)), e.popupMessage && (window.dataChristmasTree.data.popupMessage = e.popupMessage, window.Heartlove.data.popupMessage = e.popupMessage), e.titleMessage) {
        var a = document.querySelector(".popup-title");
        a && (a.textContent = e.titleMessage)
    }
    e.images && e.images.length > 0 && (window.dataChristmasTree.data.images = e.images, window.Heartlove.data.images = e.images, window.dataValentine && window.dataValentine.data && (window.dataValentine.data.images = e.images)), window.dispatchEvent(new CustomEvent("configLoaded", {
        detail: e
    }))
}
window.dataChristmasTree = {
    template: defaultData.template,
    data: {
        title: urlTitle || defaultData.data.title,
        type_music: defaultData.data.type_music,
        music_id: urlMusic || defaultData.data.music_id,
        backgroundMusic: urlMusic || defaultData.data.backgroundMusic,
        popupMessage: urlPopupMessage || defaultData.data.popupMessage,
        messages: urlMessages ? Array.isArray(urlMessages) ? urlMessages : urlMessages.split(",").map(e => e.trim()) : defaultData.data.messages,
        images: urlImage ? Array.isArray(urlImage) ? urlImage : urlImage.split(",").map(e => e.trim()) : defaultData.data.images
    }
}, window.Heartlove = {
    data: {
        popupMessage: window.dataChristmasTree.data.popupMessage,
        messages: window.dataChristmasTree.data.messages,
        images: window.dataChristmasTree.data.images,
        heartColor: "#fd9595",
        music: window.dataChristmasTree.data.backgroundMusic
    }
};
var loadingProgress = document.getElementById("loading-progress"),
    loadingPercent = document.getElementById("loading-percent"),
    loadingValue = 0,
    loadingTimer = null;

function hideLoading() {
    loadingTimer && clearInterval(loadingTimer), loadingProgress && (loadingProgress.style.width = "100%"), loadingPercent && (loadingPercent.textContent = "100%");
    var e = document.getElementById("loading-overlay");
    e && setTimeout(function () {
        e.classList.add("fade-out"), setTimeout(function () {
            e.classList.add("hidden")
        }, 800)
    }, 400)
}
cfgId && (loadingTimer = setInterval(function () {
    loadingValue < 90 && ((loadingValue += 15 * Math.random() + 5) > 90 && (loadingValue = 90), loadingProgress && (loadingProgress.style.width = loadingValue + "%"), loadingPercent && (loadingPercent.textContent = Math.round(loadingValue) + "%"))
}, 300)), cfgId ? fetch("https://lovegift.online/api/settings/" + cfgId).then(function (e) {
    return e.json()
}).then(function (e) {
    if (e.success && e.data && e.data.settings) {
        var a = e.data.settings,
            t = {};
        a.arrayText && a.arrayText.length > 0 && (t.messages = a.arrayText), a.message && (t.popupMessage = a.message), a.image && a.image.length > 0 && (t.images = a.image), a.titleMessage && (t.titleMessage = a.titleMessage), a.music && (t.music = a.music), applyConfig(t), console.log("Config loaded from API:", t)
    }
    hideLoading()
}).catch(function (e) {
    console.error("Lỗi load config từ API:", e), hideLoading()
}) : (document.addEventListener("DOMContentLoaded", function () {
    var e = document.getElementById("createTemplateBtn");
    e && e.classList.add("visible")
}), hideLoading()), console.log("Dữ liệu đã load:", window.Heartlove)



function createShootingStars() {
    const t = document.getElementById("shooting-stars");
    for (let e = 0; e < 20; e++) {
        const e = document.createElement("div");
        e.className = "shooting-star";
        const n = Math.random() * (.8 * window.innerWidth) + .2 * window.innerWidth,
            o = Math.random() * (.3 * window.innerHeight);
        e.style.left = n + "px", e.style.top = o + "px";
        const a = 10 * Math.random();
        e.style.animationDelay = a + "s";
        const d = 3 + 3 * Math.random();
        e.style.width = d + "px", e.style.height = d + "px", t.appendChild(e)
    }
}
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", createShootingStars) : createShootingStars()