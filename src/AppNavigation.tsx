import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageNavigationProvider, { NavigationItem } from "./context/PageNavigationProvider";
import { useUser } from "./context/UserProvider";
import useTranslation from "./hooks/useTranslation";
import BatteryManagerModule from "./modules/battery_manager/BatteryManagerModule";
import MinerSystemModule from "./modules/miner_system/MinerSystemModule";
import DocumentsModule from "./modules/documents/DocumentsModule";
import ModuleInterface from "./modules/ModuleInterface";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import ConfigurationsPage from "./pages/configuration/ConfigurationsPage";

const AppNavigation = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const [modules] = useState<ModuleInterface[]>([BatteryManagerModule, MinerSystemModule, DocumentsModule]);
    const [topbarNavigationLeft, setTopbarNavigationLeft] = useState<NavigationItem[]>([]);

    const [userAllowedRoutes, setUserAllowedRoutes] = useState<React.ReactElement[]>([]);
    const [userSidebarNavigation, setUserSidebarNavigation] = useState<NavigationItem[]>([]);

    useEffect(() => {
        if (location.pathname.includes("/login") || location.pathname.includes("/register") || location.pathname.includes("/reset-password")) {
            if (user) navigate("/");
            return;
        }
        if (!user) {
            navigate("/login");
        }
    }, [user, location, navigate]);

    useEffect(() => {
        const userAllowedRoutes = [];
        const sidebarNavigation = [];
        for (const module of modules) {
            if (user?.permissions.includes(module.module_permission) || module.module_permission === "") {
                userAllowedRoutes.push(...module.module_routes);
                sidebarNavigation.push(module.module_icon);
            }
        }
        setUserAllowedRoutes(userAllowedRoutes);
        setUserSidebarNavigation(sidebarNavigation);
    }, [user, modules]);

    useEffect(() => {
        for (const module of modules) {
            if (location.pathname.includes(module.module_route)) {
                setTopbarNavigationLeft([...module.module_navigation]);
                return;
            }
        }

        setTopbarNavigationLeft([]);
    }, [location, modules]);

    return (
        <>
            {!user && (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/reset-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            )}
            {user && (
                <PageNavigationProvider
                    topbar_icons_right={[
                        {
                            icon: faUserCog,
                            to: "/configuration",
                            description: user.first_name + " " + user.last_name,
                        },
                    ]}
                    topbar_icons_left={topbarNavigationLeft}
                    sidebar_icons={[
                        {
                            name: t("sidebar.modules"),
                            icons: [...userSidebarNavigation],
                        },
                    ]}
                >
                    <Routes>
                        {userAllowedRoutes}
                        <Route path="/configuration" element={<ConfigurationsPage />} />
                    </Routes>
                </PageNavigationProvider>
            )}
        </>
    );
};

export default AppNavigation;
