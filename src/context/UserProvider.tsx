import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const useUser = () => {
    return useContext(UserContext);
};

interface Props {
    children?: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
    const [value, setValue] = useState<any>();
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
