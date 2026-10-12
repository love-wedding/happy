/* ── Anti-devtools: chặn right-click + keyboard shortcut ──────────────────
   Lưu ý: chỉ là DETERRENT — dev thực sự vẫn bypass được qua menu browser,
   view-source:, hoặc parent window. Không dùng debugger-trap vì hay
   false-positive khi parent (lovegift.online) mở F12 để debug iframe. */

(function () {
    function block(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (e && e.stopPropagation) e.stopPropagation();
        return false;
    }

    /* Chặn chuột phải → contextmenu */
    document.addEventListener('contextmenu', block, { capture: true });

    /* Chặn phím tắt thường dùng để mở DevTools / view-source / save */
    document.addEventListener('keydown', function (e) {
        var k = (e.key || '').toUpperCase();

        /* F12 */
        if (k === 'F12') return block(e);

        /* Ctrl+Shift+I / J / C / K — DevTools panels */
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'I' || k === 'J' || k === 'C' || k === 'K')) {
            return block(e);
        }

        /* Ctrl+U — view source */
        if ((e.ctrlKey || e.metaKey) && k === 'U') return block(e);

        /* Ctrl+S — save page (cho phép Ctrl+S khi user gõ trong input) */
        if ((e.ctrlKey || e.metaKey) && k === 'S') {
            var tag = (e.target && e.target.tagName) || '';
            if (tag !== 'INPUT' && tag !== 'TEXTAREA') return block(e);
        }
    }, { capture: true });

    /* Chặn kéo ảnh ra desktop (drag → save) */
    document.addEventListener('dragstart', function (e) {
        if (e.target && e.target.tagName === 'IMG') return block(e);
    }, { capture: true });
})();
