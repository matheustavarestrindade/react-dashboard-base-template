interface IProjectConfigurations {
    api: {
        base_url: string;
        authentication: {
            base_url: string;
            register: string;
            login: string;
            update_token: string;
        };
        battery_management: {
            base_url: string;
            battery_types: string;
            add_to_database: string;
            exists_route: string;
        };
    };
}

export default Object.freeze({
    api: {
        base_url: process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT + "/api",
        authentication: {
            base_url: "/auth",
            register: "/register",
            login: "/login",
            update_token: "/refresh_token",
        },
        battery_management: {
            base_url: "/battery_management",
            battery_types: "/types",
            add_to_database: "/add",
            exists_route: "/exists",
        },
    },
}) as IProjectConfigurations;
