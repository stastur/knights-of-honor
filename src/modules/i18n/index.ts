import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLocale from "./locales/en.json";

i18n.use(initReactI18next).init({
	lng: "en",
	resources: {
		en: {
			translation: enLocale,
		},
	},
});
