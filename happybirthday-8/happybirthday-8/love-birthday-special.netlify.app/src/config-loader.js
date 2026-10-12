/* ── LoveGift Config Loader ──────────────────────────────────────────── */
(function () {
    function decodeData(encoded) {
        try {
            let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
            while (b64.length % 4) b64 += '=';
            const bin = atob(b64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const str = window.pako
                ? pako.inflate(bytes, { to: 'string' })
                : new TextDecoder().decode(bytes);
            return JSON.parse(str);
        } catch (e) {
            console.error('[lovegift] decode error:', e);
            return null;
        }
    }

    function getUrlParam(name) {
        const urlParams = new URLSearchParams(location.search);
        const c = urlParams.get('c');
        if (c) {
            const data = decodeData(c);
            if (data && data[name] != null) return data[name];
        }
        const raw = urlParams.get(name);
        if (raw) return decodeURIComponent(raw);
        return null;
    }

    /* Default config — fallback khi không có id và không có URL params */
    const defaults = {
        introTitle: 'Happy birthday bé iu',
        titleMessage: 'Happy birthday',
        popupMessage: 'Em yêu của anh. Em là một cô gái rất đặc biệt. Anh luôn thầm cảm ơn vì em đã đến trong cuộc đời anh. Hôm nay, anh chúc em mọi điều tốt đẹp nhất, thật nhiều sức khoẻ và niềm vui. Anh luôn mong chúng ta sẽ cùng nhau đón thêm thật nhiều sinh nhật như thế này nữa. Chúc mừng sinh nhật em yêu của anh.💕',
        images: [
            './birthdaygirl/girl1.jpeg',
            './birthdaygirl/girl2.jpeg',
            './birthdaygirl/girl3.jpeg',
            './birthdaygirl/girl4.jpeg',
            './birthdaygirl/girl5.jpeg',
            './birthdaygirl/girl6.jpeg'
        ],
        music: 'https://cdn.shopify.com/s/files/1/0757/9700/4572/files/tiktok-music-1782237967274-8boydp.mp3?v=1782237970'
    };

    window.LoveGiftConfig = {
        introTitle: getUrlParam('introTitle') || defaults.introTitle,
        titleMessage: getUrlParam('title') || defaults.titleMessage,
        popupMessage: getUrlParam('popupMessage') || defaults.popupMessage,
        images: defaults.images,
        music: getUrlParam('music') || defaults.music
    };

    /* Apply config — update DOM + dispatch event */
    function applyConfig(cfg) {
        if (cfg.introTitle) {
            window.LoveGiftConfig.introTitle = cfg.introTitle;
            const introTextEl = document.querySelector('.intro__title-text');
            if (introTextEl) introTextEl.textContent = cfg.introTitle;
        }
        if (cfg.popupMessage) window.LoveGiftConfig.popupMessage = cfg.popupMessage;
        if (cfg.titleMessage) window.LoveGiftConfig.titleMessage = cfg.titleMessage;
        if (cfg.images && cfg.images.length) {
            window.LoveGiftConfig.images = cfg.images;
            const modalImg = document.querySelector('.letter__image img');
            if (modalImg) modalImg.src = cfg.images[0];
            const cubeImgs = document.querySelectorAll('#intro__cube .outer-cube > div img, #intro__cube .inner-cube > div img');
            cubeImgs.forEach(function (img, i) {
                img.src = cfg.images[i % cfg.images.length];
            });
        }
        if (cfg.music) {
            window.LoveGiftConfig.music = cfg.music;
            const audio = document.getElementById('bg-music');
            if (audio) {
                audio.src = cfg.music;
                const tryPlay = function () {
                    audio.play().catch(function () {});
                    document.removeEventListener('click', tryPlay);
                    document.removeEventListener('touchstart', tryPlay);
                };
                document.addEventListener('click', tryPlay, { once: true });
                document.addEventListener('touchstart', tryPlay, { once: true });
            }
        }
        window.dispatchEvent(new CustomEvent('configLoaded', { detail: cfg }));
    }

    applyConfig({
        introTitle: window.LoveGiftConfig.introTitle,
        popupMessage: window.LoveGiftConfig.popupMessage,
        titleMessage: window.LoveGiftConfig.titleMessage,
        music: window.LoveGiftConfig.music
    });

    /* ── Loading overlay control ────────────────────────────────────── */
    const overlay = document.getElementById('loading-overlay');
    const progressEl = document.getElementById('loading-progress');
    const percentEl = document.getElementById('loading-percent');
    let progressVal = 0;
    let progressTimer = 0;

    function showLoading() {
        if (!overlay) return;
        overlay.classList.remove('hidden', 'fade-out');
        overlay.setAttribute('aria-hidden', 'false');
        progressVal = 0;
        if (progressEl) progressEl.style.width = '0%';
        if (percentEl) percentEl.textContent = '0%';
        progressTimer = setInterval(function () {
            if (progressVal < 90) {
                progressVal += Math.random() * 10 + 4;
                if (progressVal > 90) progressVal = 90;
                if (progressEl) progressEl.style.width = progressVal + '%';
                if (percentEl) percentEl.textContent = Math.round(progressVal) + '%';
            }
        }, 280);
    }
    function hideLoading() {
        if (progressTimer) { clearInterval(progressTimer); progressTimer = 0; }
        if (progressEl) progressEl.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';
        if (!overlay) return;
        setTimeout(function () {
            overlay.classList.add('fade-out');
            overlay.setAttribute('aria-hidden', 'true');
            setTimeout(function () { overlay.classList.add('hidden'); }, 800);
        }, 350);
    }

    const cfgId = new URLSearchParams(location.search).get('id');
    if (cfgId) {
        showLoading();
        fetch('https://lovegift.online/api/settings/' + cfgId)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.success && data.data && data.data.settings) {
                    const s = data.data.settings;
                    const cfg = {};
                    if (s.introTitle) cfg.introTitle = s.introTitle;
                    if (s.message) cfg.popupMessage = s.message;
                    if (s.titleMessage) cfg.titleMessage = s.titleMessage;
                    if (s.image && s.image.length) cfg.images = s.image;
                    if (s.music) cfg.music = s.music;
                    applyConfig(cfg);
                }
            })
            .catch(function (err) {
                console.error('[lovegift] API error:', err);
            })
            .finally(function () {
                hideLoading();
            });
    }
})();
