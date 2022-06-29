import { useLocalStorage } from "@mantine/hooks";
import translations from "../translations/index";

interface TranslationOptions {
    prefix?: string;
}

export default function useTranslation(options?: TranslationOptions) {
    const [language, setLanguage] = useLocalStorage({ key: "user_language", defaultValue: "en" });
    const [fallbackLanguage, setFallbackLanguage] = useLocalStorage({ key: "user_fallbackLanguage", defaultValue: "en" });

    const translate = (key: string) => {
        if (options?.prefix && typeof options?.prefix === "string") {
            if (options?.prefix.endsWith(".")) key = options?.prefix + key;
            else key = options?.prefix + key;
        }
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
