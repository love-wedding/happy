/**
 * Standalone Birthday Experience
 * Converted to pure vanilla JavaScript for offline / file:// double-click compatibility.
 */
(function () {
  'use strict';

  // --- RAW LOCALES DICTIONARY ---
  const RAW_CONTENTS = {"vi":{"senderName":"Tớ","receiverName":"Cậu","opening":{"greeting":"Happy Birthday","day":17,"month":7},"intro":{"line1":"Có một món quà nhỏ dành cho cậu…","line2":"Nhưng trước khi mở, thổi nến trước nhé 🎂","idleHint":"👆 Nhấn & giữ ngọn nến cho đến khi tắt","holdingHint":"giữ nữa… giữ tiếp…","lightingHint":"đang thắp nến cho cậu…"},"beats":["Ngọn nến đã tắt…","nhưng cậu không đi qua năm nay một mình đâu.","Từ từ thôi nhé, Cậu. Tớ ở đây mà."],"blackoutCaption":"đang thu gom những kỷ niệm…","wish":{"kicker":"Một điều ước","question":"Bây giờ… chọn một điều ước cho ngày sinh nhật của cậu.","options":["Hạnh phúc hơn","Trúng Vietlott","Khỏe mạnh hơn","Bình yên hơn"],"reply":"Điều ước đã được nhận. Mong nó từ từ thành hiện thực."},"heart":{"caption":"Tất cả những kỷ niệm nhỏ này là dành cho cậu.","title":"Chúc Mừng Sinh Nhật, Cậu.","subtitle":"Hôm nay cậu nhất định phải được ăn mừng.","next":"Có một lá thư dành cho cậu →"},"letter":{"kicker":"Lá thư nhỏ","body":"Tớ không giỏi nói mấy lời hoa mỹ, nên viết đơn giản thôi: chúc mừng sinh nhật cậu nhé.\n\nNăm vừa rồi chắc chẳng dễ dàng gì, vậy mà cậu vẫn đi tới được hôm nay — giỏi hơn cậu nghĩ nhiều đấy.\n\nTớ chỉ mong cậu ăn ngon ngủ đủ, bớt lo một chút, và nhớ là luôn có người ở đây khi cậu cần.","signature":"— Tớ","next":"Vẫn còn nữa →"},"final":{"kicker":"Dành cho cậu","title":"Chúc Mừng Sinh Nhật, Cậu","from":"từ Tớ","message":"Mong điều ước cậu chọn lúc nãy thật sự tìm được đường đến với cậu trong năm nay.","starButton":"Gửi điều ước lên trời ✨","repeatButton":"Bắt đầu lại từ đầu"},"starlight":{"kicker":"Gửi lên trời","title":"Biến điều ước thành sao băng","subtitle":"Chạm vào ngôi sao để gửi điều ước của cậu lên trời đêm.","wishFallback":"Điều ước của cậu","sentTitle":"Điều ước đã được gửi đi ✨","sentMessage":"Người ta nói điều ước theo sao băng sớm muộn cũng thành hiện thực. Từ đêm nay, sẽ luôn có một ngôi sao giữ lời ước ấy giúp cậu.","tapHint":"Chạm vào bầu trời để thả thêm sao băng nhé ✧","backButton":"Quay lại thiệp","repeatButton":"Bắt đầu lại từ đầu"},"ui":{"months":["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],"monthLabel":"Tháng {month}","heartTapHint":"Chạm vào trái tim để xem ảnh ♡","viewPhoto":"Xem ảnh","tapToClose":"Chạm để đóng","languageLabel":"Ngôn ngữ"}},"en":{"senderName":"me","receiverName":"you","opening":{"greeting":"Happy Birthday","day":17,"month":7},"intro":{"line1":"There's a little gift here for you…","line2":"But before you open it, blow out the candle first 🎂","idleHint":"👆 Press & hold the flame until it goes out","holdingHint":"keep holding… almost there…","lightingHint":"lighting the candle for you…"},"beats":["The candle has gone out…","but you're not walking through this year alone.","Take it slow{,receiver}. I'm right here."],"blackoutCaption":"gathering up the little memories…","wish":{"kicker":"One wish","question":"Now… pick one wish for your birthday.","options":["Happier","Win the lottery","Healthier","More peace"],"reply":"Your wish has been received. May it slowly come true."},"heart":{"caption":"All these little memories are for you.","title":"Happy Birthday{,receiver}.","subtitle":"Today, you deserve to be celebrated.","next":"There's a letter for you →"},"letter":{"kicker":"A little letter","body":"I'm not good with fancy words, so I'll keep it simple: happy birthday.\n\nThis past year can't have been easy, and yet here you are — you're stronger than you think.\n\nAll I wish is that you eat well, sleep enough, worry a little less, and remember that someone is always here when you need them.","signature":"— {sender}","next":"There's more →"},"final":{"kicker":"For you","title":"Happy Birthday{,receiver}","from":"from {sender}","message":"May the wish you just picked really find its way to you this year.","starButton":"Send the wish to the sky ✨","repeatButton":"Start over from the beginning"},"starlight":{"kicker":"Up to the sky","title":"Turn the wish into a shooting star","subtitle":"Touch the star to send your wish up into the night sky.","wishFallback":"Your wish","sentTitle":"The wish has been sent ✨","sentMessage":"They say a wish that rides a shooting star comes true sooner or later. From tonight on, there will always be a star up there keeping that wish for you.","tapHint":"Touch the sky to let more shooting stars fall ✧","backButton":"Back to the card","repeatButton":"Start over from the beginning"},"ui":{"months":["January","February","March","April","May","June","July","August","September","October","November","December"],"monthLabel":"{monthName}","heartTapHint":"Touch the heart to see the photos ♡","viewPhoto":"View photo","tapToClose":"Tap to close","languageLabel":"Language"}},"ko":{"senderName":"나","receiverName":"너","opening":{"greeting":"생일 축하해","day":17,"month":7},"intro":{"line1":"너에게 줄 작은 선물이 있어…","line2":"하지만 열기 전에, 먼저 촛불을 불어서 꺼줘 🎂","idleHint":"👆 촛불을 꺼질 때까지 길게 눌러줘","holdingHint":"조금만 더… 계속 눌러…","lightingHint":"너를 위해 초에 불을 붙이는 중이야…"},"beats":["촛불이 꺼졌어…","그래도 올해를 너 혼자 걷는 건 아니야.","천천히 가도 돼{,receiver}. 나 여기 있잖아."],"blackoutCaption":"작은 추억들을 모으는 중이야…","wish":{"kicker":"하나의 소원","question":"이제… 네 생일 소원을 하나 골라봐.","options":["더 행복해지기","복권 당첨","더 건강해지기","더 평온해지기"],"reply":"소원이 접수됐어. 천천히 이루어지길."},"heart":{"caption":"이 작은 추억들은 전부 너를 위한 거야.","title":"생일 축하해{,receiver}.","subtitle":"오늘은 네가 꼭 축하받아야 해.","next":"너에게 온 편지가 있어 →"},"letter":{"kicker":"짧은 편지","body":"나는 화려한 말은 잘 못 해서, 그냥 간단히 말할게: 생일 축하해.\n\n지난 한 해가 쉽지 않았을 텐데, 그래도 여기까지 왔네 — 너는 네 생각보다 훨씬 강해.\n\n그저 잘 먹고 푹 자고, 걱정은 조금 덜고, 네가 필요할 때 늘 곁에 있는 사람이 있다는 걸 기억해줘.","signature":"— {sender}","next":"아직 더 있어 →"},"final":{"kicker":"너에게","title":"생일 축하해{,receiver}","from":"{sender}가","message":"방금 고른 그 소원이 올해 정말 너에게 닿기를.","starButton":"소원을 하늘로 보내기 ✨","repeatButton":"처음부터 다시 시작"},"starlight":{"kicker":"하늘로","title":"소원을 별똥별로 만들기","subtitle":"별을 터치해서 네 소원을 밤하늘로 보내줘.","wishFallback":"너의 소원","sentTitle":"소원을 보냈어 ✨","sentMessage":"별똥별을 따라 보낸 소원은 언젠가 이뤄진다고들 해. 오늘 밤부터, 그 소원을 대신 지켜주는 별 하나가 늘 저 위에 있을 거야.","tapHint":"하늘을 터치하면 별똥별이 더 떨어져 ✧","backButton":"카드로 돌아가기","repeatButton":"처음부터 다시 시작"},"ui":{"months":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],"monthLabel":"{month}월","heartTapHint":"하트를 터치해서 사진을 봐 ♡","viewPhoto":"사진 보기","tapToClose":"터치하면 닫혀","languageLabel":"언어"}},"ja":{"senderName":"わたし","receiverName":"あなた","opening":{"greeting":"お誕生日おめでとう","day":17,"month":7},"intro":{"line1":"あなたに小さな贈り物があるの…","line2":"でも開ける前に、まずはろうそくを吹き消してね 🎂","idleHint":"👆 消えるまで炎を長押ししてね","holdingHint":"もう少し…そのまま押していて…","lightingHint":"あなたのためにろうそくを灯しているよ…"},"beats":["ろうそくが消えた…","でも今年をあなたひとりで歩くわけじゃないよ。","ゆっくりでいいからね{,receiver}。わたしはここにいるよ。"],"blackoutCaption":"小さな思い出を集めているよ…","wish":{"kicker":"ひとつの願いごと","question":"さあ…あなたの誕生日の願いをひとつ選んで。","options":["もっと幸せに","宝くじ当選","もっと健康に","もっと穏やかに"],"reply":"願いごとを受け取ったよ。少しずつ叶いますように。"},"heart":{"caption":"この小さな思い出は全部あなたのためのもの。","title":"お誕生日おめでとう{,receiver}。","subtitle":"今日はあなたが主役、ちゃんとお祝いされてね。","next":"あなたへの手紙があるよ →"},"letter":{"kicker":"小さな手紙","body":"きれいな言葉は得意じゃないから、シンプルに言うね：お誕生日おめでとう。\n\nこの一年は簡単じゃなかったはず、それでもここまで来たね — あなたは自分で思うよりずっと強いよ。\n\nちゃんと食べて、しっかり眠って、心配は少しだけ減らして、必要なときにはいつもそばにいる人がいるって覚えていてね。","signature":"— {sender}","next":"まだ続きがあるよ →"},"final":{"kicker":"あなたへ","title":"お誕生日おめでとう{,receiver}","from":"{sender}より","message":"さっき選んだ願いが、今年ほんとうにあなたのもとへ届きますように。","starButton":"願いを空へ送る ✨","repeatButton":"最初からやり直す"},"starlight":{"kicker":"空へ","title":"願いを流れ星に変えて","subtitle":"星に触れて、あなたの願いを夜空へ送ってね。","wishFallback":"あなたの願い","sentTitle":"願いを送ったよ ✨","sentMessage":"流れ星に乗せた願いは、いつかきっと叶うって言うよね。今夜からは、その願いをあなたの代わりに守ってくれる星が、いつも空にあるよ。","tapHint":"空に触れると、流れ星がもっと降ってくるよ ✧","backButton":"カードに戻る","repeatButton":"最初からやり直す"},"ui":{"months":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"monthLabel":"{month}月","heartTapHint":"ハートに触れて写真を見てね ♡","viewPhoto":"写真を見る","tapToClose":"タップで閉じる","languageLabel":"言語"}},"zh":{"senderName":"我","receiverName":"你","opening":{"greeting":"生日快乐","day":17,"month":7},"intro":{"line1":"这里有一份小礼物要送给你…","line2":"不过在打开之前，先把蜡烛吹灭吧 🎂","idleHint":"👆 按住火苗，直到它熄灭","holdingHint":"再坚持一下…继续按着…","lightingHint":"正在为你点上蜡烛…"},"beats":["蜡烛熄灭了…","但今年这段路，你不是一个人走。","慢慢来就好{,receiver}。我一直都在。"],"blackoutCaption":"正在把那些小小的回忆收集起来…","wish":{"kicker":"一个愿望","question":"现在…为你的生日许下一个愿望吧。","options":["更幸福","中大奖","更健康","更平静"],"reply":"愿望已经收到了。愿它慢慢成真。"},"heart":{"caption":"这些小小的回忆，全都是为你而留的。","title":"生日快乐{,receiver}。","subtitle":"今天，你一定要好好被庆祝。","next":"有一封信要给你 →"},"letter":{"kicker":"一封小信","body":"我不太会说漂亮话，所以就简单点说：生日快乐。\n\n过去这一年一定不容易，可你还是走到了今天 —— 你比自己以为的要坚强得多。\n\n我只希望你吃得好、睡得够，少操点心，也记得在你需要的时候，总有一个人在这里。","signature":"— {sender}","next":"还有呢 →"},"final":{"kicker":"给你","title":"生日快乐{,receiver}","from":"来自{sender}","message":"愿你刚才许下的那个愿望，今年真的能找到通往你的路。","starButton":"把愿望送上天空 ✨","repeatButton":"从头再来一次"},"starlight":{"kicker":"送上天空","title":"把愿望变成流星","subtitle":"轻触星星，把你的愿望送上夜空。","wishFallback":"你的愿望","sentTitle":"愿望已经送出去了 ✨","sentMessage":"人们说，随流星许下的愿望迟早都会实现。从今夜起，天上会一直有一颗星，替你守着那个愿望。","tapHint":"轻触夜空，让更多流星落下来吧 ✧","backButton":"回到贺卡","repeatButton":"从头再来一次"},"ui":{"months":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"monthLabel":"{month}月","heartTapHint":"轻触爱心查看照片 ♡","viewPhoto":"查看照片","tapToClose":"轻触关闭","languageLabel":"语言"}},"th":{"senderName":"ฉัน","receiverName":"เธอ","opening":{"greeting":"สุขสันต์วันเกิด","day":17,"month":7},"intro":{"line1":"มีของขวัญชิ้นเล็ก ๆ สำหรับเธออยู่ตรงนี้…","line2":"แต่ก่อนจะเปิด เป่าเทียนให้ดับก่อนนะ 🎂","idleHint":"👆 กดค้างที่เปลวเทียนจนกว่ามันจะดับ","holdingHint":"กดต่ออีกนิด… ใกล้แล้ว…","lightingHint":"กำลังจุดเทียนให้เธออยู่…"},"beats":["เทียนดับลงแล้ว…","แต่ปีนี้เธอไม่ได้เดินผ่านมันเพียงลำพังนะ","ค่อย ๆ ไปก็ได้{,receiver} ฉันอยู่ตรงนี้เอง"],"blackoutCaption":"กำลังเก็บรวบรวมความทรงจำเล็ก ๆ เหล่านั้น…","wish":{"kicker":"คำอธิษฐานหนึ่งข้อ","question":"ตอนนี้… เลือกคำอธิษฐานสักข้อสำหรับวันเกิดของเธอสิ","options":["มีความสุขมากขึ้น","ถูกลอตเตอรี่","สุขภาพดีขึ้น","สงบใจมากขึ้น"],"reply":"รับคำอธิษฐานไว้แล้วนะ ขอให้มันค่อย ๆ เป็นจริง"},"heart":{"caption":"ความทรงจำเล็ก ๆ ทั้งหมดนี้เพื่อเธอนะ","title":"สุขสันต์วันเกิด{,receiver}","subtitle":"วันนี้เธอต้องได้รับการฉลองนะ","next":"มีจดหมายถึงเธอด้วย →"},"letter":{"kicker":"จดหมายสั้น ๆ","body":"ฉันไม่เก่งเรื่องคำพูดสวยหรู เลยขอพูดง่าย ๆ ว่า สุขสันต์วันเกิดนะ\n\nปีที่ผ่านมาคงไม่ง่ายเลย แต่เธอก็มาถึงวันนี้ได้ — เธอเข้มแข็งกว่าที่ตัวเองคิดมากเลยนะ\n\nฉันแค่อยากให้เธอกินอิ่ม นอนหลับพอ กังวลให้น้อยลงสักนิด และจำไว้ว่ามีคนอยู่ตรงนี้เสมอเมื่อเธอต้องการ","signature":"— {sender}","next":"ยังมีอีกนะ →"},"final":{"kicker":"เพื่อเธอ","title":"สุขสันต์วันเกิด{,receiver}","from":"จาก {sender}","message":"ขอให้คำอธิษฐานที่เธอเพิ่งเลือก หาทางมาถึงเธอได้จริง ๆ ในปีนี้","starButton":"ส่งคำอธิษฐานขึ้นฟ้า ✨","repeatButton":"เริ่มใหม่ตั้งแต่ต้น"},"starlight":{"kicker":"ขึ้นสู่ท้องฟ้า","title":"เปลี่ยนคำอธิษฐานให้เป็นดาวตก","subtitle":"แตะที่ดวงดาวเพื่อส่งคำอธิษฐานของเธอขึ้นสู่ท้องฟ้ายามค่ำคืน","wishFallback":"คำอธิษฐานของเธอ","sentTitle":"ส่งคำอธิษฐานไปแล้ว ✨","sentMessage":"เขาว่ากันว่าคำอธิษฐานที่ล่องไปกับดาวตก ไม่ช้าก็เร็วจะเป็นจริง ตั้งแต่คืนนี้ไป จะมีดาวดวงหนึ่งบนฟ้าคอยเก็บรักษาคำอธิษฐานนั้นไว้ให้เธอเสมอ","tapHint":"แตะที่ท้องฟ้าเพื่อปล่อยดาวตกเพิ่มอีกสิ ✧","backButton":"กลับไปที่การ์ด","repeatButton":"เริ่มใหม่ตั้งแต่ต้น"},"ui":{"months":["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],"monthLabel":"{monthName}","heartTapHint":"แตะที่หัวใจเพื่อดูรูปภาพ ♡","viewPhoto":"ดูรูปภาพ","tapToClose":"แตะเพื่อปิด","languageLabel":"ภาษา"}},"de":{"senderName":"ich","receiverName":"dich","opening":{"greeting":"Alles Gute zum Geburtstag","day":17,"month":7},"intro":{"line1":"Hier ist ein kleines Geschenk für dich…","line2":"Aber bevor du es öffnest, blas zuerst die Kerze aus 🎂","idleHint":"👆 Halte die Flamme gedrückt, bis sie erlischt","holdingHint":"halt noch durch… gleich geschafft…","lightingHint":"ich zünde die Kerze für dich an…"},"beats":["Die Kerze ist erloschen…","aber du gehst dieses Jahr nicht allein hindurch.","Lass dir Zeit{,receiver}. Ich bin ja hier."],"blackoutCaption":"sammle gerade die kleinen Erinnerungen ein…","wish":{"kicker":"Ein Wunsch","question":"Jetzt… such dir einen Wunsch zu deinem Geburtstag aus.","options":["Mehr Glück","Im Lotto gewinnen","Mehr Gesundheit","Mehr Ruhe"],"reply":"Dein Wunsch ist angekommen. Möge er langsam wahr werden."},"heart":{"caption":"All diese kleinen Erinnerungen sind für dich.","title":"Alles Gute zum Geburtstag{,receiver}.","subtitle":"Heute sollst du gefeiert werden.","next":"Es gibt einen Brief für dich →"},"letter":{"kicker":"Ein kleiner Brief","body":"Ich bin nicht gut in schönen Worten, also sag ich es einfach: alles Gute zum Geburtstag.\n\nDieses Jahr war bestimmt nicht leicht, und trotzdem bist du bis hierher gekommen — du bist stärker, als du denkst.\n\nIch wünsche mir nur, dass du gut isst, genug schläfst, dir etwas weniger Sorgen machst und daran denkst, dass immer jemand da ist, wenn du ihn brauchst.","signature":"— {sender}","next":"Es gibt noch mehr →"},"final":{"kicker":"Für dich","title":"Alles Gute zum Geburtstag{,receiver}","from":"von {sender}","message":"Möge der Wunsch, den du gerade gewählt hast, dieses Jahr wirklich seinen Weg zu dir finden.","starButton":"Den Wunsch zum Himmel schicken ✨","repeatButton":"Von vorne beginnen"},"starlight":{"kicker":"Hinauf zum Himmel","title":"Verwandle den Wunsch in eine Sternschnuppe","subtitle":"Berühre den Stern, um deinen Wunsch in den Nachthimmel zu schicken.","wishFallback":"Dein Wunsch","sentTitle":"Der Wunsch ist abgeschickt ✨","sentMessage":"Man sagt, ein Wunsch, der auf einer Sternschnuppe reist, geht früher oder später in Erfüllung. Von heute Nacht an wird immer ein Stern dort oben sein, der diesen Wunsch für dich bewahrt.","tapHint":"Berühre den Himmel, um weitere Sternschnuppen fallen zu lassen ✧","backButton":"Zurück zur Karte","repeatButton":"Von vorne beginnen"},"ui":{"months":["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],"monthLabel":"{monthName}","heartTapHint":"Berühre das Herz, um die Fotos zu sehen ♡","viewPhoto":"Foto ansehen","tapToClose":"Zum Schließen tippen","languageLabel":"Sprache"}},"fr":{"senderName":"moi","receiverName":"toi","opening":{"greeting":"Joyeux anniversaire","day":17,"month":7},"intro":{"line1":"Il y a un petit cadeau pour toi ici…","line2":"Mais avant de l'ouvrir, souffle d'abord la bougie 🎂","idleHint":"👆 Appuie et garde le doigt sur la flamme jusqu'à ce qu'elle s'éteigne","holdingHint":"continue… encore un peu…","lightingHint":"j'allume la bougie pour toi…"},"beats":["La bougie s'est éteinte…","mais tu ne traverses pas cette année tout seul.","Prends ton temps{,receiver}. Je suis là."],"blackoutCaption":"je rassemble ces petits souvenirs…","wish":{"kicker":"Un vœu","question":"Maintenant… choisis un vœu pour ton anniversaire.","options":["Plus de bonheur","Gagner au loto","Plus de santé","Plus de sérénité"],"reply":"Ton vœu est bien reçu. Qu'il se réalise peu à peu."},"heart":{"caption":"Tous ces petits souvenirs sont pour toi.","title":"Joyeux anniversaire{,receiver}.","subtitle":"Aujourd'hui, tu mérites d'être fêté.","next":"Il y a une lettre pour toi →"},"letter":{"kicker":"Une petite lettre","body":"Je ne suis pas doué pour les belles phrases, alors je fais simple : joyeux anniversaire.\n\nCette année n'a sûrement pas été facile, et pourtant te voilà arrivé jusqu'ici — tu es plus fort que tu ne le crois.\n\nJe souhaite juste que tu manges bien, que tu dormes assez, que tu t'inquiètes un peu moins, et que tu te souviennes qu'il y a toujours quelqu'un ici quand tu en as besoin.","signature":"— {sender}","next":"Ce n'est pas fini →"},"final":{"kicker":"Pour toi","title":"Joyeux anniversaire{,receiver}","from":"de {sender}","message":"Que le vœu que tu viens de choisir trouve vraiment le chemin jusqu'à toi cette année.","starButton":"Envoyer le vœu vers le ciel ✨","repeatButton":"Tout recommencer depuis le début"},"starlight":{"kicker":"Vers le ciel","title":"Transforme le vœu en étoile filante","subtitle":"Touche l'étoile pour envoyer ton vœu dans le ciel nocturne.","wishFallback":"Ton vœu","sentTitle":"Le vœu a été envoyé ✨","sentMessage":"On dit qu'un vœu porté par une étoile filante finit toujours par se réaliser. À partir de cette nuit, il y aura toujours une étoile là-haut qui gardera ce vœu pour toi.","tapHint":"Touche le ciel pour faire tomber d'autres étoiles filantes ✧","backButton":"Revenir à la carte","repeatButton":"Tout recommencer depuis le début"},"ui":{"months":["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],"monthLabel":"{monthName}","heartTapHint":"Touche le cœur pour voir les photos ♡","viewPhoto":"Voir la photo","tapToClose":"Touche pour fermer","languageLabel":"Langue"}},"es":{"senderName":"yo","receiverName":"ti","opening":{"greeting":"Feliz cumpleaños","day":17,"month":7},"intro":{"line1":"Aquí hay un pequeño regalo para ti…","line2":"Pero antes de abrirlo, sopla primero la vela 🎂","idleHint":"👆 Mantén pulsada la llama hasta que se apague","holdingHint":"aguanta un poco más… ya casi…","lightingHint":"estoy encendiendo la vela para ti…"},"beats":["La vela se ha apagado…","pero no vas a atravesar este año tú solo.","Ve con calma{,receiver}. Estoy aquí."],"blackoutCaption":"reuniendo esos pequeños recuerdos…","wish":{"kicker":"Un deseo","question":"Ahora… elige un deseo para tu cumpleaños.","options":["Más felicidad","Ganar la lotería","Más salud","Más paz"],"reply":"Tu deseo ha sido recibido. Que se cumpla poco a poco."},"heart":{"caption":"Todos estos pequeños recuerdos son para ti.","title":"Feliz cumpleaños{,receiver}.","subtitle":"Hoy mereces que te celebren.","next":"Hay una carta para ti →"},"letter":{"kicker":"Una pequeña carta","body":"No se me dan bien las palabras bonitas, así que lo diré sencillo: feliz cumpleaños.\n\nEste último año no debe de haber sido fácil, y aun así aquí estás — eres más fuerte de lo que crees.\n\nSolo deseo que comas bien, duermas lo suficiente, te preocupes un poco menos y recuerdes que siempre hay alguien aquí cuando lo necesites.","signature":"— {sender}","next":"Todavía hay más →"},"final":{"kicker":"Para ti","title":"Feliz cumpleaños{,receiver}","from":"de {sender}","message":"Que el deseo que acabas de elegir encuentre de verdad el camino hacia ti este año.","starButton":"Enviar el deseo al cielo ✨","repeatButton":"Empezar de nuevo desde el principio"},"starlight":{"kicker":"Hacia el cielo","title":"Convierte el deseo en una estrella fugaz","subtitle":"Toca la estrella para enviar tu deseo al cielo nocturno.","wishFallback":"Tu deseo","sentTitle":"El deseo ha sido enviado ✨","sentMessage":"Dicen que un deseo que viaja en una estrella fugaz tarde o temprano se cumple. Desde esta noche, siempre habrá una estrella allá arriba guardando ese deseo por ti.","tapHint":"Toca el cielo para dejar caer más estrellas fugaces ✧","backButton":"Volver a la tarjeta","repeatButton":"Empezar de nuevo desde el principio"},"ui":{"months":["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],"monthLabel":"{monthName}","heartTapHint":"Toca el corazón para ver las fotos ♡","viewPhoto":"Ver foto","tapToClose":"Toca para cerrar","languageLabel":"Idioma"}}};

  const LOCALES = [
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ko", label: "한국어", flag: "🇰🇷" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "th", label: "ไทย", flag: "🇹🇭" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" }
  ];

  const IMAGES = {
    garland: "images/lovegift-candle/decor/garland-bunting-01.webp",
    cake: "images/lovegift-candle/props/cake-new.webp",
    wishTag: "images/lovegift-candle/decor/wish-tag-01.webp",
    heartConfetti: "images/proposal-certificate/particles/heart-petal-confetti-01.webp",
    sparkle: "images/proposal-certificate/particles/sparkle-confetti-01.webp",
    paper: "images/proposal-certificate/paper/paper-letter-tall-01.webp",
    letterPhoto: "images/girl/girl4.jpeg",
    girls: [
      "images/girl/girl1.jpeg",
      "images/girl/girl2.jpeg",
      "images/girl/girl3.jpeg",
      "images/girl/girl4.jpeg"
    ],
    petals: [
      "images/secret-bouquet/intro/petal-cream-broad-01.webp",
      "images/secret-bouquet/intro/petal-cream-long-01.webp",
      "images/secret-bouquet/intro/petal-blush-broad-01.webp",
      "images/secret-bouquet/intro/petal-peach-broad-01.webp",
      "images/secret-bouquet/intro/petal-peach-long-01.webp",
      "images/secret-bouquet/intro/petal-peach-long-02.webp",
      "images/secret-bouquet/intro/petal-cream-heart-01.webp"
    ]
  };

  const ef = [
    [0,1,1,0,0,0,0,0,1,1,0],
    [1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0]
  ];

  function eb(e) {
    let t = 43758.5453 * Math.sin(e);
    return t - Math.floor(t);
  }

  const ex = Array.from({length: 12}, (e, t) => {
    let r = t / 12 * Math.PI * 2 + 0.5 * eb(t);
    let a = 70 + 70 * eb(3.1 * t);
    return {
      sx: `${Math.cos(r) * a}px`,
      sy: `${Math.sin(r) * a}px`,
      delay: `${1.62 + 0.18 * eb(7.7 * t)}s`
    };
  });

  const eq = Array.from({length: 36}, (e, t) => ({
    left: (53 * t + 17) % 100,
    top: (37 * t + 11) % 82,
    size: 2 + (13 * t) % 3,
    delay: (t % 7) * 0.4,
    duration: 2 + (11 * t % 5) * 0.35
  }));

  const ej = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // --- URL PARAMETERS ---
  function getUrlParams() {
    let search = window.location.search ? window.location.search.slice(1) : '';
    let hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (hash.includes('?')) hash = hash.split('?')[1];

    const sp = new URLSearchParams(search);
    const hp = new URLSearchParams(hash);
    function get(k) { return sp.get(k) || hp.get(k); }

    const receiverName = get('name') || get('u') || get('receiver') || get('receiverName') || get('guest') || null;
    const senderName = get('sender') || get('from') || get('senderName') || null;
    const dateStr = get('date') || get('dob') || get('birthday') || get('startDate') || null;
    const dayParam = get('day');
    const monthParam = get('month');
    const lang = get('lang') || get('language') || get('locale') || null;

    let day = 17, month = 7;
    if (dayParam && monthParam) {
      const d = parseInt(dayParam, 10);
      const m = parseInt(monthParam, 10);
      if (!isNaN(d) && !isNaN(m)) { day = d; month = m; }
    } else if (dateStr) {
      const t = dateStr.trim();
      let m = t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
      if (m) {
        day = Number(m[3]);
        month = Number(m[2]);
      } else if (m = t.match(/^(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{2,4}))?$/)) {
        day = Number(m[1]);
        month = Number(m[2]);
      }
    }

    return { receiverName, senderName, day, month, lang };
  }

  const PARAMS = getUrlParams();

  function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function replacePlaceholders(text, locale) {
    if (typeof text !== 'string') return text;
    let res = text;
    const rec = PARAMS.receiverName;
    const sen = PARAMS.senderName;
    if (locale === 'vi') {
      if (rec) {
        res = res.replace(/\bCậu\b/g, capitalize(rec));
        res = res.replace(/\bcậu\b/g, rec);
      }
      if (sen) {
        res = res.replace(/\bTớ\b/g, capitalize(sen));
        res = res.replace(/\btớ\b/g, sen);
      }
    } else {
      if (rec) {
        res = res.replace(/\{,receiver\}/g, `, ${capitalize(rec)}`);
        res = res.replace(/\{receiver\}/g, capitalize(rec));
      } else {
        res = res.replace(/\{,receiver\}/g, '');
        res = res.replace(/\{receiver\}/g, '');
      }
      if (sen) {
        res = res.replace(/\{sender\}/g, capitalize(sen));
      }
    }
    return res;
  }

  function deepReplace(obj, locale) {
    if (typeof obj === 'string') return replacePlaceholders(obj, locale);
    if (Array.isArray(obj)) return obj.map(i => deepReplace(i, locale));
    if (obj && typeof obj === 'object') {
      const copy = {};
      for (const k in obj) copy[k] = deepReplace(obj[k], locale);
      return copy;
    }
    return obj;
  }

  // --- STATE ---
  let state = {
    locale: PARAMS.lang && RAW_CONTENTS[PARAMS.lang] ? PARAMS.lang : 'vi',
    stage: 'opening', // opening | intro | beats | blackout | wish | heart | letter | final | starlight
    selectedWishIndex: null,
    candleLit: false,
    candleProgress: 0,
    candleHolding: false,
    candleExtinguished: false,
    beatsIndex: 0,
    beatsVisible: true,
    lightboxOpen: false,
    lightboxPhotoIndex: 0,
    letterTypedChars: 0,
    letterDone: false,
    starLaunched: false,
    starBurst: null,
    langMenuOpen: false,
    meteors: [],
    meteorId: 0
  };

  function getActiveContent() {
    const raw = RAW_CONTENTS[state.locale] || RAW_CONTENTS.vi;
    const cloned = JSON.parse(JSON.stringify(raw));
    cloned.opening.day = PARAMS.day;
    cloned.opening.month = PARAMS.month;
    return deepReplace(cloned, state.locale);
  }

  // Audio helper
  let audioPlayed = false;
  function ensureAudio() {
    if (audioPlayed) return;
    const a = document.getElementById('bg-audio');
    if (a) {
      audioPlayed = true;
      a.volume = 0.6;
      a.play().catch(() => { audioPlayed = false; });
    }
  }
  document.addEventListener('pointerdown', ensureAudio);

  // Preload images
  [IMAGES.garland, IMAGES.cake, IMAGES.wishTag, IMAGES.paper, ...IMAGES.girls, ...IMAGES.petals].forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const appEl = document.getElementById('app');

  // --- PETALS COMPONENT ---
  const PETAL_ITEMS = Array.from({length: 14}, (e, r) => ({
    src: IMAGES.petals[r % IMAGES.petals.length],
    left: 100 * Math.random(),
    size: 16 + 28 * Math.random(),
    duration: 7 + 6 * Math.random(),
    delay: -(12 * Math.random()),
    rotate: 360 * Math.random(),
    drift: (Math.random() - 0.5) * 60
  }));

  function renderPetalsHtml() {
    return `
      <div class="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        ${PETAL_ITEMS.map((p, i) => `
          <img src="${p.src}" alt="" aria-hidden="true" class="lovegift-petal absolute top-0"
               style="left:${p.left}%;width:${p.size}px;animation-duration:${p.duration}s;animation-delay:${p.delay}s;--tw-rotate:${p.rotate}deg;transform:rotate(${p.rotate}deg);filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25))" />
        `).join('')}
      </div>
    `;
  }

  // --- LANGUAGE SELECTOR ---
  function renderLangSelectorHtml(c) {
    const currentLoc = LOCALES.find(l => l.code === state.locale) || LOCALES[0];
    return `
      <div id="lang-selector-root" class="fixed bottom-4 left-4 z-40 font-sans">
        ${state.langMenuOpen ? `
          <div role="listbox" class="lovegift-fade-in absolute bottom-full left-0 mb-2 max-h-[52vh] w-44 overflow-y-auto overscroll-contain rounded-2xl border border-[#c9a24b]/40 bg-[#1a0e07]/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-md">
            ${LOCALES.map(l => {
              const sel = l.code === state.locale;
              return `
                <button type="button" role="option" aria-selected="${sel}" data-locale="${l.code}"
                        class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-cream/85 transition hover:bg-[#f6ead8]/10 ${sel ? 'bg-[#c9a24b]/20 text-cream' : ''}">
                  <span class="text-base leading-none">${l.flag}</span>
                  <span class="flex-1 truncate">${l.label}</span>
                  ${sel ? '<span class="text-[#e8cf94]">✓</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}
        <button id="lang-toggle-btn" type="button" aria-haspopup="listbox" aria-expanded="${state.langMenuOpen}"
                aria-label="${c.ui.languageLabel}" title="${c.ui.languageLabel}"
                class="flex items-center gap-2 rounded-full border border-[#c9a24b]/40 bg-[#1a0e07]/70 px-4 py-2.5 text-sm text-cream/90 shadow-[0_6px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition hover:bg-[#1a0e07]/90">
          <span aria-hidden="true" class="text-base leading-none">🌐</span>
          <span class="leading-none">${currentLoc.flag}</span>
          <span class="hidden leading-none sm:inline">${currentLoc.label}</span>
        </button>
      </div>
    `;
  }

  // --- RENDER STAGE 1: OPENING ---
  function renderOpening(c) {
    const { greeting, day, month } = c.opening;
    const maxDays = ej[Math.min(11, Math.max(0, month - 1))];
    const reelNumbers = Array.from({length: 23}, (e, t) => ((day - 1 + (t - 18)) % maxDays + maxDays) % maxDays + 1);
    const monthLabel = (c.ui.monthLabel || "Tháng {month}")
      .replace('{month}', month)
      .replace('{monthName}', c.ui.months ? c.ui.months[month - 1] : month);

    return `
      <section id="opening-section" class="lovegift-fade-in fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden px-5">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0"
             style="background:radial-gradient(62% 42% at 50% 46%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)"></div>
        <div class="lovegift-reveal-late pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <span class="lovegift-twinkle absolute text-gold" style="left:16%;top:24%;font-size:15px;animation-delay:0s">✦</span>
          <span class="lovegift-twinkle absolute text-gold" style="left:80%;top:18%;font-size:10px;animation-delay:0.6s">✦</span>
          <span class="lovegift-twinkle absolute text-gold" style="left:64%;top:62%;font-size:13px;animation-delay:1.1s">✦</span>
          <span class="lovegift-twinkle absolute text-gold" style="left:28%;top:66%;font-size:9px;animation-delay:0.3s">✦</span>
          <span class="lovegift-twinkle absolute text-gold" style="left:86%;top:48%;font-size:12px;animation-delay:0.9s">✦</span>
        </div>
        <div class="lovegift-reveal-late pointer-events-none absolute right-[14%] top-[16%] z-10" aria-hidden="true">
          <svg class="lovegift-balloon" width="52" height="72" viewBox="0 0 52 72" fill="none" stroke="#e8cf94" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <ellipse cx="18" cy="19" rx="12" ry="15"></ellipse>
            <ellipse cx="36" cy="26" rx="10" ry="13"></ellipse>
            <path d="M18 34 C 18 43, 26 47, 25 58"></path>
            <path d="M36 39 C 36 46, 30 50, 30 58"></path>
            <path d="M21 58 q 4 5 8 0"></path>
          </svg>
        </div>
        <h1 class="lovegift-script-in relative z-10 mb-5 max-w-[86vw] text-center font-hand font-semibold leading-[0.98] text-cream"
            style="font-size:clamp(46px, 14vw, 88px);text-shadow:0 0 26px rgba(255,220,150,0.35)">${greeting}</h1>
        <div class="relative z-10" style="height:304px;width:min(360px, 92vw);-webkit-mask-image:linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%);mask-image:linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)">
          <div class="lovegift-reel absolute left-0 top-0 w-full" style="--reel-from:-190px;--reel-to:-1254px">
            ${reelNumbers.map(n => `
              <div class="flex items-center justify-center font-serif font-semibold text-cream/80" style="height:76px;font-size:clamp(38px, 11vw, 60px);opacity:${n === day ? 0 : 1}">${n}</div>
            `).join('')}
          </div>
          <div class="absolute left-1/2 top-1/2 z-20 flex w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3">
            <span aria-hidden="true" class="lovegift-reveal-glow absolute left-1/2 top-1/2 -z-10 rounded-full"
                  style="width:230px;height:230px;background:radial-gradient(circle, rgba(255,206,120,0.5) 0%, rgba(255,180,80,0.18) 42%, rgba(255,180,80,0) 70%)"></span>
            <span class="lovegift-arrow-in font-serif text-gold" style="font-size:clamp(26px, 7vw, 44px)">→</span>
            <span class="lovegift-reveal-pop font-serif font-semibold leading-none" style="font-size:clamp(72px, 22vw, 128px);color:#f4d68a;text-shadow:0 0 30px rgba(255,206,120,0.6)">${day}</span>
            <span class="lovegift-month-in self-end whitespace-nowrap pb-2 font-serif text-cream" style="font-size:clamp(20px, 6vw, 34px)">${monthLabel}</span>
          </div>
        </div>
      </section>
    `;
  }

  // --- RENDER STAGE 2: INTRO (CAKE & CANDLE) ---
  function renderIntro(c) {
    const s = 2 * Math.PI * 46; // 289.026
    const p = state.candleProgress;
    const lit = state.candleLit;
    const holding = state.candleHolding;
    const ext = state.candleExtinguished;

    let hint = c.intro.lightingHint;
    if (ext) hint = "";
    else if (lit) {
      hint = holding ? c.intro.holdingHint : c.intro.idleHint;
    }

    return `
      <section class="relative flex w-full max-w-md flex-col items-center">
        <img src="${IMAGES.garland}" alt="" aria-hidden="true" draggable="false"
             class="pointer-events-none relative z-0 w-[min(680px,150vw)] max-w-none select-none sm:w-[min(820px,180vw)]"
             style="opacity:${ext ? 0 : 1};transition:opacity 0.8s ease" />
        
        <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-10 bg-black"
             style="opacity:${lit ? 0 : 0.62};transition:opacity 1.1s ease"></div>
        <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-20 bg-black"
             style="opacity:${p};transition:${holding ? 'none' : 'opacity 0.6s ease'}"></div>
        
        <div id="candle-interactive-area" class="relative z-30 mt-3 cursor-pointer touch-none sm:mt-2">
          <div class="lovegift-sway relative w-[clamp(230px,66vw,310px)]">
            <div class="absolute left-1/2 top-[-86px] z-30 -translate-x-1/2">
              <!-- Radial Glow -->
              <div aria-hidden="true" class="absolute left-1/2 top-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
                   style="width:160px;height:160px;background:radial-gradient(circle, rgba(255,180,90,0.55) 0%, rgba(255,150,60,0.22) 32%, rgba(255,140,50,0) 68%);opacity:${!lit || ext ? 0 : (holding ? 0.9 : 0.75)}"></div>
              
              <!-- Progress Ring SVG -->
              <svg class="absolute left-1/2 top-[6px] -translate-x-1/2 -translate-y-1/2 -rotate-90" width="104" height="104"
                   style="opacity:${lit ? (holding ? 1 : 0.28) : 0};transition:opacity 0.3s" aria-hidden="true">
                <circle cx="52" cy="52" r="46" fill="none" stroke="rgba(255,214,150,0.28)" stroke-width="2"></circle>
                <circle id="candle-progress-circle" cx="52" cy="52" r="46" fill="none" stroke="rgba(255,214,150,0.95)" stroke-width="2.5" stroke-linecap="round"
                        stroke-dasharray="${s}" stroke-dashoffset="${s * (1 - p)}"
                        style="transition:${holding ? 'none' : 'stroke-dashoffset 0.4s ease'}"></circle>
              </svg>

              <!-- Flame element -->
              <div aria-hidden="true" class="relative mx-auto"
                   style="width:17px;height:30px;opacity:${lit && !ext ? 1 : 0};transform:rotate(${holding ? 22 * p : 0}deg) scaleY(${ext ? 0.2 : 1 - 0.35 * p});transform-origin:50% 100%;transition:${ext ? 'opacity 0.4s ease, transform 0.4s ease' : (holding ? 'none' : 'opacity 0.45s ease')}">
                <div class="absolute inset-0 ${lit && !ext ? (holding ? 'lovegift-blowing' : 'lovegift-flame') : ''} ${ext ? 'lovegift-blowout' : ''}">
                  <div class="absolute inset-0"
                       style="background:radial-gradient(60% 55% at 50% 68%, #fff3c4 0%, #ffb347 45%, #ff7a1a 78%, rgba(255,90,10,0.2) 100%);border-radius:50% 50% 50% 50% / 62% 62% 40% 40%;box-shadow:0 0 14px 4px rgba(255,150,60,0.6)"></div>
                  <div class="absolute bottom-0 left-1/2 -translate-x-1/2"
                       style="width:7px;height:12px;background:radial-gradient(50% 60% at 50% 70%, #7db6ff 0%, rgba(125,182,255,0) 75%);border-radius:50%"></div>
                </div>
              </div>

              <!-- Candle Wick & Stick -->
              <div class="relative mx-auto" style="width:16px;height:56px;margin-top:2px;clip-path:polygon(30% 0, 70% 0, 92% 100%, 8% 100%);background:repeating-linear-gradient(-58deg, rgba(201,162,75,0.75) 0 2px, rgba(201,162,75,0) 2px 7px),linear-gradient(90deg, #c9ad78 0%, #f6ecd4 32%, #fffaf0 50%, #ead6ac 76%, #c3a670 100%);box-shadow:inset -2px 0 4px rgba(120,90,40,0.28), inset 2px 0 3px rgba(255,250,235,0.55);filter:${lit ? 'brightness(1)' : 'brightness(0.5)'};transition:filter 1.1s ease">
                <div class="absolute left-1/2 top-[-5px] h-[6px] w-[2px] -translate-x-1/2 rounded-full bg-[#3a2a1a]"></div>
              </div>

              ${ext ? '<span aria-hidden="true" class="lovegift-smoke absolute left-1/2 top-[22px] z-40"></span>' : ''}

              ${!lit && !ext ? `
                <div class="lovegift-match absolute left-1/2 top-[18px] z-40" aria-hidden="true">
                  <div style="width:54px;height:4px;border-radius:2px;transform:rotate(24deg);transform-origin:0 50%;background:linear-gradient(90deg, #cf9f61 0%, #6f4a29 100%);box-shadow:0 1px 2px rgba(0,0,0,0.35)">
                    <div class="lovegift-flame" style="position:absolute;left:-3px;top:-4px;width:7px;height:11px;transform-origin:50% 100%;border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;background:radial-gradient(60% 55% at 50% 68%, #fff3c4 0%, #ffb347 45%, #ff6a1a 85%, rgba(255,90,10,0.2) 100%);box-shadow:0 0 9px 3px rgba(255,140,50,0.7)"></div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Cake Image -->
            <img src="${IMAGES.cake}" alt="Bánh sinh nhật" class="relative z-10 w-full select-none" draggable="false"
                 style="opacity:${1 - 0.92 * p};filter:${lit ? 'brightness(1)' : 'brightness(0.42)'};transition:${holding ? 'none' : 'opacity 0.4s ease, filter 1.1s ease'}" />

            ${lit && !ext ? [0, 1, 2, 3].map(e => `
              <span class="lovegift-mote z-20" style="left:${46 + 3 * e}%;top:-40px;animation-delay:${0.9 * e}s;animation-duration:${4 + 0.6 * e}s"></span>
            `).join('') : ''}
          </div>
        </div>

        <!-- Instruction Text -->
        <div class="relative z-30 mt-8 flex flex-col items-center text-center sm:mt-12"
             style="opacity:${1 - 0.85 * p};transition:${holding ? 'none' : 'opacity 0.4s ease'}">
          <p class="lovegift-fade-in font-serif text-[22px] leading-snug text-cream/90 sm:text-[26px]">${c.intro.line1}</p>
          <p class="lovegift-fade-in mt-1 font-serif text-[22px] leading-snug text-cream/90 sm:text-[26px]">${c.intro.line2}</p>
          ${lit ? (holding ? `
            <p class="mt-6 font-sans text-sm font-medium tracking-wide text-cream/90">${c.intro.holdingHint}</p>
          ` : `
            <p class="mt-6 font-sans text-sm text-cream/75">${c.intro.idleHint}</p>
          `) : `
            <p class="mt-6 font-script text-lg text-cream/80">${c.intro.lightingHint}</p>
          `}
        </div>
      </section>
    `;
  }

  // --- RENDER STAGE 3: BEATS ---
  function renderBeats(c) {
    const beatText = c.beats[state.beatsIndex] || "";
    return `
      <section class="fixed inset-0 z-40 flex items-center justify-center bg-black px-8">
        <p class="max-w-lg text-center font-script text-cream transition-all duration-500 ${state.beatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}"
           style="font-size:clamp(20px, 5vw, 28px)">${beatText}</p>
      </section>
    `;
  }

  // --- RENDER STAGE 4: BLACKOUT ---
  function renderBlackout(c) {
    return `
      <section class="fixed inset-0 z-40 flex items-center justify-center bg-black px-8">
        <p class="lovegift-fade-in font-sans text-sm text-cream/55">${c.blackoutCaption}</p>
      </section>
    `;
  }

  // --- RENDER STAGE 5: WISH ---
  function renderWish(c) {
    const chosen = state.selectedWishIndex;
    return `
      <section class="relative flex w-full max-w-md flex-col items-center text-center">
        <p class="lovegift-kicker transition-opacity duration-500 ${chosen !== null ? 'opacity-0' : ''}">${c.wish.kicker}</p>
        <h2 class="mt-3 font-serif text-[28px] leading-snug text-cream transition-opacity duration-500 ${chosen !== null ? 'opacity-0' : ''}">${c.wish.question}</h2>
        <div class="mt-6 grid grid-cols-2 place-items-center gap-x-8 gap-y-4 sm:mt-8 sm:gap-x-10">
          ${c.wish.options.map((opt, r) => {
            const isSelected = chosen === r;
            const isOther = chosen !== null && !isSelected;
            return `
              <button type="button" data-wish-index="${r}" ${chosen !== null ? 'disabled' : ''}
                      class="group relative aspect-[351/760] w-[min(28vw,110px)] transition-all duration-500 sm:w-[124px] ${chosen === null ? 'hover:-translate-y-1 hover:scale-[1.03]' : ''} ${isSelected ? 'lovegift-wish-fly z-10' : ''} ${isOther ? 'scale-90 opacity-0' : ''}">
                ${isSelected ? `
                  <span aria-hidden="true" class="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style="width:185%;height:125%;background:radial-gradient(circle, rgba(255,224,150,0.8) 0%, rgba(255,200,110,0.32) 45%, rgba(255,200,110,0) 72%)"></span>
                ` : ''}
                <img src="${IMAGES.wishTag}" alt="" aria-hidden="true" draggable="false"
                     class="absolute inset-0 h-full w-full select-none object-contain drop-shadow-lg"
                     style="${isSelected ? 'filter:drop-shadow(0 0 14px rgba(255,220,140,0.95)) brightness(1.12)' : ''}" />
                <span class="absolute inset-x-[14%] bottom-[13%] top-[36%] flex items-center justify-center text-center font-sans text-[13px] font-medium leading-snug text-[#4a2a1c]">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${chosen !== null ? `
          <p class="lovegift-fade-in mt-6 font-script text-lg text-cream/80">${c.wish.reply}</p>
        ` : ''}
      </section>
    `;
  }

  // --- RENDER STAGE 6: HEART & MOSAIC ---
  function renderHeartMosaic(c) {
    const girls = IMAGES.girls;
    const cols = ef[0].length;
    return `
      <div class="relative mx-auto" style="width:min(340px, 84vw)">
        <div aria-hidden="true" class="lovegift-heart-glow absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
             style="width:138%;height:128%;background:radial-gradient(circle, rgba(226,140,150,0.5) 0%, rgba(201,132,150,0.22) 45%, rgba(201,132,150,0) 72%)"></div>
        <div class="relative">
          <div class="lovegift-heartbeat" style="display:grid;grid-template-columns:repeat(${cols}, 1fr);gap:clamp(1px, 0.5vw, 3px)">
            ${ef.map((row, r) => row.map((val, a) => {
              if (!val) return '<span class="aspect-square"></span>';
              let n = eb(3.7 * r + 19.1 * a + 5);
              let o = eb(8.3 * r + 2.9 * a + 1);
              let l = Math.floor(eb(5.2 * r + 9.7 * a + 3) * girls.length) % girls.length;
              return `
                <button type="button" aria-label="${c.ui.viewPhoto}" data-photo-idx="${l}"
                        class="lovegift-tile-spiral aspect-square cursor-pointer overflow-hidden rounded-[3px] bg-cover transition-transform duration-200 hover:scale-110"
                        style="background-image:url('${girls[l]}');background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(255,235,235,0.18), 0 1px 3px rgba(0,0,0,0.28);transform-origin:${50 + (5 - a) * 100}% ${50 + (3.4 - r) * 100}%;animation-delay:${0.4 * o}s;--spin:${210 + 90 * n}deg;--sc:${1.55 + 0.7 * n}"></button>
              `;
            }).join('')).join('')}
          </div>
          <span aria-hidden="true" class="lovegift-heart-burst pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style="width:72%;height:72%;background:radial-gradient(circle, rgba(255,246,214,0.95) 0%, rgba(255,214,140,0.6) 32%, rgba(255,200,110,0) 70%)"></span>
          <span aria-hidden="true" class="lovegift-heart-ring pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style="width:48%;height:48%;border:2px solid rgba(255,224,160,0.9)"></span>
          ${ex.map((e, r) => `
            <span aria-hidden="true" class="lovegift-heart-spark pointer-events-none absolute left-1/2 top-[44%] rounded-full bg-[#ffe9bd]"
                  style="width:5px;height:5px;margin-left:-2.5px;margin-top:-2.5px;box-shadow:0 0 8px 2px rgba(255,214,130,0.8);animation-delay:${e.delay};--sx:${e.sx};--sy:${e.sy}"></span>
          `).join('')}
        </div>
        <p class="mt-4 font-sans text-xs text-cream/45">${c.ui.heartTapHint}</p>
      </div>
    `;
  }

  function renderHeart(c) {
    return `
      <section class="lovegift-fade-in relative flex w-full max-w-md flex-col items-center text-center">
        ${renderHeartMosaic(c)}
        <p class="mt-8 font-sans text-sm text-cream/70">${c.heart.caption}</p>
        <h2 class="mt-2 font-serif text-[38px] leading-tight text-cream">${c.heart.title}</h2>
        <p class="mt-2 font-sans text-base text-cream/70">${c.heart.subtitle}</p>
        <div class="mt-8">
          <button id="btn-to-letter" type="button" class="rounded-full border border-[#f6ead8]/40 px-6 py-3 font-sans text-sm text-cream transition hover:bg-[#f6ead8]/10">${c.heart.next}</button>
        </div>
      </section>

      ${state.lightboxOpen ? `
        <div id="lightbox-backdrop" class="lovegift-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 px-6 backdrop-blur-sm cursor-pointer">
          <div class="lovegift-lightbox-in relative aspect-[3/4] w-[min(86vw,400px)] overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            ${IMAGES.girls.map((g, idx) => `
              <img src="${g}" alt="" aria-hidden="true" draggable="false"
                   class="absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-1000 ${idx === state.lightboxPhotoIndex ? 'opacity-100' : 'opacity-0'}"
                   style="${idx === state.lightboxPhotoIndex ? 'animation:lovegiftKenBurns 7s ease-out both' : ''}" />
            `).join('')}
            <span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15"></span>
            <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              ${IMAGES.girls.map((g, idx) => `
                <span class="h-1.5 rounded-full transition-all duration-300 ${idx === state.lightboxPhotoIndex ? 'w-4 bg-cream' : 'w-1.5 bg-cream/40'}"></span>
              `).join('')}
            </div>
          </div>
          <p class="mt-6 font-sans text-xs text-cream/60">${c.ui.tapToClose}</p>
        </div>
      ` : ''}
    `;
  }

  // --- RENDER STAGE 7: LETTER ---
  function renderLetter(c) {
    const fullBody = c.letter.body;
    const typed = fullBody.slice(0, state.letterTypedChars);
    return `
      <section class="lovegift-fade-up lovegift-scroll-soft relative flex max-h-[calc(100dvh-3rem)] w-full max-w-md flex-col items-center overflow-y-auto overscroll-contain px-1 text-center sm:max-h-[calc(100dvh-8rem)]">
        <p class="lovegift-kicker">${c.letter.kicker}</p>
        <div id="letter-paper-wrapper" class="lovegift-letter-paper relative mt-[104px] cursor-pointer select-none bg-[length:100%_100%] bg-no-repeat"
             style="background-image:url('${IMAGES.paper}')">
          <div class="absolute -top-[96px] right-0 z-20 w-[76px] rotate-[6deg] rounded-[3px] bg-[#fbf7ee] p-1.5 pb-4 shadow-[0_10px_22px_rgba(0,0,0,0.4)]">
            <span aria-hidden="true" class="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-3 rounded-[1px] bg-[#e6d9bd]/70"></span>
            <img src="${IMAGES.letterPhoto}" alt="" aria-hidden="true" draggable="false" class="block aspect-[3/4] w-full select-none object-cover" />
          </div>
          <div id="letter-scroll-inner" class="lovegift-letter-scroll absolute inset-0 overflow-y-auto overscroll-contain px-8 py-10 text-left sm:px-10 sm:py-12">
            <div class="flex min-h-full flex-col justify-center">
              <p class="relative whitespace-pre-line font-hand text-[15px] font-semibold leading-relaxed text-[#4a3527] sm:text-[18px]">
                <span class="invisible">${fullBody}</span>
                <span class="absolute inset-0 whitespace-pre-line">${typed}<span id="letter-cursor" class="inline-block w-0 align-baseline"></span></span>
              </p>
              <p class="mt-4 self-end font-hand text-[15px] font-semibold text-[#4a3527] transition-opacity duration-700 sm:text-[18px] ${state.letterDone ? 'opacity-100' : 'opacity-0'}">${c.letter.signature}</p>
            </div>
          </div>
        </div>
        <div class="mt-8 transition-opacity duration-700 ${state.letterDone ? 'opacity-100' : 'pointer-events-none opacity-0'}">
          <button id="btn-to-final" type="button" class="rounded-full border border-[#f6ead8]/40 px-6 py-3 font-sans text-sm text-cream transition hover:bg-[#f6ead8]/10">${c.letter.next}</button>
        </div>
      </section>
    `;
  }

  // --- RENDER STAGE 8: FINAL CARD ---
  function renderFinal(c) {
    return `
      <section class="lovegift-fade-up relative flex w-full max-w-md flex-col items-center">
        <div class="relative w-full overflow-hidden rounded-3xl border border-[#c9a24b]/40 bg-black/40 px-8 py-12 text-center backdrop-blur-sm">
          <span aria-hidden="true" class="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#c9a24b]/70"></span>
          <span aria-hidden="true" class="absolute right-3 top-3 h-5 w-5 rotate-90 border-l border-t border-[#c9a24b]/70"></span>
          <span aria-hidden="true" class="absolute right-3 bottom-3 h-5 w-5 rotate-180 border-l border-t border-[#c9a24b]/70"></span>
          <span aria-hidden="true" class="absolute left-3 bottom-3 h-5 w-5 -rotate-90 border-l border-t border-[#c9a24b]/70"></span>
          <p class="lovegift-kicker">${c.final.kicker}</p>
          <h2 class="mt-3 font-serif text-[30px] leading-tight text-cream">${c.final.title}</h2>
          <p class="mt-1 font-script text-xl text-[#c9a24b]">${c.final.from}</p>
          <div class="mx-auto my-5 h-px w-16 bg-[#c9a24b]/50"></div>
          <p class="font-sans text-base leading-relaxed text-cream/70">${c.final.message}</p>
        </div>
        <div class="mt-8 flex flex-col items-center gap-4">
          <button id="btn-to-starlight" type="button" class="rounded-full bg-[#c98a3a] px-6 py-3 font-sans text-sm font-semibold text-[#241108] transition hover:brightness-105"
                  style="box-shadow:0 0 24px 2px rgba(201,138,58,0.45)">${c.final.starButton}</button>
          <button id="btn-restart" type="button" class="font-sans text-sm text-cream/70 underline underline-offset-4 transition hover:text-cream">${c.final.repeatButton}</button>
        </div>
      </section>
    `;
  }

  // --- RENDER STAGE 9: STARLIGHT ---
  function renderStarlight(c) {
    const chosenText = state.selectedWishIndex !== null ? c.wish.options[state.selectedWishIndex] : c.starlight.wishFallback;
    const launched = state.starLaunched;

    return `
      <div id="starlight-sky-layer" aria-hidden="true" class="fixed inset-0 z-0 ${!launched ? 'pointer-events-none' : 'cursor-pointer'}">
        ${eq.map((e, r) => `
          <span class="lovegift-twinkle absolute rounded-full bg-[#ffe9bd]"
                style="left:${e.left}%;top:${e.top}%;width:${e.size}px;height:${e.size}px;animation-delay:${e.delay}s;animation-duration:${e.duration}s"></span>
        `).join('')}
        ${state.meteors.map(m => `
          <span class="lovegift-meteor-wrap" style="left:${m.x}%;top:${m.y}%">
            <span class="lovegift-meteor" style="width:${m.w}px;animation-delay:${m.delay}s;animation-duration:${m.dur}s"></span>
            <span class="lovegift-landed-star" style="animation-delay:${m.delay + m.dur}s"></span>
          </span>
        `).join('')}
        ${launched ? '<span aria-hidden="true" class="lovegift-sky-glow"></span>' : ''}
        ${state.starBurst ? `
          <span class="lovegift-burst" style="left:${state.starBurst.x}%;top:${state.starBurst.y}%"></span>
        ` : ''}
      </div>

      <section class="lovegift-fade-in relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <p class="lovegift-kicker">${c.starlight.kicker}</p>
        <h2 class="mt-3 font-serif text-[28px] leading-snug text-cream">${c.starlight.title}</h2>
        
        <button id="btn-launch-star" type="button" ${launched ? 'disabled' : ''} class="relative mt-6 flex flex-col items-center gap-4 cursor-pointer">
          <span class="relative flex h-28 w-28 items-center justify-center ${launched ? 'lovegift-launch' : 'lovegift-twinkle'}">
            <span aria-hidden="true" class="absolute inset-0 rounded-full"
                  style="background:radial-gradient(circle, rgba(255,224,150,0.5) 0%, rgba(255,200,110,0.18) 45%, rgba(255,200,110,0) 70%)"></span>
            <span class="text-5xl" style="color:#ffe6a6;text-shadow:0 0 18px rgba(255,214,130,0.9)">✦</span>
          </span>
          <span class="rounded-full border border-[#c9a24b]/50 bg-black/30 px-5 py-2 font-script text-lg text-[#ffe6a6] transition-opacity duration-500 ${launched ? 'opacity-0' : ''}">
            “${chosenText}”
          </span>
        </button>

        ${launched ? `
          <div class="lovegift-fade-up mt-2" style="opacity:0;animation-delay:1.9s;animation-fill-mode:forwards">
            <p class="font-script text-2xl text-[#ffd98e]">“${chosenText}”</p>
            <p class="mt-2 font-serif text-xl text-cream">${c.starlight.sentTitle}</p>
            <p class="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-cream/70">${c.starlight.sentMessage}</p>
            <p class="mt-4 font-sans text-xs text-cream/55">${c.starlight.tapHint}</p>
          </div>
        ` : `
          <p class="mt-2 font-sans text-sm text-cream/70">${c.starlight.subtitle}</p>
        `}

        <div class="mt-10 flex flex-col items-center gap-4">
          <button id="btn-back-to-card" type="button" class="rounded-full bg-[#b06a2a] px-6 py-3 font-sans text-sm font-semibold text-cream transition hover:brightness-105">${c.starlight.backButton}</button>
          <button id="btn-starlight-restart" type="button" class="font-sans text-sm text-cream/70 underline underline-offset-4 transition hover:text-cream">${c.starlight.repeatButton}</button>
        </div>
      </section>
    `;
  }

  // --- MAIN RENDER FUNCTION ---
  function render() {
    const c = getActiveContent();
    const showPetals = state.stage === 'heart' || state.stage === 'final';

    let stageContent = '';
    switch (state.stage) {
      case 'opening': stageContent = renderOpening(c); break;
      case 'intro': stageContent = renderIntro(c); break;
      case 'beats': stageContent = renderBeats(c); break;
      case 'blackout': stageContent = renderBlackout(c); break;
      case 'wish': stageContent = renderWish(c); break;
      case 'heart': stageContent = renderHeart(c); break;
      case 'letter': stageContent = renderLetter(c); break;
      case 'final': stageContent = renderFinal(c); break;
      case 'starlight': stageContent = renderStarlight(c); break;
    }

    appEl.innerHTML = `
      <main class="lovegift-stage-bg lovegift-no-select relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-6 sm:py-16 text-cream">
        ${showPetals ? renderPetalsHtml() : ''}
        ${renderLangSelectorHtml(c)}
        ${stageContent}
      </main>
    `;

    attachEventHandlers(c);
  }

  // --- ATTACH EVENT HANDLERS ---
  let candleHoldRaf = null;
  let candleHoldStartTime = 0;
  let typewriterRaf = null;
  let lightboxTimer = null;

  function attachEventHandlers(c) {
    // 1. Language selector buttons
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.onclick = (e) => {
        e.stopPropagation();
        state.langMenuOpen = !state.langMenuOpen;
        render();
      };
    }
    const locBtns = document.querySelectorAll('[data-locale]');
    locBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        state.locale = btn.getAttribute('data-locale');
        state.langMenuOpen = false;
        render();
      };
    });

    // Close lang menu if clicked outside
    document.addEventListener('pointerdown', (e) => {
      if (state.langMenuOpen && !e.target.closest('#lang-selector-root')) {
        state.langMenuOpen = false;
        render();
      }
    });

    // 2. Stage-specific logic:
    if (state.stage === 'opening') {
      // Automatic progression to intro
      // After 4.8s, fade out opening
      window.clearTimeout(window.__openingTimer1);
      window.clearTimeout(window.__openingTimer2);

      window.__openingTimer1 = window.setTimeout(() => {
        const sec = document.getElementById('opening-section');
        if (sec) sec.classList.add('lovegift-opening-out');
      }, 4800);

      window.__openingTimer2 = window.setTimeout(() => {
        state.stage = 'intro';
        state.candleLit = false;
        state.candleHolding = false;
        state.candleProgress = 0;
        state.candleExtinguished = false;
        render();
      }, 5500);
    }

    else if (state.stage === 'intro') {
      // At 1850ms, light the candle
      if (!state.candleLit && !state.candleExtinguished) {
        window.clearTimeout(window.__lightTimer);
        window.__lightTimer = window.setTimeout(() => {
          state.candleLit = true;
          render();
        }, 1850);
      }

      // Candle interactive hold
      const candleArea = document.getElementById('candle-interactive-area');
      if (candleArea) {
        const startHold = (e) => {
          if (!state.candleLit || state.candleExtinguished || state.candleHolding) return;
          state.candleHolding = true;
          candleHoldStartTime = performance.now();

          const loop = (now) => {
            const prog = Math.min(1, (now - candleHoldStartTime) / 2600);
            state.candleProgress = prog;
            
            // update dom directly for high 60fps performance
            const circle = document.getElementById('candle-progress-circle');
            if (circle) {
              const circ = 2 * Math.PI * 46;
              circle.setAttribute('stroke-dashoffset', circ * (1 - prog));
            }

            if (prog >= 1) {
              cancelAnimationFrame(candleHoldRaf);
              candleHoldRaf = null;
              state.candleHolding = false;
              state.candleExtinguished = true;
              render();

              // After 1600ms, go to beats
              window.setTimeout(() => {
                state.stage = 'beats';
                state.beatsIndex = 0;
                state.beatsVisible = true;
                render();
                runBeatsLoop(getActiveContent());
              }, 1600);
              return;
            }
            candleHoldRaf = requestAnimationFrame(loop);
          };
          candleHoldRaf = requestAnimationFrame(loop);
        };

        const stopHold = () => {
          if (state.candleExtinguished) return;
          if (candleHoldRaf) {
            cancelAnimationFrame(candleHoldRaf);
            candleHoldRaf = null;
          }
          state.candleHolding = false;
          state.candleProgress = 0;
          render();
        };

        candleArea.onpointerdown = startHold;
        candleArea.onpointerup = stopHold;
        candleArea.onpointerleave = stopHold;
        candleArea.onpointercancel = stopHold;
      }
    }

    else if (state.stage === 'wish') {
      const wishBtns = document.querySelectorAll('[data-wish-index]');
      wishBtns.forEach(btn => {
        btn.onclick = () => {
          if (state.selectedWishIndex !== null) return;
          const idx = parseInt(btn.getAttribute('data-wish-index'), 10);
          state.selectedWishIndex = idx;
          render();

          // After 2500ms, go to heart
          window.setTimeout(() => {
            state.stage = 'heart';
            state.lightboxOpen = false;
            render();
          }, 2500);
        };
      });
    }

    else if (state.stage === 'heart') {
      // Photo tiles open lightbox
      const photoTiles = document.querySelectorAll('[data-photo-idx]');
      photoTiles.forEach(tile => {
        tile.onclick = () => {
          const idx = parseInt(tile.getAttribute('data-photo-idx'), 10);
          state.lightboxPhotoIndex = idx;
          state.lightboxOpen = true;
          render();
          startLightboxTimer();
        };
      });

      // Lightbox close
      const lightboxBackdrop = document.getElementById('lightbox-backdrop');
      if (lightboxBackdrop) {
        lightboxBackdrop.onclick = () => {
          state.lightboxOpen = false;
          if (lightboxTimer) clearInterval(lightboxTimer);
          render();
        };
      }

      // Next to letter
      const btnLetter = document.getElementById('btn-to-letter');
      if (btnLetter) {
        btnLetter.onclick = () => {
          state.stage = 'letter';
          state.letterTypedChars = 0;
          state.letterDone = false;
          render();
          runLetterTypewriter(getActiveContent());
        };
      }
    }

    else if (state.stage === 'letter') {
      const paperWrapper = document.getElementById('letter-paper-wrapper');
      if (paperWrapper) {
        // click skips typing
        paperWrapper.onclick = () => {
          if (typewriterRaf) cancelAnimationFrame(typewriterRaf);
          state.letterTypedChars = c.letter.body.length;
          state.letterDone = true;
          render();
        };
      }

      const btnFinal = document.getElementById('btn-to-final');
      if (btnFinal) {
        btnFinal.onclick = () => {
          state.stage = 'final';
          render();
        };
      }
    }

    else if (state.stage === 'final') {
      const btnStarlight = document.getElementById('btn-to-starlight');
      if (btnStarlight) {
        btnStarlight.onclick = () => {
          state.stage = 'starlight';
          state.starLaunched = false;
          state.starBurst = null;
          state.meteors = [];
          render();
        };
      }

      const btnRestart = document.getElementById('btn-restart');
      if (btnRestart) {
        btnRestart.onclick = restartExperience;
      }
    }

    else if (state.stage === 'starlight') {
      const launchBtn = document.getElementById('btn-launch-star');
      if (launchBtn) {
        launchBtn.onclick = (e) => {
          if (state.starLaunched) return;
          state.starLaunched = true;
          
          // Star burst position
          const rect = launchBtn.getBoundingClientRect();
          state.starBurst = {
            x: ((rect.left + rect.width / 2 + 48) / window.innerWidth) * 100,
            y: ((rect.top + rect.height / 2 - 0.26 * window.innerHeight) / window.innerHeight) * 100
          };

          // 14 initial meteors
          const initialMeteors = Array.from({length: 14}, (e, t) => ({
            id: ++state.meteorId,
            x: 4 + (37 * t + 13) % 88,
            y: 4 + (23 * t + 7) % 55,
            delay: 1.15 + 0.13 * t,
            dur: 0.9 + (7 * t % 5) * 0.12,
            w: 60 + (11 * t % 4) * 22
          }));
          state.meteors = initialMeteors;
          render();
        };
      }

      // Tap on sky creates shooting star
      const skyLayer = document.getElementById('starlight-sky-layer');
      if (skyLayer) {
        skyLayer.onpointerdown = (e) => {
          if (!state.starLaunched) return;
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          const newMeteor = {
            id: ++state.meteorId,
            x: x,
            y: y,
            delay: 0,
            dur: 1,
            w: 90
          };
          state.meteors = [...state.meteors.slice(-39), newMeteor];
          render();
        };
      }

      const btnBack = document.getElementById('btn-back-to-card');
      if (btnBack) {
        btnBack.onclick = () => {
          state.stage = 'final';
          render();
        };
      }

      const btnRestart = document.getElementById('btn-starlight-restart');
      if (btnRestart) {
        btnRestart.onclick = restartExperience;
      }
    }
  }

  // --- BEATS SEQUENCE ---
  function runBeatsLoop(c) {
    let beatIdx = 0;
    const totalBeats = c.beats.length;

    function nextBeat() {
      // Hide current
      state.beatsVisible = false;
      render();

      window.setTimeout(() => {
        beatIdx++;
        if (beatIdx < totalBeats) {
          state.beatsIndex = beatIdx;
          state.beatsVisible = true;
          render();
          window.setTimeout(nextBeat, 2800);
        } else {
          // All beats finished, go to blackout
          state.stage = 'blackout';
          render();
          window.setTimeout(() => {
            state.stage = 'wish';
            render();
          }, 1800);
        }
      }, 500);
    }

    window.setTimeout(nextBeat, 2800);
  }

  // --- LIGHTBOX CAROUSEL ---
  function startLightboxTimer() {
    if (lightboxTimer) clearInterval(lightboxTimer);
    lightboxTimer = setInterval(() => {
      if (!state.lightboxOpen) return;
      state.lightboxPhotoIndex = (state.lightboxPhotoIndex + 1) % IMAGES.girls.length;
      render();
    }, 3500);
  }

  // --- LETTER TYPEWRITER ---
  function runLetterTypewriter(c) {
    const fullText = c.letter.body;
    const len = fullText.length;
    const startTime = performance.now();
    const speed = Math.max(33, len / 42);

    function step(now) {
      const chars = Math.min(len, Math.floor(((now - startTime) / 1000) * speed));
      state.letterTypedChars = chars;
      
      const scrollEl = document.getElementById('letter-scroll-inner');
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }

      if (chars >= len) {
        state.letterDone = true;
        render();
      } else {
        render();
        typewriterRaf = requestAnimationFrame(step);
      }
    }
    typewriterRaf = requestAnimationFrame(step);
  }

  // --- RESTART ---
  function restartExperience() {
    state.stage = 'intro';
    state.candleLit = false;
    state.candleHolding = false;
    state.candleProgress = 0;
    state.candleExtinguished = false;
    state.selectedWishIndex = null;
    state.beatsIndex = 0;
    state.beatsVisible = true;
    state.lightboxOpen = false;
    state.letterTypedChars = 0;
    state.letterDone = false;
    state.starLaunched = false;
    state.starBurst = null;
    state.meteors = [];
    render();
  }

  // --- INITIAL LAUNCH ---
  window.addEventListener('DOMContentLoaded', () => {
    render();
  });
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }

})();
