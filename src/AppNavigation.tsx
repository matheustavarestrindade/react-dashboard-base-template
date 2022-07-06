import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageNavigationProvider from "./context/PageNavigationProvider";
import { useUser } from "./context/UserProvider";
import useTranslation from "./hooks/useTranslation";
import BatteryManagerModule from "./modules/battery_manager/BatteryManagerModule";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";

const AppNavigation = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/login") || location.pathname.includes("/register") || location.pathname.includes("/reset-password")) {
            if (user) navigate("/");
            return;
        }
        if (!user) {
            navigate("/login");
        }
    }, [user, location, navigate]);

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
                            icon: faUser,
                            to: "/user",
                        },
                        {
                            icon: faCog,
                            to: "/configuration",
                        },
                    ]}
                    topbar_icons_left={[...BatteryManagerModule.module_navigation]}
                    sidebar_icons={[
                        {
                            name: t("sidebar.modules"),
                            icons: [BatteryManagerModule.module_icon],
                        },
                    ]}
                >
                    <Routes>{BatteryManagerModule.module_routes}</Routes>
                </PageNavigationProvider>
            )}
        </>
    );
};

export default AppNavigation;
