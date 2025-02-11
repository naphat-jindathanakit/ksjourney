// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Language resources
const resources = {
  en: {
    translation: {
      menu: "Menu",
      home: "Home",
      wedding: "Wedding",
      wedding_header: "Kwang & Suea Wedding",
      greeting: "You're Invited to Our Special Day!",
      greeting_message:
        "We are thrilled to share this joyous occasion with you! Join us as we celebrate the union of two hearts, bound together by love and destiny. Your presence will make this day even more memorable.",
      support_us: "Support Us",
      please_upload_payslip:
        "We Appreciate Your Support! Please Share Your Payslip",
      view_full_album: "View Full Album",
      choose_file: "Choose File",
      upload_payslip: "Upload Payslip",
      wedding_comment: "Share Your Wishes",
      submit: "Submit",
      wedding_thankyou: "Thank you for celebrating with us!",
      your_name: "Your Name",
      your_message: "Your Message",
      home_header: "Kwang & Suea Journey",
      home_message: `We are Kwang & Suea, two souls bound by love and destiny. Our journey has been one full of laughter, adventures, and beautiful memories. We are excited to share the next chapter of our story together with you!`,
    },
  },
  th: {
    translation: {
      menu: "เมนู",
      home: "หน้าแรก",
      wedding: "งานแต่ง",
      wedding_header: "กวาง & เสือ แต่งงานแว้ว",
      greeting: "ขอเรียนเชิญทุกท่านร่วมแสดงความยินดีกับวันพิเศษของเรา",
      greeting_message:
        "ยินดีมากๆที่จะเรียนเชิญทุกท่านมาร่วมแสดงความยินดีกับงานแต่งของเรา หวังว่าความน่ารักของเราสองคนจะทำให้ทุกท่านมีความสุข และมีความทรงจำที่ดี",
      support_us: "สนับสนุนเราได้ที่นี่เลย",
      please_upload_payslip:
        "จะเป็นการทราบซึ้งใจอย่างมากหากกรุณาแชร์หลักฐานการสนับสนุนของท่าน",
      view_full_album: "ดูอัลบั้มรูปเยอะๆ กดที่นี่",
      choose_file: "เลือกไฟล์",
      upload_payslip: "อัพโหลดเลย",
      wedding_comment: "เขียนอวยพรเราหน่อยก๊าบบ",
      submit: "ส่งเลย",
      wedding_thankyou: "ขอบคุณที่ร่วมยินดีกับเรา!",
      your_name: "ชื่อของคุณ",
      your_message: "ข้อความของคุณ",
      home_header: "การเดินทางของ กวาง & เสือ",
      home_message: `เราสองคนชื่อ กวาง & เสือ, วิญญาณสองดวงผูกความรักและโชคชะตาของเราไว้ด้วยกัน. การเดินทางของเรานั้นเต็มไปด้วยเสียงหัวเราะ การผจญภัย และความทรงจำที่สวยงาม. รู้สึกตื่นเต้นมากๆ ที่จะได้แชร์ความทรงจำของเราให้กับคุณ`,
    },
  },
};

export const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: "en", // Default language
      fallbackLng: "en", // Fallback language when translation not found
      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
  }
};

export default i18n;
