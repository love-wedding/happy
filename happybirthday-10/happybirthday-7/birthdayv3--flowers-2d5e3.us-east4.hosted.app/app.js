/**
 * Standalone Birthday Experience
 * Converted to pure vanilla JavaScript for offline / file:// double-click compatibility.
 */
(function () {
  'use strict';

  // --- RAW LOCALES DICTIONARY ---
  const RAW_CONTENTS = { "vi": { "senderName": "Tớ", "receiverName": "Cậu", "opening": { "subtitle": "my bestfriend", "continueLabel": "Tiếp tục", "greeting": "Happy Birthday", "day": 20, "month": 12 }, "intro": { "cakeWriting": { "title": "Happy Birthday", "wish": "Chuc em lon xinh nhu hoa" }, "line1": "Có một món quà nhỏ dành cho cậu…", "line2": "Nhưng trước khi mở, thổi nến trước nhé 🎂", "idleHint": "👆 Nhấn & giữ ngọn nến cho đến khi tắt", "holdingHint": "giữ nữa… giữ tiếp…", "lightingHint": "đang thắp nến cho cậu…" }, "voice": { "notice": "Khoan đã… có một cuộn băng nhỏ gửi riêng cho cậu 📼", "kicker": "Cuộn băng dành riêng cho cậu", "title": "Có những điều tớ không viết thành chữ được, nên tớ đã thu âm lại…", "hint": "Nhấn nút ▶ trên máy để nghe lời nhắn nhé, nhớ bật loa lên 🔊", "playing": "Đang phát… cứ nghe hết nhé, từng chữ đều là thật lòng đó 💛", "ended": "Cảm ơn cậu đã lắng nghe đến cuối 💛", "play": "Nghe", "pause": "Tạm dừng", "next": "Còn nữa nè →" }, "age": { "kicker": "Tuổi mới", "title": "{age} tuổi rồi đó nha!", "days": "= {days} ngày có mặt trên đời", "laughs": "= khoảng {laughs} lần cười", "closing": "Tuổi {age} — mong cậu vẫn là cậu, chỉ là vui hơn một chút thôi.", "fallbackTitle": "Thêm một tuổi mới 🎉", "fallbackClosing": "Tuổi mới — mong cậu vẫn là cậu, chỉ là vui hơn một chút thôi.", "next": "Xem quà tiếp →" }, "heart": { "caption": "Mấy tấm dìm hàng này tớ giữ kỹ lắm đó 😌", "title": "Chúc Mừng Sinh Nhật, Cậu!", "subtitle": "Hôm nay cậu là nhân vật chính nha 🎈", "next": "Có thư nè →" }, "letter": { "kicker": "Lá thư nhỏ", "body": "Tớ không giỏi nói mấy lời hoa mỹ, nên viết đơn giản thôi: chúc mừng sinh nhật cậu nhé.\n\nNăm vừa rồi chắc chẳng dễ dàng gì, vậy mà cậu vẫn đi tới được hôm nay — giỏi hơn cậu nghĩ nhiều đấy.\n\nTớ chỉ mong cậu ăn ngon ngủ đủ, bớt lo một chút, và nhớ là luôn có người ở đây khi cậu cần.", "signature": "— Tớ", "next": "Vẫn còn nữa →", "flipHint": "Chạm vào tấm thiệp để lật mặt sau ↻", "to": "Gửi", "certTitle": "Chứng nhận tuổi mới", "certUnit": "tuổi", "certFallback": "Tuổi mới", "zoomHint": "Chạm vào con tem để xem ảnh to ✦" }, "hug": { "idleHint": "👆 Đặt tay lên và giữ nhé", "next": "Còn một điều ước nữa →", "love": { "prompt": "Một nửa ở chỗ tớ, một nửa ở chỗ cậu… đặt tay lên để ghép lại nhé.", "holdingHint": "gần thêm chút nữa… thấy tim tớ không…", "done": "Ghép lại rồi đó. Xa mấy thì tim tớ vẫn ở cạnh cậu." }, "friend": { "prompt": "Không qua chúc tận nơi được… thì cụng tay qua màn hình nhé!", "holdingHint": "lấy đà… 1… 2…", "done": "Bụp! Cụng rồi nha. Sinh nhật vui vẻ, bạn thân!" }, "family": { "prompt": "Năm nay không ở cạnh nhau được… mình ngoéo tay hứa một điều nhé.", "holdingHint": "ngoéo thật chặt vào…", "done": "Hứa rồi đó: ở đâu đi nữa, mình vẫn là nhà của nhau." } }, "thanks": { "teaser": "Còn một điều cuối…", "line": "Cảm ơn cậu vì đã được sinh ra.", "repeat": "Xem lại từ đầu" }, "wish": { "kicker": "Ước một điều", "title": "Nhắm mắt lại… rồi ước một điều cho tuổi mới nhé", "subtitle": "Viết vào mảnh giấy này, tớ sẽ gấp nó thành một ngôi sao cho cậu.", "slipHeader": "điều ước tuổi mới ✨", "placeholder": "vd. mong năm nay mình dũng cảm hơn với ước mơ của chính mình…", "fold": "Gấp thành ngôi sao ⭐", "skip": "Giữ điều ước trong lòng" }, "jar": { "kicker": "Hũ sao điều ước", "tag": "gửi cậu ♡", "lastHint": "Còn một ngôi sao cuối cùng… ngôi sao tớ để dành đến cuối ✨", "lastHeader": "điều tớ muốn nói nhất…", "lastWish": "Cảm ơn cậu vì đã luôn ở đây. Tuổi mới, dù có chuyện gì, tớ vẫn sẽ ở cạnh cậu như thế.", "landed": "Ngôi sao của cậu đã nằm trong hũ rồi ✨", "intro": "Trong hũ còn {n} ngôi sao tớ gấp sẵn cho cậu… mỗi ngôi sao là một điều tớ ước cho cậu.", "tapHint": "Chạm vào từng ngôi sao để mở ra nhé ⭐", "progress": "Đã mở {read}/{n} ngôi sao", "fromSender": "tớ ước cho cậu…", "yours": "điều ước của cậu", "secret": "Một điều ước bí mật 🤫", "close": "Gấp lại ⭐", "later": "Để dành mấy ngôi sao kia đọc sau →", "finaleTitle": "Sinh nhật vui vẻ, Cậu ✨", "finaleLine": "Từ nay trên trời có một chòm sao của riêng cậu: điều ước của cậu ở giữa, những điều tớ ước cho cậu ở quanh.", "constellation": "✦ Chòm sao của cậu · {date} ✦", "wishes": { "love": ["Mong cậu luôn được yêu thương nhiều như cách cậu yêu thương mọi người.", "Mong mỗi sáng thức dậy, cậu đều có một lý do để mỉm cười.", "Mong tuổi mới cậu bớt lo nghĩ, ngủ thật ngon, ăn thật nhiều.", "Mong những ước mơ cậu đang ấp ủ, năm nay sẽ thành sự thật.", "Mong cậu biết rằng, cậu là điều tuyệt vời nhất của tớ.", "Mong sinh nhật năm sau, tớ được ở ngay bên cạnh cậu."], "friend": ["Mong cậu tuổi mới vẫn lầy như cũ, nhưng giàu hơn nhiều.", "Mong deadline nể cậu, sếp thương cậu, lương tăng đều đều.", "Mong cậu gặp được người thương cậu thật lòng.", "Mong cậu khoẻ mạnh, ăn không béo, ngủ thật ngon.", "Mong mình vẫn là bạn thân thêm thật nhiều năm nữa.", "Mong lúc nào buồn, cậu cũng nhớ là còn có tớ."], "family": ["Mong nhà mình lúc nào cũng đủ đầy, ấm áp.", "Mong ngày nào cũng có người hỏi han, nhắc ăn đúng bữa.", "Mong mọi con đường phía trước đều bằng phẳng, bình an.", "Mong dù lớn thế nào, vẫn luôn có một nơi để trở về.", "Mong năm nay bớt vất vả, thêm thật nhiều niềm vui.", "Mong mình mãi là chỗ dựa của nhau."] } }, "ui": { "months": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], "monthLabel": "Tháng {month}", "heartTapHint": "Chạm vào trái tim để xem ảnh ♡", "viewPhoto": "Xem ảnh", "tapToClose": "Chạm để đóng", "languageLabel": "Ngôn ngữ" } }, "en": { "senderName": "me", "receiverName": "you", "opening": { "subtitle": "my bestfriend", "continueLabel": "Continue", "greeting": "Happy Birthday", "day": 20, "month": 12 }, "intro": { "line1": "There's a little gift here for you…", "line2": "But before you open it, blow out the candle first 🎂", "idleHint": "👆 Press & hold the flame until it goes out", "holdingHint": "keep holding… almost there…", "lightingHint": "lighting the candle for you…" }, "voice": { "notice": "Wait… a little tape was recorded just for you 📼", "kicker": "A tape just for you", "title": "Some things I couldn't put into writing, so I recorded them…", "hint": "Press ▶ on the player to hear the message — sound on 🔊", "playing": "Playing… listen till the end, I meant every word 💛", "ended": "Thank you for listening all the way through 💛", "play": "Play", "pause": "Pause", "next": "There's more →" }, "age": { "kicker": "New age", "title": "{age} years old, officially!", "days": "= {days} days on this planet", "laughs": "= about {laughs} laughs", "closing": "At {age} — stay exactly who you are, just a little happier.", "fallbackTitle": "One more year 🎉", "fallbackClosing": "New age — stay exactly who you are, just a little happier.", "next": "Next surprise →" }, "heart": { "caption": "I've kept all these embarrassing photos very safe 😌", "title": "Happy Birthday{,receiver}!", "subtitle": "Today you're the main character 🎈", "next": "Got a letter for you →" }, "letter": { "kicker": "A little letter", "body": "I'm not good with fancy words, so I'll keep it simple: happy birthday.\n\nThis past year can't have been easy, and yet here you are — you're stronger than you think.\n\nAll I wish is that you eat well, sleep enough, worry a little less, and remember that someone is always here when you need them.", "signature": "— {sender}", "next": "There's more →", "flipHint": "Tap the postcard to turn it over ↻", "to": "To", "certTitle": "Officially a year older", "certUnit": "years", "certFallback": "New age", "zoomHint": "Tap the stamp to see the photo ✦" }, "hug": { "idleHint": "👆 Place your hand and hold", "next": "One more wish →", "love": { "prompt": "Half of it is with me, half with you… hold here to make it whole.", "holdingHint": "a little closer… can you feel my heart?", "done": "There, whole again. However far, my heart is right beside you." }, "friend": { "prompt": "Can't be there to celebrate… so fist bump through the screen!", "holdingHint": "wind up… 1… 2…", "done": "Boom! Bumped. Happy birthday, bestie!" }, "family": { "prompt": "We can't be together this year… so let's pinky promise something.", "holdingHint": "hook it tight…", "done": "Promised: wherever we are, we're still each other's home." } }, "thanks": { "teaser": "One last thing…", "line": "Thank you for being born.", "repeat": "Watch again" }, "wish": { "kicker": "Make a wish", "title": "Close your eyes… and make a wish for the year ahead", "subtitle": "Write it on this slip, and I'll fold it into a star for you.", "slipHeader": "my birthday wish ✨", "placeholder": "e.g. this year I hope to be braver about my own dreams…", "fold": "Fold it into a star ⭐", "skip": "Keep my wish to myself" }, "jar": { "kicker": "A jar of wishes", "tag": "for {receiver} ♡", "lastHint": "One last star… the one I saved for the very end ✨", "lastHeader": "what I most want to say…", "lastWish": "Thank you for always being here. Whatever this new year brings, I'll be right beside you, just like this.", "landed": "Your star is in the jar now ✨", "intro": "There are {n} more stars in here that I folded for you… each one is a wish I made for you.", "tapHint": "Tap each star to open it ⭐", "progress": "{read}/{n} stars opened", "fromSender": "I wish for you…", "yours": "your wish", "secret": "A secret wish 🤫", "close": "Fold it back ⭐", "later": "Save the rest for later →", "finaleTitle": "Happy Birthday{,receiver} ✨", "finaleLine": "From tonight there's a constellation of your own up there: your wish in the middle, and my wishes for you all around it.", "constellation": "✦ A constellation for {receiver} · {date} ✦", "wishes": { "love": ["That you're always loved as much as you love everyone else.", "That every morning gives you a reason to smile.", "That this year you worry less, sleep well and eat well.", "That the dreams you've been holding onto come true this year.", "That you know you're the best thing in my life.", "That next birthday, I get to be right there beside you."], "friend": ["That you stay just as silly this year, only a lot richer.", "That deadlines go easy on you and your pay keeps going up.", "That you meet someone who loves you for real.", "That you stay healthy, eat everything and sleep like a baby.", "That we stay best friends for many, many more years.", "That whenever you're sad, you remember you've got me."], "family": ["That home is always full and warm.", "That someone always checks in and reminds you to eat.", "That every road ahead is smooth and safe.", "That no matter how grown up you get, there's always a place to come back to.", "That this year is lighter and full of joy.", "That we always stay each other's rock."] } }, "ui": { "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "monthLabel": "{monthName}", "heartTapHint": "Touch the heart to see the photos ♡", "viewPhoto": "View photo", "tapToClose": "Tap to close", "languageLabel": "Language" } }, "ko": { "senderName": "나", "receiverName": "너", "opening": { "subtitle": "my bestfriend", "continueLabel": "계속", "greeting": "생일 축하해", "day": 20, "month": 12 }, "intro": { "line1": "너에게 줄 작은 선물이 있어…", "line2": "하지만 열기 전에, 먼저 촛불을 불어서 꺼줘 🎂", "idleHint": "👆 촛불을 꺼질 때까지 길게 눌러줘", "holdingHint": "조금만 더… 계속 눌러…", "lightingHint": "너를 위해 초에 불을 붙이는 중이야…" }, "voice": { "notice": "잠깐… 너만을 위해 녹음한 작은 테이프가 있어 📼", "kicker": "너만을 위한 테이프", "title": "글로는 다 못 적어서, 목소리로 담아 봤어…", "hint": "플레이어의 ▶ 버튼을 눌러 메시지를 들어 줘, 소리 켜고 🔊", "playing": "재생 중… 끝까지 들어 줘, 한 마디 한 마디 진심이야 💛", "ended": "끝까지 들어 줘서 고마워 💛", "play": "재생", "pause": "일시정지", "next": "아직 더 있어 →" }, "age": { "kicker": "새로운 나이", "title": "벌써 {age}살이다!", "days": "= 세상에 온 지 {days}일", "laughs": "= 대략 {laughs}번 웃음", "closing": "{age}살에도 지금 그대로의 너이길, 조금만 더 행복하게.", "fallbackTitle": "한 살 더 먹었네 🎉", "fallbackClosing": "새로운 나이에도 지금 그대로의 너이길, 조금만 더 행복하게.", "next": "다음 선물 →" }, "heart": { "caption": "이 흑역사 사진들 내가 잘 간직하고 있었지 😌", "title": "생일 축하해{,receiver}!", "subtitle": "오늘은 네가 주인공이야 🎈", "next": "편지 왔어 →" }, "letter": { "kicker": "짧은 편지", "body": "나는 화려한 말은 잘 못 해서, 그냥 간단히 말할게: 생일 축하해.\n\n지난 한 해가 쉽지 않았을 텐데, 그래도 여기까지 왔네 — 너는 네 생각보다 훨씬 강해.\n\n그저 잘 먹고 푹 자고, 걱정은 조금 덜고, 네가 필요할 때 늘 곁에 있는 사람이 있다는 걸 기억해줘.", "signature": "— {sender}", "next": "아직 더 있어 →", "flipHint": "엽서를 눌러 뒤집어 봐 ↻", "to": "받는 사람", "certTitle": "새로운 나이 인증", "certUnit": "살", "certFallback": "새 나이", "zoomHint": "우표를 눌러 사진을 크게 봐 ✦" }, "hug": { "idleHint": "👆 손을 올리고 꾹 눌러 줘", "next": "소원 하나 더 →", "love": { "prompt": "반쪽은 나한테, 반쪽은 너한테… 여기를 눌러서 하나로 맞춰 줘.", "holdingHint": "조금만 더 가까이… 내 심장 소리 들려?", "done": "봐, 다시 하나가 됐어. 아무리 멀어도 내 마음은 네 곁에 있어." }, "friend": { "prompt": "직접 가서 축하해 주지 못하니까… 화면 너머로 주먹 인사하자!", "holdingHint": "준비… 1… 2…", "done": "쾅! 주먹 인사 완료. 생일 축하해, 베프!" }, "family": { "prompt": "올해는 함께 있지 못하니까… 새끼손가락 걸고 약속 하나 하자.", "holdingHint": "꼭 걸어…", "done": "약속했어. 어디에 있든 우리는 서로의 집이야." } }, "thanks": { "teaser": "마지막으로 하나만…", "line": "태어나 줘서 고마워.", "repeat": "처음부터 다시 보기" }, "wish": { "kicker": "소원 빌기", "title": "눈을 감고… 새로운 한 해를 위한 소원을 하나 빌어 봐", "subtitle": "이 쪽지에 적어 줘. 내가 별 모양으로 접어 줄게.", "slipHeader": "생일 소원 ✨", "placeholder": "예) 올해는 내 꿈에 조금 더 용기를 내고 싶어…", "fold": "별로 접기 ⭐", "skip": "소원은 마음속에 간직할래" }, "jar": { "kicker": "소원 별병", "tag": "{receiver}에게 ♡", "lastHint": "마지막 별 하나… 끝까지 아껴 둔 별이야 ✨", "lastHeader": "가장 하고 싶은 말…", "lastWish": "항상 곁에 있어 줘서 고마워. 새로운 한 해에 무슨 일이 있어도, 지금처럼 네 곁에 있을게.", "landed": "네 별이 병 속에 들어갔어 ✨", "intro": "병 안에는 내가 너를 위해 접어 둔 별이 {n}개 더 있어… 하나하나가 너를 위한 소원이야.", "tapHint": "별을 하나씩 눌러서 열어 봐 ⭐", "progress": "{read}/{n}개 열었어", "fromSender": "너를 위해 비는 소원…", "yours": "너의 소원", "secret": "비밀 소원 🤫", "close": "다시 접기 ⭐", "later": "나머지는 나중에 읽을래 →", "finaleTitle": "생일 축하해{,receiver} ✨", "finaleLine": "오늘 밤부터 하늘에 너만의 별자리가 생겼어. 가운데엔 너의 소원, 그 둘레엔 너를 위한 내 소원들.", "constellation": "✦ {receiver}의 별자리 · {date} ✦", "wishes": { "love": ["네가 사람들을 아끼는 만큼, 너도 늘 사랑받기를.", "매일 아침 웃을 이유가 하나씩 생기기를.", "올해는 걱정은 줄고, 푹 자고, 맛있게 먹기를.", "오래 품어 온 꿈이 올해 이루어지기를.", "네가 내 인생에서 가장 좋은 사람이라는 걸 알아주기를.", "내년 생일에는 네 바로 옆에 있을 수 있기를."], "friend": ["올해도 지금처럼 웃기되, 훨씬 부자가 되기를.", "마감은 너그럽고 월급은 쑥쑥 오르기를.", "너를 진심으로 아껴 주는 사람을 만나기를.", "건강하고, 먹어도 살 안 찌고, 꿀잠 자기를.", "앞으로도 오래오래 베프로 남기를.", "슬플 땐 내가 있다는 걸 꼭 기억하기를."], "family": ["집이 언제나 따뜻하고 넉넉하기를.", "늘 누군가 안부를 묻고 밥 챙겨 먹으라고 말해 주기를.", "앞으로의 모든 길이 평탄하고 안전하기를.", "아무리 커도 언제나 돌아올 곳이 있기를.", "올해는 덜 힘들고 기쁜 일이 가득하기를.", "우리가 언제나 서로의 버팀목이 되기를."] } }, "ui": { "months": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], "monthLabel": "{month}월", "heartTapHint": "하트를 터치해서 사진을 봐 ♡", "viewPhoto": "사진 보기", "tapToClose": "터치하면 닫혀", "languageLabel": "언어" } }, "ja": { "senderName": "わたし", "receiverName": "あなた", "opening": { "subtitle": "my bestfriend", "continueLabel": "次へ", "greeting": "お誕生日おめでとう", "day": 20, "month": 12 }, "intro": { "line1": "あなたに小さな贈り物があるの…", "line2": "でも開ける前に、まずはろうそくを吹き消してね 🎂", "idleHint": "👆 消えるまで炎を長押ししてね", "holdingHint": "もう少し…そのまま押していて…", "lightingHint": "あなたのためにろうそくを灯しているよ…" }, "voice": { "notice": "待って…きみのためだけに録ったテープがあるよ 📼", "kicker": "きみだけのテープ", "title": "文字にできない想いがあって、声で残したの…", "hint": "プレーヤーの ▶ を押してメッセージを聴いてね、音はオンで 🔊", "playing": "再生中…最後まで聴いてね、全部本当の気持ちだよ 💛", "ended": "最後まで聴いてくれてありがとう 💛", "play": "再生", "pause": "一時停止", "next": "まだあるよ →" }, "age": { "kicker": "新しい年齢", "title": "ついに{age}歳！", "days": "= この世界にきて{days}日", "laughs": "= だいたい{laughs}回の笑顔", "closing": "{age}歳も、そのままのあなたで。ただ、もう少しだけ楽しく。", "fallbackTitle": "またひとつ大人に 🎉", "fallbackClosing": "新しい一年も、そのままのあなたで。ただ、もう少しだけ楽しく。", "next": "次のプレゼント →" }, "heart": { "caption": "この黒歴史写真、ちゃんと大事にとってあるよ 😌", "title": "お誕生日おめでとう{,receiver}！", "subtitle": "今日の主役はあなただよ 🎈", "next": "手紙があるよ →" }, "letter": { "kicker": "小さな手紙", "body": "きれいな言葉は得意じゃないから、シンプルに言うね：お誕生日おめでとう。\n\nこの一年は簡単じゃなかったはず、それでもここまで来たね — あなたは自分で思うよりずっと強いよ。\n\nちゃんと食べて、しっかり眠って、心配は少しだけ減らして、必要なときにはいつもそばにいる人がいるって覚えていてね。", "signature": "— {sender}", "next": "まだ続きがあるよ →", "flipHint": "はがきをタップして裏返してね ↻", "to": "宛先", "certTitle": "新しい年齢 認定", "certUnit": "歳", "certFallback": "新しい一年", "zoomHint": "切手をタップして写真を大きく見てね ✦" }, "hug": { "idleHint": "👆 手を置いて、そのまま押さえてね", "next": "もうひとつ願いごと →", "love": { "prompt": "半分はわたしのところ、半分はあなたのところ…ここを押さえてひとつにしよう。", "holdingHint": "もう少し近くに…わたしの鼓動、聞こえる？", "done": "ほら、ひとつに戻ったよ。どんなに遠くても、わたしの心はそばにいるよ。" }, "friend": { "prompt": "お祝いしに行けないから…画面越しにグータッチしよう！", "holdingHint": "せーの…1…2…", "done": "ゴツン！タッチ完了。誕生日おめでとう、親友！" }, "family": { "prompt": "今年は一緒にいられないから…指切りして、ひとつ約束しよう。", "holdingHint": "ぎゅっと結んで…", "done": "約束したよ。どこにいても、わたしたちはお互いの帰る場所だよ。" } }, "thanks": { "teaser": "最後にひとつだけ…", "line": "生まれてきてくれて、ありがとう。", "repeat": "最初からもう一度" }, "wish": { "kicker": "願いごと", "title": "目を閉じて…新しい一年への願いごとをひとつ", "subtitle": "この紙に書いてね。あなたのために星の形に折ってあげる。", "slipHeader": "誕生日の願いごと ✨", "placeholder": "例：今年は自分の夢にもっと勇気を出せますように…", "fold": "星に折る ⭐", "skip": "願いごとは心にしまっておく" }, "jar": { "kicker": "願いごとの星びん", "tag": "{receiver}へ ♡", "lastHint": "最後にもうひとつ…いちばん最後までとっておいた星 ✨", "lastHeader": "いちばん伝えたいこと…", "lastWish": "いつもそばにいてくれてありがとう。新しい一年に何があっても、わたしはこうしてずっと隣にいるよ。", "landed": "あなたの星がびんに入ったよ ✨", "intro": "びんの中には、わたしがあなたのために折った星があと{n}つ…ひとつひとつが、あなたへの願いごと。", "tapHint": "星をひとつずつタップして開いてね ⭐", "progress": "{read}/{n}こ開いた", "fromSender": "あなたに願うこと…", "yours": "あなたの願いごと", "secret": "ひみつの願いごと 🤫", "close": "また折りたたむ ⭐", "later": "残りはあとで読む →", "finaleTitle": "お誕生日おめでとう{,receiver} ✨", "finaleLine": "今夜から、空にあなただけの星座がひとつ。真ん中にあなたの願い、そのまわりにわたしからの願い。", "constellation": "✦ {receiver}の星座 · {date} ✦", "wishes": { "love": ["あなたがみんなを想うのと同じくらい、いつも愛されますように。", "毎朝、笑顔になれる理由がひとつありますように。", "今年は心配ごとが減って、よく眠れて、おいしく食べられますように。", "大切にあたためてきた夢が、今年叶いますように。", "あなたがわたしの一番の宝物だって、伝わりますように。", "来年の誕生日は、すぐ隣にいられますように。"], "friend": ["今年もそのままのノリで、でもずっとお金持ちになりますように。", "締め切りがやさしくて、お給料がどんどん上がりますように。", "本気で大切にしてくれる人に出会えますように。", "元気いっぱいで、何を食べても太らず、ぐっすり眠れますように。", "これから何年も、ずっと親友でいられますように。", "悲しいときは、わたしがいることを思い出せますように。"], "family": ["家がいつもあたたかく、満ち足りていますように。", "いつも誰かが気にかけて、ごはんを忘れないよう声をかけてくれますように。", "これからの道が、なだらかで安全でありますように。", "どんなに大きくなっても、帰れる場所がいつもありますように。", "今年は苦労が減って、楽しいことがたくさんありますように。", "ずっとお互いの支えでいられますように。"] } }, "ui": { "months": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], "monthLabel": "{month}月", "heartTapHint": "ハートに触れて写真を見てね ♡", "viewPhoto": "写真を見る", "tapToClose": "タップで閉じる", "languageLabel": "言語" } }, "zh": { "senderName": "我", "receiverName": "你", "opening": { "subtitle": "my bestfriend", "continueLabel": "继续", "greeting": "生日快乐", "day": 20, "month": 12 }, "intro": { "line1": "这里有一份小礼物要送给你…", "line2": "不过在打开之前，先把蜡烛吹灭吧 🎂", "idleHint": "👆 按住火苗，直到它熄灭", "holdingHint": "再坚持一下…继续按着…", "lightingHint": "正在为你点上蜡烛…" }, "voice": { "notice": "等等…有一盘专门为你录的磁带 📼", "kicker": "只属于你的磁带", "title": "有些话写不出来，所以我把它录了下来…", "hint": "按下播放器上的 ▶ 听听这段话吧，记得打开声音 🔊", "playing": "正在播放…请听到最后，每一句都是真心的 💛", "ended": "谢谢你一直听到最后 💛", "play": "播放", "pause": "暂停", "next": "还有哦 →" }, "age": { "kicker": "新的一岁", "title": "{age}岁啦！", "days": "= 来到这个世界{days}天", "laughs": "= 大约笑了{laughs}次", "closing": "{age}岁，愿你还是你，只是更开心一点。", "fallbackTitle": "又长大一岁 🎉", "fallbackClosing": "新的一岁，愿你还是你，只是更开心一点。", "next": "下一个惊喜 →" }, "heart": { "caption": "这些黑历史照片我可都好好保存着 😌", "title": "生日快乐{,receiver}！", "subtitle": "今天你是主角 🎈", "next": "有一封信 →" }, "letter": { "kicker": "一封小信", "body": "我不太会说漂亮话，所以就简单点说：生日快乐。\n\n过去这一年一定不容易，可你还是走到了今天 —— 你比自己以为的要坚强得多。\n\n我只希望你吃得好、睡得够，少操点心，也记得在你需要的时候，总有一个人在这里。", "signature": "— {sender}", "next": "还有呢 →", "flipHint": "轻触明信片，翻到背面看看 ↻", "to": "致", "certTitle": "新岁认证", "certUnit": "岁", "certFallback": "新的一岁", "zoomHint": "轻触邮票查看大图 ✦" }, "hug": { "idleHint": "👆 把手放上来，按住不放", "next": "还有一个愿望 →", "love": { "prompt": "一半在我这里，一半在你那里……按住这里，把它们合在一起吧。", "holdingHint": "再近一点……听到我的心跳了吗……", "done": "好了，又合成一颗了。不管多远，我的心都在你身边。" }, "friend": { "prompt": "没法去现场为你庆祝……那就隔着屏幕碰个拳吧！", "holdingHint": "预备……1……2……", "done": "砰！碰拳成功。生日快乐，好朋友！" }, "family": { "prompt": "今年我们没法在一起……那就拉个钩，约定一件事吧。", "holdingHint": "钩紧一点……", "done": "说好了：无论在哪里，我们永远是彼此的家。" } }, "thanks": { "teaser": "最后还有一件事……", "line": "谢谢你来到这个世界。", "repeat": "从头再看一次" }, "wish": { "kicker": "许个愿", "title": "闭上眼睛……为新的一岁许一个愿吧", "subtitle": "把它写在这张纸条上，我帮你折成一颗星星。", "slipHeader": "生日愿望 ✨", "placeholder": "例如：今年希望能更勇敢地追自己的梦……", "fold": "折成星星 ⭐", "skip": "把愿望藏在心里" }, "jar": { "kicker": "许愿星星瓶", "tag": "给{receiver} ♡", "lastHint": "还有最后一颗星星……我一直留到最后的那颗 ✨", "lastHeader": "我最想对你说的话……", "lastWish": "谢谢你一直都在。新的一岁无论发生什么，我都会像现在这样陪在你身边。", "landed": "你的星星已经放进瓶子里了 ✨", "intro": "瓶子里还有{n}颗我为你折的星星……每一颗都是我为你许下的愿望。", "tapHint": "点开每一颗星星看看吧 ⭐", "progress": "已打开 {read}/{n} 颗", "fromSender": "我为你许愿……", "yours": "你的愿望", "secret": "一个秘密愿望 🤫", "close": "再折起来 ⭐", "later": "剩下的留着以后看 →", "finaleTitle": "生日快乐{,receiver} ✨", "finaleLine": "从今晚起，天上有了一个只属于你的星座：你的愿望在中间，我为你许的愿望围在四周。", "constellation": "✦ {receiver}的星座 · {date} ✦", "wishes": { "love": ["愿你被爱的程度，和你爱别人一样多。", "愿每天早上醒来，都有一个让你微笑的理由。", "愿新的一岁少一点烦恼，睡得好，吃得香。", "愿你一直珍藏的梦想，今年都能实现。", "愿你知道，你是我生命里最好的存在。", "愿明年的生日，我能就在你身边。"], "friend": ["愿你今年还是那么逗，但是有钱很多。", "愿截止日期对你温柔，工资节节高升。", "愿你遇到真心疼你的人。", "愿你身体健康，吃不胖，睡得香。", "愿我们再做很多很多年的好朋友。", "愿你难过的时候，记得还有我。"], "family": ["愿家里永远温暖又充实。", "愿总有人问候你，提醒你按时吃饭。", "愿前方的每条路都平坦又平安。", "愿你不管长多大，总有一个可以回去的地方。", "愿今年少些辛苦，多些快乐。", "愿我们永远是彼此的依靠。"] } }, "ui": { "months": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], "monthLabel": "{month}月", "heartTapHint": "轻触爱心查看照片 ♡", "viewPhoto": "查看照片", "tapToClose": "轻触关闭", "languageLabel": "语言" } }, "th": { "senderName": "ฉัน", "receiverName": "เธอ", "opening": { "subtitle": "my bestfriend", "continueLabel": "ต่อไป", "greeting": "สุขสันต์วันเกิด", "day": 20, "month": 12 }, "intro": { "line1": "มีของขวัญชิ้นเล็ก ๆ สำหรับเธออยู่ตรงนี้…", "line2": "แต่ก่อนจะเปิด เป่าเทียนให้ดับก่อนนะ 🎂", "idleHint": "👆 กดค้างที่เปลวเทียนจนกว่ามันจะดับ", "holdingHint": "กดต่ออีกนิด… ใกล้แล้ว…", "lightingHint": "กำลังจุดเทียนให้เธออยู่…" }, "voice": { "notice": "เดี๋ยวนะ… มีเทปเล็ก ๆ ที่อัดไว้ให้เธอคนเดียว 📼", "kicker": "เทปม้วนนี้สำหรับเธอ", "title": "มีบางเรื่องที่เขียนออกมาไม่ได้ เลยอัดเสียงไว้ให้…", "hint": "กดปุ่ม ▶ บนเครื่องเพื่อฟังข้อความนะ อย่าลืมเปิดเสียง 🔊", "playing": "กำลังเล่น… ฟังให้จบนะ ทุกคำมาจากใจจริง 💛", "ended": "ขอบคุณที่ฟังจนจบนะ 💛", "play": "เล่น", "pause": "หยุด", "next": "ยังมีอีกนะ →" }, "age": { "kicker": "อายุใหม่", "title": "{age} ปีแล้วนะ!", "days": "= อยู่บนโลกมา {days} วัน", "laughs": "= หัวเราะไปประมาณ {laughs} ครั้ง", "closing": "อายุ {age} ขอให้ยังเป็นตัวเองแบบนี้ แค่มีความสุขขึ้นอีกนิด", "fallbackTitle": "โตขึ้นอีกปีแล้ว 🎉", "fallbackClosing": "อายุใหม่ ขอให้ยังเป็นตัวเองแบบนี้ แค่มีความสุขขึ้นอีกนิด", "next": "เซอร์ไพรส์ถัดไป →" }, "heart": { "caption": "รูปแฉเหล่านี้เก็บไว้อย่างดีเลยนะ 😌", "title": "สุขสันต์วันเกิด{,receiver}!", "subtitle": "วันนี้เธอคือตัวเอก 🎈", "next": "มีจดหมายมาให้ →" }, "letter": { "kicker": "จดหมายสั้น ๆ", "body": "ฉันไม่เก่งเรื่องคำพูดสวยหรู เลยขอพูดง่าย ๆ ว่า สุขสันต์วันเกิดนะ\n\nปีที่ผ่านมาคงไม่ง่ายเลย แต่เธอก็มาถึงวันนี้ได้ — เธอเข้มแข็งกว่าที่ตัวเองคิดมากเลยนะ\n\nฉันแค่อยากให้เธอกินอิ่ม นอนหลับพอ กังวลให้น้อยลงสักนิด และจำไว้ว่ามีคนอยู่ตรงนี้เสมอเมื่อเธอต้องการ", "signature": "— {sender}", "next": "ยังมีอีกนะ →", "flipHint": "แตะโปสการ์ดเพื่อพลิกดูด้านหลัง ↻", "to": "ถึง", "certTitle": "รับรองอายุใหม่", "certUnit": "ปี", "certFallback": "อายุใหม่", "zoomHint": "แตะแสตมป์เพื่อดูรูปใหญ่ ✦" }, "hug": { "idleHint": "👆 วางมือแล้วกดค้างไว้นะ", "next": "ยังมีคำอธิษฐานอีกข้อ →", "love": { "prompt": "ครึ่งหนึ่งอยู่กับฉัน อีกครึ่งอยู่กับเธอ… กดค้างไว้ให้กลับมาเป็นหนึ่งเดียวนะ", "holdingHint": "ใกล้อีกนิด… ได้ยินหัวใจฉันไหม…", "done": "เห็นไหม กลับมาเป็นหนึ่งแล้ว ไกลแค่ไหน หัวใจฉันก็อยู่ข้างเธอ" }, "friend": { "prompt": "ไปฉลองด้วยไม่ได้… งั้นชนกำปั้นผ่านหน้าจอกันนะ!", "holdingHint": "เตรียม… 1… 2…", "done": "ปัง! ชนแล้ว สุขสันต์วันเกิดนะ เพื่อนรัก!" }, "family": { "prompt": "ปีนี้เราไม่ได้อยู่ด้วยกัน… มาเกี่ยวก้อยสัญญากันสักข้อนะ", "holdingHint": "เกี่ยวให้แน่นๆ…", "done": "สัญญาแล้วนะ อยู่ที่ไหน เราก็ยังเป็นบ้านของกันและกัน" } }, "thanks": { "teaser": "อีกเรื่องสุดท้าย…", "line": "ขอบคุณที่เกิดมานะ", "repeat": "ดูอีกครั้งตั้งแต่ต้น" }, "wish": { "kicker": "อธิษฐาน", "title": "หลับตาลง… แล้วอธิษฐานสักข้อสำหรับปีใหม่ของชีวิตนะ", "subtitle": "เขียนลงในกระดาษแผ่นนี้ แล้วฉันจะพับเป็นดาวให้เธอ", "slipHeader": "คำอธิษฐานวันเกิด ✨", "placeholder": "เช่น ปีนี้อยากกล้าทำตามความฝันของตัวเองมากขึ้น…", "fold": "พับเป็นดาว ⭐", "skip": "เก็บคำอธิษฐานไว้ในใจ" }, "jar": { "kicker": "โหลดาวแห่งคำอธิษฐาน", "tag": "ถึง{receiver} ♡", "lastHint": "ยังเหลือดาวดวงสุดท้าย… ดวงที่ฉันเก็บไว้จนถึงตอนจบ ✨", "lastHeader": "สิ่งที่ฉันอยากบอกที่สุด…", "lastWish": "ขอบคุณที่อยู่ตรงนี้เสมอนะ ปีใหม่ของชีวิตนี้จะเป็นยังไง ฉันก็จะอยู่ข้างๆ เธอแบบนี้", "landed": "ดาวของเธออยู่ในโหลแล้วนะ ✨", "intro": "ในโหลยังมีดาวอีก {n} ดวงที่ฉันพับไว้ให้เธอ… แต่ละดวงคือคำอธิษฐานที่ฉันขอให้เธอ", "tapHint": "แตะดาวทีละดวงเพื่อเปิดอ่านนะ ⭐", "progress": "เปิดแล้ว {read}/{n} ดวง", "fromSender": "ฉันขอให้เธอ…", "yours": "คำอธิษฐานของเธอ", "secret": "คำอธิษฐานลับ 🤫", "close": "พับกลับ ⭐", "later": "เก็บที่เหลือไว้อ่านทีหลัง →", "finaleTitle": "สุขสันต์วันเกิด{,receiver} ✨", "finaleLine": "ตั้งแต่คืนนี้ บนฟ้ามีกลุ่มดาวของเธอเอง คำอธิษฐานของเธออยู่ตรงกลาง และคำอธิษฐานที่ฉันขอให้เธออยู่รอบๆ", "constellation": "✦ กลุ่มดาวของ{receiver} · {date} ✦", "wishes": { "love": ["ขอให้เธอได้รับความรักมากเท่าที่เธอรักทุกคน", "ขอให้ทุกเช้ามีเหตุผลให้เธอยิ้ม", "ขอให้ปีนี้เธอกังวลน้อยลง นอนหลับสบาย กินอร่อย", "ขอให้ความฝันที่เธอเก็บไว้เป็นจริงในปีนี้", "ขอให้เธอรู้ว่าเธอคือสิ่งที่ดีที่สุดในชีวิตฉัน", "ขอให้วันเกิดปีหน้า ฉันได้อยู่ข้างๆ เธอ"], "friend": ["ขอให้ปีนี้ยังบ้าบอเหมือนเดิม แต่รวยขึ้นเยอะๆ", "ขอให้เดดไลน์ใจดี เงินเดือนขึ้นรัวๆ", "ขอให้เจอคนที่รักเธอจริงๆ", "ขอให้แข็งแรง กินไม่อ้วน นอนหลับเป็นตาย", "ขอให้เรายังเป็นเพื่อนรักกันไปอีกนานแสนนาน", "ขอให้ตอนเศร้า เธอจำได้ว่ายังมีฉันอยู่"], "family": ["ขอให้บ้านอบอุ่นและอิ่มเอมเสมอ", "ขอให้มีคนคอยถามไถ่และเตือนให้กินข้าวตรงเวลา", "ขอให้ทุกเส้นทางข้างหน้าราบรื่นและปลอดภัย", "ขอให้ไม่ว่าจะโตแค่ไหน ก็ยังมีที่ให้กลับมาเสมอ", "ขอให้ปีนี้เหนื่อยน้อยลง มีความสุขมากขึ้น", "ขอให้เราเป็นที่พึ่งของกันและกันตลอดไป"] } }, "ui": { "months": ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"], "monthLabel": "{monthName}", "heartTapHint": "แตะที่หัวใจเพื่อดูรูปภาพ ♡", "viewPhoto": "ดูรูปภาพ", "tapToClose": "แตะเพื่อปิด", "languageLabel": "ภาษา" } }, "de": { "senderName": "ich", "receiverName": "dich", "opening": { "subtitle": "my bestfriend", "continueLabel": "Weiter", "greeting": "Alles Gute zum Geburtstag", "day": 20, "month": 12 }, "intro": { "line1": "Hier ist ein kleines Geschenk für dich…", "line2": "Aber bevor du es öffnest, blas zuerst die Kerze aus 🎂", "idleHint": "👆 Halte die Flamme gedrückt, bis sie erlischt", "holdingHint": "halt noch durch… gleich geschafft…", "lightingHint": "ich zünde die Kerze für dich an…" }, "voice": { "notice": "Moment… da ist eine kleine Kassette, nur für dich aufgenommen 📼", "kicker": "Eine Kassette nur für dich", "title": "Manches konnte ich nicht aufschreiben – also habe ich es aufgenommen…", "hint": "Drück ▶ am Player, um die Nachricht zu hören – Ton an 🔊", "playing": "Läuft… hör bis zum Ende, jedes Wort kommt von Herzen 💛", "ended": "Danke, dass du bis zum Schluss zugehört hast 💛", "play": "Abspielen", "pause": "Pause", "next": "Da kommt noch was →" }, "age": { "kicker": "Neues Lebensjahr", "title": "{age} Jahre, ganz offiziell!", "days": "= {days} Tage auf dieser Welt", "laughs": "= ungefähr {laughs} Lacher", "closing": "Mit {age} — bleib genau so, wie du bist, nur ein bisschen glücklicher.", "fallbackTitle": "Ein Jahr mehr 🎉", "fallbackClosing": "Neues Jahr — bleib genau so, wie du bist, nur ein bisschen glücklicher.", "next": "Nächste Überraschung →" }, "heart": { "caption": "Diese peinlichen Fotos habe ich gut aufbewahrt 😌", "title": "Alles Gute zum Geburtstag{,receiver}!", "subtitle": "Heute bist du die Hauptfigur 🎈", "next": "Da ist ein Brief für dich →" }, "letter": { "kicker": "Ein kleiner Brief", "body": "Ich bin nicht gut in schönen Worten, also sag ich es einfach: alles Gute zum Geburtstag.\n\nDieses Jahr war bestimmt nicht leicht, und trotzdem bist du bis hierher gekommen — du bist stärker, als du denkst.\n\nIch wünsche mir nur, dass du gut isst, genug schläfst, dir etwas weniger Sorgen machst und daran denkst, dass immer jemand da ist, wenn du ihn brauchst.", "signature": "— {sender}", "next": "Es gibt noch mehr →", "flipHint": "Tipp auf die Postkarte, um sie umzudrehen ↻", "to": "An", "certTitle": "Offiziell ein Jahr älter", "certUnit": "Jahre", "certFallback": "Neues Jahr", "zoomHint": "Tipp auf die Briefmarke, um das Foto groß zu sehen ✦" }, "hug": { "idleHint": "👆 Hand auflegen und halten", "next": "Noch ein Wunsch →", "love": { "prompt": "Eine Hälfte ist bei mir, eine bei dir … halt hier, damit es wieder eins wird.", "holdingHint": "noch ein bisschen näher … spürst du mein Herz?", "done": "Siehst du, wieder ganz. Egal wie weit, mein Herz ist bei dir." }, "friend": { "prompt": "Ich kann nicht vorbeikommen … also Faust-Check durch den Bildschirm!", "holdingHint": "Anlauf … 1 … 2 …", "done": "Bumm! Check. Alles Gute zum Geburtstag, du Lieblingsmensch!" }, "family": { "prompt": "Dieses Jahr sind wir nicht zusammen … also lass uns etwas mit dem kleinen Finger versprechen.", "holdingHint": "ganz fest einhaken …", "done": "Versprochen: Wo wir auch sind, wir bleiben füreinander Zuhause." } }, "thanks": { "teaser": "Eine letzte Sache …", "line": "Danke, dass es dich gibt.", "repeat": "Nochmal von vorn" }, "wish": { "kicker": "Wünsch dir was", "title": "Schließ die Augen … und wünsch dir etwas für das neue Lebensjahr", "subtitle": "Schreib es auf diesen Zettel, ich falte ihn dir zu einem Stern.", "slipHeader": "mein Geburtstagswunsch ✨", "placeholder": "z. B. dieses Jahr möchte ich mutiger für meine Träume sein …", "fold": "Zu einem Stern falten ⭐", "skip": "Meinen Wunsch für mich behalten" }, "jar": { "kicker": "Ein Glas voller Wünsche", "tag": "für {receiver} ♡", "lastHint": "Ein letzter Stern … den habe ich mir bis zum Schluss aufgehoben ✨", "lastHeader": "was ich dir am meisten sagen will …", "lastWish": "Danke, dass du immer da bist. Was auch immer dein neues Jahr bringt, ich bleibe genau so an deiner Seite.", "landed": "Dein Stern liegt jetzt im Glas ✨", "intro": "Darin sind noch {n} Sterne, die ich für dich gefaltet habe … jeder ist ein Wunsch für dich.", "tapHint": "Tipp jeden Stern an, um ihn zu öffnen ⭐", "progress": "{read}/{n} Sterne geöffnet", "fromSender": "Ich wünsche dir …", "yours": "dein Wunsch", "secret": "Ein geheimer Wunsch 🤫", "close": "Wieder zufalten ⭐", "later": "Den Rest für später aufheben →", "finaleTitle": "Alles Gute zum Geburtstag{,receiver} ✨", "finaleLine": "Ab heute gibt es dort oben ein Sternbild nur für dich: dein Wunsch in der Mitte, meine Wünsche für dich rundherum.", "constellation": "✦ Ein Sternbild für {receiver} · {date} ✦", "wishes": { "love": ["Dass du immer so sehr geliebt wirst, wie du andere liebst.", "Dass dir jeder Morgen einen Grund zum Lächeln schenkt.", "Dass du dieses Jahr weniger grübelst, gut schläfst und gut isst.", "Dass die Träume, an denen du festhältst, dieses Jahr wahr werden.", "Dass du weißt: Du bist das Schönste in meinem Leben.", "Dass ich am nächsten Geburtstag direkt neben dir bin."], "friend": ["Dass du so verrückt bleibst wie immer, nur viel reicher.", "Dass Deadlines nett zu dir sind und dein Gehalt steigt.", "Dass du jemanden triffst, der dich ehrlich liebt.", "Dass du gesund bleibst, alles isst und schläfst wie ein Baby.", "Dass wir noch viele, viele Jahre beste Freunde bleiben.", "Dass du, wenn du traurig bist, weißt: Du hast mich."], "family": ["Dass es zu Hause immer warm und reichlich ist.", "Dass immer jemand nachfragt und dich ans Essen erinnert.", "Dass jeder Weg vor dir eben und sicher ist.", "Dass es, egal wie groß du wirst, immer einen Ort zum Heimkommen gibt.", "Dass dieses Jahr leichter und voller Freude wird.", "Dass wir immer füreinander da sind."] } }, "ui": { "months": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], "monthLabel": "{monthName}", "heartTapHint": "Berühre das Herz, um die Fotos zu sehen ♡", "viewPhoto": "Foto ansehen", "tapToClose": "Zum Schließen tippen", "languageLabel": "Sprache" } }, "fr": { "senderName": "moi", "receiverName": "toi", "opening": { "subtitle": "my bestfriend", "continueLabel": "Continuer", "greeting": "Joyeux anniversaire", "day": 20, "month": 12 }, "intro": { "line1": "Il y a un petit cadeau pour toi ici…", "line2": "Mais avant de l'ouvrir, souffle d'abord la bougie 🎂", "idleHint": "👆 Appuie et garde le doigt sur la flamme jusqu'à ce qu'elle s'éteigne", "holdingHint": "continue… encore un peu…", "lightingHint": "j'allume la bougie pour toi…" }, "voice": { "notice": "Attends… une petite cassette a été enregistrée rien que pour toi 📼", "kicker": "Une cassette rien que pour toi", "title": "Il y a des choses que je n'arrivais pas à écrire, alors je les ai enregistrées…", "hint": "Appuie sur ▶ pour écouter le message — monte le son 🔊", "playing": "Lecture… écoute jusqu'au bout, chaque mot est sincère 💛", "ended": "Merci d'avoir écouté jusqu'au bout 💛", "play": "Écouter", "pause": "Pause", "next": "Ce n'est pas fini →" }, "age": { "kicker": "Nouvel âge", "title": "{age} ans, officiellement !", "days": "= {days} jours sur cette planète", "laughs": "= environ {laughs} fous rires", "closing": "À {age} ans — reste exactement toi, juste un peu plus heureux·se.", "fallbackTitle": "Une année de plus 🎉", "fallbackClosing": "Nouvelle année — reste exactement toi, juste un peu plus heureux·se.", "next": "Surprise suivante →" }, "heart": { "caption": "J'ai gardé précieusement toutes ces photos gênantes 😌", "title": "Joyeux anniversaire{,receiver} !", "subtitle": "Aujourd'hui, c'est toi la star 🎈", "next": "Il y a une lettre pour toi →" }, "letter": { "kicker": "Une petite lettre", "body": "Je ne suis pas doué pour les belles phrases, alors je fais simple : joyeux anniversaire.\n\nCette année n'a sûrement pas été facile, et pourtant te voilà arrivé jusqu'ici — tu es plus fort que tu ne le crois.\n\nJe souhaite juste que tu manges bien, que tu dormes assez, que tu t'inquiètes un peu moins, et que tu te souviennes qu'il y a toujours quelqu'un ici quand tu en as besoin.", "signature": "— {sender}", "next": "Ce n'est pas fini →", "flipHint": "Touche la carte pour la retourner ↻", "to": "À", "certTitle": "Officiellement un an de plus", "certUnit": "ans", "certFallback": "Nouvel âge", "zoomHint": "Touche le timbre pour voir la photo en grand ✦" }, "hug": { "idleHint": "👆 Pose ta main et maintiens", "next": "Encore un vœu →", "love": { "prompt": "Une moitié est avec moi, l'autre avec toi… maintiens ici pour les réunir.", "holdingHint": "encore un peu plus près… tu sens mon cœur ?", "done": "Voilà, de nouveau entier. Si loin soit-il, mon cœur est près de toi." }, "friend": { "prompt": "Je ne peux pas venir fêter ça… alors check du poing à travers l'écran !", "holdingHint": "prends de l'élan… 1… 2…", "done": "Boum ! Check. Joyeux anniversaire, bestie !" }, "family": { "prompt": "Cette année on n'est pas ensemble… alors faisons une promesse du petit doigt.", "holdingHint": "accroche bien fort…", "done": "Promis : où qu'on soit, on reste la maison l'un de l'autre." } }, "thanks": { "teaser": "Une dernière chose…", "line": "Merci d'être né·e.", "repeat": "Revoir depuis le début" }, "wish": { "kicker": "Fais un vœu", "title": "Ferme les yeux… et fais un vœu pour ta nouvelle année", "subtitle": "Écris-le sur ce papier, je le plierai en étoile pour toi.", "slipHeader": "mon vœu d'anniversaire ✨", "placeholder": "ex. cette année, j'aimerais oser davantage pour mes rêves…", "fold": "Le plier en étoile ⭐", "skip": "Garder mon vœu pour moi" }, "jar": { "kicker": "Un bocal à vœux", "tag": "pour {receiver} ♡", "lastHint": "Il reste une dernière étoile… celle que j'ai gardée pour la fin ✨", "lastHeader": "ce que je veux te dire le plus…", "lastWish": "Merci d'être toujours là. Quoi que t'apporte cette nouvelle année, je resterai à tes côtés, comme maintenant.", "landed": "Ton étoile est dans le bocal maintenant ✨", "intro": "Il reste {n} étoiles que j'ai pliées pour toi… chacune est un vœu que j'ai fait pour toi.", "tapHint": "Touche chaque étoile pour l'ouvrir ⭐", "progress": "{read}/{n} étoiles ouvertes", "fromSender": "Je te souhaite…", "yours": "ton vœu", "secret": "Un vœu secret 🤫", "close": "La replier ⭐", "later": "Garder les autres pour plus tard →", "finaleTitle": "Joyeux anniversaire{,receiver} ✨", "finaleLine": "Dès ce soir, il y a là-haut une constellation rien qu'à toi : ton vœu au milieu, et mes vœux pour toi tout autour.", "constellation": "✦ Une constellation pour {receiver} · {date} ✦", "wishes": { "love": ["Que tu sois toujours aimé·e autant que tu aimes les autres.", "Que chaque matin t'offre une raison de sourire.", "Que cette année tu t'inquiètes moins, dormes bien et manges bien.", "Que les rêves que tu gardes au fond de toi se réalisent cette année.", "Que tu saches que tu es ce qu'il y a de plus beau dans ma vie.", "Qu'à ton prochain anniversaire, je sois juste à côté de toi."], "friend": ["Que tu restes aussi fou·folle cette année, mais beaucoup plus riche.", "Que les deadlines soient douces avec toi et ton salaire grimpe.", "Que tu rencontres quelqu'un qui t'aime sincèrement.", "Que tu restes en forme, manges de tout et dormes comme un bébé.", "Qu'on reste meilleurs amis encore très, très longtemps.", "Que quand tu es triste, tu te rappelles que tu m'as."], "family": ["Que la maison soit toujours chaleureuse et bien remplie.", "Qu'il y ait toujours quelqu'un pour prendre de tes nouvelles et te rappeler de manger.", "Que chaque chemin devant toi soit doux et sûr.", "Que, même en grandissant, tu aies toujours un endroit où revenir.", "Que cette année soit plus légère et pleine de joie.", "Qu'on reste toujours le pilier l'un de l'autre."] } }, "ui": { "months": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"], "monthLabel": "{monthName}", "heartTapHint": "Touche le cœur pour voir les photos ♡", "viewPhoto": "Voir la photo", "tapToClose": "Touche pour fermer", "languageLabel": "Langue" } }, "es": { "senderName": "yo", "receiverName": "ti", "opening": { "subtitle": "my bestfriend", "continueLabel": "Continuar", "greeting": "Feliz cumpleaños", "day": 20, "month": 12 }, "intro": { "line1": "Aquí hay un pequeño regalo para ti…", "line2": "Pero antes de abrirlo, sopla primero la vela 🎂", "idleHint": "👆 Mantén pulsada la llama hasta que se apague", "holdingHint": "aguanta un poco más… ya casi…", "lightingHint": "estoy encendiendo la vela para ti…" }, "voice": { "notice": "Espera… hay un pequeño casete grabado solo para ti 📼", "kicker": "Un casete solo para ti", "title": "Hay cosas que no supe escribir, así que las grabé…", "hint": "Pulsa ▶ en el reproductor para escuchar el mensaje — sube el volumen 🔊", "playing": "Reproduciendo… escúchalo hasta el final, cada palabra es sincera 💛", "ended": "Gracias por escuchar hasta el final 💛", "play": "Escuchar", "pause": "Pausa", "next": "Aún hay más →" }, "age": { "kicker": "Nueva edad", "title": "¡{age} años, oficialmente!", "days": "= {days} días en este planeta", "laughs": "= unas {laughs} carcajadas", "closing": "A los {age} — sigue siendo tú, solo un poquito más feliz.", "fallbackTitle": "Un año más 🎉", "fallbackClosing": "Nuevo año — sigue siendo tú, solo un poquito más feliz.", "next": "Siguiente sorpresa →" }, "heart": { "caption": "Guardé muy bien todas estas fotos vergonzosas 😌", "title": "¡Feliz cumpleaños{,receiver}!", "subtitle": "Hoy tú eres protagonista 🎈", "next": "Hay una carta para ti →" }, "letter": { "kicker": "Una pequeña carta", "body": "No se me dan bien las palabras bonitas, así que lo diré sencillo: feliz cumpleaños.\n\nEste último año no debe de haber sido fácil, y aun así aquí estás — eres más fuerte de lo que crees.\n\nSolo deseo que comas bien, duermas lo suficiente, te preocupes un poco menos y recuerdes que siempre hay alguien aquí cuando lo necesites.", "signature": "— {sender}", "next": "Todavía hay más →", "flipHint": "Toca la postal para darle la vuelta ↻", "to": "Para", "certTitle": "Oficialmente un año más", "certUnit": "años", "certFallback": "Nueva edad", "zoomHint": "Toca el sello para ver la foto en grande ✦" }, "hug": { "idleHint": "👆 Pon tu mano y mantén", "next": "Un deseo más →", "love": { "prompt": "Una mitad está conmigo y la otra contigo… mantén aquí para unirlas.", "holdingHint": "un poco más cerca… ¿sientes mi corazón?", "done": "Listo, otra vez uno. Por lejos que esté, mi corazón está a tu lado." }, "friend": { "prompt": "No puedo ir a celebrarlo contigo… ¡así que choquemos puños a través de la pantalla!", "holdingHint": "toma impulso… 1… 2…", "done": "¡Pum! Chocados. ¡Feliz cumple, bestie!" }, "family": { "prompt": "Este año no podemos estar juntos… así que hagamos una promesa de meñique.", "holdingHint": "engancha fuerte…", "done": "Prometido: estemos donde estemos, seguimos siendo el hogar del otro." } }, "thanks": { "teaser": "Una última cosa…", "line": "Gracias por haber nacido.", "repeat": "Ver de nuevo" }, "wish": { "kicker": "Pide un deseo", "title": "Cierra los ojos… y pide un deseo para tu nuevo año", "subtitle": "Escríbelo en este papelito y lo doblaré en una estrella para ti.", "slipHeader": "mi deseo de cumpleaños ✨", "placeholder": "p. ej. este año quiero ser más valiente con mis sueños…", "fold": "Doblarlo en una estrella ⭐", "skip": "Guardar mi deseo para mí" }, "jar": { "kicker": "Un frasco de deseos", "tag": "para {receiver} ♡", "lastHint": "Queda una última estrella… la que guardé para el final ✨", "lastHeader": "lo que más quiero decirte…", "lastWish": "Gracias por estar siempre aquí. Pase lo que pase este nuevo año, seguiré a tu lado, igual que ahora.", "landed": "Tu estrella ya está en el frasco ✨", "intro": "Aquí dentro hay {n} estrellas más que doblé para ti… cada una es un deseo que pedí por ti.", "tapHint": "Toca cada estrella para abrirla ⭐", "progress": "{read}/{n} estrellas abiertas", "fromSender": "Te deseo…", "yours": "tu deseo", "secret": "Un deseo secreto 🤫", "close": "Volver a doblarla ⭐", "later": "Guardar el resto para después →", "finaleTitle": "Feliz cumpleaños{,receiver} ✨", "finaleLine": "Desde esta noche hay allá arriba una constelación solo tuya: tu deseo en el centro y mis deseos para ti a su alrededor.", "constellation": "✦ Una constelación para {receiver} · {date} ✦", "wishes": { "love": ["Que siempre te quieran tanto como tú quieres a los demás.", "Que cada mañana te dé un motivo para sonreír.", "Que este año te preocupes menos, duermas bien y comas rico.", "Que los sueños que guardas se cumplan este año.", "Que sepas que eres lo mejor de mi vida.", "Que el próximo cumpleaños pueda estar justo a tu lado."], "friend": ["Que sigas igual de loco este año, pero mucho más rico.", "Que los plazos te traten bien y tu sueldo no pare de subir.", "Que conozcas a alguien que te quiera de verdad.", "Que tengas salud, comas de todo y duermas como un bebé.", "Que sigamos siendo mejores amigos muchos, muchos años más.", "Que cuando estés triste, recuerdes que me tienes a mí."], "family": ["Que en casa siempre haya calor y abundancia.", "Que siempre haya alguien que pregunte cómo estás y te recuerde comer.", "Que cada camino por delante sea llano y seguro.", "Que, por mucho que crezcas, siempre tengas un lugar al que volver.", "Que este año sea más ligero y lleno de alegría.", "Que siempre seamos el apoyo del otro."] } }, "ui": { "months": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"], "monthLabel": "{monthName}", "heartTapHint": "Toca el corazón para ver las fotos ♡", "viewPhoto": "Ver foto", "tapToClose": "Toca para cerrar", "languageLabel": "Idioma" } } };

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
    garland: "images/lovegift-candle/decor/garland-bunting-02-trim.webp",
    cake: "cakememe/cake3.png",
    cakeWriting: true,
    cakeCandle: { x: "50%", y: "28%" },
    cassette: "images/voice-message/cassette-player.webp",
    cakeDecor: {
      balloonCluster: "images/birthday_deccor/balloon-cluster-pastel.webp",
      balloonHeart: "images/birthday_deccor/balloon-heart-pastel.webp",
      partyHat: "images/birthday_deccor/party-hat-pastel.webp",
      birthdayGift: "images/birthday_deccor/birthday-gift-pastel.webp",
      paperPennants: "images/birthday_deccor/paper-pennants-pastel.webp"
    },
    roomDecor: {
      garland: "images/birthday_deccor/trangtri_2/happy-birthday-garland.webp",
      paperChain: "images/birthday_deccor/trangtri_2/paper-chain-ribbons.webp",
      floorBalloons: "images/birthday_deccor/trangtri_2/pastel-floor-balloons.webp",
      greenBalloon: "images/birthday_deccor/trangtri_2/green-striped-balloon.webp",
      goldBalloon: "images/birthday_deccor/trangtri_2/gold-striped-balloon.webp",
      ribbonBow: "images/birthday_deccor/ribbon-bow.webp",
      ribbonCurl: "images/birthday_deccor/ribbon-curl.webp"
    },
    openingPhotos: [
      "images/girl/girl1.jpg",
      "images/girl/girl2.jpg",
      "images/girl/girl3.jpg",
      "images/girl/girl4.jpg"
    ],
    heartConfetti: "images/proposal-certificate/particles/heart-petal-confetti-01.webp",
    sparkle: "images/proposal-certificate/particles/sparkle-confetti-01.webp",
    paper: "images/proposal-certificate/paper/paper-letter-tall-01.webp",
    letterPhoto: "images/girl/girl4.jpg",
    girls: [
      "images/girl/girl1.jpg",
      "images/girl/girl2.jpg",
      "images/girl/girl3.jpg",
      "images/girl/girl4.jpg"
    ],
    petals: [
      "images/secret-bouquet/intro/petal-cream-broad-01.webp",
      "images/secret-bouquet/intro/petal-cream-long-01.webp",
      "images/secret-bouquet/intro/petal-blush-broad-01.webp",
      "images/secret-bouquet/intro/petal-peach-broad-01.webp",
      "images/secret-bouquet/intro/petal-peach-long-01.webp",
      "images/secret-bouquet/intro/petal-peach-long-02.webp",
      "images/secret-bouquet/intro/petal-cream-heart-01.webp"
    ],
    hug: {
      friend: { left: "images/hug/fist-right.webp", right: "images/hug/fist-left.webp", mirrorRight: false, overlap: 2, drop: 0 },
      family: { left: "images/hug/pinky-hand.webp", right: "images/hug/pinky-hand.webp", mirrorRight: true, overlap: 12, drop: 9 }
    },
    voice: "sounds/sound_loi_chuc.mp4",
    music: "music/birthday.mp3"
  };

  const STAGE_SKY = {
    opening: "maroon",
    intro: "candle",
    voice: "room",
    age: "party",
    letter: "golden",
    hug: "lightsoff",
    wish: "lamplight",
    jar: "night",
    thanks: "hush"
  };

  const SKY_LAYERS = ["maroon", "candle", "room", "party", "golden", "lightsoff", "lamplight", "night", "hush"];
  const DARK_SKIES = new Set(["maroon", "candle", "lightsoff", "lamplight", "night", "hush"]);
  const STAGE_VOLUMES = { hug: 0.15, wish: 0.3, jar: 0.2, thanks: 0.1 };

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
    const ageParam = get('age');
    const bondParam = get('bond');
    const lang = get('lang') || get('language') || get('locale') || null;

    let day = 20, month = 12, year = null;
    if (dayParam && monthParam) {
      const d = parseInt(dayParam, 10);
      const m = parseInt(monthParam, 10);
      if (!isNaN(d) && !isNaN(m)) { day = d; month = m; }
    } else if (dateStr) {
      const t = dateStr.trim();
      let m = t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
      if (m) {
        year = Number(m[1]);
        month = Number(m[2]);
        day = Number(m[3]);
      } else if (m = t.match(/^(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{2,4}))?$/)) {
        day = Number(m[1]);
        month = Number(m[2]);
        if (m[3]) year = Number(m[3].length === 2 ? (Number(m[3]) > 30 ? '19' + m[3] : '20' + m[3]) : m[3]);
      }
    }

    let age = 22;
    if (ageParam) {
      const a = parseInt(ageParam, 10);
      if (!isNaN(a) && a > 0) age = a;
    } else if (year) {
      const calculatedAge = new Date().getFullYear() - year;
      if (calculatedAge > 0) age = calculatedAge;
    }

    let bond = 'friend';
    if (bondParam) {
      const b = bondParam.trim().toLowerCase();
      if (['love', 'lover', 'couple', 'partner', 'nguoi-yeu', 'người yêu'].includes(b)) bond = 'love';
      else if (['family', 'sibling', 'brother', 'sister', 'anh-chi-em', 'gia-dinh'].includes(b)) bond = 'family';
      else bond = 'friend';
    }

    return { receiverName, senderName, day, month, year, age, bond, lang, stage: get('stage') };
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
        res = res.replace(/(?<![\p{L}])Cậu(?![\p{L}])/gu, capitalize(rec));
        res = res.replace(/(?<![\p{L}])cậu(?![\p{L}])/gu, rec);
      }
      if (sen) {
        res = res.replace(/(?<![\p{L}])Tớ(?![\p{L}])/gu, capitalize(sen));
        res = res.replace(/(?<![\p{L}])tớ(?![\p{L}])/gu, sen);
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
        res = res.replace(/\{,sender\}/g, `, ${capitalize(sen)}`);
        res = res.replace(/\{sender\}/g, capitalize(sen));
      } else {
        res = res.replace(/\{,sender\}/g, '');
        res = res.replace(/\{sender\}/g, '');
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
    stage: (PARAMS.stage && STAGE_SKY[PARAMS.stage]) ? PARAMS.stage : 'opening', // opening | intro | voice | age | letter | hug | wish | jar | thanks
    langMenuOpen: false,

    // Intro candle
    candleLit: false,
    candleHolding: false,
    candleProgress: 0,
    candleExtinguished: false,

    // Voice
    voicePlaying: false,
    voiceEnded: false,
    voiceShowNext: false,

    // Age
    ageDone: false,

    // Letter
    letterFlipped: false,
    letterDone: false,
    stampZoomOpen: false,

    // Hug
    hugDone: false,

    // Wish
    wishText: '',
    savedWish: null,

    // Jar
    jarOpenedStars: [],
    jarModalData: null,
    jarFinaleVisible: false
  };

  let bgAudio = null;
  let audioContext = null;

  function initAudio() {
    bgAudio = document.getElementById('bg-audio');
    if (!bgAudio) {
      bgAudio = new Audio(IMAGES.music);
      bgAudio.id = 'bg-audio';
      bgAudio.loop = true;
      document.body.appendChild(bgAudio);
    }
    bgAudio.volume = 0.6;

    document.addEventListener('pointerdown', function onFirstTouch() {
      if (bgAudio && bgAudio.paused && state.stage !== 'voice') {
        bgAudio.play().catch(() => { });
      }
    }, { once: true });
  }

  function updateAudioVolume() {
    if (!bgAudio) return;
    if (state.stage === 'voice' && state.voicePlaying) {
      bgAudio.volume = 0;
      return;
    }
    const target = STAGE_VOLUMES[state.stage] ?? 0.6;
    bgAudio.volume = target;
    if (bgAudio.paused && state.stage !== 'voice') {
      bgAudio.play().catch(() => { });
    }
  }

  function getActiveContent() {
    const raw = RAW_CONTENTS[state.locale] || RAW_CONTENTS.vi;
    const cloned = JSON.parse(JSON.stringify(raw));
    cloned.opening.day = PARAMS.day;
    cloned.opening.month = PARAMS.month;
    return deepReplace(cloned, state.locale);
  }

  // Web Audio Synth
  function playHeartbeat(strength = 1) {
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const t = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(62, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.14);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.55 * strength, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (e) { }
  }

  function playChime(freqs, interval = 0.3) {
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const startTime = audioContext.currentTime + 0.02;
      freqs.forEach((freq, i) => {
        const s = startTime + i * interval;
        const dur = (i === freqs.length - 1) ? 1.6 : 0.9;
        [1, 2, 3].forEach(mult => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * mult, s);
          gain.gain.setValueAtTime(0.0001, s);
          gain.gain.exponentialRampToValueAtTime(mult === 1 ? 0.14 : mult === 2 ? 0.04 : 0.015, s + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, s + dur);
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.start(s);
          osc.stop(s + dur + 0.05);
        });
      });
    } catch (e) { }
  }

  // --- TRANSITION TO NEW STAGE ---
  function goToStage(newStage) {
    state.stage = newStage;
    if (newStage === 'letter') {
      state.letterFlipped = false;
      state.letterDone = false;
    }
    render();
    onEnterStage(newStage);
  }
  window.goToStage = goToStage;
  window.state = state;

  // --- RENDER FULL SCREEN ---
  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    const content = getActiveContent();
    const currentSky = STAGE_SKY[state.stage] || 'maroon';
    const isDarkSky = DARK_SKIES.has(currentSky);
    const textColorClass = isDarkSky ? 'text-cream' : 'text-choco';

    let skyEl = document.getElementById('sky-background');
    if (!skyEl) {
      let html = `
        <main id="main-container" class="lovegift-no-select relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-6 transition-colors duration-1000 sm:py-16 ${textColorClass}">
          <!-- Sky Background -->
          <div id="sky-background" aria-hidden="true" class="lg-sky" data-sky="${currentSky}">
            ${SKY_LAYERS.map(l => `<span class="lg-sky-layer lg-sky-layer--${l}"></span>`).join('')}
          </div>

          <!-- Stage Decor (balloons/garlands) -->
          <div id="stage-decor-container">
            ${renderStageDecor()}
          </div>

          <!-- Language Switcher -->
          <div id="lang-switcher-container">
            ${renderLanguageSwitcher(content)}
          </div>

          <!-- Active Stage Content -->
          <div id="stage-content-container" class="w-full flex justify-center">
            ${renderStage(content)}
          </div>
        </main>
      `;
      app.innerHTML = html;
    } else {
      skyEl.setAttribute('data-sky', currentSky);
      const mainEl = document.getElementById('main-container');
      if (mainEl) {
        if (isDarkSky) {
          mainEl.classList.remove('text-choco');
          mainEl.classList.add('text-cream');
        } else {
          mainEl.classList.remove('text-cream');
          mainEl.classList.add('text-choco');
        }
      }
      const decorContainer = document.getElementById('stage-decor-container');
      if (decorContainer) decorContainer.innerHTML = renderStageDecor();
      const langContainer = document.getElementById('lang-switcher-container');
      if (langContainer) langContainer.innerHTML = renderLanguageSwitcher(content);
      const stageContainer = document.getElementById('stage-content-container');
      if (stageContainer) stageContainer.innerHTML = renderStage(content);
    }

    attachStageEvents(content);
    updateAudioVolume();
  }

  // --- STAGE DECOR RENDERER ---
  function renderStageDecor() {
    const s = state.stage;
    const cakeDecor = IMAGES.cakeDecor;
    const roomDecor = IMAGES.roomDecor;

    if (s === 'voice') {
      const items = [
        { src: roomDecor.paperChain, depth: "far", style: "left:50%;top:-4%;transform:translate(-50%,0);width:min(118vw, 760px, 72vh);", tilt: 0, bob: 9, delay: 0, hide: true },
        { src: roomDecor.garland, depth: "mid", style: "left:50%;top:-1%;transform:translate(-50%,0);width:min(62vw, 480px, 38vh);", tilt: 0, bob: 8, delay: 0.15, hide: true },
        { src: roomDecor.greenBalloon, depth: "near", style: "left:-5vw;top:24%;width:clamp(66px, min(20vw, 17vh), 150px);", tilt: -7, bob: 6.6, delay: 0.35 },
        { src: roomDecor.goldBalloon, depth: "near", style: "right:-5vw;top:34%;width:clamp(66px, min(20vw, 17vh), 150px);", tilt: 7, bob: 7.2, delay: 0.5 },
        { src: roomDecor.floorBalloons, depth: "near", style: "left:-7vw;bottom:-4vh;width:min(52vw, 46vh);", tilt: 0, bob: 11, delay: 0.7, hide: true },
        { src: roomDecor.floorBalloons, depth: "near", style: "right:-7vw;bottom:-4vh;width:min(52vw, 46vh);", tilt: 0, flip: true, bob: 12, delay: 0.85, hide: true }
      ];
      return `
        <div aria-hidden="true" class="lg-stage-decor pointer-events-none fixed inset-0 z-0 overflow-hidden">
          ${items.map((it) => `
            <div class="lg-decor-piece lg-depth--${it.depth} ${it.hide ? 'lg-decor--short-hide' : ''}" style="${it.style}animation-delay:${0.35 + it.delay}s;">
              <div class="lg-decor-bob" style="animation-duration:${it.bob}s;animation-delay:${-(3 * it.delay)}s;">
                <img src="${it.src}" alt="" draggable="false" class="block h-auto w-full select-none" style="transform:rotate(${it.tilt}deg)${it.flip ? ' scaleX(-1)' : ''};" />
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (s === 'age') {
      const items = [
        { src: cakeDecor.balloonHeart, depth: "far", style: "left:4%;top:4%;width:clamp(56px, min(15vw, 12vh), 116px);", tilt: -8, bob: 6.4, delay: 0.1 },
        { src: cakeDecor.balloonCluster, depth: "far", style: "right:3%;top:2%;width:clamp(64px, min(17vw, 14vh), 136px);", tilt: 7, flip: true, bob: 7, delay: 0.25 }
      ];
      return `
        <div aria-hidden="true" class="lg-stage-decor pointer-events-none fixed inset-0 z-0 overflow-hidden">
          ${items.map((it) => `
            <div class="lg-decor-piece lg-depth--${it.depth}" style="${it.style}animation-delay:${0.35 + it.delay}s;">
              <div class="lg-decor-bob" style="animation-duration:${it.bob}s;animation-delay:${-(3 * it.delay)}s;">
                <img src="${it.src}" alt="" draggable="false" class="block h-auto w-full select-none" style="transform:rotate(${it.tilt}deg)${it.flip ? ' scaleX(-1)' : ''};" />
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (s === 'letter') {
      const items = [
        { src: roomDecor.ribbonCurl, depth: "mid", style: "right:-4vw;bottom:3%;width:clamp(86px, min(26vw, 20vh), 190px);", tilt: -12, bob: 8, delay: 0.3, hide: true },
        { src: roomDecor.ribbonCurl, depth: "far", style: "left:-6vw;top:4%;width:clamp(70px, min(20vw, 16vh), 150px);", tilt: 160, bob: 9, delay: 0.1 }
      ];
      return `
        <div aria-hidden="true" class="lg-stage-decor pointer-events-none fixed inset-0 z-0 overflow-hidden">
          ${items.map((it) => `
            <div class="lg-decor-piece lg-depth--${it.depth} ${it.hide ? 'lg-decor--short-hide' : ''}" style="${it.style}animation-delay:${0.35 + it.delay}s;">
              <div class="lg-decor-bob" style="animation-duration:${it.bob}s;animation-delay:${-(3 * it.delay)}s;">
                <img src="${it.src}" alt="" draggable="false" class="block h-auto w-full select-none" style="transform:rotate(${it.tilt}deg);" />
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (s === 'wish') {
      const items = [
        { src: cakeDecor.balloonHeart, depth: "far", style: "left:2%;top:9%;width:clamp(52px, min(14vw, 11vh), 104px);", tilt: -6, bob: 7.4, delay: 0.1 },
        { src: cakeDecor.birthdayGift, depth: "mid", style: "right:2%;bottom:3%;width:clamp(52px, min(14vw, 11vh), 104px);", tilt: 10, bob: 6.8, delay: 0.4, hide: true }
      ];
      return `
        <div aria-hidden="true" class="lg-stage-decor pointer-events-none fixed inset-0 z-0 overflow-hidden">
          ${items.map((it) => `
            <div class="lg-decor-piece lg-depth--${it.depth} ${it.hide ? 'lg-decor--short-hide' : ''}" style="${it.style}animation-delay:${0.35 + it.delay}s;">
              <div class="lg-decor-bob" style="animation-duration:${it.bob}s;animation-delay:${-(3 * it.delay)}s;">
                <img src="${it.src}" alt="" draggable="false" class="block h-auto w-full select-none" style="transform:rotate(${it.tilt}deg);" />
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    return '';
  }

  // --- LANGUAGE SWITCHER RENDERER ---
  function renderLanguageSwitcher(content) {
    const curLocale = LOCALES.find(l => l.code === state.locale) || LOCALES[0];
    return `
      <div id="lg-locale-wrap" class="fixed bottom-3 left-3 z-40 font-sans sm:bottom-4 sm:left-4">
        ${state.langMenuOpen ? `
          <div role="listbox" class="lovegift-fade-in absolute bottom-full left-0 mb-2 max-h-[52vh] w-44 overflow-y-auto overscroll-contain rounded-2xl border border-[#c9a24b]/40 bg-[#1a0e07]/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)] backdrop-blur-md">
            ${LOCALES.map(loc => `
              <button type="button" role="option" data-code="${loc.code}" aria-selected="${loc.code === state.locale}" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-cream/85 transition hover:bg-[#f6ead8]/10 ${loc.code === state.locale ? 'bg-[#c9a24b]/20 text-cream' : ''}">
                <span class="text-base leading-none">${loc.flag}</span>
                <span class="flex-1 truncate">${loc.label}</span>
                ${loc.code === state.locale ? '<span class="text-[#e8cf94]">✓</span>' : ''}
              </button>
            `).join('')}
          </div>
        ` : ''}
        <button id="lg-locale-btn" type="button" aria-haspopup="listbox" aria-expanded="${state.langMenuOpen}" aria-label="${content.ui.languageLabel}" title="${content.ui.languageLabel}" class="flex size-9 items-center justify-center gap-2 rounded-full border border-[#c9a24b]/40 bg-[#1a0e07]/70 text-sm sm:size-auto sm:px-4 sm:py-2.5 text-cream/90 shadow-[0_6px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition hover:bg-[#1a0e07]/90">
          <span aria-hidden="true" class="hidden text-base leading-none sm:inline">🌐</span>
          <span class="leading-none">${curLocale.flag}</span>
          <span class="hidden leading-none sm:inline">${curLocale.label}</span>
        </button>
      </div>
    `;
  }

  // --- STAGE RENDERERS ---
  function renderStage(content) {
    switch (state.stage) {
      case 'opening': return renderOpening(content);
      case 'intro': return renderIntro(content);
      case 'voice': return renderVoice(content);
      case 'age': return renderAge(content);
      case 'letter': return renderLetter(content);
      case 'hug': return renderHug(content);
      case 'wish': return renderWish(content);
      case 'jar': return renderJar(content);
      case 'thanks': return renderThanks(content);
      default: return '';
    }
  }

  // 1. OPENING
  function renderOpening(content) {
    const openingPhotos = IMAGES.openingPhotos;
    const photoConfigs = [
      { delay: 0.9, recede: 3.8, rot: 0, origin: "40% 35%", pos: "50% 40%", mpos: "60% 35%", photo: 0 },
      { delay: 3.8, recede: 4.7, rot: -3, origin: "65% 45%", pos: "60% 42%", mpos: "70% 42%", photo: 1 },
      { delay: 4.7, recede: 5.25, rot: 2, origin: "50% 30%", pos: "50% 38%", mpos: "62% 30%", photo: 2 },
      { delay: 5.25, recede: 5.7, rot: -2.5, origin: "35% 25%", pos: "35% 25%", mpos: "30% 25%", photo: 3 },
      { delay: 5.7, recede: 6.15, rot: -2, origin: "30% 60%", pos: "30% 32%", mpos: "28% 28%", photo: 3 },
      { delay: 5.7, recede: 6.15, rot: 2.5, origin: "70% 40%", pos: "60% 30%", mpos: "63% 25%", photo: 2 },
      { delay: 6.15, recede: 7.2, rot: -1.5, origin: "60% 70%", pos: "70% 42%", mpos: "72% 42%", photo: 1 },
      { delay: 6.15, recede: 7.2, rot: 2, origin: "45% 60%", pos: "60% 35%", mpos: "60% 35%", photo: 0 }
    ];

    const bokehs = [
      { x: 12, y: 22, s: 70, delay: 0, dur: 7 },
      { x: 82, y: 16, s: 46, delay: 1.2, dur: 6 },
      { x: 70, y: 72, s: 90, delay: 0.6, dur: 8 },
      { x: 22, y: 78, s: 54, delay: 2, dur: 6.5 },
      { x: 48, y: 12, s: 36, delay: 0.4, dur: 5.5 },
      { x: 92, y: 52, s: 60, delay: 1.6, dur: 7.5 },
      { x: 6, y: 50, s: 42, delay: 2.4, dur: 6 },
      { x: 58, y: 88, s: 48, delay: 1, dur: 7 },
      { x: 36, y: 40, s: 28, delay: 2.8, dur: 5 }
    ];

    const burstBits = Array.from({ length: 22 }, (_, t) => {
      const a = (t / 22) * Math.PI * 2 + (t % 3) * 0.17;
      const r = 20 + ((7 * t) % 5) * 5;
      return {
        dx: `${(Math.cos(a) * r).toFixed(1)}vmin`,
        dy: `${(Math.sin(a) * r * 0.8).toFixed(1)}vmin`,
        rot: `${(47 * t) % 360}deg`,
        shape: t % 3 === 0 ? "strip" : "dot",
        tone: t % 4
      };
    });

    return `
      <section id="opening-section" class="birthday-opening birthday-opening--play" aria-label="Happy Birthday">
        <div class="birthday-warmth" aria-hidden="true"></div>
        <div class="birthday-collage" aria-hidden="true">
          ${photoConfigs.map((cfg, idx) => `
            <div class="birthday-photo birthday-photo--${idx + 1} ${idx === 0 ? 'birthday-photo--hero' : ''}" style="--photo-delay:${cfg.delay}s;--photo-recede:${cfg.recede}s;--photo-rot:${cfg.rot}deg;--kb-origin:${cfg.origin};--photo-position:${cfg.pos};--photo-position-mobile:${cfg.mpos}">
              <img src="${openingPhotos[cfg.photo % openingPhotos.length]}" alt="" draggable="false" loading="eager" />
            </div>
          `).join('')}
        </div>
        <div class="birthday-fx" aria-hidden="true">
          <div class="birthday-opening-shade"></div>
          <div class="birthday-grain"></div>
          ${bokehs.map(b => `<span class="birthday-bokeh" style="left:${b.x}%;top:${b.y}%;width:${b.s}px;height:${b.s}px;--bokeh-delay:${b.delay}s;--bokeh-dur:${b.dur}s"></span>`).join('')}
          <div class="birthday-iris"></div>
          <div class="birthday-gather"></div>
          <div class="birthday-burst">
            ${burstBits.map((bit, idx) => `<span class="birthday-burst-bit birthday-burst-bit--${bit.shape} birthday-burst-bit--tone${bit.tone}" style="--dx:${bit.dx};--dy:${bit.dy};--r:${bit.rot};--i:${idx}"></span>`).join('')}
          </div>
        </div>
        <div class="birthday-title">
          <h1 aria-label="Happy Birthday">
            <span class="birthday-title-small birthday-write" aria-hidden="true">Happy</span>
            <span class="birthday-title-large birthday-write" data-text="Birthday" aria-hidden="true">Birthday</span>
          </h1>
          <p class="birthday-title-note birthday-write">${content.opening.subtitle}</p>
        </div>
        <button id="btn-continue-opening" type="button" class="birthday-continue">
          ${content.opening.continueLabel}<span aria-hidden="true"> ↗</span>
        </button>
      </section>
    `;
  }

  // 2. INTRO
  function renderIntro(content) {
    const c = 2 * Math.PI * 46;
    const fairyBulbs = Array.from({ length: 23 }, (_, t) => {
      const a = t / 22;
      return { x: 100 * a, y: 1.5 + 9 * (1 - Math.pow(2 * a - 1, 2)), delay: (t % 5) * 0.55 };
    });

    return `
      <!-- Top Garland & Fairy Lights -->
      <div id="intro-garland" aria-hidden="true" class="pointer-events-none fixed inset-0 z-[5] overflow-hidden" style="opacity:1;transition:opacity 0.8s ease;">
        <svg class="lg-fairy-wire" viewBox="0 0 100 14" preserveAspectRatio="none">
          <path d="M0 1.5 Q50 19.5 100 1.5" fill="none" stroke="rgba(60,44,40,0.9)" stroke-width="1" vector-effect="non-scaling-stroke"></path>
        </svg>
        ${fairyBulbs.map((b) => `<span class="lg-fairy-bulb" style="left:${b.x}%;top:${b.y}vh;animation-delay:${b.delay}s;"></span>`).join('')}
        <div class="lg-decor-piece lg-depth--far" style="left:50%;top:0;transform:translate(-50%,-66%);width:min(150vw, 1100px);animation-delay:1.55s;">
          <div class="lg-decor-bob" style="animation-duration:9s;">
            <img src="${IMAGES.roomDecor.paperChain}" alt="" draggable="false" class="block h-auto w-full select-none" />
          </div>
        </div>
      </div>

      <!-- Dim overlays -->
      <div id="intro-dim-init" aria-hidden="true" class="pointer-events-none fixed inset-0 z-10 bg-black" style="opacity:0.62;transition:opacity 1.1s ease;"></div>
      <div id="intro-dim-hold" aria-hidden="true" class="pointer-events-none fixed inset-0 z-20 bg-black" style="opacity:0;transition:opacity 0.6s ease;"></div>

      <!-- Cake & Candle Stage -->
      <section class="birthday-candle-stage relative flex w-full max-w-md flex-col items-center">
        <div id="candle-touch-zone" class="relative z-30 mt-3 cursor-pointer touch-none sm:mt-2">
          <div class="lovegift-sway birthday-cake relative" style="--candle-x:50%;--candle-y:28%;">
            <div class="birthday-candle-anchor absolute z-30 -translate-x-1/2">
              <!-- Glow -->
              <div id="candle-glow" aria-hidden="true" class="absolute left-1/2 top-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300" style="width:160px;height:160px;background:radial-gradient(circle, rgba(255,180,90,0.55) 0%, rgba(255,150,60,0.22) 32%, rgba(255,140,50,0) 68%);opacity:0;"></div>

              <!-- SVG progress circle -->
              <svg id="candle-svg-wrap" class="absolute left-1/2 top-[6px] -translate-x-1/2 -translate-y-1/2 -rotate-90" width="104" height="104" style="opacity:0;transition:opacity 0.3s;" aria-hidden="true">
                <circle cx="52" cy="52" r="46" fill="none" stroke="rgba(255,214,150,0.28)" stroke-width="2"></circle>
                <circle id="candle-circle-bar" cx="52" cy="52" r="46" fill="none" stroke="rgba(255,214,150,0.95)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" style="transition:stroke-dashoffset 0.1s linear;"></circle>
              </svg>

              <!-- Candle Flame -->
              <div id="candle-flame-wrap" aria-hidden="true" class="relative mx-auto" style="width:17px;height:30px;opacity:0;transform-origin:50% 100%;transition:opacity 0.45s ease;">
                <div class="absolute inset-0 lovegift-flame">
                  <div class="absolute inset-0" style="background:radial-gradient(62% 58% at 50% 70%, #fff6d6 0%, #ffc45e 42%, #ff8a2a 74%, rgba(255,100,20,0.15) 100%);border-radius:50% 50% 50% 50% / 64% 64% 38% 38%;box-shadow:0 0 16px 5px rgba(255,160,70,0.55), 0 0 34px 10px rgba(255,140,60,0.22);"></div>
                  <div class="absolute left-1/2 -translate-x-1/2" style="bottom:3px;width:7px;height:15px;background:radial-gradient(50% 55% at 50% 65%, #ffffff 0%, #fff4cf 55%, rgba(255,244,207,0) 100%);border-radius:50% 50% 50% 50% / 64% 64% 38% 38%;"></div>
                  <div class="absolute bottom-0 left-1/2 -translate-x-1/2" style="width:8px;height:10px;background:radial-gradient(50% 60% at 50% 72%, #6aa8ff 0%, rgba(106,168,255,0) 78%);border-radius:50%;"></div>
                </div>
              </div>

              <!-- Candle Body -->
              <div id="candle-body" class="relative mx-auto" style="width:13px;height:56px;margin-top:2px;filter:brightness(0.5);transition:filter 1.1s ease;">
                <div class="absolute inset-0" style="border-radius:6px 6px 2px 2px / 4px 4px 2px 2px;background:linear-gradient(90deg, rgba(150,70,90,0.28) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 44%, rgba(255,255,255,0) 60%, rgba(150,70,90,0.32) 100%),repeating-linear-gradient(-35deg, #f58fab 0 4px, #fff6ee 4px 9px);box-shadow:0 0 6px rgba(255,190,140,0.35);"></div>
                <div class="absolute left-0 right-0 top-0" style="height:9px;border-radius:6px 6px 45% 55% / 4px 4px 7px 5px;background:linear-gradient(180deg, #fffaf4 0%, #fde8ec 100%);box-shadow:inset 0 -1px 1px rgba(200,110,130,0.25);"></div>
                <div class="absolute" style="left:2px;top:6px;width:3px;height:9px;border-radius:0 0 3px 3px;background:#fdeef0;"></div>
                <div class="absolute left-1/2 top-[-6px] h-[7px] w-[2px] -translate-x-1/2 rounded-full bg-[#3a2a1a]"></div>
                <div class="absolute left-1/2 -translate-x-1/2" style="bottom:-4px;width:26px;height:7px;border-radius:50%;background:radial-gradient(closest-side, rgba(90,60,60,0.3), rgba(90,60,60,0));z-index:-1;"></div>
              </div>

              <!-- Smoke (hidden initially) -->
              <span id="candle-smoke" aria-hidden="true" class="lovegift-smoke absolute left-1/2 top-[22px] z-40 hidden"></span>

              <!-- Match lighting -->
              <div id="candle-match" class="lovegift-match absolute left-1/2 top-[28px] z-40" aria-hidden="true">
                <div style="width:54px;height:4px;border-radius:2px;transform:rotate(24deg);transform-origin:0 50%;background:linear-gradient(90deg, #cf9f61 0%, #6f4a29 100%);box-shadow:0 1px 2px rgba(0,0,0,0.35);">
                  <div class="lovegift-flame" style="position:absolute;left:-3px;top:-4px;width:7px;height:11px;transform-origin:50% 100%;border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;background:radial-gradient(60% 55% at 50% 68%, #fff3c4 0%, #ffb347 45%, #ff6a1a 85%, rgba(255,90,10,0.2) 100%);box-shadow:0 0 9px 3px rgba(255,140,50,0.7);"></div>
                </div>
              </div>
            </div>

            <!-- Cake Image -->
            <img id="cake-image" src="${IMAGES.cake}" width="1254" height="1254" alt="Bánh sinh nhật" class="relative z-10 w-full select-none" draggable="false" style="filter:brightness(0.42);transition:filter 1.1s ease;" />

            <!-- Cake Writing -->
            <div id="cake-writing" aria-hidden="true" class="birthday-cake-writing pointer-events-none absolute z-20" style="filter:brightness(0.42);transition:filter 1.1s ease;">
              <span class="birthday-cake-writing__title">${content.intro.cakeWriting.title}</span>
              <span class="birthday-cake-writing__wish">${content.intro.cakeWriting.wish}</span>
            </div>
          </div>
        </div>

        <!-- Hints & Instructions -->
        <div id="intro-hints-wrap" class="birthday-intro-in relative z-30 mt-8 flex flex-col items-center text-center sm:mt-12" style="transition:opacity 0.6s ease;">
          <p id="intro-hint-text" class="mt-6 font-script text-lg text-cream/80">${content.intro.lightingHint}</p>
        </div>
      </section>
    `;
  }

  // 3. VOICE (CASSETTE)
  function renderVoice(content) {
    const l = content.voice;
    const notes = [
      { glyph: "♪", x: 0, delay: 0, dur: 2.8 },
      { glyph: "♫", x: 14, delay: 0.9, dur: 3.2 },
      { glyph: "♪", x: -10, delay: 1.8, dur: 3 }
    ];

    return `
      <section class="lg-rise relative z-10 flex w-full max-w-md flex-col items-center pt-[min(21vw,160px,13vh)] text-center tiny:pt-0">
        <audio id="voice-audio" src="${IMAGES.voice}" preload="auto"></audio>
        <p class="lg-ting font-sans text-lg text-choco/80 short:text-base">${l.notice}</p>
        <p class="lg-kicker lg-rise mt-5 short:mt-3" style="animation-delay:0.5s;">${l.kicker}</p>
        <h2 class="lg-rise mt-1 max-w-[21rem] font-serif text-[22px] leading-snug text-choco short:text-[19px]" style="animation-delay:0.7s;">${l.title}</h2>
        <div class="lg-pop mt-6 w-[min(340px,86vw)] short:mt-3 short:w-[min(340px,86vw,34dvh)]" style="animation-delay:1.1s;">
          <div id="cassette-box" class="lg-cassette">
            <img src="${IMAGES.cassette}" alt="" aria-hidden="true" draggable="false" class="block h-auto w-full select-none" />
            <span aria-hidden="true" class="lg-cassette-reel lg-cassette-reel--left"></span>
            <span aria-hidden="true" class="lg-cassette-reel lg-cassette-reel--right"></span>
            <div id="cassette-notes" class="hidden">
              ${notes.map(n => `<span aria-hidden="true" class="lg-cassette-note" style="margin-left:${n.x}px;animation-delay:${n.delay}s;animation-duration:${n.dur}s;">${n.glyph}</span>`).join('')}
            </div>
            <button id="btn-cassette-play" type="button" aria-label="${l.play}" class="lg-cassette-play lg-cassette-play--invite"></button>
            <span id="cassette-finger" aria-hidden="true" class="lg-cassette-finger">👆</span>
          </div>
          <div class="mt-4 flex items-center gap-3 font-sans text-sm text-choco/60 short:mt-2">
            <span id="voice-cur-time" class="w-9 text-left tabular-nums">0:00</span>
            <div class="lg-cassette-track" aria-hidden="true">
              <span id="voice-track-bar" style="width:0%;"></span>
            </div>
            <span id="voice-tot-time" class="w-9 text-right tabular-nums">0:15</span>
          </div>
        </div>
        <p id="voice-status-text" class="lg-rise mt-4 max-w-[20rem] font-sans text-[15px] text-choco/75 short:mt-2 short:text-sm">${l.hint}</p>
        <div id="voice-next-wrap" class="mt-7 transition-all duration-500 short:mt-4 pointer-events-none translate-y-2 opacity-0">
          <button id="btn-voice-next" type="button" class="lg-party-btn">${l.next}</button>
        </div>
      </section>
    `;
  }


  // --- AGE CANDLES & CONFETTI HELPERS ---
  const CANDLE_TINTS = [
    ["#f6e7c1", "#dcc085"],
    ["#f8d3d8", "#e0a0a9"],
    ["#dcd4ef", "#a99ccd"],
    ["#c9deec", "#8eaec8"],
    ["#d9eee2", "#9fc7b0"]
  ];
  const WICK_POSITIONS = [0.5, 0.56, 0.46, 0.48, 0.66, 0.5, 0.44, 0.32, 0.5, 0.55];
  const FONT_ROUNDED = "'Arial Rounded MT Bold', ui-rounded, 'SF Pro Rounded', 'Nunito', system-ui, sans-serif";

  function renderAgeCandleDigit(digit, tintIdx, lit, digitIdx) {
    const [color1, color2] = CANDLE_TINTS[tintIdx % CANDLE_TINTS.length];
    const wickPos = `${100 * (WICK_POSITIONS[digit] !== undefined ? WICK_POSITIONS[digit] : 0.5)}%`;
    const waxPatternId = `wax-digit-${digitIdx}-${Math.random().toString(36).substring(2, 7)}`;

    return `
      <span class="lg-age-candle">
        <svg viewBox="0 0 60 88" aria-hidden="true" class="block h-full w-full overflow-visible">
          <defs>
            <pattern id="${waxPatternId}" width="10" height="10" patternTransform="rotate(-32)" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="${color1}"></rect>
              <rect width="4" height="10" fill="${color2}"></rect>
            </pattern>
          </defs>
          <text x="30" y="80" text-anchor="middle" font-size="82" font-weight="800" font-family="${FONT_ROUNDED}" fill="url(#${waxPatternId})" stroke="rgba(74,44,33,0.32)" stroke-width="1.6" paint-order="stroke">${digit}</text>
          <text x="28.4" y="78.6" text-anchor="middle" font-size="82" font-weight="800" font-family="${FONT_ROUNDED}" fill="rgba(255,255,255,0.28)">${digit}</text>
        </svg>
        <span aria-hidden="true" class="lg-age-wick" style="left:${wickPos};"></span>
        <span aria-hidden="true" class="lg-age-flame-wrap ${lit ? 'lg-age-flame-wrap--lit' : ''}" style="left:${wickPos};transition-delay:${lit ? (0.25 + 0.35 * digitIdx) + 's' : '0s'};">
          <span class="lg-age-flame lovegift-flame" style="animation-delay:${-(0.43 * digitIdx)}s;">
            <span class="lg-age-flame-core"></span>
          </span>
        </span>
      </span>
    `;
  }

  function renderAgeCandles(value, lit) {
    const digits = String(value).split("").map(Number);
    return `
      <span class="lg-age-candles" style="--digits:${digits.length};">
        ${digits.map((d, idx) => renderAgeCandleDigit(d, idx, lit, idx)).join('')}
      </span>
    `;
  }

  const CONFETTI_COLORS = ["#f4b6a6", "#f6d776", "#fbf6ec", "#c98b76", "#ffe0a3", "#4a2c21"];
  const CONFETTI_SHAPES = ["dot", "strip", "heart"];
  const CONFETTI_BITS = Array.from({ length: 34 }, (_, t) => {
    const a = (t / 34) * Math.PI * 2 + (t % 5) * 0.21;
    const r = 22 + ((13 * t) % 7) * 4;
    return {
      dx: `${(Math.cos(a) * r).toFixed(1)}vmin`,
      dy: `${(Math.sin(a) * r * 0.75 - 8).toFixed(1)}vmin`,
      rot: `${(71 * t) % 540}deg`,
      color: CONFETTI_COLORS[t % CONFETTI_COLORS.length],
      shape: CONFETTI_SHAPES[t % CONFETTI_SHAPES.length],
      delay: `${(t % 6) * 18}ms`
    };
  });

  function renderAgeConfetti() {
    return `
      <div aria-hidden="true" class="lg-confetti" style="left:50%;top:38%;">
        ${CONFETTI_BITS.map((b, i) => `
          <span class="lg-confetti-bit lg-confetti-bit--${b.shape}" style="--dx:${b.dx};--dy:${b.dy};--r:${b.rot};--c:${b.color};animation-delay:${b.delay};"></span>
        `).join('')}
      </div>
    `;
  }

  // 4. AGE
  function renderAge(content) {
    const o = content.age;
    const targetAge = PARAMS.age || 22;
    const days = targetAge ? 365 * targetAge + Math.floor(targetAge / 4) : 0;
    const laughs = 1000 * Math.round(17 * days / 1000);
    const nf = new Intl.NumberFormat(state.locale);

    const values = {
      age: String(targetAge),
      days: nf.format(days),
      laughs: nf.format(laughs)
    };

    function replaceVars(tpl, override) {
      if (!tpl) return '';
      const v = override ? { ...values, ...override } : values;
      return tpl.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? _);
    }

    return `
      <section class="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <!-- Flicker Photo Container -->
        <div id="age-flicker-container"></div>

        <p class="lg-kicker lg-rise">${o.kicker}</p>
        <div id="age-number-box" class="lg-age-number" role="img" aria-label="0">
          ${renderAgeCandles(0, false)}
        </div>
        <div id="age-confetti-wrap" class="hidden">
          ${renderAgeConfetti()}
        </div>
        <div class="mt-2 flex min-h-[9.5rem] flex-col items-center gap-1.5">
          <h2 id="age-reveal-title" class="lg-pop font-serif text-[30px] leading-tight text-choco hidden">${replaceVars(o.title)}</h2>
          <p id="age-reveal-days" class="lg-rise font-sans text-lg text-choco/80 hidden">${replaceVars(o.days, { days: '0' })}</p>
          <p id="age-reveal-laughs" class="lg-rise font-sans text-lg text-choco/80 hidden">${replaceVars(o.laughs, { laughs: '0' })}</p>
          <p id="age-reveal-closing" class="lg-rise mt-3 max-w-xs font-hand text-2xl leading-snug text-choco hidden">${replaceVars(o.closing)}</p>
        </div>
        <div id="age-next-wrap" class="mt-6 transition-all duration-500 pointer-events-none translate-y-2 opacity-0">
          <button id="btn-age-next" type="button" class="lg-party-btn">${o.next}</button>
        </div>
      </section>
    `;
  }

  // --- LETTER SEAL SVG HELPER ---
  function renderSealSvg(title, age, unit, fallback, dateFormatted) {
    const sealId = 'seal-' + Math.random().toString(36).substring(2, 8);
    const upperTitle = (title || 'BIRTHDAY CERTIFICATE').toLocaleUpperCase() + ' ✦ ';
    const count = Math.max(1, Math.floor(262 / (8.5 * upperTitle.length)));
    const ringText = upperTitle.repeat(count);
    const fontSize = Math.max(5.2, Math.min(9.5, 262 / ringText.length));

    return `
      <svg viewBox="0 0 172 120" class="lg-seal" aria-hidden="true">
        <defs>
          <path id="${sealId}" d="M 66 60 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0" />
        </defs>
        <path d="M2 44 q 8 -6 16 0 t 16 0 t 16 0 t 16 0" fill="none" stroke="currentColor" stroke-width="2"></path>
        <path d="M2 56 q 8 -6 16 0 t 16 0 t 16 0 t 16 0" fill="none" stroke="currentColor" stroke-width="2"></path>
        <path d="M2 68 q 8 -6 16 0 t 16 0 t 16 0 t 16 0" fill="none" stroke="currentColor" stroke-width="2"></path>
        <circle cx="110" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2.6"></circle>
        <circle cx="110" cy="60" r="53" fill="none" stroke="currentColor" stroke-width="1"></circle>
        <circle cx="110" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="1.4"></circle>
        <text font-size="${fontSize}" font-weight="700" fill="currentColor" dominant-baseline="middle">
          <textPath href="#${sealId}" textLength="262" lengthAdjust="spacing">
            ${ringText}
          </textPath>
        </text>
        ${age ? `
          <text x="110" y="62" text-anchor="middle" font-size="${age > 99 ? 22 : 30}" font-weight="800" fill="currentColor">${age}</text>
          <text x="110" y="77" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">${unit || 'TUỔI'}</text>
        ` : `
          <text x="110" y="66" text-anchor="middle" font-size="28" fill="currentColor">✨</text>
        `}
        <text x="110" y="103" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" letter-spacing="1.5">${dateFormatted}</text>
      </svg>
    `;
  }

  // 5. LETTER
  function renderLetter(content) {
    const l = content.letter;
    const photo = IMAGES.letterPhoto;
    const stampPhoto = IMAGES.girls[1] || IMAGES.girls[0] || photo;
    const dateFormatted = `${String(PARAMS.day).padStart(2, '0')}.${String(PARAMS.month).padStart(2, '0')}`;
    const sealSvg = renderSealSvg(l.certTitle, PARAMS.age || 22, l.certUnit, l.certFallback, dateFormatted);

    return `
      <section class="flex flex-col items-center">
        <div class="lg-postcard">
          <span id="washi-left" aria-hidden="true" class="lg-washi lg-washi--left ${state.letterFlipped ? 'lg-washi--off' : ''}"></span>
          <span id="washi-right" aria-hidden="true" class="lg-washi lg-washi--right ${state.letterFlipped ? 'lg-washi--off' : ''}"></span>
          <div id="postcard-inner" class="lg-postcard-inner ${state.letterFlipped ? 'lg-postcard-inner--flipped' : ''}">
            <!-- Front -->
            <button id="btn-postcard-front" type="button" ${state.letterFlipped ? 'disabled' : ''} aria-label="${l.flipHint}" class="lg-postcard-face lg-postcard-front">
              <img src="${photo}" alt="" draggable="false" class="lg-postcard-photo" />
              <span aria-hidden="true" class="lg-postcard-shade"></span>
              <span class="lg-postcard-greeting">${content.opening.greeting}</span>
              <span class="lg-postcard-date">${dateFormatted}</span>
            </button>
            <!-- Back -->
            <div class="lg-postcard-face lg-postcard-back" aria-hidden="${!state.letterFlipped}">
              <div class="lg-postcard-address">
                <button id="btn-stamp-zoom" type="button" tabindex="${state.letterFlipped ? '0' : '-1'}" aria-label="${l.zoomHint}" class="lg-stamp-area">
                  <span class="lg-stamp">
                    <span class="lg-stamp-inner">
                      <img src="${stampPhoto}" alt="" draggable="false" />
                    </span>
                  </span>
                  <span class="lg-seal-wrap">
                    ${sealSvg}
                  </span>
                </button>
                <div class="min-w-0 flex-1 self-end text-left sm:mt-auto sm:w-full sm:flex-none">
                  <p class="lg-postcard-label">${l.to}</p>
                  <p class="lg-postcard-line truncate font-hand text-[22px] font-bold text-[#3f3530]">${PARAMS.receiverName || 'Cậu'}</p>
                  <p class="lg-postcard-line"></p>
                </div>
              </div>
              <div class="relative min-h-0 flex-1">
                <div id="postcard-text-scroll" class="lovegift-scroll-soft lg-postcard-lines absolute inset-0 cursor-pointer overflow-y-auto overscroll-contain text-left">
                  <p class="relative m-0 whitespace-pre-line font-hand text-[16px] font-semibold text-[#3f3530] [overflow-wrap:anywhere] sm:text-[17px]">
                    <span class="invisible">${l.body}</span>
                    <span id="letter-typed-text" class="absolute inset-0 whitespace-pre-line">${state.letterDone ? l.body : ''}</span>
                    <span id="letter-caret" class="inline-block w-0 align-baseline"></span>
                  </p>
                  <p id="letter-signature" class="m-0 text-right font-hand text-[16px] font-semibold text-[#3f3530] transition-opacity duration-700 [overflow-wrap:anywhere] sm:text-[17px] ${state.letterDone ? 'opacity-100' : 'opacity-0'}">${l.signature}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg-postcard-hint-in mt-4 min-h-[1.25rem]">
          <p id="letter-hint-label" class="lg-rise font-sans text-sm text-choco/70 ${state.letterFlipped && !state.letterDone ? 'invisible' : ''}">${state.letterFlipped ? l.zoomHint : l.flipHint}</p>
        </div>

        <div id="letter-next-wrap" class="mt-4 transition-opacity duration-500 ${state.letterDone ? 'opacity-100' : 'pointer-events-none opacity-0'}">
          <button id="btn-letter-next" type="button" class="lg-party-btn">${l.next}</button>
        </div>
      </section>
    `;
  }

  // 6. HUG
  function renderHug(content) {
    const bond = PARAMS.bond || 'friend';
    const hugData = { ...content.hug, ...content.hug[bond] };
    const photo = IMAGES.girls[1] || IMAGES.girls[0];
    const floaters = [
      { left: 14, size: 14, delay: 0.2, dur: 5.2, drift: 18 },
      { left: 27, size: 10, delay: 1.1, dur: 6, drift: -12 },
      { left: 41, size: 16, delay: 0.6, dur: 5.6, drift: 10 },
      { left: 58, size: 12, delay: 1.6, dur: 6.4, drift: -16 },
      { left: 72, size: 15, delay: 0.4, dur: 5.4, drift: 14 },
      { left: 86, size: 11, delay: 1.3, dur: 6.2, drift: -10 }
    ];
    const colors = ["#f6a0a8", "#f3d27a", "#9fd3c0", "#b9a7e0", "#ffb38a", "#8ec5f0"];

    return `
      <section class="lovegift-fade-in relative flex min-h-[70dvh] w-full max-w-md flex-col items-center justify-center text-center">
        <!-- Warmth overlay -->
        <div id="hug-warmth" aria-hidden="true" class="lg-hug-warmth pointer-events-none fixed inset-0 z-0" style="opacity:0;transition:opacity 0.6s ease;"></div>
        <div id="hug-flash" aria-hidden="true" class="lg-hug-flash pointer-events-none fixed inset-0 z-[2] hidden"></div>
        <div id="hug-floaters" aria-hidden="true" class="pointer-events-none fixed inset-0 z-[2] overflow-hidden hidden">
          ${floaters.map((fl, idx) => `
            <span class="lg-hug-floater lg-hug-confetti absolute" style="left:${fl.left}%;width:${fl.size}px;height:${fl.size * 0.5}px;animation-delay:${fl.delay}s;animation-duration:${fl.dur}s;--drift:${fl.drift}px;background:${colors[idx % colors.length]};"></span>
          `).join('')}
        </div>

        <!-- Glow -->
        <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
          <span id="hug-glow" class="lg-hug-glow" style="opacity:0.15;transform:scale(0.15);transition:transform 0.6s ease, opacity 0.6s ease;"></span>
        </div>

        <!-- Prompt Text -->
        <div id="hug-prompt-wrap" class="relative z-10 grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-1000">
          <div class="overflow-hidden">
            <p class="lg-hug-text max-w-[19rem] text-balance font-hand text-[26px] leading-snug text-cream short:text-[22px] sm:text-[30px]">${hugData.prompt}</p>
          </div>
        </div>

        <!-- Photo Frame -->
        <figure id="hug-photo-fig" aria-hidden="true" class="lg-hug-photo relative z-10 mt-6 short:mt-4" style="filter:brightness(0.32);transition:filter 0.6s ease;">
          <img id="hug-photo-img" src="${photo}" alt="" draggable="false" class="block aspect-[4/5] w-full select-none object-cover" style="filter:blur(10px) grayscale(1);transition:filter 0.6s ease;" />
          <figcaption id="hug-caption" class="lg-hug-caption font-hand">${bond === 'friend' ? '★' : '♡'}</figcaption>
        </figure>

        <!-- Interactive Touch Button (Hands / Heart) -->
        <button id="hug-touch-zone" type="button" class="relative z-20 mt-6 h-36 w-full cursor-pointer touch-none select-none sm:h-40">
          ${bond === 'love' ? `
            <div class="relative mx-auto h-24 w-24">
              <svg id="hug-heart-svg" viewBox="0 0 24 24" class="lg-hug-whole absolute inset-0" style="fill:#f6a0a8;">
                <path d="M12 21.3s-7.6-4.6-10-9.1C.3 8.8 2.2 4.6 6.3 4.6c2.4 0 4.2 1.4 5.7 3.5 1.5-2.1 3.3-3.5 5.7-3.5 4.1 0 6 4.2 4.3 7.6-2.4 4.5-10 9.1-10 9.1z"></path>
              </svg>
            </div>
          ` : `
            <div class="relative mx-auto h-28 w-64">
              <!-- Left Hand -->
              <img id="hug-hand-left" src="${IMAGES.hug[bond] ? IMAGES.hug[bond].left : IMAGES.hug.friend.left}" alt="" draggable="false" class="lg-hug-hand absolute top-1/2 select-none" style="right:calc(50% - 2px);transform:translateY(-50%) translateX(-73px) rotate(-10deg);transition:transform 0.1s linear;" />
              <!-- Right Hand -->
              <img id="hug-hand-right" src="${IMAGES.hug[bond] ? IMAGES.hug[bond].right : IMAGES.hug.friend.right}" alt="" draggable="false" class="lg-hug-hand absolute top-1/2 select-none" style="left:calc(50% - 2px);transform:translateY(-50%) translateX(73px) rotate(10deg)${IMAGES.hug[bond] && IMAGES.hug[bond].mirrorRight ? ' scaleX(-1)' : ''};transition:transform 0.1s linear;" />
              <span id="hug-ring" class="lg-hug-ring absolute left-1/2 top-1/2 hidden"></span>
            </div>
          `}
        </button>

        <!-- Status / Done Message -->
        <div class="relative z-10 mt-8 min-h-[7rem] short:mt-3">
          <p id="hug-hint-label" class="lg-rise font-sans text-[15px] text-cream/70">${hugData.idleHint}</p>
          <p id="hug-done-text" class="lg-hug-text font-hand text-[28px] leading-snug text-cream sm:text-[32px] hidden">${hugData.done}</p>
          <div id="hug-next-wrap" class="mt-8 transition-all duration-700 short:mt-4 pointer-events-none translate-y-2 opacity-0">
            <button id="btn-hug-next" type="button" class="lg-party-btn lg-party-btn--night">${hugData.next}</button>
          </div>
        </div>
      </section>
    `;
  }

  // 7. WISH
  function renderWish(content) {
    const l = content.wish;
    const starPoints = Array.from({ length: 10 }, (_, t) => {
      const a = t % 2 === 0 ? 42 : 21;
      const r = -Math.PI / 2 + (t * Math.PI) / 5;
      return `${(50 + a * Math.cos(r)).toFixed(1)},${(53 + a * Math.sin(r)).toFixed(1)}`;
    }).join(' ');

    return `
      <section class="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div id="wish-header-wrap" class="transition-opacity duration-700">
          <p class="lg-rise lg-kicker lg-kicker--night">${l.kicker}</p>
          <h2 class="lg-rise mt-3 max-w-[22rem] text-balance font-serif text-[26px] leading-snug text-cream short:mt-2 short:text-[22px]">${l.title}</h2>
          <p class="lg-rise mx-auto mt-2 max-w-[21rem] font-sans text-sm leading-relaxed text-cream/70" style="animation-delay:0.3s;">${l.subtitle}</p>
        </div>

        <div class="lg-rise relative mt-6 w-full max-w-[300px] short:mt-4" style="animation-delay:0.5s;">
          <div id="wish-slip-box" class="lg-wish-slip">
            <p class="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#c98a7a]">${l.slipHeader}</p>
            <p id="wish-slip-text" class="mt-2 min-h-[3.2em] whitespace-pre-wrap font-hand text-[21px] leading-[1.5] text-[#5b3f33] [overflow-wrap:anywhere] opacity-35">…</p>
          </div>
          <svg id="wish-star-svg" viewBox="0 0 100 100" class="lg-wish-star-form hidden" aria-hidden="true">
            <polygon points="${starPoints}" fill="#ffd76a" stroke="#ffd76a" stroke-width="14" stroke-linejoin="round"></polygon>
          </svg>
        </div>

        <div id="wish-input-wrap" class="mt-5 w-full max-w-[300px] short:mt-3 transition-opacity duration-500">
          <div class="lg-rise" style="animation-delay:0.8s;">
            <textarea id="wish-textarea" placeholder="${l.placeholder}" rows="3" maxlength="200" class="w-full resize-none rounded-xl border border-[#f6ead8]/25 bg-black/25 px-4 py-3 short:py-2 font-hand text-[17px] leading-snug text-cream placeholder:text-cream/35 focus:border-[#f2dfb0]/70 focus:outline-none" style="user-select:text;-webkit-user-select:text;"></textarea>
            <p class="mt-1 text-right font-sans text-[11px] text-cream/45"><span id="wish-count">0</span>/200</p>
            <div class="mt-3 flex flex-col items-center gap-3 short:mt-2 short:gap-2">
              <button id="btn-fold-star" type="button" class="lg-party-btn lg-party-btn--night" disabled>${l.fold}</button>
              <button id="btn-skip-wish" type="button" class="font-sans text-xs text-cream/70 underline-offset-4 hover:underline">${l.skip}</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 8. JAR
  function renderJar(content) {
    const o = content.jar;
    const bond = PARAMS.bond || 'friend';
    const wishesList = (o.wishes && o.wishes[bond]) ? o.wishes[bond].slice(0, 3) : ["Mong cậu luôn vui vẻ", "Mong cậu luôn bình an", "Mong ước mơ thành hiện thực"];
    const totalWishes = wishesList.length;
    const starColors = ["#f6a0a8", "#9fd3c0", "#b9a7e0", "#ffb38a", "#8ec5f0", "#f7c6d9"];

    const jarPath = "M66 30 V44 C66 60 26 64 26 92 V224 C26 242 38 252 56 252 H144 C162 252 174 242 174 224 V92 C174 64 134 60 134 44 V30 Z";
    const starCoords = [
      { x: 31, y: 72, r: -12 },
      { x: 52, y: 74, r: 8 },
      { x: 71, y: 71, r: -20 },
      { x: 41, y: 62, r: 18 }
    ];

    const starPoints = Array.from({ length: 10 }, (_, t) => {
      const a = t % 2 === 0 ? 42 : 21;
      const r = -Math.PI / 2 + (t * Math.PI) / 5;
      return `${(50 + a * Math.cos(r)).toFixed(1)},${(53 + a * Math.sin(r)).toFixed(1)}`;
    }).join(' ');

    const dateFormatted = new Date(2000, PARAMS.month - 1, PARAMS.day).toLocaleDateString(state.locale, { day: "numeric", month: "long" });

    return `
      <!-- Forest background -->
      <div aria-hidden="true" class="lg-forest pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div class="lg-forest-sky"></div>
        <div class="lg-forest-milkyway"></div>
        <span class="lg-forest-meteor"></span>
      </div>

      <section class="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <p class="lg-rise lg-kicker lg-kicker--night">${o.kicker}</p>
        
        <!-- Jar Scene -->
        <div class="lg-rise lg-jar-scene relative mt-3" style="width:200px;height:260px;margin:20px auto;">
          <!-- SVG Jar -->
          <svg viewBox="0 0 200 260" aria-hidden="true" class="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="lg-jar-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="rgba(170,195,240,0.22)"></stop>
                <stop offset="18%" stop-color="rgba(120,140,200,0.06)"></stop>
                <stop offset="80%" stop-color="rgba(120,140,200,0.06)"></stop>
                <stop offset="100%" stop-color="rgba(170,195,240,0.26)"></stop>
              </linearGradient>
              <radialGradient id="lg-jar-pool" cx="50%" cy="78%" r="60%">
                <stop offset="0%" stop-color="rgba(255,214,130,0.7)"></stop>
                <stop offset="100%" stop-color="rgba(255,214,130,0)"></stop>
              </radialGradient>
            </defs>
            <path d="${jarPath}" fill="url(#lg-jar-glass)"></path>
            <path d="${jarPath}" fill="url(#lg-jar-pool)" class="lg-jar-pool"></path>
            <path d="${jarPath}" fill="none" stroke="rgba(255,244,214,0.92)" stroke-width="2.4" stroke-linejoin="round"></path>
            <rect x="58" y="18" width="84" height="14" rx="6" fill="rgba(170,195,240,0.14)" stroke="rgba(255,244,214,0.92)" stroke-width="2.4"></rect>
          </svg>

          <!-- Pre-folded stars inside jar -->
          ${wishesList.map((wish, idx) => {
      const coord = starCoords[idx % starCoords.length];
      const color = starColors[idx % starColors.length];
      return `
              <button type="button" class="jar-star absolute cursor-pointer transition-transform hover:scale-125" data-idx="${idx}" style="left:${coord.x}%;top:${coord.y}%;transform:translate(-50%,-50%) rotate(${coord.r}deg);width:34px;height:34px;z-index:20;">
                <svg viewBox="0 0 100 100" class="h-full w-full drop-shadow-[0_0_8px_rgba(255,215,106,0.6)]">
                  <polygon points="${starPoints}" fill="${color}" stroke="${color}" stroke-width="10" stroke-linejoin="round"></polygon>
                </svg>
              </button>
            `;
    }).join('')}

          <!-- User's own wish star dropped in -->
          <button type="button" class="jar-star absolute cursor-pointer transition-transform hover:scale-125" data-idx="mine" style="left:50%;top:58%;transform:translate(-50%,-50%);width:38px;height:38px;z-index:25;">
            <svg viewBox="0 0 100 100" class="h-full w-full drop-shadow-[0_0_12px_rgba(255,215,106,0.9)]">
              <polygon points="${starPoints}" fill="#ffd76a" stroke="#ffd76a" stroke-width="12" stroke-linejoin="round"></polygon>
            </svg>
          </button>
        </div>

        <!-- Jar Instruction / Status -->
        <p class="lg-rise mt-3 font-sans text-sm text-cream/80">${o.tapHint}</p>
        <p id="jar-progress-text" class="mt-1 font-sans text-xs text-cream/60">${o.progress.replace('{read}', state.jarOpenedStars.length).replace('{n}', totalWishes)}</p>

        <!-- Finale Constellation Trigger / Next Button -->
        <div class="mt-6 flex flex-col items-center gap-3">
          <button id="btn-jar-finale" type="button" class="lg-party-btn lg-party-btn--night">${o.finaleTitle}</button>
          <div id="jar-constellation-wrap" class="lovegift-fade-in flex flex-col items-center hidden">
            <p class="font-hand text-2xl text-[#f3d27a]">${o.constellation.replace('{date}', dateFormatted)}</p>
            <p class="mt-2 max-w-xs font-sans text-sm text-cream/80">${o.finaleLine}</p>
            <button id="btn-jar-next" type="button" class="lg-party-btn lg-party-btn--night mt-5">${content.voice.next}</button>
          </div>
        </div>

        <!-- Star Note Modal -->
        <div id="jar-star-modal" class="fixed inset-0 z-40 flex items-center justify-center bg-[#0b0f1f]/65 px-6 backdrop-blur-[2px] hidden">
          <div class="lg-jar-note relative rounded-2xl bg-[#fff7ea] p-6 text-center text-[#5b3f33] shadow-2xl max-w-sm w-full" onclick="event.stopPropagation();">
            <p id="jar-modal-header" class="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#c98a7a]"></p>
            <p id="jar-modal-text" class="mt-3 min-h-[4.4em] whitespace-pre-wrap font-hand text-[24px] leading-[1.45] text-[#5b3f33]"></p>
            <p id="jar-modal-footer" class="mt-2 font-sans text-[11px] text-[#5b3f33]/50"></p>
            <button id="btn-close-star-modal" type="button" class="lg-party-btn mt-5">${o.close}</button>
          </div>
        </div>
      </section>
    `;
  }

  // 9. THANKS
  function renderThanks(content) {
    const l = content.thanks;
    return `
      <section class="relative flex min-h-[60dvh] w-full max-w-md flex-col items-center justify-center text-center">
        <p class="lg-thanks-line max-w-[22rem] text-balance font-hand text-[30px] leading-snug text-cream sm:text-[36px]">${l.line}</p>
        <p class="lg-thanks-after mt-6 font-hand text-[22px] text-cream/60" style="animation-delay:6.4s;">${content.letter.signature}</p>
        <div class="lg-thanks-after mt-12" style="animation-delay:8.2s;">
          <button id="btn-thanks-repeat" type="button" class="lg-party-btn lg-party-btn--night">${l.repeat}</button>
        </div>
      </section>
    `;
  }

  // --- ATTACH EVENT HANDLERS ON STAGE LOAD ---
  function attachStageEvents(content) {
    // Language switcher
    const localeBtn = document.getElementById('lg-locale-btn');
    if (localeBtn) {
      localeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.langMenuOpen = !state.langMenuOpen;
        render();
      });
    }

    const localeOptions = document.querySelectorAll('#lg-locale-wrap [role="option"]');
    localeOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = opt.getAttribute('data-code');
        if (code && RAW_CONTENTS[code]) {
          state.locale = code;
          state.langMenuOpen = false;
          render();
        }
      });
    });

    document.addEventListener('pointerdown', (e) => {
      const wrap = document.getElementById('lg-locale-wrap');
      if (wrap && !wrap.contains(e.target) && state.langMenuOpen) {
        state.langMenuOpen = false;
        render();
      }
    }, { once: true });

    // 1. OPENING
    const btnContinue = document.getElementById('btn-continue-opening');
    if (btnContinue) {
      btnContinue.addEventListener('click', () => {
        const sec = document.getElementById('opening-section');
        if (sec) {
          sec.classList.remove('birthday-opening--play');
          sec.classList.add('birthday-opening--leave');
        }
        setTimeout(() => {
          goToStage('intro');
        }, 900);
      });
    }

    // 2. INTRO (Candle Touch - Direct DOM manipulation)
    const candleZone = document.getElementById('candle-touch-zone');
    if (candleZone && state.stage === 'intro') {
      const circleBar = document.getElementById('candle-circle-bar');
      const flameWrap = document.getElementById('candle-flame-wrap');
      const dimHold = document.getElementById('intro-dim-hold');
      const hintText = document.getElementById('intro-hint-text');
      const candleSmoke = document.getElementById('candle-smoke');
      const cakeImg = document.getElementById('cake-image');
      const cakeWriting = document.getElementById('cake-writing');
      const c = 2 * Math.PI * 46;

      let holdStartTime = 0;
      let holdTimer = null;

      function onDown(e) {
        if (!state.candleLit || state.candleExtinguished || state.candleHolding) return;
        state.candleHolding = true;
        holdStartTime = performance.now();
        playHeartbeat(0.8);
        if (hintText) hintText.textContent = content.intro.holdingHint;

        function tick(now) {
          if (!state.candleHolding) return;
          const elapsed = now - holdStartTime;
          const p = Math.min(1, elapsed / 2600);
          state.candleProgress = p;

          // Directly update DOM
          if (circleBar) circleBar.style.strokeDashoffset = c * (1 - p);
          if (dimHold) dimHold.style.opacity = p;
          if (flameWrap) flameWrap.style.transform = `rotate(${22 * p}deg) scaleY(${1 - 0.35 * p})`;
          if (cakeImg) cakeImg.style.opacity = 1 - 0.92 * p;
          if (cakeWriting) cakeWriting.style.opacity = 1 - 0.92 * p;

          if (p >= 1) {
            state.candleHolding = false;
            state.candleExtinguished = true;
            if (circleBar) circleBar.style.strokeDashoffset = 0;
            if (flameWrap) flameWrap.style.opacity = 0;
            if (candleSmoke) candleSmoke.classList.remove('hidden');
            playChime([523.25, 659.25, 783.99], 0.15);

            setTimeout(() => {
              goToStage('voice');
            }, 2400);
            return;
          }
          holdTimer = requestAnimationFrame(tick);
        }
        holdTimer = requestAnimationFrame(tick);
      }

      function onUp() {
        if (state.candleExtinguished) return;
        state.candleHolding = false;
        if (holdTimer) cancelAnimationFrame(holdTimer);
        state.candleProgress = 0;
        if (circleBar) circleBar.style.strokeDashoffset = c;
        if (dimHold) dimHold.style.opacity = 0;
        if (flameWrap) flameWrap.style.transform = 'none';
        if (cakeImg) cakeImg.style.opacity = 1;
        if (cakeWriting) cakeWriting.style.opacity = 1;
        if (hintText && state.candleLit) hintText.textContent = content.intro.idleHint;
      }

      candleZone.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    }

    // 3. VOICE (Cassette Player)
    if (state.stage === 'voice') {
      const voiceAudio = document.getElementById('voice-audio');
      const btnPlay = document.getElementById('btn-cassette-play');
      const btnNext = document.getElementById('btn-voice-next');
      const cassetteBox = document.getElementById('cassette-box');
      const cassetteNotes = document.getElementById('cassette-notes');
      const cassetteFinger = document.getElementById('cassette-finger');
      const curTimeEl = document.getElementById('voice-cur-time');
      const totTimeEl = document.getElementById('voice-tot-time');
      const trackBar = document.getElementById('voice-track-bar');
      const statusText = document.getElementById('voice-status-text');
      const nextWrap = document.getElementById('voice-next-wrap');

      function formatTime(sec) {
        if (!Number.isFinite(sec) || sec < 0) sec = 0;
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
      }

      function showNextButton() {
        if (nextWrap) {
          nextWrap.classList.remove('pointer-events-none', 'translate-y-2', 'opacity-0');
          nextWrap.classList.add('translate-y-0', 'opacity-100');
        }
      }

      // Fallback: show next button after 9s regardless
      setTimeout(showNextButton, 9000);

      if (voiceAudio) {
        voiceAudio.volume = 0.9;
        voiceAudio.onloadedmetadata = () => {
          if (totTimeEl) totTimeEl.textContent = formatTime(voiceAudio.duration);
        };
        voiceAudio.ontimeupdate = () => {
          if (voiceAudio.duration) {
            const p = voiceAudio.currentTime / voiceAudio.duration;
            if (curTimeEl) curTimeEl.textContent = formatTime(voiceAudio.currentTime);
            if (trackBar) trackBar.style.width = (p * 100) + '%';
          }
        };
        voiceAudio.onended = () => {
          state.voicePlaying = false;
          state.voiceEnded = true;
          if (cassetteBox) cassetteBox.classList.remove('lg-cassette--playing');
          if (cassetteNotes) cassetteNotes.classList.add('hidden');
          if (btnPlay) btnPlay.classList.remove('lg-cassette-play--down');
          if (statusText) statusText.textContent = content.voice.ended;
          updateAudioVolume();
          showNextButton();
        };
        voiceAudio.onerror = () => {
          showNextButton();
        };
      }

      if (btnPlay && voiceAudio) {
        btnPlay.addEventListener('click', () => {
          if (voiceAudio.paused) {
            voiceAudio.play().then(() => {
              state.voicePlaying = true;
              if (cassetteBox) cassetteBox.classList.add('lg-cassette--playing');
              if (cassetteNotes) cassetteNotes.classList.remove('hidden');
              if (cassetteFinger) cassetteFinger.classList.add('hidden');
              btnPlay.classList.add('lg-cassette-play--down');
              btnPlay.classList.remove('lg-cassette-play--invite');
              if (statusText) statusText.textContent = content.voice.playing;
              updateAudioVolume();
            }).catch(() => {
              showNextButton();
            });
          } else {
            voiceAudio.pause();
            state.voicePlaying = false;
            if (cassetteBox) cassetteBox.classList.remove('lg-cassette--playing');
            if (cassetteNotes) cassetteNotes.classList.add('hidden');
            btnPlay.classList.remove('lg-cassette-play--down');
            if (statusText) statusText.textContent = content.voice.hint;
            updateAudioVolume();
          }
        });
      }

      if (btnNext) {
        btnNext.addEventListener('click', () => {
          if (voiceAudio) voiceAudio.pause();
          state.voicePlaying = false;
          updateAudioVolume();
          goToStage('age');
        });
      }
    }

    // 4. AGE
    const btnAgeNext = document.getElementById('btn-age-next');
    if (btnAgeNext && state.stage === 'age') {
      btnAgeNext.addEventListener('click', () => {
        goToStage('letter');
      });
    }

    // 5. LETTER
    if (state.stage === 'letter') {
      const btnFront = document.getElementById('btn-postcard-front');
      const innerCard = document.getElementById('postcard-inner');
      const washiL = document.getElementById('washi-left');
      const washiR = document.getElementById('washi-right');
      const btnZoom = document.getElementById('btn-stamp-zoom');
      const typedTextEl = document.getElementById('letter-typed-text');
      const sigEl = document.getElementById('letter-signature');
      const hintLabel = document.getElementById('letter-hint-label');
      const nextWrap = document.getElementById('letter-next-wrap');
      const scrollBox = document.getElementById('postcard-text-scroll');
      const btnLetterNext = document.getElementById('btn-letter-next');
      const fullText = content.letter.body;

      if (btnFront) {
        btnFront.addEventListener('click', () => {
          if (state.letterFlipped) return;
          state.letterFlipped = true;
          if (innerCard) innerCard.classList.add('lg-postcard-inner--flipped');
          if (washiL) washiL.classList.add('lg-washi--off');
          if (washiR) washiR.classList.add('lg-washi--off');

          setTimeout(() => {
            // Start at the top of the letter each time it is opened.
            if (scrollBox) scrollBox.scrollTop = 0;

            const startTime = performance.now();
            const totalChars = fullText.length;
            const speed = Math.max(33, totalChars / 42);

            // Scroll only when the newest typed character reaches the lower edge
            // of the visible letter area. This avoids jumping to the bottom early.
            function keepTypedLineVisible() {
              if (!scrollBox || !typedTextEl) return;
              const textNode = typedTextEl.firstChild;
              if (!textNode || !textNode.length) return;

              let charIndex = textNode.length - 1;
              while (charIndex > 0 && /\s/.test(textNode.textContent.charAt(charIndex))) {
                charIndex--;
              }

              const range = document.createRange();
              range.setStart(textNode, charIndex);
              range.setEnd(textNode, Math.min(charIndex + 1, textNode.length));
              const charRect = range.getBoundingClientRect();
              const boxRect = scrollBox.getBoundingClientRect();
              if (!charRect || !boxRect.height) return;

              const safeBottom = boxRect.bottom - 18;
              if (charRect.bottom > safeBottom) {
                scrollBox.scrollTop += charRect.bottom - safeBottom + 6;
              } else if (charRect.top < boxRect.top + 6) {
                scrollBox.scrollTop -= (boxRect.top + 6) - charRect.top;
              }
            }

            function step(now) {
              if (state.letterDone) return;
              const count = Math.min(totalChars, Math.floor(((now - startTime) / 1000) * speed));
              if (typedTextEl) typedTextEl.textContent = fullText.slice(0, count);
              if (count > 0) keepTypedLineVisible();

              if (count < totalChars) {
                requestAnimationFrame(step);
              } else {
                finishLetter();
              }
            }
            requestAnimationFrame(step);
          }, 900);
        });
      }

      function finishLetter() {
        if (state.letterDone) return;
        state.letterDone = true;
        if (typedTextEl) typedTextEl.textContent = fullText;
        if (sigEl) {
          sigEl.classList.remove('opacity-0');
          sigEl.classList.add('opacity-100');
        }
        if (hintLabel) {
          hintLabel.classList.remove('invisible');
          hintLabel.textContent = content.letter.zoomHint;
        }
        if (nextWrap) {
          nextWrap.classList.remove('pointer-events-none', 'opacity-0');
          nextWrap.classList.add('opacity-100');
        }

        // Wait for the full text and signature to render, then reveal the final line.
        if (scrollBox) {
          requestAnimationFrame(() => {
            scrollBox.scrollTop = scrollBox.scrollHeight;
            requestAnimationFrame(() => {
              if (scrollBox.isConnected) {
                scrollBox.scrollTop = scrollBox.scrollHeight;
              }
            });
          });
        }
      }

      if (scrollBox) {
        scrollBox.addEventListener('click', () => {
          if (state.letterFlipped && !state.letterDone) {
            finishLetter();
          }
        });
      }

      if (btnZoom) {
        btnZoom.addEventListener('click', (e) => {
          e.stopPropagation();
          const stampPhoto = IMAGES.girls[1] || IMAGES.girls[0] || IMAGES.letterPhoto;
          const dateFormatted = `${String(PARAMS.day).padStart(2, '0')}.${String(PARAMS.month).padStart(2, '0')}`;
          const sealSvg = renderSealSvg(content.letter.certTitle, PARAMS.age || 22, content.letter.certUnit, content.letter.certFallback, dateFormatted);

          let modal = document.getElementById('stamp-zoom-modal');
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'stamp-zoom-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', content.letter.certTitle);
            modal.className = 'lg-stamp-zoom';
            modal.innerHTML = `
              <div class="lg-stamp-zoom-card">
                <span class="lg-stamp lg-stamp--large">
                  <span class="lg-stamp-inner">
                    <img src="${stampPhoto}" alt="" draggable="false" />
                  </span>
                </span>
                <span class="lg-seal-wrap lg-seal-wrap--large">
                  ${sealSvg}
                </span>
              </div>
              <p class="mt-14 font-sans text-sm text-cream/80">${content.ui.tapToClose}</p>
            `;
            function closeModal() {
              window.removeEventListener('keydown', onEsc);
              if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
            }
            function onEsc(evt) {
              if (evt.key === 'Escape') closeModal();
            }
            modal.addEventListener('click', closeModal);
            window.addEventListener('keydown', onEsc);
            document.body.appendChild(modal);
          }
        });
      }

      if (btnLetterNext) {
        btnLetterNext.addEventListener('click', () => {
          const modal = document.getElementById('stamp-zoom-modal');
          if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
          goToStage('hug');
        });
      }
    }

    // 6. HUG
    if (state.stage === 'hug') {
      const touchZone = document.getElementById('hug-touch-zone');
      const handL = document.getElementById('hug-hand-left');
      const handR = document.getElementById('hug-hand-right');
      const heartSvg = document.getElementById('hug-heart-svg');
      const hugGlow = document.getElementById('hug-glow');
      const hugWarmth = document.getElementById('hug-warmth');
      const hugFlash = document.getElementById('hug-flash');
      const hugFloaters = document.getElementById('hug-floaters');
      const photoFig = document.getElementById('hug-photo-fig');
      const photoImg = document.getElementById('hug-photo-img');
      const captionEl = document.getElementById('hug-caption');
      const promptWrap = document.getElementById('hug-prompt-wrap');
      const hintLabel = document.getElementById('hug-hint-label');
      const doneText = document.getElementById('hug-done-text');
      const nextWrap = document.getElementById('hug-next-wrap');
      const ring = document.getElementById('hug-ring');
      const btnHugNext = document.getElementById('btn-hug-next');
      const bond = PARAMS.bond || 'friend';
      const hugData = { ...content.hug, ...content.hug[bond] };

      let holdStartTime = 0;
      let holdTimer = null;
      let pulseTimer = null;

      function onDown() {
        if (state.hugDone || state.hugHolding) return;
        state.hugHolding = true;
        holdStartTime = performance.now();
        playHeartbeat(1);
        if (hintLabel) hintLabel.textContent = hugData.holdingHint;
        if (hugGlow) hugGlow.classList.add('lg-hug-glow--beating');

        pulseTimer = setInterval(() => {
          playHeartbeat(0.9);
        }, 860);

        function tick(now) {
          if (!state.hugHolding) return;
          const p = Math.min(1, (now - holdStartTime) / 4000);
          const H = 1 - p;

          // Directly update DOM
          if (handL) handL.style.transform = `translateY(-50%) translateX(${-H * 73}px) rotate(${-H * 10}deg)`;
          if (handR) handR.style.transform = `translateY(-50%) translateX(${H * 73}px) rotate(${H * 10}deg)${IMAGES.hug[bond] && IMAGES.hug[bond].mirrorRight ? ' scaleX(-1)' : ''}`;
          if (hugGlow) {
            hugGlow.style.opacity = 0.15 + 0.85 * p;
            hugGlow.style.transform = `scale(${0.15 + 3.25 * p})`;
          }
          if (hugWarmth) hugWarmth.style.opacity = p;
          if (photoFig) photoFig.style.filter = `brightness(${0.32 + 0.68 * p})`;
          if (photoImg) photoImg.style.filter = `blur(${10 * H}px) grayscale(${H})`;

          if (p >= 1) {
            state.hugHolding = false;
            state.hugDone = true;
            if (pulseTimer) clearInterval(pulseTimer);
            if (hugFlash) hugFlash.classList.remove('hidden');
            if (hugFloaters) hugFloaters.classList.remove('hidden');
            if (ring) ring.classList.remove('hidden');
            if (captionEl) captionEl.classList.add('lg-hug-caption--in');
            if (promptWrap) {
              promptWrap.classList.remove('grid-rows-[1fr]');
              promptWrap.classList.add('grid-rows-[0fr]', 'opacity-0');
            }
            if (hintLabel) hintLabel.classList.add('hidden');
            if (doneText) doneText.classList.remove('hidden');
            playChime([440, 587.33, 659.25, 783.99], 0.12);

            setTimeout(() => {
              if (nextWrap) {
                nextWrap.classList.remove('pointer-events-none', 'translate-y-2', 'opacity-0');
                nextWrap.classList.add('translate-y-0', 'opacity-100');
              }
            }, 2500);
            return;
          }
          holdTimer = requestAnimationFrame(tick);
        }
        holdTimer = requestAnimationFrame(tick);
      }

      function onUp() {
        if (state.hugDone) return;
        state.hugHolding = false;
        if (holdTimer) cancelAnimationFrame(holdTimer);
        if (pulseTimer) clearInterval(pulseTimer);
        if (hintLabel) hintLabel.textContent = hugData.idleHint;
        if (hugGlow) {
          hugGlow.classList.remove('lg-hug-glow--beating');
          hugGlow.style.opacity = 0.15;
          hugGlow.style.transform = 'scale(0.15)';
        }
        if (hugWarmth) hugWarmth.style.opacity = 0;
        if (photoFig) photoFig.style.filter = 'brightness(0.32)';
        if (photoImg) photoImg.style.filter = 'blur(10px) grayscale(1)';
        if (handL) handL.style.transform = 'translateY(-50%) translateX(-73px) rotate(-10deg)';
        if (handR) handR.style.transform = `translateY(-50%) translateX(73px) rotate(10deg)${IMAGES.hug[bond] && IMAGES.hug[bond].mirrorRight ? ' scaleX(-1)' : ''}`;
      }

      if (touchZone) {
        touchZone.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
      }

      if (btnHugNext) {
        btnHugNext.addEventListener('click', () => {
          goToStage('wish');
        });
      }
    }

    // 7. WISH
    if (state.stage === 'wish') {
      const textarea = document.getElementById('wish-textarea');
      const countEl = document.getElementById('wish-count');
      const slipText = document.getElementById('wish-slip-text');
      const btnFold = document.getElementById('btn-fold-star');
      const btnSkip = document.getElementById('btn-skip-wish');
      const slipBox = document.getElementById('wish-slip-box');
      const starSvg = document.getElementById('wish-star-svg');
      const headerWrap = document.getElementById('wish-header-wrap');
      const inputWrap = document.getElementById('wish-input-wrap');

      if (textarea) {
        textarea.addEventListener('input', (e) => {
          state.wishText = e.target.value.slice(0, 200);
          if (countEl) countEl.textContent = state.wishText.length;
          if (slipText) {
            slipText.textContent = state.wishText || '…';
            slipText.classList.toggle('opacity-35', !state.wishText);
          }
          if (btnFold) btnFold.disabled = !state.wishText.trim();
        });
      }

      function doFold(wish) {
        state.savedWish = wish;
        if (headerWrap) headerWrap.classList.add('opacity-0');
        if (inputWrap) inputWrap.classList.add('pointer-events-none', 'opacity-0');
        if (slipBox) slipBox.classList.add('lg-wish-slip--fold');
        if (starSvg) starSvg.classList.remove('hidden');
        playChime([659.25, 783.99], 0.14);

        setTimeout(() => {
          goToStage('jar');
        }, 2600);
      }

      if (btnFold) btnFold.addEventListener('click', () => doFold(state.wishText.trim()));
      if (btnSkip) btnSkip.addEventListener('click', () => doFold(null));
    }

    // 8. JAR
    if (state.stage === 'jar') {
      const o = content.jar;
      const bond = PARAMS.bond || 'friend';
      const wishesList = (o.wishes && o.wishes[bond]) ? o.wishes[bond].slice(0, 3) : ["Mong cậu luôn vui vẻ", "Mong cậu luôn bình an", "Mong ước mơ thành hiện thực"];
      const stars = document.querySelectorAll('.jar-star');
      const modal = document.getElementById('jar-star-modal');
      const modalHeader = document.getElementById('jar-modal-header');
      const modalText = document.getElementById('jar-modal-text');
      const modalFooter = document.getElementById('jar-modal-footer');
      const btnCloseModal = document.getElementById('btn-close-star-modal');
      const btnFinale = document.getElementById('btn-jar-finale');
      const constellationWrap = document.getElementById('jar-constellation-wrap');
      const progressText = document.getElementById('jar-progress-text');
      const btnJarNext = document.getElementById('btn-jar-next');

      stars.forEach(btn => {
        btn.addEventListener('click', () => {
          const idxKey = btn.getAttribute('data-idx');
          let header = o.fromSender;
          let text = "";
          let footer = "";

          if (idxKey === 'mine') {
            header = o.yours;
            text = state.savedWish || o.secret;
          } else {
            const idx = parseInt(idxKey, 10);
            if (!state.jarOpenedStars.includes(idx)) {
              state.jarOpenedStars.push(idx);
              if (progressText) {
                progressText.textContent = o.progress.replace('{read}', state.jarOpenedStars.length).replace('{n}', wishesList.length);
              }
            }
            text = wishesList[idx] || "Mong cậu luôn hạnh phúc!";
            footer = `★ ${idx + 1}/${wishesList.length}`;
          }

          if (modalHeader) modalHeader.textContent = header;
          if (modalFooter) modalFooter.textContent = footer;
          if (modal) modal.classList.remove('hidden');

          playChime([523.25, 659.25], 0.15);

          // Typewriter in modal
          let startTime = performance.now();
          function typeModal(now) {
            const chars = Math.min(text.length, Math.floor(((now - startTime) / 1000) * 35));
            if (modalText) modalText.textContent = text.slice(0, chars);
            if (chars < text.length) {
              requestAnimationFrame(typeModal);
            }
          }
          requestAnimationFrame(typeModal);
        });
      });

      if (btnCloseModal && modal) {
        btnCloseModal.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', () => modal.classList.add('hidden'));
      }

      if (btnFinale && constellationWrap) {
        btnFinale.addEventListener('click', () => {
          btnFinale.classList.add('hidden');
          constellationWrap.classList.remove('hidden');
          playChime([392, 523.25, 659.25, 783.99], 0.2);
        });
      }

      if (btnJarNext) {
        btnJarNext.addEventListener('click', () => {
          goToStage('thanks');
        });
      }
    }

    // 9. THANKS
    const btnRepeat = document.getElementById('btn-thanks-repeat');
    if (btnRepeat && state.stage === 'thanks') {
      btnRepeat.addEventListener('click', () => {
        state.candleLit = false;
        state.candleProgress = 0;
        state.candleExtinguished = false;
        state.candleHolding = false;
        goToStage('intro');
      });
    }
  }

  // --- ACTIONS TRIGGERED ON ENTERING A STAGE ---
  function onEnterStage(stage) {
    if (stage === 'intro') {
      // Light candle after 1850ms
      setTimeout(() => {
        if (state.stage === 'intro') {
          state.candleLit = true;
          const matchEl = document.getElementById('candle-match');
          const flameWrap = document.getElementById('candle-flame-wrap');
          const candleGlow = document.getElementById('candle-glow');
          const svgWrap = document.getElementById('candle-svg-wrap');
          const candleBody = document.getElementById('candle-body');
          const cakeImg = document.getElementById('cake-image');
          const cakeWriting = document.getElementById('cake-writing');
          const dimInit = document.getElementById('intro-dim-init');
          const hintsWrap = document.getElementById('intro-hints-wrap');
          const content = getActiveContent();

          if (matchEl) matchEl.classList.add('hidden');
          if (flameWrap) flameWrap.style.opacity = 1;
          if (candleGlow) candleGlow.style.opacity = 0.75;
          if (svgWrap) svgWrap.style.opacity = 0.28;
          if (candleBody) candleBody.style.filter = 'brightness(1)';
          if (cakeImg) cakeImg.style.filter = 'brightness(1)';
          if (cakeWriting) cakeWriting.style.filter = 'brightness(1)';
          if (dimInit) dimInit.style.opacity = 0;

          if (hintsWrap) {
            hintsWrap.innerHTML = `
              <p class="lg-rise font-serif text-2xl text-cream" style="animation-delay:0.3s;">${content.intro.line1}</p>
              <p class="lg-rise mt-2 font-sans text-base text-cream/75" style="animation-delay:1.4s;">${content.intro.line2}</p>
              <p id="intro-hint-text" class="lg-rise mt-6 font-sans text-sm text-cream/75" style="animation-delay:2.3s;">${content.intro.idleHint}</p>
            `;
          }
        }
      }, 1850);
    }


    if (stage === 'age') {
      const targetAge = PARAMS.age || 22;
      const days = targetAge ? 365 * targetAge + Math.floor(targetAge / 4) : 0;
      const laughs = 1000 * Math.round(17 * days / 1000);
      const nf = new Intl.NumberFormat(state.locale);

      const numBox = document.getElementById('age-number-box');
      const flickerContainer = document.getElementById('age-flicker-container');
      const confettiWrap = document.getElementById('age-confetti-wrap');
      const revTitle = document.getElementById('age-reveal-title');
      const revDays = document.getElementById('age-reveal-days');
      const revLaughs = document.getElementById('age-reveal-laughs');
      const revClosing = document.getElementById('age-reveal-closing');
      const nextWrap = document.getElementById('age-next-wrap');
      const girls = Array.isArray(IMAGES.girls) ? IMAGES.girls.filter(Boolean) : [];

      const content = getActiveContent();
      const o = content.age;

      const duration = 2600;
      let startTime = 0;
      let lastVal = -1;
      let landed = false;
      let photoElement = null;
      let photoSwapTimeout = null;
      const photoTimers = [];

      function stopPhotoSequence() {
        while (photoTimers.length) clearTimeout(photoTimers.pop());
        if (photoSwapTimeout) {
          clearTimeout(photoSwapTimeout);
          photoSwapTimeout = null;
        }
      }

      function showPhoto(photo) {
        if (!photoElement || !photo || landed || state.stage !== 'age') return;
        photoElement.src = photo.src;
        requestAnimationFrame(() => {
          if (photoElement && state.stage === 'age' && !landed) {
            photoElement.style.opacity = '0.68';
          }
        });
      }

      function startPhotoSequence(loadedPhotos) {
        if (!flickerContainer || !loadedPhotos.length || state.stage !== 'age') return;

        // Use one persistent image element. The old .lg-age-flicker CSS animation
        // lasted only 500ms and faded every photo out before the next swap.
        photoElement = document.createElement('img');
        photoElement.alt = '';
        photoElement.setAttribute('aria-hidden', 'true');
        photoElement.draggable = false;
        photoElement.className = 'pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[62vmin] w-[48vmin] select-none rounded-3xl object-cover';
        photoElement.style.animation = 'none';
        photoElement.style.opacity = '0';
        photoElement.style.transition = 'opacity 140ms ease';
        photoElement.style.filter = 'sepia(.08) blur(.2px)';
        photoElement.style.pointerEvents = 'none';
        photoElement.style.willChange = 'opacity';
        flickerContainer.replaceChildren(photoElement);

        // Show the first photo immediately, then each remaining photo once.
        showPhoto(loadedPhotos[0]);

        if (loadedPhotos.length > 1) {
          const photoStep = duration / loadedPhotos.length;
          loadedPhotos.slice(1).forEach((photo, index) => {
            const delay = photoStep * (index + 1);
            const timer = setTimeout(() => {
              if (landed || state.stage !== 'age' || !photoElement) return;
              photoElement.style.opacity = '0';
              photoSwapTimeout = setTimeout(() => {
                showPhoto(photo);
                photoSwapTimeout = null;
              }, 110);
            }, delay);
            photoTimers.push(timer);
          });
        }
      }

      function tickAge(now) {
        if (state.stage !== 'age') {
          stopPhotoSequence();
          return;
        }
        const progress = Math.min(1, (now - startTime) / duration);
        // Ease out cubic
        const easeVal = 1 - Math.pow(1 - progress, 3);
        const cur = Math.round(targetAge * easeVal);

        if (cur !== lastVal) {
          lastVal = cur;
          if (numBox) {
            numBox.setAttribute('aria-label', String(cur));
            numBox.innerHTML = renderAgeCandles(cur, false);
          }
        }

        if (progress < 1) {
          requestAnimationFrame(tickAge);
        } else {
          landed = true;
          stopPhotoSequence();
          if (photoElement) {
            photoElement.style.opacity = '0';
            setTimeout(() => {
              if (photoElement && photoElement.parentNode) photoElement.remove();
            }, 160);
          }

          if (numBox) {
            numBox.setAttribute('aria-label', String(targetAge));
            numBox.classList.add('lg-age-number--landed');
            numBox.innerHTML = renderAgeCandles(targetAge, true);
          }
          if (confettiWrap) confettiWrap.classList.remove('hidden');
          playChime([523.25, 659.25, 783.99, 1046.5], 0.12);

          // Reveal title at 3000ms (400ms after landing)
          setTimeout(() => {
            if (state.stage === 'age' && revTitle) revTitle.classList.remove('hidden');
          }, 400);

          // Reveal days at 3600ms (1000ms after landing) and count up over 1400ms
          setTimeout(() => {
            if (state.stage !== 'age' || !revDays) return;
            revDays.classList.remove('hidden');
            let dStart = performance.now();
            function tickDays(t) {
              if (state.stage !== 'age') return;
              let p = Math.min(1, (t - dStart) / 1400);
              let curD = Math.round(days * (1 - Math.pow(1 - p, 3)));
              revDays.textContent = o.days.replace('{days}', nf.format(curD)).replace('{age}', String(targetAge));
              if (p < 1) requestAnimationFrame(tickDays);
            }
            requestAnimationFrame(tickDays);
          }, 1000);

          // Reveal laughs at 4200ms (1600ms after landing) and count up over 1400ms
          setTimeout(() => {
            if (state.stage !== 'age' || !revLaughs) return;
            revLaughs.classList.remove('hidden');
            let lStart = performance.now();
            function tickLaughs(t) {
              if (state.stage !== 'age') return;
              let p = Math.min(1, (t - lStart) / 1400);
              let curL = Math.round(laughs * (1 - Math.pow(1 - p, 3)));
              revLaughs.textContent = o.laughs.replace('{laughs}', nf.format(curL)).replace('{age}', String(targetAge));
              if (p < 1) requestAnimationFrame(tickLaughs);
            }
            requestAnimationFrame(tickLaughs);
          }, 1600);

          // Reveal closing at 5200ms (2600ms after landing)
          setTimeout(() => {
            if (state.stage === 'age' && revClosing) revClosing.classList.remove('hidden');
          }, 2600);

          // Reveal next button at 6200ms (3600ms after landing)
          setTimeout(() => {
            if (state.stage === 'age' && nextWrap) {
              nextWrap.classList.remove('pointer-events-none', 'translate-y-2', 'opacity-0');
              nextWrap.classList.add('translate-y-0', 'opacity-100');
            }
          }, 3600);
        }
      }

      // Preload all memory photos first. This prevents a late-loading image from
      // being skipped during the short age countdown. Failed paths are ignored.
      const photoLoads = girls.map((src) => new Promise((resolve) => {
        const image = new Image();
        let settled = false;
        const finish = (value) => {
          if (settled) return;
          settled = true;
          resolve(value);
        };
        image.onload = () => finish(image);
        image.onerror = () => finish(null);
        image.src = src;
        if (image.complete) finish(image.naturalWidth > 0 ? image : null);
      }));

      Promise.all(photoLoads).then((results) => {
        if (state.stage !== 'age') return;
        const loadedPhotos = results.filter(Boolean);
        startPhotoSequence(loadedPhotos);
        // Start the number animation after the photos are ready, so every loaded
        // photo gets its full share of the 2.6-second sequence.
        startTime = performance.now();
        requestAnimationFrame(tickAge);
      });
    }
  }

  // --- INIT ---
  function init() {
    initAudio();
    render();
    if (state.stage !== 'opening') {
      onEnterStage(state.stage);
    }

    // Auto advance opening after 8.8s
    setTimeout(() => {
      if (state.stage === 'opening') {
        const sec = document.getElementById('opening-section');
        if (sec) {
          sec.classList.remove('birthday-opening--play');
          sec.classList.add('birthday-opening--leave');
        }
        setTimeout(() => {
          if (state.stage === 'opening') {
            goToStage('intro');
          }
        }, 900);
      }
    }, 8800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
