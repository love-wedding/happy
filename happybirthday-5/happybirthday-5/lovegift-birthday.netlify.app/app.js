// Birthday Gift - Complete Vanilla JavaScript Engine
(function () {
  'use strict';

  // Load config or default values
  const cfg = window.GIFT_CONFIG || {
    recipientName: "Em Bé 🤍",
    senderName: "Anh nè",
    age: "20",
    birthdayDate: "2006-09-12",
    unlockMode: "none",
    musicUrl: "music/birthday.mp3",
    letterBody: "Chúc mừng sinh nhật cậu 🎂\n\nChúc cậu bước sang tuổi mới luôn rực rỡ, bình an và tràn ngập niềm vui!",
    photos: []
  };

  // State
  let currentStage = "dark";
  let audioPlaying = false;
  let bgmAudio = null;

  // DOM Elements
  const stageElements = {
    dark: document.getElementById('stage-dark'),
    surprise: document.getElementById('stage-surprise'),
    cake: document.getElementById('stage-cake'),
    wish: document.getElementById('stage-wish'),
    letter: document.getElementById('stage-letter'),
    bloom: document.getElementById('stage-bloom'),
    keepsake: document.getElementById('stage-keepsake'),
    share: document.getElementById('stage-share')
  };

  const appContainer = document.getElementById('appContainer');
  const flashOverlay = document.getElementById('flashOverlay');
  const bgmBtn = document.getElementById('bgmBtn');
  const iconVolOn = document.getElementById('iconVolOn');
  const iconVolOff = document.getElementById('iconVolOff');
  const bgmWave = document.getElementById('bgmWave');

  const garlandContainer = document.getElementById('garlandContainer');
  const balloonsContainer = document.getElementById('balloonsContainer');
  const petalsContainer = document.getElementById('petalsContainer');

  // Fill in configured texts
  document.querySelectorAll('.cfg-recipient').forEach(el => el.textContent = cfg.recipientName);
  document.querySelectorAll('.cfg-sender').forEach(el => el.textContent = cfg.senderName);
  document.querySelectorAll('.cfg-age').forEach(el => el.textContent = cfg.age);
  document.querySelectorAll('.cfg-age-stamp').forEach(el => el.textContent = `${cfg.age} tuổi 🎂`);

  // Initialize Audio
  function initAudio() {
    if (!bgmAudio) {
      bgmAudio = new Audio(cfg.musicUrl);
      bgmAudio.loop = true;
      bgmAudio.volume = 0.6;
    }
  }

  function toggleAudio() {
    initAudio();
    if (bgmAudio.paused) {
      bgmAudio.play().then(() => {
        audioPlaying = true;
        updateAudioUI();
      }).catch(e => console.log('Audio play error:', e));
    } else {
      bgmAudio.pause();
      audioPlaying = false;
      updateAudioUI();
    }
  }

  function updateAudioUI() {
    if (audioPlaying) {
      if (iconVolOn) iconVolOn.style.display = 'block';
      if (iconVolOff) iconVolOff.style.display = 'none';
      if (bgmWave) bgmWave.style.display = 'none';
    } else {
      if (iconVolOn) iconVolOn.style.display = 'none';
      if (iconVolOff) iconVolOff.style.display = 'block';
    }
  }

  if (bgmBtn) {
    bgmBtn.addEventListener('click', toggleAudio);
  }

  // Auto play audio on first user touch/click
  const triggerAudioOnce = () => {
    initAudio();
    if (bgmAudio && bgmAudio.paused && !audioPlaying) {
      bgmAudio.play().then(() => {
        audioPlaying = true;
        updateAudioUI();
      }).catch(() => {});
    }
    window.removeEventListener('pointerdown', triggerAudioOnce);
    window.removeEventListener('keydown', triggerAudioOnce);
  };
  window.addEventListener('pointerdown', triggerAudioOnce, { passive: true });
  window.addEventListener('keydown', triggerAudioOnce, { passive: true });

  // Stage Switcher
  function goToStage(stageName, withFlash = false) {
    if (withFlash) {
      if (flashOverlay) flashOverlay.classList.add('flashing');
      setTimeout(() => {
        setStage(stageName);
        setTimeout(() => {
          if (flashOverlay) flashOverlay.classList.remove('flashing');
        }, 150);
      }, 350);
    } else {
      setStage(stageName);
    }
  }

  function setStage(stageName) {
    currentStage = stageName;
    if (appContainer) {
      appContainer.setAttribute('data-sp-stage', stageName);

      // Adjust theme lighting
      if (["surprise", "letter", "bloom", "keepsake", "share"].includes(stageName)) {
        appContainer.setAttribute('data-room', 'lit');
      } else if (["cake", "wish"].includes(stageName)) {
        appContainer.setAttribute('data-room', 'vintage');
      } else {
        appContainer.setAttribute('data-room', 'dark');
      }
    }

    // Toggle decor visibility
    const showDecor = ["surprise", "cake", "share"].includes(stageName);
    if (garlandContainer) garlandContainer.style.opacity = showDecor ? '1' : '0';
    if (balloonsContainer) balloonsContainer.style.opacity = showDecor ? '1' : '0';
    if (petalsContainer) petalsContainer.style.opacity = showDecor ? '1' : '0';

    // Toggle active classes
    Object.keys(stageElements).forEach(s => {
      const el = stageElements[s];
      if (el) {
        if (s === stageName) {
          el.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          el.classList.remove('active');
        }
      }
    });

    // Stage specific triggers
    if (stageName === 'surprise') {
      initSurpriseStage();
    } else if (stageName === 'cake') {
      initCakeStage();
    } else if (stageName === 'wish') {
      initWishStage();
    } else if (stageName === 'letter') {
      initLetterStage();
    } else if (stageName === 'bloom') {
      initBloomStage();
    }
  }

  // ==========================================
  // STAGE 1: DARK (LIGHT SWITCH)
  // ==========================================
  const lightCheckbox = document.getElementById('lightCheckbox');
  const bulbContainer = document.getElementById('bulbContainer');
  const switchMotes = document.getElementById('switchMotes');

  // Spawn motes around switch
  if (switchMotes) {
    const motesData = [
      { x: -75, y: -45, duration: 2.2, delay: 0.1, drift: 8 },
      { x: 80, y: -30, duration: 2.5, delay: 0.4, drift: -10 },
      { x: -85, y: 35, duration: 2.8, delay: 0.7, drift: 6 },
      { x: 75, y: 50, duration: 2.1, delay: 0.2, drift: -8 },
      { x: 0, y: -70, duration: 3.0, delay: 0.5, drift: 5 }
    ];
    motesData.forEach(m => {
      const mote = document.createElement('span');
      mote.className = 'mv-switch-mote pointer-events-none absolute';
      mote.style.cssText = `
        left: calc(50% + ${m.x}px);
        top: calc(50% + ${m.y}px);
        animation-duration: ${m.duration}s;
        animation-delay: ${m.delay}s;
        --mote-drift: ${m.drift}px;
      `;
      switchMotes.appendChild(mote);
    });
  }

  if (lightCheckbox) {
    lightCheckbox.addEventListener('change', () => {
      if (bulbContainer) bulbContainer.setAttribute('data-on', 'true');
      triggerAudioOnce();
      goToStage('surprise', true);
    });
  }

  // ==========================================
  // STAGE 2: SURPRISE
  // ==========================================
  let surpriseInitialized = false;
  const btnSurpriseNext = document.getElementById('btnSurpriseNext');

  function initSurpriseStage() {
    if (surpriseInitialized) return;
    surpriseInitialized = true;

    // Button fades in after 2.6s (same as original timer)
    setTimeout(() => {
      if (btnSurpriseNext) {
        btnSurpriseNext.style.display = 'inline-flex';
        btnSurpriseNext.classList.add('mv-fade-in');
      }
    }, 2400);

    if (btnSurpriseNext) {
      btnSurpriseNext.addEventListener('click', () => {
        goToStage('cake');
      });
    }
  }

  // ==========================================
  // STAGE 3: CAKE (BÁNH KEM & THỔI NẾN)
  // ==========================================
  let cakeStageInitialized = false;
  let blowProgress = 0;
  let isBlowing = false;
  let cakeHoldTimer = null;
  let candlesExtinguished = false;
  let candleData = [];

  function initCakeStage() {
    if (cakeStageInitialized) return;
    cakeStageInitialized = true;

    const cakeMsg = document.getElementById('cakeMsg');
    const cakeHitbox = document.getElementById('cakeHitbox');
    const cakeWrapper = document.getElementById('cakeWrapper');
    const candlesContainer = document.getElementById('candlesContainer');
    const matchContainer = document.getElementById('matchContainer');

    // Parse age to generate digit candles or classic candles
    const ageStr = (cfg.age || "20").trim();
    const isDigits = /^\d{1,2}$/.test(ageStr);
    const digits = isDigits ? ageStr.split('').map(d => parseInt(d, 10)) : [2, 0];

    // Color patterns for candles (gold & rose striped)
    const waxTints = [
      ["#f2dfb0", "#c4a35f"],
      ["#f0bfc5", "#c87a85"],
      ["#c3b8e0", "#7e6fa8"]
    ];

    candlesContainer.innerHTML = '';
    candleData = [];

    // Render candles
    digits.forEach((digit, i) => {
      const tint = waxTints[i % waxTints.length];
      const xPct = (i - (digits.length - 1) / 2) * 17; // -8.5% and +8.5%
      const flameXPct = xPct;
      const patternId = `spWax-${i}`;

      const candleEl = document.createElement('div');
      candleEl.className = 'absolute inset-0 pointer-events-none';
      candleEl.innerHTML = `
        <div class="absolute" style="left:${50 + xPct}%;top:24%;transform:translate(-50%, -100%);animation:spCandleIn 750ms cubic-bezier(.2,.85,.3,1) ${0.55 + 0.16 * i}s both">
          <svg viewBox="0 0 60 88" aria-hidden="true" style="width:56px;height:70px;display:block">
            <defs>
              <pattern id="${patternId}" width="12" height="12" patternTransform="rotate(-32)" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="${tint[0]}" />
                <rect width="6" height="12" fill="${tint[1]}" />
              </pattern>
            </defs>
            <text x="30" y="74" text-anchor="middle" font-size="82" font-weight="700"
              font-family="var(--font-brand), 'Arial Rounded MT Bold', Arial, sans-serif"
              fill="url(#${patternId})" stroke="rgba(61,32,30,0.5)" stroke-width="2" paint-order="stroke" style="letter-spacing:-0.02em">
              ${digit}
            </text>
            <text x="28.4" y="72.6" text-anchor="middle" font-size="82" font-weight="700"
              font-family="var(--font-brand), 'Arial Rounded MT Bold', Arial, sans-serif"
              fill="rgba(255,255,255,0.22)">
              ${digit}
            </text>
          </svg>
        </div>

        <div class="absolute" style="left:${50 + flameXPct}%;top:24%;width:0;height:0">
          <div class="relative" style="margin-top:-68px">
            <!-- Bấc nến -->
            <span class="absolute" style="left:-1px;top:-6px;width:2px;height:7px;background:#4a3a30;border-radius:2px"></span>

            <!-- Ngọn lửa -->
            <span id="flame-${i}" class="candle-flame-item absolute left-1/2" style="display:none;top:-22px;width:0;height:0;transform-origin:50% 100%">
              <span class="sp-flame-inner absolute block" style="left:-7px;top:0;width:14px;height:22px;animation-delay:${0.3 * i}s">
                <svg viewBox="0 0 24 40" class="h-full w-full">
                  <path d="M12 1 C16 11 22 17 22 26 A10 11 0 0 1 2 26 C2 17 8 11 12 1 Z" fill="url(#spFlameGrad)" />
                  <path d="M12 12 C14 18 17 21 17 26 A5 6 0 0 1 7 26 C7 21 10 18 12 12 Z" fill="url(#spFlameCore)" />
                </svg>
              </span>
              <span class="absolute rounded-full" style="left:-20px;top:-10px;width:40px;height:40px;background:radial-gradient(circle, rgba(255,200,130,.5) 0%, rgba(255,170,96,.14) 55%, transparent 75%)"></span>
            </span>

            <!-- Làn khói khi tắt -->
            <span id="smoke-${i}" class="candle-smoke-item absolute left-1/2 top-0" style="display:none;width:0;height:0">
              <span class="sp-smoke absolute rounded-full" style="left:-2px;top:-8px;width:4px;height:4px;background:var(--smoke-puff);filter:blur(1px);--sp-smoke-x:3px"></span>
              <span class="sp-smoke absolute rounded-full" style="left:-2px;top:-8px;width:4px;height:4px;background:var(--smoke-puff);filter:blur(1px);--sp-smoke-x:-4px;animation-delay:0.3s"></span>
              <span class="sp-smoke absolute rounded-full" style="left:-2px;top:-8px;width:4px;height:4px;background:var(--smoke-puff);filter:blur(1px);--sp-smoke-x:7px;animation-delay:0.6s"></span>
            </span>
          </div>
        </div>
      `;
      candlesContainer.appendChild(candleEl);

      candleData.push({
        xPct: 50 + flameXPct,
        flameEl: candleEl.querySelector(`#flame-${i}`),
        smokeEl: candleEl.querySelector(`#smoke-${i}`),
        isLit: false,
        isOut: false
      });
    });

    // Sequence:
    // 1. "giờ tới phần quan trọng nhất 🎂" (at start)
    // 2. "suỵt… nến đang được thắp 🔥" + Que diêm bay vào thắp từng ngọn nến
    setTimeout(() => {
      cakeMsg.textContent = "suỵt… nến đang được thắp 🔥";

      // Matchstick animation
      const match = document.createElement('div');
      match.className = 'absolute z-30 pointer-events-none';
      match.style.cssText = `
        left: 0; top: 0; width: 0; height: 0;
        transition: transform 1.2s cubic-bezier(.25,.8,.25,1), opacity 0.5s ease;
        opacity: 0;
      `;
      match.innerHTML = `
        <div class="relative" style="width:0;height:0">
          <span class="absolute rounded-full" style="left:-30px;top:-30px;width:60px;height:60px;background:radial-gradient(circle, rgba(255,200,130,.55) 0%, rgba(255,170,96,.18) 50%, transparent 72%)"></span>
          <span class="absolute rounded-full" style="left:-8px;top:-8px;width:16px;height:16px;border:2px solid rgba(255,224,160,.95);animation:spMatchStrike 550ms ease-out forwards"></span>
          <span class="absolute block" style="left:0;top:0;width:0;height:0;transform-origin:0px 2px;animation:spMatchFlameIn 500ms ease-out forwards">
            <span class="sp-flame-inner absolute" style="left:-6.5px;top:-18px;width:13px;height:20px">
              <svg viewBox="0 0 24 40" class="h-full w-full">
                <path d="M12 1 C16 11 22 17 22 26 A10 11 0 0 1 2 26 C2 17 8 11 12 1 Z" fill="url(#spFlameGrad)" />
                <path d="M12 12 C14 18 17 21 17 26 A5 6 0 0 1 7 26 C7 21 10 18 12 12 Z" fill="url(#spFlameCore)" />
              </svg>
            </span>
          </span>
          <span class="absolute rounded-full" style="left:-3.5px;top:-3.5px;width:7px;height:7px;background:#a83c22;box-shadow:0 0 8px rgba(255,140,70,.8)"></span>
          <span class="absolute rounded-full" style="left:0;top:-2px;width:78px;height:4px;background:linear-gradient(90deg, #c9a06b, #8f6f45);transform:rotate(38deg);transform-origin:0 50%"></span>
        </div>
      `;
      matchContainer.appendChild(match);

      const cakeRect = cakeWrapper.getBoundingClientRect();
      const w = cakeRect.width || 360;

      // Position 1: Approach Candle 0
      const c0X = (candleData[0].xPct / 100) * w;
      match.style.opacity = '1';
      match.style.transform = `translate(${w + 30}px, 20px)`;

      setTimeout(() => {
        match.style.transform = `translate(${c0X}px, -45px)`;
      }, 200);

      // Light Candle 0
      setTimeout(() => {
        if (candleData[0] && candleData[0].flameEl) {
          candleData[0].flameEl.style.display = 'block';
          candleData[0].isLit = true;
        }
      }, 1200);

      // Move to Candle 1
      setTimeout(() => {
        const c1X = (candleData[1].xPct / 100) * w;
        match.style.transform = `translate(${c1X}px, -45px)`;
      }, 1600);

      // Light Candle 1
      setTimeout(() => {
        if (candleData[1] && candleData[1].flameEl) {
          candleData[1].flameEl.style.display = 'block';
          candleData[1].isLit = true;
        }
      }, 2300);

      // Match flies away
      setTimeout(() => {
        match.style.transform = `translate(${w + 80}px, 40px)`;
        match.style.opacity = '0';
      }, 2900);

      // 3. "nhấn giữ để thổi nến — từ từ thôi"
      setTimeout(() => {
        cakeMsg.textContent = "nhấn giữ để thổi nến — từ từ thôi 🎂";
        if (cakeHitbox) cakeHitbox.style.display = 'block';
        enableBlowing();
      }, 3000);

    }, 1800);

    function enableBlowing() {
      if (cakeHitbox) cakeHitbox.style.display = 'block';

      const updateBlowEffects = (progress) => {
        const blowVal = Math.min(1, Math.max(0, progress));
        cakeWrapper.style.setProperty('--sp-blow', blowVal.toFixed(3));
        cakeWrapper.setAttribute('data-sp-blowing', blowVal > 0.1 ? '1' : '0');

        // Tilt flames based on blow
        candleData.forEach(c => {
          if (c.flameEl) {
            c.flameEl.style.transform = `rotate(${blowVal * -35}deg) scaleY(${1 - blowVal * 0.4}) scaleX(${1 + blowVal * 0.15})`;
          }
        });
      };

      const startBlowing = (e) => {
        if (candlesExtinguished) return;
        if (e.cancelable) e.preventDefault();
        isBlowing = true;

        if (cakeHoldTimer) clearInterval(cakeHoldTimer);
        cakeHoldTimer = setInterval(() => {
          blowProgress += 0.06;
          updateBlowEffects(blowProgress);

          if (blowProgress < 0.5) {
            cakeMsg.textContent = "cố lên… đừng buông tay 🌬️";
          } else if (blowProgress < 0.9) {
            cakeMsg.textContent = "sắp được rồi… thổi mạnh nào! 💨";
          }

          // Extinguish first candle at 50%
          if (blowProgress >= 0.5 && !candleData[0].isOut) {
            candleData[0].isOut = true;
            if (candleData[0].flameEl) candleData[0].flameEl.style.display = 'none';
            if (candleData[0].smokeEl) candleData[0].smokeEl.style.display = 'block';
          }

          // Extinguish second candle at 100%
          if (blowProgress >= 1.0) {
            clearInterval(cakeHoldTimer);
            extinguishAllCandles();
          }
        }, 70);
      };

      const stopBlowing = () => {
        if (candlesExtinguished) return;
        isBlowing = false;
        if (cakeHoldTimer) clearInterval(cakeHoldTimer);
        blowProgress = Math.max(0, blowProgress - 0.25);
        updateBlowEffects(0);

        if (!candleData[0].isOut) {
          cakeMsg.textContent = "nhấn giữ để thổi nến — từ từ thôi 🎂";
        }
      };

      cakeHitbox.addEventListener('pointerdown', startBlowing);
      cakeHitbox.addEventListener('mousedown', startBlowing);
      cakeHitbox.addEventListener('touchstart', startBlowing, { passive: false });
      window.addEventListener('pointerup', stopBlowing);
      window.addEventListener('mouseup', stopBlowing);
      window.addEventListener('touchend', stopBlowing);
      window.addEventListener('pointercancel', stopBlowing);
    }

    function extinguishAllCandles() {
      candlesExtinguished = true;
      cakeWrapper.setAttribute('data-sp-blowing', '0');
      cakeWrapper.style.setProperty('--sp-blow', '0');

      candleData.forEach(c => {
        c.isOut = true;
        if (c.flameEl) c.flameEl.style.display = 'none';
        if (c.smokeEl) c.smokeEl.style.display = 'block';
      });

      cakeMsg.textContent = `đã tắt ${candleData.length}/${candleData.length} ngọn nến 🎉`;

      // Wait 2.3 seconds then auto transition to Stage 4: WISH
      setTimeout(() => {
        goToStage('wish', true);
      }, 2300);
    }
  }

  // ==========================================
  // STAGE 4: WISH (ƯỚC MỘT ĐIỀU ƯỚC)
  // ==========================================
  let wishStageInitialized = false;
  let wishProgress = 0;
  let wishHoldTimer = null;
  let wishCompleted = false;

  function initWishStage() {
    if (wishStageInitialized) return;
    wishStageInitialized = true;

    const wishBtn = document.getElementById('wishBtn');
    const wishRing = document.getElementById('wishRingProgress');
    const wishPrompt = document.getElementById('wishPrompt');
    const wishDoneMsg = document.getElementById('wishDoneMsg');
    const wishStar = document.getElementById('wishStar');
    const wishGlow = document.getElementById('wishGlow');
    const wishHeartsContainer = document.getElementById('wishHeartsContainer');
    const wishBurstContainer = document.getElementById('wishBurstContainer');
    const wishRisingStars = document.getElementById('wishRisingStars');
    const wishTwinkles = document.getElementById('wishTwinkles');
    const btnWishNext = document.getElementById('btnWishNext');
    const wishPadArea = document.getElementById('wishPadArea');

    // Twinkling stars in background
    if (wishTwinkles) {
      for (let i = 0; i < 12; i++) {
        const tw = document.createElement('span');
        tw.className = 'pointer-events-none absolute h-1.5 w-1.5 rounded-full';
        tw.style.cssText = `
          left: ${8 + Math.random() * 84}%;
          top: ${10 + Math.random() * 75}%;
          background: #f2dfb0;
          animation: spWishTwinkle ${2 + Math.random() * 2}s ${Math.random() * 2}s ease-in-out infinite;
        `;
        wishTwinkles.appendChild(tw);
      }
    }

    const circumference = 2 * Math.PI * 44; // 276.46
    wishRing.style.strokeDasharray = circumference;
    wishRing.style.strokeDashoffset = circumference;

    const spawnHeart = () => {
      if (!wishHeartsContainer || wishCompleted) return;
      const angle = Math.floor(Math.random() * 360);
      const heart = document.createElement('span');
      heart.className = 'pointer-events-none absolute left-1/2 top-1/2 leading-none';
      heart.textContent = '♥';
      heart.style.cssText = `
        font-size: ${10 + Math.random() * 6}px;
        color: ${Math.random() > 0.4 ? '#f0bfc5' : '#f2dfb0'};
        margin-left: -6px; margin-top: -6px;
        --sp-wa: ${angle}deg;
        animation: spWishIn 1.5s ease-in forwards;
      `;
      wishHeartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 1600);
    };

    let heartInterval = null;

    const startWishing = (e) => {
      if (wishCompleted) return;
      if (e.cancelable) e.preventDefault();
      wishBtn.style.transform = 'scale(1.08)';
      if (wishGlow) wishGlow.style.opacity = '0.9';
      if (wishStar) wishStar.style.animation = 'spHeartBeat 1s ease-in-out infinite';

      heartInterval = setInterval(spawnHeart, 120);

      wishHoldTimer = setInterval(() => {
        wishProgress += 0.035;
        const offset = Math.max(0, circumference * (1 - wishProgress));
        wishRing.style.strokeDashoffset = offset.toFixed(2);

        if (wishProgress >= 1.0) {
          clearInterval(wishHoldTimer);
          if (heartInterval) clearInterval(heartInterval);
          completeWish();
        }
      }, 70);
    };

    const stopWishing = () => {
      if (wishCompleted) return;
      wishBtn.style.transform = 'scale(1)';
      if (wishGlow) wishGlow.style.opacity = '0.35';
      if (wishStar) wishStar.style.animation = 'none';
      if (wishHoldTimer) clearInterval(wishHoldTimer);
      if (heartInterval) clearInterval(heartInterval);
      wishProgress = 0;
      wishRing.style.strokeDashoffset = circumference;
    };

    wishBtn.addEventListener('pointerdown', startWishing);
    wishBtn.addEventListener('mousedown', startWishing);
    wishBtn.addEventListener('touchstart', startWishing, { passive: false });
    window.addEventListener('pointerup', stopWishing);
    window.addEventListener('mouseup', stopWishing);
    window.addEventListener('touchend', stopWishing);
    window.addEventListener('pointercancel', stopWishing);

    function completeWish() {
      wishCompleted = true;
      try { navigator.vibrate?.([28, 40, 56]); } catch (e) {}

      wishBtn.style.transform = 'scale(1)';
      if (wishStar) wishStar.setAttribute('data-done', 'true');
      if (wishPadArea) wishPadArea.style.opacity = '0.7';

      // 1. Radial Shockwaves Burst
      if (wishBurstContainer) {
        wishBurstContainer.style.display = 'block';
        for (let b = 0; b < 2; b++) {
          const wave = document.createElement('span');
          wave.className = 'pointer-events-none absolute h-28 w-28 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
          wave.style.cssText = `
            border: 2px solid #f2dfb0;
            --sp-burst: ${2.6 + 0.8 * b};
            animation: spWishBurst ${0.9 + 0.35 * b}s ${0.12 * b}s cubic-bezier(.16,.8,.4,1) both;
          `;
          wishBurstContainer.appendChild(wave);
        }

        // Spark particles flying out
        for (let i = 0; i < 18; i++) {
          const angle = (i / 18) * Math.PI * 2;
          const dist = 75 + Math.random() * 60;
          const sx = Math.cos(angle) * dist;
          const sy = Math.sin(angle) * dist - 12;
          const spark = document.createElement('span');
          spark.className = 'pointer-events-none absolute rounded-full left-1/2 top-1/2';
          spark.style.cssText = `
            width: ${4 + Math.random() * 4}px;
            height: ${4 + Math.random() * 4}px;
            background: ${i % 3 === 0 ? '#f0bfc5' : '#f2dfb0'};
            --sp-sx: ${sx.toFixed(1)}px;
            --sp-sy: ${sy.toFixed(1)}px;
            animation: spWishSpark ${1 + Math.random() * 0.4}s cubic-bezier(.16,.8,.4,1) both;
          `;
          wishBurstContainer.appendChild(spark);
        }
      }

      // 2. Rising stars ascending into the sky
      if (wishRisingStars) {
        const glyphs = ["★", "✦", "✧", "⭐"];
        for (let r = 0; r < 32; r++) {
          const star = document.createElement('span');
          star.className = 'pointer-events-none absolute bottom-[6%] leading-none';
          const size = 14 + Math.random() * 18;
          const color = r % 3 === 0 ? '#f0bfc5' : '#f2dfb0';
          const drift = (Math.random() - 0.5) * 140;
          const spin = (Math.random() - 0.5) * 180;
          const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];

          star.textContent = glyph;
          star.style.cssText = `
            left: ${4 + Math.random() * 92}%;
            font-size: ${size}px;
            color: ${color};
            text-shadow: 0 0 ${size * 0.6}px ${color};
            --sp-dx: ${drift.toFixed(0)}px;
            --sp-rot: ${spin.toFixed(0)}deg;
            animation: spWishRise ${2.8 + Math.random() * 2}s ${Math.random() * 2}s cubic-bezier(.33,.7,.4,1) both;
          `;
          wishRisingStars.appendChild(star);
        }
      }

      // 3. Smoothly fade message to completed wish
      wishPrompt.style.opacity = '0';
      wishPrompt.style.transform = 'translateY(-8px)';

      setTimeout(() => {
        wishDoneMsg.style.opacity = '1';
        wishDoneMsg.style.transform = 'scale(1)';
        if (btnWishNext) btnWishNext.style.display = 'inline-flex';
      }, 700);

      // 4. AFTER WISH: Wait 7 seconds then automatically go to Stage 5: LETTER!
      setTimeout(() => {
        if (currentStage === 'wish') {
          goToStage('letter');
        }
      }, 7000);
    }

    if (btnWishNext) {
      btnWishNext.addEventListener('click', () => {
        goToStage('letter');
      });
    }
  }

  // ==========================================
  // STAGE 5: LETTER (BỨC THƯ TÌNH CẢM)
  // ==========================================
  let letterStageInitialized = false;

  function initLetterStage() {
    if (letterStageInitialized) return;
    letterStageInitialized = true;

    const btnRollOpen = document.getElementById('btnRollOpen');
    const letterWrapper = document.getElementById('letterWrapper');
    const letterContent = document.getElementById('letterContent');
    const letterFadeShadow = document.getElementById('letterFadeShadow');
    const letterText = document.getElementById('letterText');
    const letterPhoto = document.getElementById('letterPhoto');
    const letterPhotoWrapper = document.getElementById('letterPhotoWrapper');
    const btnLetterNext = document.getElementById('btnLetterNext');

    if (letterText) letterText.textContent = cfg.letterBody;
    if (letterPhoto && cfg.photos && cfg.photos.length > 0) {
      letterPhoto.src = cfg.photos[0].src;
      letterPhoto.alt = cfg.photos[0].alt || "Ảnh kỷ niệm";
    } else if (letterPhotoWrapper) {
      letterPhotoWrapper.style.display = 'none';
    }

    if (btnRollOpen) {
      btnRollOpen.addEventListener('click', () => {
        btnRollOpen.disabled = true;

        // Measure content height and unroll smoothly
        const contentHeight = letterContent ? Math.max(letterContent.scrollHeight, 280) : 420;
        const targetHeight = Math.min(contentHeight, Math.round(window.innerHeight * 0.72));

        letterWrapper.style.height = `${targetHeight}px`;

        setTimeout(() => {
          btnRollOpen.style.display = 'none';
          if (letterFadeShadow) letterFadeShadow.style.display = 'none';
          letterWrapper.style.overflowY = 'auto';
          if (btnLetterNext) {
            btnLetterNext.style.display = 'inline-flex';
            btnLetterNext.classList.add('mv-fade-in');
          }
        }, 750);
      });
    }

    if (btnLetterNext) {
      btnLetterNext.addEventListener('click', () => {
        if (cfg.photos && cfg.photos.length > 0) {
          goToStage('bloom');
        } else {
          goToStage('keepsake');
        }
      });
    }
  }

  // ==========================================
  // STAGE 6: BLOOM (KỶ NIỆM ẢNH & LIGHTBOX)
  // ==========================================
  let bloomStageInitialized = false;
  const mosaicGrid = document.getElementById('mosaicGrid');
  const btnBloomNext = document.getElementById('btnBloomNext');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentPhotoIndex = 0;

  function initBloomStage() {
    if (bloomStageInitialized) return;
    bloomStageInitialized = true;

    if (!cfg.photos || cfg.photos.length === 0) return;

    mosaicGrid.innerHTML = '';
    cfg.photos.forEach((photo, idx) => {
      const tile = document.createElement('div');
      tile.className = 'relative overflow-hidden rounded-xl cursor-pointer shadow-lg group';
      tile.style.cssText = `
        aspect-ratio: 1;
        animation: spShardIn 0.8s cubic-bezier(.16,.9,.3,1) ${idx * 0.12}s both;
      `;
      tile.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt || ''}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="text-white text-xs px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">Xem lớn 🔍</span>
        </div>
      `;
      tile.addEventListener('click', () => openLightbox(idx));
      mosaicGrid.appendChild(tile);
    });

    setTimeout(() => {
      if (btnBloomNext) {
        btnBloomNext.style.display = 'inline-flex';
        btnBloomNext.classList.add('mv-fade-in');
      }
    }, 1200);

    if (btnBloomNext) {
      btnBloomNext.addEventListener('click', () => {
        goToStage('keepsake');
      });
    }
  }

  function openLightbox(idx) {
    currentPhotoIndex = idx;
    updateLightbox();
    if (lightboxOverlay) lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    if (lightboxOverlay) lightboxOverlay.classList.remove('active');
  }

  function updateLightbox() {
    const photo = cfg.photos[currentPhotoIndex];
    if (!photo) return;
    if (lightboxImg) lightboxImg.src = photo.src;
    if (lightboxCaption) lightboxCaption.textContent = photo.caption || photo.alt || '';
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${cfg.photos.length}`;
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex - 1 + cfg.photos.length) % cfg.photos.length;
      updateLightbox();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex + 1) % cfg.photos.length;
      updateLightbox();
    });
  }

  // ==========================================
  // STAGE 7: KEEPSAKE (CHỨNG NHẬN & ĐIỀU ƯỚC)
  // ==========================================
  const customWishInput = document.getElementById('customWishInput');
  const btnAttachWish = document.getElementById('btnAttachWish');
  const btnKeepsakeNext = document.getElementById('btnKeepsakeNext');
  const shareWishDisplay = document.getElementById('shareWishDisplay');

  if (btnAttachWish) {
    btnAttachWish.addEventListener('click', () => {
      const wishText = customWishInput.value.trim();
      if (!wishText) {
        customWishInput.focus();
        return;
      }
      if (shareWishDisplay) {
        shareWishDisplay.textContent = `"${wishText}"`;
      }
      btnAttachWish.textContent = "Đã lưu điều ước ✨";
      btnAttachWish.disabled = true;
      btnAttachWish.classList.add('opacity-75');
    });
  }

  if (btnKeepsakeNext) {
    btnKeepsakeNext.addEventListener('click', () => {
      const wishText = customWishInput.value.trim();
      if (wishText && shareWishDisplay) {
        shareWishDisplay.textContent = `"${wishText}"`;
      }
      goToStage('share');
    });
  }

  // ==========================================
  // STAGE 8: SHARE & RESTART
  // ==========================================
  const btnRestart = document.getElementById('btnRestart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      // Smooth reset and back to Stage 1 (Dark)
      if (lightCheckbox) lightCheckbox.checked = true;
      if (bulbContainer) bulbContainer.removeAttribute('data-on');

      // Reset state flags
      cakeStageInitialized = false;
      blowProgress = 0;
      isBlowing = false;
      candlesExtinguished = false;

      wishStageInitialized = false;
      wishProgress = 0;
      wishCompleted = false;

      letterStageInitialized = false;
      const letterWrapper = document.getElementById('letterWrapper');
      const btnRollOpen = document.getElementById('btnRollOpen');
      if (letterWrapper) letterWrapper.style.height = '96px';
      if (btnRollOpen) {
        btnRollOpen.style.display = 'block';
        btnRollOpen.disabled = false;
      }

      goToStage('dark', true);
    });
  }

  // Start with stage dark
  setStage('dark');

})();
