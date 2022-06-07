import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "react-router-dom";
import PageNavigationProvider from "./context/PageNavigationProvider";
import useTranslation from "./hooks/useTranslation";
import BatteryManagerModule from "./modules/battery_manager/BatteryManagerModule";

const AppNavigation = () => {
    const { t } = useTranslation();
    return (
        <PageNavigationProvider
            topbar_icons_right={[
                {
                    icon: faUser,
                    to: "/user",
                },
                {
                    icon: faCog,
                    to: "/configuration",
                },
            ]}
            sidebar_icons={[
                {
                    name: t("sidebar.modules"),
                    icons: [BatteryManagerModule.module_icon],
                },
            ]}
        >
            <Routes>{BatteryManagerModule.module_routes}</Routes>
        </PageNavigationProvider>
    );
};

export default AppNavigation;
