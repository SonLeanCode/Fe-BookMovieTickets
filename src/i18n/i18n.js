import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Ngôn ngữ": "Language",
          "Tiếng Việt": "Vietnamese",
          "English": "English",
            "ST-FLIX": "ST-FLIX",
            "Mua vé":"Buy sticket"
        },
      },
      vi: {
        translation: {
          "Ngôn ngữ": "Ngôn ngữ",
          "Tiếng Việt": "Tiếng Việt",
          "English": "Tiếng Anh",
           "ST-FLIX": "ST-FLIX",
           "Mua vé":"Mua vé"
        },
      },
    },
    lng: "en", // Ngôn ngữ mặc định
    fallbackLng: "en", // Ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false, // Không thoát ký tự HTML
    },
  });

export default i18n;
