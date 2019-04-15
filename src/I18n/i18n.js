import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import en from './languages/en.json';


// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    // keySeparator: false, 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;
