import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({});

export const useLanguage = () => {
    return useContext(LanguageContext);
};

interface Props {
    children?: React.ReactNode;
}

const LanguageProvider = ({ children }: Props) => {
    const [value, setValue] = useState<any>();
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
