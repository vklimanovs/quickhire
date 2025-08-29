import { LanguageOption } from "../Types/Filter";

export const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: { et: "Inglise", en: "English", ru: "Английский" },
    nativeName: "English",
  },
  {
    code: "et",
    name: { et: "Eesti", en: "Estonian", ru: "Эстонский" },
    nativeName: "Eesti",
  },
  {
    code: "ru",
    name: { et: "Vene", en: "Russian", ru: "Русский" },
    nativeName: "Русский",
  },
  {
    code: "fi",
    name: { et: "Soome", en: "Finnish", ru: "Финский" },
    nativeName: "Suomi",
  },
  {
    code: "lv",
    name: { et: "Läti", en: "Latvian", ru: "Латышский" },
    nativeName: "Latviešu",
  },
  {
    code: "lt",
    name: { et: "Leedu", en: "Lithuanian", ru: "Литовский" },
    nativeName: "Lietuvių",
  },
  {
    code: "de",
    name: { et: "Saksa", en: "German", ru: "Немецкий" },
    nativeName: "Deutsch",
  },
  {
    code: "fr",
    name: { et: "Prantsuse", en: "French", ru: "Французский" },
    nativeName: "Français",
  },
  {
    code: "es",
    name: { et: "Hispaania", en: "Spanish", ru: "Испанский" },
    nativeName: "Español",
  },
  {
    code: "it",
    name: { et: "Itaalia", en: "Italian", ru: "Итальянский" },
    nativeName: "Italiano",
  },
  {
    code: "pt",
    name: { et: "Portugali", en: "Portuguese", ru: "Португальский" },
    nativeName: "Português",
  },
  {
    code: "pl",
    name: { et: "Poola", en: "Polish", ru: "Польский" },
    nativeName: "Polski",
  },
  {
    code: "nl",
    name: { et: "Hollandi", en: "Dutch", ru: "Голландский" },
    nativeName: "Nederlands",
  },
  {
    code: "sv",
    name: { et: "Rootsi", en: "Swedish", ru: "Шведский" },
    nativeName: "Svenska",
  },
  {
    code: "no",
    name: { et: "Norra", en: "Norwegian", ru: "Норвежский" },
    nativeName: "Norsk",
  },
  {
    code: "da",
    name: { et: "Taani", en: "Danish", ru: "Датский" },
    nativeName: "Dansk",
  },
  {
    code: "zh",
    name: { et: "Hiina", en: "Chinese", ru: "Китайский" },
    nativeName: "中文",
  },
  {
    code: "ja",
    name: { et: "Jaapani", en: "Japanese", ru: "Японский" },
    nativeName: "日本語",
  },
  {
    code: "ko",
    name: { et: "Korea", en: "Korean", ru: "Корейский" },
    nativeName: "한국어",
  },
  {
    code: "ar",
    name: { et: "Araabia", en: "Arabic", ru: "Арабский" },
    nativeName: "العربية",
  },
  {
    code: "hi",
    name: { et: "Hindi", en: "Hindi", ru: "Хинди" },
    nativeName: "हिन्दी",
  },
  {
    code: "tr",
    name: { et: "Türgi", en: "Turkish", ru: "Турецкий" },
    nativeName: "Türkçe",
  },
  {
    code: "uk",
    name: { et: "Ukraina", en: "Ukrainian", ru: "Украинский" },
    nativeName: "Українська",
  },
  {
    code: "he",
    name: { et: "Heebrea", en: "Hebrew", ru: "Иврит" },
    nativeName: "עברית",
  },
  {
    code: "cs",
    name: { et: "Tšehhi", en: "Czech", ru: "Чешский" },
    nativeName: "Čeština",
  },
  {
    code: "sk",
    name: { et: "Slovaki", en: "Slovak", ru: "Словацкий" },
    nativeName: "Slovenčina",
  },
  {
    code: "hu",
    name: { et: "Ungari", en: "Hungarian", ru: "Венгерский" },
    nativeName: "Magyar",
  },
  {
    code: "ro",
    name: { et: "Rumeenia", en: "Romanian", ru: "Румынский" },
    nativeName: "Română",
  },
  {
    code: "bg",
    name: { et: "Bulgaaria", en: "Bulgarian", ru: "Болгарский" },
    nativeName: "Български",
  },
  {
    code: "hr",
    name: { et: "Horvaadi", en: "Croatian", ru: "Хорватский" },
    nativeName: "Hrvatski",
  },
  {
    code: "sr",
    name: { et: "Serbia", en: "Serbian", ru: "Сербский" },
    nativeName: "Српски",
  },
  {
    code: "sl",
    name: { et: "Sloveeni", en: "Slovenian", ru: "Словенский" },
    nativeName: "Slovenščina",
  },
  {
    code: "is",
    name: { et: "Islandi", en: "Icelandic", ru: "Исландский" },
    nativeName: "Íslenska",
  },
  {
    code: "mt",
    name: { et: "Malta", en: "Maltese", ru: "Мальтийский" },
    nativeName: "Malti",
  },
  {
    code: "ga",
    name: { et: "Iiri", en: "Irish", ru: "Ирландский" },
    nativeName: "Gaeilge",
  },
];

export const getLanguageByCode = (code: string): LanguageOption | undefined => {
  return LANGUAGES.find((lang) => lang.code === code);
};

export const getLocalizedLanguageName = (
  code: string,
  currentLanguage: "et" | "en" | "ru",
): string => {
  if (!code) return "";
  const language = getLanguageByCode(code);
  return language ? language.name[currentLanguage] : code.toUpperCase();
};

export const searchLanguages = (
  query: string,
  currentLanguage: "et" | "en" | "ru",
): LanguageOption[] => {
  const lowercaseQuery = query.toLowerCase();
  return LANGUAGES.filter(
    (lang) =>
      lang.code.toLowerCase().includes(lowercaseQuery) ||
      lang.name[currentLanguage].toLowerCase().includes(lowercaseQuery) ||
      lang.nativeName.toLowerCase().includes(lowercaseQuery),
  );
};
