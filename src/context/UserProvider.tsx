import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<IUserProvider>({
    user: undefined,
});

export const useUser = () => {
    return useContext(UserContext);
};

interface Props {
    children?: React.ReactNode;
}

interface User {
    email: string;
    role: string;
    permissions: string[];
    jwt_token: string | undefined;
}
interface IUserProvider {
    user: User | undefined;
}

const UserProvider = ({ children }: Props) => {
    const [value, setValue] = useState<IUserProvider>({
        user: undefined,
    });

    useEffect(() => {
        // load user from the backend
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
