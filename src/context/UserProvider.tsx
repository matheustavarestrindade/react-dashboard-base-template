import { LoadingOverlay } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import configuration from "../ProjectConfiguration";
const UserContext = createContext<IUserProvider>({
    user: undefined,
    loginUser: (u) => null,
});

export const useUser = () => {
    return useContext(UserContext);
};

interface Props {
    children?: React.ReactNode;
}

interface IUser {
    email: string;
    role: string;
    permissions: string[];
    jwt_token: string;
    jwt_expiration_date: Date;
    first_name: string;
    last_name: string;
    refreshToken: () => Promise<boolean>;
    refreshUser: (newJwt: string) => Promise<boolean>;
}

interface ILoginUser {
    email: string;
    role: string;
    permissions: string[];
    jwt_token: string;
    jwt_expiration_date: Date;
    first_name: string;
    last_name: string;
}
interface IUserProvider {
    user: IUser | undefined;
    loginUser: (user: ILoginUser) => void;
}

class User implements IUser {
    email: string;
    role: string;
    permissions: string[];
    jwt_token: string;
    jwt_expiration_date: Date;
    first_name: string;
    last_name: string;
    private updateTokenURL: string;

    constructor(info: ILoginUser | null, updateTokenURL: string) {
        if (info === null) {
            this.email = "";
            this.role = "";
            this.permissions = [];
            this.jwt_token = "";
            this.jwt_expiration_date = new Date(0);
            this.first_name = "";
            this.last_name = "";
            this.updateTokenURL = updateTokenURL;
            return;
        }
        this.email = info.email;
        this.role = info.role;
        this.permissions = info.permissions;
        this.jwt_token = info.jwt_token;
        this.jwt_expiration_date = info.jwt_expiration_date;
        this.first_name = info.first_name;
        this.last_name = info.last_name;
        this.updateTokenURL = updateTokenURL;
    }

    async refreshToken() {
        try {
            const response = await fetch(this.updateTokenURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.jwt_token,
                },
            });
            if (response.status === 200) {
                const json: any = await response.json();
                this.jwt_token = json.jwt_token;
                this.email = json.email;
                this.role = json.role;
                this.permissions = json.permissions;
                this.jwt_token = json.jwt;
                this.jwt_expiration_date = new Date(json.jwt_expiration_date);
                this.first_name = json.first_name;
                this.last_name = json.last_name;
                return true;
            }
        } catch (err) {}
        return false;
    }

    async refreshUser(jwt: string) {
        this.jwt_token = jwt;
        return await this.refreshToken();
    }
}

const UserProvider = ({ children }: Props) => {
    const [localJWT, setLocalJWT] = useLocalStorage({
        key: "jwt_token",
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    const loginUser = useCallback(
        (user: ILoginUser) => {
            setLocalJWT(user.jwt_token);
            setUser(new User(user, configuration.api.base_url + configuration.api.authentication.base_url + configuration.api.authentication.update_token));
        },
        [setLocalJWT]
    );

    const refreshUserViaJWT = useCallback(async () => {
        // load user from local storage
        setLoading(true);
        const user = new User(null, configuration.api.base_url + configuration.api.authentication.base_url + configuration.api.authentication.update_token);
        const updated = await user.refreshUser(localJWT);
        if (!updated) {
            setUser(undefined);
            setLoading(false);
            navigate("/login");
            return;
        }
        setLoading(false);
        setUser(user);
    }, [localJWT, navigate]);

    useEffect(() => {
        if (user) return;
        if (!localJWT) return;
        // load user from local storage
        refreshUserViaJWT();
    }, [localJWT, refreshUserViaJWT, user]);

    return (
        <UserContext.Provider
            value={{
                user,
                loginUser,
            }}
        >
            <LoadingOverlay visible={loading} />
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
