import { createContext, useContext, useState } from "react";

class ProjectConfigurations implements IProjectConfigurations {
    api = {
        base_url: process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT + "/api",
        authentication: {
            base_url: "/auth",
            register: "/register",
            login: "/login",
        },
    };
}

interface IProjectConfigurations {
    api: {
        base_url: string;
        authentication: {
            base_url: string;
            register: string;
            login: string;
        };
    };
}

interface Props {
    children?: React.ReactNode;
}

const ConfigurationContext = createContext<ProjectConfigurations>(new ProjectConfigurations());

export const useConfiguration = () => {
    return useContext(ConfigurationContext);
};

const ConfigurationProvider = ({ children }: Props) => {
    return <ConfigurationContext.Provider value={new ProjectConfigurations()}>{children}</ConfigurationContext.Provider>;
};

export default ConfigurationProvider;
