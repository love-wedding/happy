/* ── Letter typewriter + experience flow ─────────────────────────────── */
let datatxtletter = (window.LoveGiftConfig && window.LoveGiftConfig.popupMessage) || "Em yêu của anh. Em là một cô gái rất đặc biệt. Anh luôn thầm cảm ơn vì em đã đến trong cuộc đời anh. Hôm nay, anh chúc em mọi điều tốt đẹp nhất, thật nhiều sức khoẻ và niềm vui. Anh luôn mong chúng ta sẽ cùng nhau đón thêm thật nhiều sinh nhật như thế này nữa. Chúc mừng sinh nhật em yêu của anh.💕";
let titleLetter = (window.LoveGiftConfig && window.LoveGiftConfig.titleMessage) || "Happy birthday";
let charArrDateLetter = datatxtletter.split('');
let charArrTitle = titleLetter.split('');
let currentIndexLetter = 0;
let currentIndexTitle = 0;
let text__letter = document.querySelector(".text__letter p");

window.addEventListener('configLoaded', function (e) {
    const cfg = e.detail || {};
    if (cfg.popupMessage) {
        datatxtletter = cfg.popupMessage;
        charArrDateLetter = datatxtletter.split('');
    }
    if (cfg.titleMessage) {
        titleLetter = cfg.titleMessage;
        charArrTitle = titleLetter.split('');
    }
});

document.documentElement.classList.add('intro-active');

function startMainExperience(){
    let intro = document.getElementById('intro__cube');
    let cube = document.getElementById('cube__trigger');
    if(!intro || intro.classList.contains('hidden')) return;

    cube.classList.add('exploding');
    intro.classList.add('exploding-mode');

    setTimeout(function(){
        intro.classList.add('hidden');
        document.documentElement.classList.remove('intro-active');
    }, 1500);

    setTimeout(function(){ intro.remove(); }, 3200);
}
document.getElementById('cube__trigger').addEventListener('click', startMainExperience);

var intervalContent;
var intervalTitle;
$("#btn__letter").on("click", function(){
    $(".box__letter").slideDown();
    setTimeout(function(){
        $(".letter__border").slideDown();
    },1000);
    setTimeout(function(){
        intervalTitle = setInterval(function(){
            if(currentIndexTitle < charArrTitle.length){
                document.querySelector(".happy-bday__big").textContent += charArrTitle[currentIndexTitle];
                currentIndexTitle++;
            }
            else{
                clearInterval(intervalTitle);
            }
        },100);
    },2000);
    setTimeout(function(){
        intervalContent = setInterval(function(){
            if(currentIndexLetter < charArrDateLetter.length){
                text__letter.textContent += charArrDateLetter[currentIndexLetter];
                currentIndexLetter++;
            }
            else{
                clearInterval(intervalContent);
            }
        },50);
    },4000);
});
$(".close").on("click", function(){
    clearInterval(intervalContent);
    clearInterval(intervalTitle);
    endExperience();
});
$(".box__letter").on("click", function(e){
    if(e.target === this){
        clearInterval(intervalContent);
        clearInterval(intervalTitle);
        endExperience();
    }
});

let experienceEnded = false;
function endExperience(){
    if(experienceEnded) return;
    experienceEnded = true;

    const stage = document.getElementById('cake-stage');
    if(stage){
        stage.style.transition = 'opacity 0.9s ease';
        stage.style.opacity = '0';
    }

    $(".box__letter").slideUp();
    $(".letter__border").slideUp();

    document.querySelector(".happy-bday__big").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0;
    currentIndexTitle = 0;

    setTimeout(flyPhotosUp, 200);

    setTimeout(function(){
        if(stage) stage.style.display = 'none';
    }, 1500);
}

