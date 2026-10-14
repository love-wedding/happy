/**
 * CẤU HÌNH QUÀ TẶNG SINH NHẬT
 * Bạn có thể dễ dàng thay đổi các thông tin dưới đây theo ý muốn.
 */
window.GIFT_CONFIG = {
  // Tên người nhận (ví dụ: "Linh", "Bé Yêu", "Em",...)
  recipientName: "Em Bé 🤍",

  // Tên người gửi (ví dụ: "Anh", "Tớ", "Người thương",...)
  senderName: "Anh nè",

  // Tuổi của người nhận
  age: "24",

  // Ngày sinh nhật (định dạng YYYY-MM-DD)
  birthdayDate: "2002-23-12",

  // Chế độ khóa mở quà:
  // "none": Vào thẳng màn hình bật đèn (khuyên dùng)
  // "countdown": Đếm ngược tới ngày sinh nhật
  // "date": Yêu cầu nhập đúng ngày sinh mới mở quà
  unlockMode: "none",

  // Đường dẫn nhạc nền (file mp3 trong thư mục music)
  musicUrl: "music/birthday.mp3",

  // Lời nhắn trong bức thư tình cảm
  letterBody: "Chúc mừng sinh nhật cậu 🎂\n\nChúc cậu bước sang tuổi mới luôn rực rỡ, bình an và luôn nở nụ cười thật tươi trên môi.\n\nMong rằng mọi dự định và ước mơ của cậu trong năm nay đều sẽ trở thành hiện thực, từng ngày trôi qua đều ngập tràn niềm vui và những điều dịu dàng nhất.\n\nCảm ơn cậu vì đã luôn ở đây và là một món quà tuyệt vời nhất!",

  // Danh sách ảnh kỷ niệm (có thể thêm bớt ảnh trong thư mục images/people/)
  photos: [
    {
      src: "images/people/photo-01.jpeg",
      alt: "Cái mặt giấu sau bàn tay ấy 🤍",
      caption: "Cái mặt giấu sau bàn tay ấy 🤍"
    },
    {
      src: "images/people/photo-02.jpeg",
      alt: "Hướng dương với sáu ngọn nến 🌻",
      caption: "Hướng dương với sáu ngọn nến 🌻"
    },
    {
      src: "images/people/photo-03.jpeg",
      alt: "Lúc đang ước ấy ✨",
      caption: "Lúc đang ước ấy ✨"
    },
    {
      src: "images/people/photo-04.jpeg",
      alt: "Một ngọn nến là đủ rồi 🕯️",
      caption: "Một ngọn nến là đủ rồi 🕯️"
    },
    {
      src: "images/people/photo-05.jpeg",
      alt: "Bưng cả bữa tiệc trên tay 🎂",
      caption: "Bưng cả bữa tiệc trên tay 🎂"
    }
  ]
};
