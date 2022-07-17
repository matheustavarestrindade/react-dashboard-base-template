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
            battery_resume: string;
            search_route: string;
            battery_types_and_porviders: string;
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
            battery_resume: "/resume",
            search_route: "/search",
            battery_types_and_porviders: "/user_types_and_providers",
        },
    },
}) as IProjectConfigurations;
