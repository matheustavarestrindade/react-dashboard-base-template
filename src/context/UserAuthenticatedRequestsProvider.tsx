import { createContext, useCallback, useContext } from "react";
import { useUser } from "./UserProvider";

const AuthenticatedRequestContext = createContext<{
    executeAuthenticatedRequest: (request: UserAuthenticatedRequest<any, any>) => Promise<UserAuthenticatedRequest<any, any>>;
}>({
    executeAuthenticatedRequest: async (request: UserAuthenticatedRequest<any, any>) => {
        throw new Error("User is not authenticated");
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

export class UserAuthenticatedRequest<ExpectedResult, ExpectedParams> implements IUserAuthenticatedRequest<ExpectedResult> {
    private route: string;
    private method: "GET" | "POST" | "PUT" | "DELETE";
    private JWTToken: string | undefined;

    private requestBody: ExpectedParams | {};

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
        this.requestBody = {};
    }

    async execute(): Promise<void> {
        try {
            const response = await fetch(this.route, {
                method: this.method,
                body: JSON.stringify(this.requestBody),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.JWTToken,
                },
            });
            if (response.status === 200) {
                this.result = true;
                this.resultObject = await response.json();
            } else {
                const json = await response.json();
                this.error = true;
                this.errorMessage = {
                    message: json.message,
                    code: json.code,
                };
            }
        } catch (e) {
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
    const executeAuthenticatedRequest = useCallback(
        async (request: UserAuthenticatedRequest<any, any>) => {
            if (!user || !user.jwt_token) {
                request.invalidate();
                return request;
            }
            request.setJWT(user.jwt_token);
            await request.execute();
            return request;
        },
        [user]
    );
    return <AuthenticatedRequestContext.Provider value={{ executeAuthenticatedRequest }}>{children}</AuthenticatedRequestContext.Provider>;
};

export default UserAuthenticatedRequestsProvider;
