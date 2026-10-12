/**
 * Data Loader — nạp nội dung website từ API lovegift.online theo ?id=...
 * hoặc dùng giá trị mặc định khi không có id.
 *
 * Cách dùng: thêm ?id=XXXX vào URL, ví dụ
 *   index.html?id=jeKv3ETuzNuTVI5suj8i
 *
 * Tất cả các script phase khác phải đợi `window.AppData.ready` trước khi
 * chạy để DOM đã được bind đầy đủ nội dung.
 */
window.AppData = (function () {
    /* =========================================================
     * GIÁ TRỊ MẶC ĐỊNH — dùng khi không có id hoặc API lỗi
     * ======================================================= */
    const DEFAULTS = {
        sender:        'Anh iu',                                    // From (lock screen)
        recipient:     'bé ngốc',                                   // For (lock screen)
        pinCode:       '0000',                                      // Mật khẩu 4 số mặc định (preview)
        title:         'To my love',                                // Card cover + popup title
        cardCoverDeco: '✿ ❤ ✿',                                     // Dòng deco phía trên title
        forYouLine:    'Gửi yêu thương đến bé ngốc ❤',              // Dòng chữ hiển thị khi hoa rơi
        // popupMessage = nội dung thư tình duy nhất, dùng cho cả card body lẫn popup
        popupMessage: [
            'Gửi bé ngốc của anh ❤',
            'Mỗi bông hoa trong khu vườn nhỏ này là dành cho em — cho sự dịu dàng, cho nụ cười, và cho từng khoảnh khắc bình yên mình có cùng nhau.',
        ],
        images:        ['images/love1.jpeg', 'images/love2.jpeg', 'images/love3.jpeg'],
        popupPhoto:    'images/love2.jpeg',                         // Ảnh trong popup (mặc định = images[1])
        music:         'https://cdn.shopify.com/s/files/1/0757/9700/4572/files/Download_2.mp3?v=1788886515',
    };

    // Card body bị giới hạn diện tích → cắt ngắn nếu thư quá dài, thêm "…"
    const CARD_MAX_PARAS          = 3;
    const CARD_MAX_CHARS_PER_PARA = 90;

    function truncateForCard(paragraphs) {
        return paragraphs.slice(0, CARD_MAX_PARAS).map(function (p) {
            const t = String(p).trim();
            if (t.length > CARD_MAX_CHARS_PER_PARA) {
                return t.slice(0, CARD_MAX_CHARS_PER_PARA - 1).trim() + '…';
            }
            return t;
        });
    }

    const API_BASE = 'https://lovegift.online/api/settings/';

    // Với id đặc biệt này, thay ảnh trong thiệp bằng video (tự chạy).
    const VIDEO_CARD_ID  = 'CKvdrxoepInEFDvNAv4m';
    const VIDEO_CARD_SRC = '/public/net.mp4';

    function getQuery(name) {
        return new URLSearchParams(location.search).get(name);
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    /** Tách message thành các đoạn theo xuống dòng. */
    function splitParagraphs(text) {
        if (!text) return [];
        return String(text).split(/\n+/).map(s => s.trim()).filter(Boolean);
    }

    /**
     * Merge API settings + URL overrides vào object data cuối cùng.
     * URL params (?title=..., ?music=...) override API, override DEFAULTS.
     */
    function buildData(apiSettings) {
        const s = apiSettings || {};

        const title       = getQuery('title')      || s.title        || DEFAULTS.title;
        // Hỗ trợ cả 2 tên field: fromName/toName (theo headingValues) hoặc sender/recipient
        const sender      = getQuery('sender')     || s.fromName     || s.sender       || DEFAULTS.sender;
        const recipient   = getQuery('recipient')  || s.toName       || s.recipient    || DEFAULTS.recipient;
        // Mật khẩu 4 số — chỉ chấp nhận 4 chữ số
        const pinRaw      = getQuery('pin') || s.pinCode || s.pin || DEFAULTS.pinCode;
        const pinCode     = /^\d{4}$/.test(String(pinRaw)) ? String(pinRaw) : DEFAULTS.pinCode;

        // message từ API → popupMessage (tách theo \n nếu nhiều đoạn)
        // Đây là nguồn DUY NHẤT cho nội dung thư — popup + card cùng dùng.
        const popupMessage = s.message
            ? splitParagraphs(s.message)
            : DEFAULTS.popupMessage;

        // Card body = cùng nội dung popup, cắt ngắn nếu dài quá
        const cardBody = truncateForCard(popupMessage);

        // image[] từ API → ảnh finale + ảnh popup
        const images = (Array.isArray(s.image) && s.image.length)
            ? s.image
            : DEFAULTS.images;

        const popupPhoto = images[0] || DEFAULTS.popupPhoto;

        const music      = getQuery('music') || s.music || DEFAULTS.music;
        const cardCoverDeco = s.cardCoverDeco || DEFAULTS.cardCoverDeco;
        const forYouLine = s.forYouLine
            || (recipient !== DEFAULTS.recipient
                ? `Gửi yêu thương đến ${recipient} ❤`
                : DEFAULTS.forYouLine);

        return {
            sender, recipient, pinCode, title, cardCoverDeco,
            cardBody, popupMessage, forYouLine,
            images, popupPhoto, music,
        };
    }

    /** Inject dữ liệu vào các vùng DOM của index.html. */
    function applyToDOM(d) {
        // ===== Music =====
        const audio = document.getElementById('bgMusic');
        if (audio && d.music) {
            const src = audio.querySelector('source');
            if (src && src.src !== d.music) {
                src.src = d.music;
                audio.load();
            }
        }

        // ===== Phase 1 — Lock screen (From / For) =====
        const rows = document.querySelectorAll('#lockFrame .lock-info-row');
        if (rows[0]) rows[0].innerHTML = `<span class="label">From:</span> ${escapeHtml(d.sender)}`;
        if (rows[1]) rows[1].innerHTML = `<span class="label">For:</span> ${escapeHtml(d.recipient)}`;

        // ===== Phase 2 — Card cover =====
        const titleMain = document.querySelector('.card-title-main');
        if (titleMain) titleMain.textContent = d.title;

        const titleSubs = document.querySelectorAll('.card-title-secondary');
        if (titleSubs[0]) titleSubs[0].textContent = d.cardCoverDeco;
        if (titleSubs[1]) titleSubs[1].textContent = `~ ${d.recipient} ~`;

        // ===== Phase 2 — Card body (mở thiệp ra) =====
        const cardBody = document.querySelector('.card-body');
        if (cardBody && d.cardBody.length) {
            cardBody.innerHTML = d.cardBody.map(p => `<p>${escapeHtml(p)}</p>`).join('');
        }

        // ===== Phase 2 — "Gửi yêu thương đến…" =====
        const forYou = document.getElementById('forYou');
        if (forYou) forYou.textContent = d.forYouLine;

        // ===== Phase 3 — Popup =====
        const popupTitle = document.querySelector('.popup-title');
        if (popupTitle) popupTitle.textContent = d.title;

        const popupPhotoBox = document.querySelector('.popup-photo');
        if (getQuery('id') === VIDEO_CARD_ID && popupPhotoBox) {
            // Thay ảnh bằng video tự chạy.
            const vid = document.createElement('video');
            vid.src = VIDEO_CARD_SRC;
            // iOS bỏ qua attribute "muted" đặt qua HTML → phải set bằng property.
            vid.muted = true;
            vid.defaultMuted = true;
            vid.autoplay = true;
            vid.loop = true;
            vid.playsInline = true;
            vid.setAttribute('muted', '');
            vid.setAttribute('playsinline', '');
            vid.setAttribute('webkit-playsinline', '');
            // Chặn iOS tự mở toàn màn hình khi play.
            vid.controls = false;
            vid.setAttribute('controlsList', 'nofullscreen nodownload noplaybackrate');
            vid.disablePictureInPicture = true;
            vid.setAttribute('disablepictureinpicture', '');
            vid.preload = 'auto';
            vid.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
            popupPhotoBox.innerHTML = '';
            popupPhotoBox.appendChild(vid);
            // Không play ở đây (popup còn ẩn). Phase3 sẽ gọi play() đúng
            // lúc popup hiện ra — xem window.__playCardVideo().
        } else {
            const popupPhoto = document.querySelector('.popup-photo img');
            if (popupPhoto && d.popupPhoto) popupPhoto.src = d.popupPhoto;
        }

        const popupText = document.querySelector('.popup-text');
        if (popupText && d.popupMessage.length) {
            popupText.innerHTML = d.popupMessage.map(p => `<p>${escapeHtml(p)}</p>`).join('');
        }
    }

    /** Hiển thị banner "chế độ xem thử" ngay dưới phần mã PIN. */
    function showPreviewNotice(pinCode) {
        if (document.getElementById('previewNotice')) return;
        const lockInfo = document.querySelector('#lockFrame .lock-info');
        if (!lockInfo) return;
        const el = document.createElement('div');
        el.id = 'previewNotice';
        el.innerHTML =
            '<span class="preview-tag">XEM THỬ</span> ' +
            '<strong>' + escapeHtml(pinCode) + '</strong>';
        lockInfo.appendChild(el);
    }

    /** Nút điều hướng về trang chính tạo thiệp (chỉ hiện ở chế độ xem thử). */
    function addHomeButton() {
        if (document.getElementById('homeButton')) return;
        const a = document.createElement('a');
        a.id = 'homeButton';
        a.href = 'https://lovegift.online/';
        a.setAttribute('aria-label', 'Về trang tạo thiệp');
        a.title = 'Tạo thiệp của bạn';
        a.innerHTML =
            '<svg viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M12 3.2 3 11h2v9h5v-6h4v6h5v-9h2z"/>' +
            '</svg>' +
            '<span>Tạo thiệp</span>';
        document.body.appendChild(a);
    }

    /* =========================================================
     * BOOT — fetch API rồi apply, hoặc dùng defaults
     * ======================================================= */
    const state = { data: null, isPreview: false };

    const ready = new Promise(function (resolve) {
        const id = getQuery('id');
        state.isPreview = !id;

        function finish(apiSettings) {
            const data = buildData(apiSettings);
            applyToDOM(data);
            state.data = data;
            if (state.isPreview) {
                showPreviewNotice(data.pinCode);
                addHomeButton();
            }
            console.log('[AppData] Đã load (' + (state.isPreview ? 'PREVIEW' : 'API') + '):', data);
            resolve(data);
        }

        if (!id) {
            finish(null);
            return;
        }

        fetch(API_BASE + encodeURIComponent(id))
            .then(r => r.json())
            .then(json => {
                const ok = json && json.success && json.data && json.data.settings;
                finish(ok ? json.data.settings : null);
            })
            .catch(err => {
                console.warn('[AppData] Lỗi fetch API, dùng defaults:', err);
                finish(null);
            });
    });

    return {
        ready,
        defaults: DEFAULTS,
        get data() { return state.data; },
        get isPreview() { return state.isPreview; },
    };
})();