function flyPhotosUp(){
    const photos = (window.LoveGiftConfig && window.LoveGiftConfig.images && window.LoveGiftConfig.images.length)
        ? window.LoveGiftConfig.images
        : [
            './birthdaygirl/girl1.jpeg',
            './birthdaygirl/girl2.jpeg',
            './birthdaygirl/girl3.jpeg',
            './birthdaygirl/girl4.jpeg',
            './birthdaygirl/girl5.jpeg',
            './birthdaygirl/girl6.jpeg',
        ];
    const container = document.createElement('div');
    container.className = 'flying-photos-container';
    document.body.appendChild(container);

    function getCakeCenter(){
        const stage = document.getElementById('cake-stage');
        if(stage){
            const r = stage.getBoundingClientRect();
            return {
                x: r.left + r.width * 0.5,
                y: r.top + r.height * 0.5
            };
        }
        return {
            x: (window.innerWidth || 800) * 0.5,
            y: (window.innerHeight || 600) * 0.5
        };
    }

    function createCakeBurst(center){
        const emojis = ['❤️','💕','💖','💗','💝','💘','✨','💫','🌟','🎂','🎀','💞'];
        const burst = document.createElement('div');
        burst.className = 'cake-burst-shell';
        burst.style.left = center.x + 'px';
        burst.style.top = center.y + 'px';
        document.body.appendChild(burst);

        const isSmall = window.innerWidth < 480;
        const count = isSmall ? 28 : 42;
        const distBase = isSmall ? 70 : 110;
        const distRange = isSmall ? 140 : 220;
        for(let i = 0; i < count; i++){
            const p = document.createElement('div');
            p.className = 'burst-particle';
            p.textContent = emojis[i % emojis.length];
            const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
            const dist = distBase + Math.random() * distRange;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            p.style.fontSize = (16 + Math.random() * 24) + 'px';
            p.style.setProperty('--tx', tx.toFixed(0) + 'px');
            p.style.setProperty('--ty', ty.toFixed(0) + 'px');
            p.style.setProperty('--rot', (Math.random() * 720 - 360).toFixed(0) + 'deg');
            p.style.setProperty('--end-scale', (0.1 + Math.random() * 0.4).toFixed(2));
            p.style.setProperty('--duration', (0.8 + Math.random() * 1).toFixed(2) + 's');
            burst.appendChild(p);
        }
        setTimeout(function(){
            if(burst.parentNode) burst.parentNode.removeChild(burst);
        }, 2500);
    }

    const MAX_ACTIVE = 26;
    let activeCount = 0;
    let cakeCenter = getCakeCenter();

    createCakeBurst(cakeCenter);
    setTimeout(function(){ createCakeBurst(cakeCenter); }, 600);

    const resizeHandler = function(){ cakeCenter = getCakeCenter(); };
    window.addEventListener('resize', resizeHandler);

    function spawnOne(){
        if(activeCount >= MAX_ACTIVE) return;
        activeCount++;

        const img = document.createElement('img');
        img.className = 'flying-photo';
        img.src = photos[Math.floor(Math.random() * photos.length)];
        img.alt = '';

        const vwNow = window.innerWidth || 800;
        const isSmall = vwNow < 480;
        const wBase = isSmall ? 50 : 80;
        const wRange = isSmall ? 45 : 70;
        const w = wBase + Math.random() * wRange;
        img.style.width = w + 'px';
        img.style.height = (w * 1.32) + 'px';

        img.style.left = cakeCenter.x + 'px';
        img.style.top = cakeCenter.y + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distBase = isSmall ? 140 : 280;
        const distRange = isSmall ? 140 : 260;
        const distance = distBase + Math.random() * distRange;
        const xFactor = isSmall ? 1.0 : 1.25;
        const yFactor = isSmall ? 0.7 : 0.75;
        const burstX = Math.cos(angle) * distance * xFactor;
        const burstY = Math.sin(angle) * distance * yFactor - 40;

        img.style.setProperty('--burst-x', burstX.toFixed(0) + 'px');
        img.style.setProperty('--burst-y', burstY.toFixed(0) + 'px');

        const spinDir = Math.random() < 0.5 ? 1 : -1;
        const spinAmt = (25 + Math.random() * 30) * spinDir;
        img.style.setProperty('--spin', spinAmt.toFixed(0) + 'deg');

        const dur = 14 + Math.random() * 5;
        img.style.setProperty('--dur', dur + 's');

        container.appendChild(img);

        setTimeout(function(){
            if(img.parentNode) img.parentNode.removeChild(img);
            activeCount = Math.max(0, activeCount - 1);
        }, (dur + 0.4) * 1000);
    }

    for(let i = 0; i < 6; i++){
        setTimeout(spawnOne, i * 180);
    }

    const spawnTick = function(){
        spawnOne();
        const next = 850 + Math.random() * 450;
        window.__flyTimer = setTimeout(spawnTick, next);
    };
    window.__flyTimer = setTimeout(spawnTick, 1500);
}

window.addEventListener("memory:cake-cuts-complete", function () {
    setTimeout(function () {
        $("#btn__letter").trigger("click");
    }, 800);
});
