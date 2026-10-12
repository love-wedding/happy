/**
 * cake.js — Bánh sinh nhật 3D với Three.js
 *
 * Port từ annibox.onrender.com/cake/cake.js (~1874 dòng)
 * Phase 1: Render 2 tầng bánh, drag rotate, pinch/wheel zoom, auto-spin.
 */

(function () {
  "use strict";

  /* ── Constants (port nguyên từ annibox) ──────────────────────────────── */
  const DEFAULT_IMAGES = [
    "./birthdaygirl/girl1.jpeg",
    "./birthdaygirl/girl2.jpeg",
    "./birthdaygirl/girl3.jpeg",
    "./birthdaygirl/girl4.jpeg",
    "./birthdaygirl/girl5.jpeg",
    "./birthdaygirl/girl6.jpeg",
  ];
  function getImages() {
    const cfg = window.LoveGiftConfig;
    if (cfg && Array.isArray(cfg.images) && cfg.images.length) {
      return cfg.images;
    }
    return DEFAULT_IMAGES;
  }

  /* Bánh */
  const LOWER_TIER_H = 3.1;   /* dùng cho lõi bánh khi shatter — cao hơn ring card để 2 tier overlap */
  const UPPER_TIER_H = 2.35;
  const LOWER_TIER_Y = 1.65;
  const LOWER_TIER_RING_R = 5.18;
  const UPPER_TIER_RING_R = 3.5;
  const LOWER_RING_COUNT = 14;
  const UPPER_RING_COUNT = 10;
  const RING_PHOTO_ARC_FILL_LOWER = 1.002;
  const RING_PHOTO_ARC_FILL_UPPER = 1.005;
  const TOP_DISC_OVERHANG = 1.035;
  const LOWER_TOP_DISC_SCALE = 0.978;
  const UPPER_TOP_DISC_SCALE = 0.978;
  const LOWER_BOTTOM_DISC_SCALE = 0.965;

  /* Camera + zoom */
  const BASE_CAM_Z = 15.8;
  const CAM_LOOK_Y = 2.6;
  const ZOOM_MIN = 0.4;
  const ZOOM_MAX = 2.85;

  /* Drag */
  const PITCH_LIMIT = 0.87; // ~50°
  const DRAG_SCALE_YAW = 0.0076;
  const DRAG_SCALE_PITCH = 0.005;

  /* Auto-spin */
  const SPIN_ROOT_Y = 0.2; // rad/s

  /* Blow candle (Phase 3 + 4) */
  const BLOW_ANIM_MS = 1100;
  const BUTTON_DELAY_MS = 5000;
  const WIND_ARRIVE_MS = 300;
  const WIND_TOTAL_MS = 750;

  /* Slash gesture (Phase 5) */
  const SLASH_MIN_PATH_LEN = 92;
  const SLASH_LOCK_PATH_LEN = 28;
  const SLASH_LOCK_SEG_VEL = 0.28;
  const SLASHES_FOR_LETTER = 3;

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function ringCardHeight(ringR, count, arcFill) {
    const circumference = 2 * Math.PI * ringR;
    const cardW = Math.max(1.1, (circumference / count) * arcFill);
    return cardW * 1.06;
  }

  /* ── Main ────────────────────────────────────────────────────────────── */
  function initCake() {
    const stage = document.getElementById("cake-stage");
    const THREE = window.THREE;
    if (!stage || !THREE) {
      console.warn("[cake] stage or THREE not found");
      return;
    }

    /* Cleanup nếu cake đã tồn tại (re-init khi configLoaded sau API) */
    if (stage.__cakeCleanup) {
      try { stage.__cakeCleanup(); } catch (e) {}
      stage.__cakeCleanup = null;
    }
    stage.innerHTML = "";

    /* Snapshot ảnh tại thời điểm init — dùng cho cube, ring cards, candle… */
    const IMAGES = getImages();

    let vw = stage.clientWidth || 800;
    let vh = stage.clientHeight || 600;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(vw, vh);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    stage.appendChild(renderer.domElement);

    /* Scene + camera + lights */
    const scene = new THREE.Scene();
    /* FOV co theo aspect: portrait/màn hẹp → FOV rộng hơn để bánh không bị crop hai bên */
    function computeFov(w, h) {
      const aspect = w / h;
      if (aspect < 0.7) return 52;
      if (aspect < 1.0) return 46;
      return 38;
    }
    const camera = new THREE.PerspectiveCamera(computeFov(vw, vh), vw / vh, 0.1, 200);
    camera.position.set(0, 5.6, BASE_CAM_Z);
    camera.lookAt(0, CAM_LOOK_Y, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x3c3240, 0.95));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xfff1d8, 0.35);
    rimLight.position.set(-10, 4, -8);
    scene.add(rimLight);

    /* Cake root */
    const cakeRoot = new THREE.Group();
    scene.add(cakeRoot);

    /* Tier groups */
    const lowerRingCardH = ringCardHeight(
      LOWER_TIER_RING_R,
      LOWER_RING_COUNT,
      RING_PHOTO_ARC_FILL_LOWER
    );
    const upperRingCardH = ringCardHeight(
      UPPER_TIER_RING_R,
      UPPER_RING_COUNT,
      RING_PHOTO_ARC_FILL_UPPER
    );
    const UPPER_TIER_Y =
      LOWER_TIER_Y + lowerRingCardH * 0.5 + upperRingCardH * 0.5;

    const lowerTier = new THREE.Group();
    lowerTier.position.y = LOWER_TIER_Y;
    cakeRoot.add(lowerTier);

    const upperTier = new THREE.Group();
    upperTier.position.y = UPPER_TIER_Y;
    cakeRoot.add(upperTier);

    /* ── Helpers: dán ảnh quanh thành tầng (cylinder cong) ─────────────── */
    function placePhotosAroundTier(tierGroup, radius, count, offset, arcFill) {
      const loader = new THREE.TextureLoader();
      const circumference = 2 * Math.PI * radius;
      const arcLen = Math.max(1.1, (circumference / count) * arcFill);
      const cardH = arcLen * 1.06;
      const rr = radius + 0.02;
      const segsAlongArc = Math.max(
        10,
        Math.min(28, Math.round(8 + arcLen * 2.2))
      );

      for (let i = 0; i < count; i++) {
        const photo = IMAGES[i % IMAGES.length];
        const tex = loader.load(photo);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;

        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
        });

        const a = (Math.PI * 2 * i) / count + offset;
        const dTheta = arcLen / rr;
        const thetaStart = a - dTheta * 0.5;

        const geo = new THREE.CylinderGeometry(
          rr, rr, cardH,
          segsAlongArc, 1, true,
          thetaStart, dTheta
        );
        const mesh = new THREE.Mesh(geo, mat);
        tierGroup.add(mesh);
      }
    }

    /* Ảnh tròn trên đỉnh tầng — đặt đúng mép ring + polygonOffset chống Z-fight */
    function placeSinglePhotoOnTierTop(tierGroup, topLocalY, imageSrc, discR) {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(imageSrc);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.CircleGeometry(discR, 80);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, topLocalY, 0);
      tierGroup.add(mesh);
    }

    /* Ảnh tròn dưới đáy tầng — đặt đúng mép ring + polygonOffset chống Z-fight */
    function placeSinglePhotoOnTierBottom(tierGroup, bottomLocalY, imageSrc, discR) {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(imageSrc);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.CircleGeometry(discR, 80);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.set(0, bottomLocalY, 0);
      tierGroup.add(mesh);
    }

    /* ── Nến + 7 lớp flame blob ────────────────────────────────────────── */
    function placeImageWrappedCandle(tierGroup, baseY, imageSrc, candleH, candleR) {
      tierGroup.userData = tierGroup.userData || {};
      tierGroup.userData.candleFlames = [];
      tierGroup.userData.candleR = candleR;

      const loader = new THREE.TextureLoader();
      const sideTex = loader.load(imageSrc);
      sideTex.colorSpace = THREE.SRGBColorSpace;
      sideTex.wrapS = THREE.RepeatWrapping;
      sideTex.wrapT = THREE.ClampToEdgeWrapping;
      sideTex.repeat.set(1, 1);

      const geo = new THREE.CylinderGeometry(candleR, candleR, candleH, 28, 1, false);
      const sideMat = new THREE.MeshBasicMaterial({ map: sideTex, side: THREE.DoubleSide });
      const capMat = new THREE.MeshBasicMaterial({ color: 0xfff5e8, side: THREE.DoubleSide });
      const candleMesh = new THREE.Mesh(geo, [sideMat, capMat, capMat]);
      candleMesh.position.set(0, baseY + candleH * 0.5, 0);
      tierGroup.add(candleMesh);

      const candleTopY = baseY + candleH;
      const br = candleR;
      const flameRoot = new THREE.Group();
      flameRoot.position.set(0, candleTopY + 0.01, 0);
      tierGroup.add(flameRoot);

      function addFlameBlob(color, baseOp, sx, sy, sz, ox, oy, oz, order) {
        const blobGeo = new THREE.IcosahedronGeometry(1, 1);
        const blobMat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: baseOp,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(blobGeo, blobMat);
        mesh.position.set(ox, oy, oz);
        mesh.scale.set(sx * 0.5, sy * 0.5, sz * 0.5);
        mesh.renderOrder = order;
        mesh.userData.flame = {
          bx: ox, by: oy, bz: oz,
          sx: sx * 0.5, sy: sy * 0.5, sz: sz * 0.5,
          bop: baseOp,
          px: Math.random() * Math.PI * 2,
          py: Math.random() * Math.PI * 2,
          pz: Math.random() * Math.PI * 2,
          f1: 6.5 + Math.random() * 6,
          f2: 11 + Math.random() * 10,
          f3: 17 + Math.random() * 12,
          f4: 23 + Math.random() * 9,
          f5: 31 + Math.random() * 7,
        };
        flameRoot.add(mesh);
        tierGroup.userData.candleFlames.push(mesh);
      }

      /* 7 lớp từ đỏ ngoài → trắng trong */
      addFlameBlob(0xff2a00, 0.22, br * 2.2, br * 3.6, br * 2.0, 0, 0.1, 0, 0);
      addFlameBlob(0xff480f, 0.32, br * 1.15, br * 2.8, br * 1.05, br * 0.14, 0.09, br * 0.06, 1);
      addFlameBlob(0xff6518, 0.36, br * 1.0, br * 3.2, br * 0.92, -br * 0.12, 0.11, -br * 0.05, 2);
      addFlameBlob(0xff8530, 0.4, br * 0.78, br * 2.9, br * 0.72, br * 0.07, 0.13, br * 0.09, 3);
      addFlameBlob(0xffb04a, 0.44, br * 0.55, br * 2.2, br * 0.52, -br * 0.05, 0.15, br * 0.04, 4);
      addFlameBlob(0xffe8a8, 0.52, br * 0.34, br * 1.55, br * 0.32, 0, 0.17, 0, 5);
      addFlameBlob(0xfffcef, 0.38, br * 0.2, br * 1.05, br * 0.19, 0, 0.19, 0, 6);
    }

    /* ── Build bánh ────────────────────────────────────────────────────── */
    placePhotosAroundTier(
      lowerTier, LOWER_TIER_RING_R, LOWER_RING_COUNT, 0.08, RING_PHOTO_ARC_FILL_LOWER
    );
    placePhotosAroundTier(
      upperTier, UPPER_TIER_RING_R, UPPER_RING_COUNT, 0.21, RING_PHOTO_ARC_FILL_UPPER
    );

    const sharedSrc = IMAGES[0];
    placeSinglePhotoOnTierTop(
      lowerTier, lowerRingCardH * 0.5, sharedSrc,
      LOWER_TIER_RING_R * TOP_DISC_OVERHANG * LOWER_TOP_DISC_SCALE
    );
    placeSinglePhotoOnTierBottom(
      lowerTier, -lowerRingCardH * 0.5, sharedSrc,
      LOWER_TIER_RING_R * TOP_DISC_OVERHANG * LOWER_BOTTOM_DISC_SCALE
    );
    placeSinglePhotoOnTierTop(
      upperTier, upperRingCardH * 0.5, sharedSrc,
      UPPER_TIER_RING_R * TOP_DISC_OVERHANG * UPPER_TOP_DISC_SCALE
    );

    /* Nến đứng trên đỉnh tầng trên */
    const upperDiscTopLocalY = upperRingCardH * 0.5 + 0.02;
    placeImageWrappedCandle(
      upperTier,
      upperDiscTopLocalY + 0.018,
      IMAGES[Math.min(3, IMAGES.length - 1)],
      1.42,
      0.13
    );

    /* ── Phase 3 + 4: Blow candle state + UI ───────────────────────────── */
    const blowBtn = document.getElementById("cake-blow-btn");
    const cutReminder = document.getElementById("cake-cut-reminder");
    let candleBlown = false;
    let blowStartTime = -1;
    let blowBtnReady = false;

    function syncBlowButtonState() {
      if (!blowBtn) return;
      if (candleBlown) {
        blowBtn.setAttribute("aria-hidden", "true");
        blowBtn.disabled = true;
        if (cutReminder) cutReminder.hidden = false;
        return;
      }
      blowBtn.setAttribute("aria-hidden", blowBtnReady ? "false" : "true");
      blowBtn.disabled = !blowBtnReady;
      if (cutReminder) cutReminder.hidden = true;
    }

    /* Tạo 6 vệt gió DOM bay ngang qua stage */
    function triggerWindEffect(onArrived) {
      console.log("[cake] triggerWindEffect → 6 streaks created");
      const old = stage.querySelector(".cake-wind-overlay");
      if (old) old.remove();
      const overlay = document.createElement("div");
      overlay.className = "cake-wind-overlay";

      /* top: tập trung ở giữa stage (40-65%) — nơi nến + flame xuất hiện */
      const streaks = [
        { top: 42, h: 6, w: 40, delay:   0, rot: -3, op: 0.85, dur: 620 },
        { top: 48, h: 5, w: 36, delay:  50, rot: -1, op: 0.75, dur: 590 },
        { top: 36, h: 4, w: 30, delay:  80, rot: -4, op: 0.65, dur: 640 },
        { top: 54, h: 5, w: 34, delay:  25, rot:  1, op: 0.80, dur: 600 },
        { top: 30, h: 3, w: 26, delay: 110, rot: -2, op: 0.55, dur: 660 },
        { top: 60, h: 4, w: 28, delay:  65, rot:  2, op: 0.65, dur: 580 },
      ];
      streaks.forEach(function (s) {
        const el = document.createElement("div");
        el.className = "cake-wind-streak";
        el.style.cssText = [
          "top:"        + s.top + "%",
          "height:"     + s.h   + "px",
          "width:"      + s.w   + "%",
          "--ws-rot:"   + s.rot + "deg",
          "--ws-op:"    + s.op,
          "--ws-delay:" + s.delay + "ms",
          "--ws-dur:"   + s.dur + "ms",
        ].join(";");
        overlay.appendChild(el);
      });
      stage.appendChild(overlay);

      const arriveTimer = setTimeout(function () {
        if (onArrived) onArrived();
      }, WIND_ARRIVE_MS);
      setTimeout(function () {
        clearTimeout(arriveTimer);
        if (overlay.parentNode) overlay.remove();
      }, WIND_TOTAL_MS);
    }

    function onBlowButtonClick(e) {
      if (e) e.stopPropagation();
      console.log("[cake] blow clicked", { blowBtnReady: blowBtnReady, candleBlown: candleBlown });
      if (!blowBtnReady || candleBlown) return;
      candleBlown = true;
      blowStartTime = -1; /* chờ gió đến mới bắt đầu anim tắt */
      syncBlowButtonState();
      triggerWindEffect(function () {
        console.log("[cake] wind arrived → flame extinguish anim starts");
        blowStartTime = performance.now();
        /* Sau khi nến tắt hoàn toàn → kích hoạt slash mode */
        setTimeout(function () {
          slashUiReady = true;
          refreshCakeSlashTargets();
          slashCanvas.setAttribute("aria-hidden", "false");
          console.log("[cake] slash mode READY — vuốt 3 nhát qua bánh");
        }, BLOW_ANIM_MS + 50);
      });
      window.dispatchEvent(
        new CustomEvent("memory:candle-blown", { detail: { phase: "blow" } })
      );
    }
    if (blowBtn) {
      /* Stop pointer events from propagating to stage (tránh pointer-capture nuốt click) */
      blowBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
      blowBtn.addEventListener("pointerup", function (e) { e.stopPropagation(); });
      blowBtn.addEventListener("click", onBlowButtonClick);
    }
    syncBlowButtonState();

    /* ── Phase 5: Slash gesture state + canvas ─────────────────────────── */
    let slashStrokePts = [];
    let slashPathLen = 0;
    let slashMaxSegVel = 0;
    let slashLastMoveT = 0;
    let slashLocksRotation = false;
    let slashCommittedPaths = [];
    let slashCountValid = 0;
    let slashUiReady = false;
    let slashLetterDone = false;
    let slashGestureStartYaw = 0;
    let slashGestureStartPitch = 0;
    let slashRaf = 0;
    const cakeSlashTargets = [];

    const slashCanvas = document.createElement("canvas");
    slashCanvas.id = "cake-slash-canvas";
    slashCanvas.className = "cake-slash-canvas";
    slashCanvas.setAttribute("aria-hidden", "true");
    stage.appendChild(slashCanvas);
    const slashCtx = slashCanvas.getContext("2d");

    function clientToStageLocal(clientX, clientY) {
      const r = stage.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    }

    function resizeSlashCanvas() {
      if (!slashCanvas || !slashCtx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = stage.clientWidth || 800;
      const h = stage.clientHeight || 600;
      slashCanvas.width = Math.floor(w * dpr);
      slashCanvas.height = Math.floor(h * dpr);
      slashCanvas.style.width = w + "px";
      slashCanvas.style.height = h + "px";
      slashCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redrawSlashCanvas();
    }
    resizeSlashCanvas();

    function drawStrokeLine(ctx, pts, isLive) {
      if (!pts || pts.length < 2) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      /* Lớp trắng to */
      ctx.shadowColor = isLive ? "rgba(255,255,255,0.85)" : "rgba(255,220,180,0.5)";
      ctx.shadowBlur = isLive ? 14 : 10;
      ctx.strokeStyle = isLive ? "rgba(255,255,255,0.95)" : "rgba(255,248,240,0.88)";
      ctx.lineWidth = isLive ? 5.2 : 4.2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      /* Lớp vàng nhỏ ở giữa */
      ctx.strokeStyle = isLive ? "rgba(255,215,120,0.9)" : "rgba(255,200,90,0.75)";
      ctx.lineWidth = isLive ? 2.5 : 2.2;
      ctx.shadowBlur = isLive ? 6 : 4;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.restore();
    }

    function redrawSlashCanvas() {
      if (!slashCtx) return;
      const w = stage.clientWidth || 800;
      const h = stage.clientHeight || 600;
      slashCtx.clearRect(0, 0, w, h);
      slashCommittedPaths.forEach(function (p) {
        drawStrokeLine(slashCtx, p.points, false);
      });
      if (slashStrokePts.length >= 2) {
        drawStrokeLine(slashCtx, slashStrokePts, true);
      }
    }

    function scheduleSlashRedraw() {
      if (slashRaf) return;
      slashRaf = requestAnimationFrame(function () {
        slashRaf = 0;
        redrawSlashCanvas();
      });
    }

    function downsampleSlashPoints(pts) {
      if (pts.length <= 72) return pts.slice();
      const step = Math.ceil(pts.length / 72);
      const out = [];
      for (let i = 0; i < pts.length; i += step) out.push(pts[i]);
      if (out[out.length - 1] !== pts[pts.length - 1]) out.push(pts[pts.length - 1]);
      return out;
    }

    function refreshCakeSlashTargets() {
      cakeSlashTargets.length = 0;
      cakeRoot.traverse(function (obj) {
        if (!obj.isMesh) return;
        if (obj.userData && obj.userData.flame) return;
        cakeSlashTargets.push(obj);
      });
    }

    const slashRaycaster = new THREE.Raycaster();
    const _slashNdc = new THREE.Vector2();
    function stageLocalToNdc(p) {
      const w = stage.clientWidth || 800;
      const h = stage.clientHeight || 600;
      _slashNdc.set((p.x / w) * 2 - 1, -(p.y / h) * 2 + 1);
      return _slashNdc;
    }

    function strokeCrossesCake(pts) {
      if (!cakeSlashTargets.length) refreshCakeSlashTargets();
      if (!cakeSlashTargets.length || !pts || pts.length < 2) return false;
      const steps = Math.min(7, Math.max(3, Math.floor(pts.length / 4)));
      for (let i = 0; i < steps; i++) {
        const idx = Math.floor((i / Math.max(1, steps - 1)) * (pts.length - 1));
        const ndc = stageLocalToNdc(pts[idx]);
        slashRaycaster.setFromCamera(ndc, camera);
        const hits = slashRaycaster.intersectObjects(cakeSlashTargets, false);
        if (hits.length > 0) return true;
      }
      return false;
    }

    function tryAcceptSlashStroke() {
      if (slashLetterDone || !slashUiReady) return;
      if (slashStrokePts.length < 5) return;
      if (slashPathLen < SLASH_MIN_PATH_LEN) {
        console.log("[cake] slash too short: " + slashPathLen.toFixed(0) + "px (cần ≥" + SLASH_MIN_PATH_LEN + ")");
        return;
      }
      if (!strokeCrossesCake(slashStrokePts)) {
        console.log("[cake] slash không đi qua bánh — bỏ qua");
        return;
      }
      /* Khôi phục góc xoay về trước khi vẽ */
      userDragYaw = slashGestureStartYaw;
      userDragPitch = slashGestureStartPitch;

      slashCommittedPaths.push({ points: downsampleSlashPoints(slashStrokePts) });
      slashCountValid++;
      console.log("[cake] slash accepted (" + slashCountValid + "/" + SLASHES_FOR_LETTER + ")");

      /* Update counter UI */
      const counter = document.getElementById("cake-cut-counter");
      if (counter) counter.textContent = slashCountValid + "/" + SLASHES_FOR_LETTER;

      if (slashCountValid >= SLASHES_FOR_LETTER) {
        slashLetterDone = true;
        console.log("[cake] 3 nhát hoàn tất → bắt đầu shatter");
        startCakeShatterSequence();
      }
    }

    /* ── Phase 6: Shatter sequence — tách bánh theo góc cắt ────────────── */
    const TWO_PI = Math.PI * 2;
    let shatterPieces = [];
    let shatterAnimId = 0;
    let cakeShatterDone = false;

    /* Chiếu điểm màn hình → giao với mặt phẳng y=yPlane trong world space */
    function screenToWorldXZ(sx, sy, yPlane) {
      const w = stage.clientWidth || 800;
      const h = stage.clientHeight || 600;
      const ndcX = (sx / w) * 2 - 1;
      const ndcY = -(sy / h) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const dir = vec.clone().sub(camera.position).normalize();
      if (Math.abs(dir.y) < 1e-6) return null;
      const k = (yPlane - camera.position.y) / dir.y;
      return new THREE.Vector3(
        camera.position.x + dir.x * k,
        yPlane,
        camera.position.z + dir.z * k
      );
    }

    /* Normal của mặt phẳng cắt (thẳng đứng qua trục Y) từ đường vuốt */
    function computeCutNormal(path) {
      if (!path || path.length < 2) return null;
      const yMid = (LOWER_TIER_Y + (LOWER_TIER_Y + lowerRingCardH * 0.5 + upperRingCardH * 0.5)) / 2;
      const w0 = screenToWorldXZ(path[0].x, path[0].y, yMid);
      const w1 = screenToWorldXZ(path[path.length - 1].x, path[path.length - 1].y, yMid);
      if (!w0 || !w1) return null;
      const dx = w1.x - w0.x;
      const dz = w1.z - w0.z;
      const len = Math.sqrt(dx * dx + dz * dz);
      if (len < 1e-4) return null;
      return new THREE.Vector3(-dz / len, 0, dx / len);
    }

    function startCakeShatterSequence() {
      if (cakeShatterDone) return;
      cakeShatterDone = true;

      /* 1. Tính góc cắt từ các đường vuốt → 6 góc đối xứng */
      const cutNormals = slashCommittedPaths
        .map(function (p) { return computeCutNormal(p.points || p); })
        .filter(Boolean);
      const rawAngles = [];
      cutNormals.forEach(function (n) {
        let a = Math.atan2(-n.z, n.x), b = a + Math.PI;
        if (a < 0) a += TWO_PI;
        if (b < 0) b += TWO_PI;
        if (b >= TWO_PI) b -= TWO_PI;
        rawAngles.push(a, b);
      });
      rawAngles.sort(function (a, b) { return a - b; });
      const cutAngles = rawAngles.length ? [rawAngles[0]] : [];
      for (let i = 1; i < rawAngles.length; i++) {
        if (rawAngles[i] - rawAngles[i - 1] > 0.15) cutAngles.push(rawAngles[i]);
      }
      if (cutAngles.length < 2) {
        cutAngles.length = 0;
        for (let i = 0; i < 6; i++) cutAngles.push((i * Math.PI) / 3);
      }
      console.log("[cake] shatter: " + cutAngles.length + " sectors", cutAngles.map(function (a) { return (a * 180 / Math.PI).toFixed(0) + "°"; }));

      /* 2. Gom meshes + tính worldAngle, đồng thời thu thập material */
      cakeRoot.updateWorldMatrix(true, true);
      const originPos = cakeRoot.position.clone();
      const originRot = cakeRoot.rotation.clone();
      const cakeWorldInv = cakeRoot.matrixWorld.clone().invert();

      const meshInfos = [];
      const centerDiscs = []; /* {mat, y} — top/bottom disc photos */
      cakeRoot.traverse(function (obj) {
        if (!obj.isMesh) return;
        if (obj.userData && obj.userData.flame) return;
        obj.updateWorldMatrix(true, false);

        let worldAngle = null;
        const geo = obj.geometry;
        const params = geo && geo.parameters;
        const matProbe = Array.isArray(obj.material) ? obj.material[0] : obj.material;

        if (params && params.thetaStart !== undefined && params.thetaLength !== undefined
            && params.thetaLength < TWO_PI - 0.05
            && matProbe && matProbe.map && matProbe.map.isTexture) {
          const thetaCenter = params.thetaStart + params.thetaLength * 0.5;
          const r = params.radiusTop || params.radiusBottom || 1;
          const localPt = new THREE.Vector3(Math.sin(thetaCenter) * r, 0, Math.cos(thetaCenter) * r);
          const worldPt = localPt.applyMatrix4(obj.matrixWorld);
          const d = Math.sqrt(worldPt.x * worldPt.x + worldPt.z * worldPt.z);
          if (d > 0.8) {
            worldAngle = Math.atan2(worldPt.x, worldPt.z);
            if (worldAngle < 0) worldAngle += TWO_PI;
          }
        } else {
          const wp = new THREE.Vector3();
          obj.getWorldPosition(wp);
          const dist = Math.sqrt(wp.x * wp.x + wp.z * wp.z);
          if (dist > 0.8) {
            worldAngle = Math.atan2(wp.x, wp.z);
            if (worldAngle < 0) worldAngle += TWO_PI;
          }
        }

        meshInfos.push({
          mesh: obj,
          worldAngle: worldAngle,
          worldMat: obj.matrixWorld.clone(),
        });

        /* Thu thập top/bottom disc photo (CircleGeometry ở tâm) */
        if (geo && geo.type === "CircleGeometry"
            && matProbe && matProbe.map && matProbe.map.isTexture) {
          const wp = new THREE.Vector3();
          obj.getWorldPosition(wp);
          centerDiscs.push({ mat: matProbe, y: wp.y });
        }
      });

      centerDiscs.sort(function (a, b) { return a.y - b.y; });
      /* Thứ tự Y tăng dần: [lowerBottom, lowerTop, upperTop] */
      const lowerBottomDiscMat = centerDiscs[0] ? centerDiscs[0].mat : null;
      const lowerTopDiscMat = centerDiscs[1] ? centerDiscs[1].mat : null;
      const upperTopDiscMat = centerDiscs[2] ? centerDiscs[2].mat : null;

      /* Tra cứu material ring card gần góc nhất — dùng cho lõi + mặt cắt */
      const ringTexInfos = meshInfos.filter(function (info) {
        if (info.worldAngle === null) return false;
        const mat = Array.isArray(info.mesh.material) ? info.mesh.material[0] : info.mesh.material;
        return mat && mat.map && mat.map.isTexture && info.mesh.geometry.type === "CylinderGeometry";
      });
      function findNearestRingMat(targetAngle) {
        if (!ringTexInfos.length) return null;
        let best = null, bestD = Infinity;
        ringTexInfos.forEach(function (info) {
          let d = Math.abs(info.worldAngle - targetAngle) % TWO_PI;
          if (d > Math.PI) d = TWO_PI - d;
          if (d < bestD) {
            bestD = d;
            best = Array.isArray(info.mesh.material) ? info.mesh.material[0] : info.mesh.material;
          }
        });
        return best;
      }
      function makePhotoMat(srcMat, doubleSide) {
        if (!srcMat || typeof srcMat.clone !== "function") {
          return new THREE.MeshBasicMaterial({ color: 0xf0ddb0, side: THREE.FrontSide });
        }
        const m = srcMat.clone();
        m.side = doubleSide ? THREE.DoubleSide : THREE.FrontSide;
        return m;
      }

      /* Tạo texture "ruột bánh": sponge vàng + 2 lớp kem + lớp frosting hồng trên cùng */
      function createCakeInteriorTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        /* Nền sponge gradient vàng kem */
        const grad = ctx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, "#f9e9b8");
        grad.addColorStop(0.5, "#f0d893");
        grad.addColorStop(1, "#e8c878");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 256);
        /* Noise sponge */
        const imgData = ctx.getImageData(0, 0, 128, 256);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 28;
          d[i]     = Math.max(0, Math.min(255, d[i]     + n));
          d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
          d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
        }
        ctx.putImageData(imgData, 0, 0);
        /* Lỗ khí nhỏ — bubble sponge */
        ctx.fillStyle = "rgba(120, 80, 30, 0.18)";
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * 128;
          const y = Math.random() * 256;
          const r = 1 + Math.random() * 2;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        /* 2 lớp kem ngang */
        function creamLayer(y, h) {
          const g = ctx.createLinearGradient(0, y, 0, y + h);
          g.addColorStop(0, "#fff5d4");
          g.addColorStop(0.5, "#fffaee");
          g.addColorStop(1, "#fff0c8");
          ctx.fillStyle = g;
          ctx.fillRect(0, y, 128, h);
          /* Vệt mứt hồng nhẹ ở mép trên mỗi lớp kem */
          ctx.fillStyle = "rgba(255, 150, 165, 0.55)";
          ctx.fillRect(0, y - 1, 128, 2);
        }
        creamLayer(85, 16);
        creamLayer(170, 16);
        /* Frosting hồng trên cùng */
        const frost = ctx.createLinearGradient(0, 0, 0, 14);
        frost.addColorStop(0, "#ffd1d4");
        frost.addColorStop(1, "#fae0c6");
        ctx.fillStyle = frost;
        ctx.fillRect(0, 0, 128, 12);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        return tex;
      }
      const cakeInteriorTex = createCakeInteriorTexture();
      function makeCakeInteriorMat() {
        return new THREE.MeshBasicMaterial({
          map: cakeInteriorTex,
          side: THREE.FrontSide,
          polygonOffset: true,
          polygonOffsetFactor: 0.6,
          polygonOffsetUnits: 0.5,
        });
      }

      function inSector(angle, θStart, θLen) {
        if (angle === null) return false;
        const a = ((angle - θStart) % TWO_PI + TWO_PI) % TWO_PI;
        return a <= θLen + 0.02;
      }

      /* 3. Tạo từng miếng bánh — group + clone meshes thuộc sector */
      shatterPieces = [];
      const numSectors = cutAngles.length;
      for (let i = 0; i < numSectors; i++) {
        const θStart = cutAngles[i];
        let θEnd = cutAngles[(i + 1) % numSectors];
        if (θEnd <= θStart) θEnd += TWO_PI;
        const θLen = θEnd - θStart;
        if (θLen < 0.05) continue;

        const centerθ = θStart + θLen / 2;
        const flyDir = new THREE.Vector3(Math.sin(centerθ), 0, Math.cos(centerθ));

        const grp = new THREE.Group();
        grp.position.copy(originPos);
        grp.rotation.copy(originRot);

        meshInfos.forEach(function (info) {
          if (!inSector(info.worldAngle, θStart, θLen)) return;
          const srcMat = Array.isArray(info.mesh.material) ? info.mesh.material[0] : info.mesh.material;
          if (!srcMat || typeof srcMat.clone !== "function") return;
          const matClone = srcMat.clone();
          matClone.polygonOffset = true;
          matClone.polygonOffsetFactor = -0.4;
          matClone.polygonOffsetUnits = 0.4;
          const m = new THREE.Mesh(info.mesh.geometry, matClone);
          m.matrix.multiplyMatrices(cakeWorldInv, info.worldMat);
          m.matrixAutoUpdate = false;
          grp.add(m);
        });

        /* ── Lõi bánh (wedge) — đặc, có ảnh ngoài + mặt trên/dưới + 2 mặt cắt */
        const θSL = θStart - originRot.y;
        const sectorRingMat = findNearestRingMat(centerθ);

        const tierConfigs = [
          {
            r: LOWER_TIER_RING_R * 0.93,
            h: LOWER_TIER_H,
            y: LOWER_TIER_Y,
            segs: 36,
            topMat: lowerTopDiscMat,
          },
          {
            r: UPPER_TIER_RING_R * 0.93,
            h: UPPER_TIER_H,
            y: UPPER_TIER_Y,
            segs: 28,
            topMat: upperTopDiscMat,
          },
        ];

        tierConfigs.forEach(function (cfg) {
          /* Wedge cylinder slice: outer = photo (icing wrap), top = disc photo, bottom = cake interior */
          const wgeo = new THREE.CylinderGeometry(
            cfg.r, cfg.r, cfg.h,
            cfg.segs, 1, false,
            θSL, θLen
          );
          const wMesh = new THREE.Mesh(wgeo, [
            makePhotoMat(sectorRingMat, false),
            makePhotoMat(cfg.topMat || sectorRingMat, false),
            makeCakeInteriorMat(),
          ]);
          wMesh.position.y = cfg.y;
          grp.add(wMesh);

          /* 2 mặt cắt — plane phẳng với texture ruột bánh (sponge + 2 lớp kem) */
          [θSL, θSL + θLen].forEach(function (θ) {
            const capRotY = Math.atan2(-Math.cos(θ), Math.sin(θ));
            const faceMat = makeCakeInteriorMat();
            const pw = cfg.r;
            const ph = cfg.h;
            const radialMid = cfg.r * 0.5;
            const cx = Math.sin(θ) * radialMid;
            const cz = Math.cos(θ) * radialMid;
            const face = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), faceMat);
            face.position.set(cx, cfg.y, cz);
            face.rotation.y = capRotY;
            grp.add(face);
          });
        });

        if (grp.children.length === 0) continue;

        scene.add(grp);
        const tiltAxis = new THREE.Vector3(flyDir.z, 0, -flyDir.x);
        if (tiltAxis.lengthSq() < 1e-10) tiltAxis.set(1, 0, 0);
        else tiltAxis.normalize();

        shatterPieces.push({
          group: grp,
          flyDir: flyDir,
          tiltAxis: tiltAxis,
          ox: originPos.x,
          oy: originPos.y,
          oz: originPos.z,
          spinX: (Math.random() - 0.5) * 0.2,
          spinY: (Math.random() - 0.5) * 0.07,
          spinZ: (Math.random() - 0.5) * 0.17,
        });
      }
      console.log("[cake] " + shatterPieces.length + " miếng bánh được tạo");

      /* 4. Ẩn bánh gốc + fade slash UI */
      cakeRoot.visible = false;
      if (cutReminder) cutReminder.hidden = true;
      slashCanvas.style.transition = "opacity 0.6s ease";
      slashCanvas.style.opacity = "0";

      /* 5. Animation tách + bay + rơi */
      const SHATTER_MS = 2900;
      const shatterStart = performance.now();
      function shatterFrame() {
        const elapsed = performance.now() - shatterStart;
        const u = Math.min(1, elapsed / SHATTER_MS);
        const easeOut = 1 - Math.pow(1 - u, 2.65);
        const gravity = u * u * 0.18;
        const leanAngle = easeOut * 0.34;

        shatterPieces.forEach(function (piece) {
          const dist = easeOut * 0.72;
          piece.group.position.set(
            piece.ox + piece.flyDir.x * dist,
            piece.oy + easeOut * 0.12 - gravity,
            piece.oz + piece.flyDir.z * dist
          );
          const qBase = new THREE.Quaternion().setFromEuler(originRot);
          const qLean = new THREE.Quaternion().setFromAxisAngle(piece.tiltAxis, leanAngle);
          const qSpin = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
              easeOut * piece.spinX,
              easeOut * piece.spinY,
              easeOut * piece.spinZ,
              "XYZ"
            )
          );
          piece.group.quaternion.copy(qBase).premultiply(qLean).multiply(qSpin);
        });

        if (u < 1) {
          shatterAnimId = requestAnimationFrame(shatterFrame);
        } else {
          console.log("[cake] shatter xong → memory:cake-cuts-complete");
          window.dispatchEvent(
            new CustomEvent("memory:cake-cuts-complete", {
              detail: { paths: slashCommittedPaths.slice() },
            })
          );
        }
      }
      shatterAnimId = requestAnimationFrame(shatterFrame);
    }

    /* Enable nút thổi sau khi intro biến mất + delay 5s */
    function startBlowBtnCountdown() {
      setTimeout(function () {
        blowBtnReady = true;
        syncBlowButtonState();
      }, BUTTON_DELAY_MS);
    }
    if (document.documentElement.classList.contains("intro-active")) {
      const obs = new MutationObserver(function () {
        if (!document.documentElement.classList.contains("intro-active")) {
          obs.disconnect();
          startBlowBtnCountdown();
        }
      });
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    } else {
      startBlowBtnCountdown();
    }

    /* ── Pointer events: drag rotate + pinch zoom ──────────────────────── */
    let userDragYaw = 0;
    let userDragPitch = 0;
    let userZoom = 1.0;
    let dragActive = false;
    let dragStartX = 0, dragStartY = 0;
    let baseYaw = 0, basePitch = 0;
    let rotatePointerId = null;
    let pinchDist0 = 0;
    let zoomAtPinchStart = 1.0;
    const pointers = new Map();

    function pinchDistance() {
      if (pointers.size < 2) return 0;
      const pts = Array.from(pointers.values());
      return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }

    function applyCameraZoom() {
      userZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, userZoom));
      camera.position.z = BASE_CAM_Z / userZoom;
      camera.lookAt(0, CAM_LOOK_Y, 0);
    }

    function onPointerDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2) {
        dragActive = false;
        pinchDist0 = pinchDistance();
        zoomAtPinchStart = userZoom;
        if (rotatePointerId != null) {
          try { stage.releasePointerCapture(rotatePointerId); } catch (err) {}
          rotatePointerId = null;
        }
        return;
      }

      if (pointers.size === 1) {
        dragActive = true;
        rotatePointerId = e.pointerId;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        baseYaw = userDragYaw;
        basePitch = userDragPitch;
        /* Slash mode: bắt đầu ghi điểm khi sẵn sàng cắt */
        if (slashUiReady && !slashLetterDone) {
          slashGestureStartYaw = userDragYaw;
          slashGestureStartPitch = userDragPitch;
          slashStrokePts = [clientToStageLocal(e.clientX, e.clientY)];
          slashLastMoveT = performance.now();
          slashPathLen = 0;
          slashMaxSegVel = 0;
          slashLocksRotation = false;
        } else {
          slashStrokePts = [];
          slashPathLen = 0;
          slashMaxSegVel = 0;
          slashLocksRotation = false;
        }
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }

    function onPointerMove(e) {
      if (!pointers.has(e.pointerId)) return;
      const pt = pointers.get(e.pointerId);
      pt.x = e.clientX;
      pt.y = e.clientY;

      if (pointers.size >= 2) {
        e.preventDefault();
        const d = pinchDistance();
        if (pinchDist0 > 6 && d > 0) {
          userZoom = zoomAtPinchStart * (d / pinchDist0);
          applyCameraZoom();
        }
        return;
      }

      if (!dragActive) return;
      /* Slash mode: thu điểm + tính path length + vận tốc segment */
      if (slashUiReady && !slashLetterDone && slashStrokePts.length) {
        const loc = clientToStageLocal(e.clientX, e.clientY);
        const last = slashStrokePts[slashStrokePts.length - 1];
        const seg = Math.hypot(loc.x - last.x, loc.y - last.y);
        if (seg > 0.4) {
          slashPathLen += seg;
          slashStrokePts.push(loc);
          const now = performance.now();
          const dt = Math.max(1, now - slashLastMoveT);
          slashMaxSegVel = Math.max(slashMaxSegVel, seg / dt);
          slashLastMoveT = now;
          slashLocksRotation =
            slashPathLen > SLASH_LOCK_PATH_LEN &&
            slashMaxSegVel > SLASH_LOCK_SEG_VEL;
          scheduleSlashRedraw();
        }
      }
      if (slashLocksRotation) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      userDragYaw = baseYaw + dx * DRAG_SCALE_YAW;
      userDragPitch = Math.max(
        -PITCH_LIMIT,
        Math.min(PITCH_LIMIT, basePitch + dy * DRAG_SCALE_PITCH)
      );
    }

    function onPointerUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchDist0 = 0;
      if (e.pointerId === rotatePointerId) {
        /* Validate + commit slash stroke nếu đang ở slash mode */
        tryAcceptSlashStroke();
        slashStrokePts = [];
        slashPathLen = 0;
        slashMaxSegVel = 0;
        slashLocksRotation = false;
        scheduleSlashRedraw();
        dragActive = false;
        rotatePointerId = null;
        try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    }

    function onWheel(e) {
      e.preventDefault();
      const f = e.deltaY > 0 ? 0.92 : 1.08;
      userZoom *= f;
      applyCameraZoom();
    }

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("wheel", onWheel, { passive: false });

    /* ── Animate loop ──────────────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId = 0;

    function animate() {
      const t = clock.getElapsedTime();
      if (!cakeShatterDone) {
        cakeRoot.rotation.y = t * SPIN_ROOT_Y + userDragYaw;
        cakeRoot.rotation.x = userDragPitch;
      }

      /* Flame animation (port từ annibox dòng 1638-1696) */
      const flames = upperTier.userData && upperTier.userData.candleFlames;
      const flameR = (upperTier.userData && upperTier.userData.candleR) || 0.13;
      if (flames && flames.length) {
        flames.forEach(function (mesh) {
          const u = mesh.userData.flame;
          if (!u) return;

          /* ── Phase 4: Animation tắt nến ──────────────────────────────── */
          if (candleBlown) {
            const elapsed = performance.now() - blowStartTime;
            if (blowStartTime < 0 || elapsed >= BLOW_ANIM_MS) {
              if (blowStartTime >= 0) mesh.visible = false;
              return;
            }
            mesh.visible = true;
            const prog = elapsed / BLOW_ANIM_MS;
            if (prog < 0.38) {
              /* Pha 1 (0-38%): lung lay dữ dội như bị thổi */
              const p1 = prog / 0.38;
              const leanX = u.bx + flameR * 1.2 * p1 * Math.sin(t * 38 + u.px);
              const leanY = u.by + flameR * 0.3 * Math.sin(t * 26 + u.py);
              mesh.position.set(leanX, leanY, u.bz);
              mesh.scale.set(
                u.sx * (1 + 0.4 * Math.abs(Math.sin(t * 35))),
                u.sy * (1.25 - 0.35 * p1),
                u.sz
              );
              mesh.material.opacity = Math.min(0.92, u.bop * (1.1 - 0.15 * p1));
            } else {
              /* Pha 2 (38-100%): teo nhỏ + mờ dần (ease-out power 1.8) */
              const p2 = (prog - 0.38) / 0.62;
              const ease = 1 - Math.pow(1 - p2, 1.8);
              const sc = Math.max(0, 1 - ease);
              mesh.position.set(u.bx, u.by + flameR * 0.15 * (1 - p2), u.bz);
              mesh.scale.set(u.sx * sc, u.sy * sc, u.sz * sc);
              mesh.material.opacity = Math.max(0, u.bop * (1 - ease));
            }
            return;
          }

          /* ── Flame bình thường: wobble + flicker ─────────────────────── */
          mesh.visible = true;
          const wobbleY =
            flameR * 0.2 * Math.sin(t * u.f5 + u.py) +
            flameR * 0.13 * Math.sin(t * 27 + u.pz) +
            flameR * 0.11 * Math.sin(t * u.f1 + u.px) +
            flameR * 0.08 * Math.sin(t * u.f3 * 1.2 + u.py);
          const stretchY =
            1 +
            0.26 * Math.sin(t * u.f2 + u.pz) +
            0.17 * Math.sin(t * u.f4 * 1.3 + u.px) +
            0.12 * Math.sin(t * u.f5 * 0.6 + u.py) +
            0.08 * Math.sin(t * u.f1 * 1.8 + u.pz);
          mesh.position.set(u.bx, u.by + wobbleY, u.bz);
          mesh.scale.set(u.sx, u.sy * stretchY, u.sz);
          const flicker =
            0.58 +
            0.22 * (0.5 + 0.5 * Math.sin(t * 14.2 + u.px)) +
            0.18 * (0.5 + 0.5 * Math.sin(t * 21.7 + u.pz)) +
            0.12 * (0.5 + 0.5 * Math.sin(t * 33 + u.py));
          mesh.material.opacity = Math.max(0.12, Math.min(0.92, u.bop * flicker));
        });
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    /* ── Resize ────────────────────────────────────────────────────────── */
    function onResize() {
      vw = stage.clientWidth || 800;
      vh = stage.clientHeight || 600;
      camera.aspect = vw / vh;
      camera.fov = computeFov(vw, vh);
      camera.updateProjectionMatrix();
      renderer.setSize(vw, vh);
      resizeSlashCanvas();
    }
    window.addEventListener("resize", onResize);

    stage.dataset.cakeReady = "true";

    /* Cleanup function — gọi khi re-init (configLoaded với images mới) */
    stage.__cakeCleanup = function () {
      if (rafId) cancelAnimationFrame(rafId);
      if (shatterAnimId) cancelAnimationFrame(shatterAnimId);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("wheel", onWheel);
      /* Dispose Three.js resources */
      scene.traverse(function (obj) {
        if (!obj.isMesh) return;
        if (obj.geometry) obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(function (m) {
          if (m) {
            if (m.map) m.map.dispose();
            if (m.dispose) m.dispose();
          }
        });
      });
      if (renderer) renderer.dispose();
    };
  }

  /* Re-init cake khi config từ API về với images mới */
  let lastImagesKey = JSON.stringify(getImages());
  window.addEventListener("configLoaded", function (e) {
    const cfg = e.detail || {};
    if (!cfg.images || !cfg.images.length) return;
    const newKey = JSON.stringify(cfg.images);
    if (newKey === lastImagesKey) return; /* không đổi → skip */
    lastImagesKey = newKey;
    console.log("[cake] re-init với ảnh mới từ config", cfg.images);
    initCake();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCake);
  } else {
    initCake();
  }
})();
