import { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

const AuthenticatedRequestContext = createContext<{
    executeAuthenticatedRequest: (request: UserAuthenticatedRequest<any, any>) => Promise<UserAuthenticatedRequest<any, any>>;
}>({
    executeAuthenticatedRequest: async (request: UserAuthenticatedRequest<any, any>) => {
        request.invalidate();
        return request;
    },
});

interface Props {
    children?: React.ReactNode;
}

export const useUserAuthenticatedRequest = () => {
    return useContext(AuthenticatedRequestContext);
};

interface IUserAuthenticatedRequest<ExpectedResult> {
    hasResult(): boolean;
    getResult(): ExpectedResult | undefined;
    hasError(): boolean;
    getError(): UserAuthenticatedRequestError | undefined;
}

interface UserAuthenticatedRequestError {
    message: string;
    code: number;
}

export class UserAuthenticatedRequest<ExpectedParams extends { [key: string]: any }, ExpectedResult> implements IUserAuthenticatedRequest<ExpectedResult> {
    private route: string;
    private method: "GET" | "POST" | "PUT" | "DELETE";
    private JWTToken: string | undefined;

    private requestBody: ExpectedParams | undefined;

    private result: boolean;
    private resultObject: ExpectedResult | undefined;
    private error: boolean;
    private errorMessage: UserAuthenticatedRequestError | undefined;

    constructor(method: "GET" | "POST" | "PUT" | "DELETE", route: string) {
        this.method = method;
        this.route = route;
        this.error = false;
        this.result = false;
        this.resultObject = undefined;
        this.requestBody = undefined;
    }

    async execute(): Promise<void> {
        try {
            const response = await fetch(
                this.route +
                    (this.method === "GET" && this.requestBody !== undefined
                        ? Object.keys(this.requestBody)
                              .map((key: string, id: number) =>
                                  this.requestBody?.[key] === undefined || this.requestBody?.[key] === "" || this.requestBody?.[key] == null
                                      ? ""
                                      : (id > 0 ? "&" : "?") + key + "=" + this.requestBody?.[key]
                              )
                              .join("")
                        : ""),
                {
                    method: this.method,
                    body: this.method === "GET" || this.requestBody === undefined ? undefined : JSON.stringify(this.requestBody),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + this.JWTToken,
                    },
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                this.resultObject = json;
                this.result = true;
            } else {
                this.error = true;
                this.errorMessage = {
                    message: json.message,
                    code: json.status,
                };
            }
        } catch (e) {
            console.log(e);
            this.error = true;
            this.errorMessage = {
                message: "An error has occurred",
                code: 500,
            };
        }
    }

    setRequestBody(body: ExpectedParams): void {
        this.requestBody = body;
    }

    setJWT(token: string): void {
        this.JWTToken = token;
    }

    hasResult(): boolean {
        return this.result;
    }
    getResult(): ExpectedResult | undefined {
        return this.resultObject;
    }

    hasError(): boolean {
        return this.error;
    }

    getError(): UserAuthenticatedRequestError | undefined {
        return this.errorMessage;
    }

    invalidate() {
        this.error = true;
        this.errorMessage = {
            code: 401,
            message: "User not authenticated",
        };
    }
}

const UserAuthenticatedRequestsProvider = ({ children }: Props) => {
    const { user } = useUser();
    const navigate = useNavigate();

    const executeAuthenticatedRequest = useCallback(
        async (request: UserAuthenticatedRequest<any, any>) => {
            if (!user || !user.jwt_token) {
                request.invalidate();
                return request;
            }
            console.log(user);
            if (user.jwt_expiration_date.getTime() < Date.now()) {
                const success = await user.refreshToken();
                if (!success) {
                    request.invalidate();
                    navigate("/login");
                    return request;
                }
            }
            request.setJWT(user.jwt_token);
            await request.execute();
            return request;
        },
        [navigate, user]
    );
    return <AuthenticatedRequestContext.Provider value={{ executeAuthenticatedRequest }}>{children}</AuthenticatedRequestContext.Provider>;
};

export default UserAuthenticatedRequestsProvider;
