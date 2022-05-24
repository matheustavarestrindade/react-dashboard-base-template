import { useLocalStorage } from "@mantine/hooks";
import translations from "../translations/index";

export default function useTranslation() {
    const [language, setLanguage] = useLocalStorage({ key: "language", defaultValue: "en" });
    const [fallbackLanguage, setFallbackLanguage] = useLocalStorage({ key: "fallbackLanguage", defaultValue: "en" });

    const translate = (key: string) => {
        const keys = key.split(".");

        return getNestedTranslation(language, keys) ?? getNestedTranslation(fallbackLanguage, keys) ?? key;
    };

    return {
        language,
        setLanguage,
        fallbackLanguage,
        setFallbackLanguage,
        t: translate,
    };
}

function getNestedTranslation(language: string, keys: string[]) {
    return keys.reduce((obj, key) => {
        return obj?.[key];
    }, translations[language]);
}
