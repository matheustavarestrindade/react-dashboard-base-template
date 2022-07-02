interface IProjectConfigurations {
    api: {
        base_url: string;
        authentication: {
            base_url: string;
            register: string;
            login: string;
            update_token: string;
        };
    };
}

export default function useConfiguration(): IProjectConfigurations {
    return {
        api: {
            base_url: process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT + "/api",
            authentication: {
                base_url: "/auth",
                register: "/register",
                login: "/login",
                update_token: "/refresh_token",
            },
        },
    };
}
