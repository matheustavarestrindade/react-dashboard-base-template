import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";
import LanguageProvider from "./context/LanguageProvider";
import { BrowserRouter } from "react-router-dom";
import AppNavigation from "./AppNavigation";
import { NotificationsProvider } from "@mantine/notifications";
import UserAuthenticatedRequestsProvider from "./context/UserAuthenticatedRequestsProvider";
import ConfigurationProvider from "./context/ConfigurationProvider";

const App = () => {
    return (
        <NotificationsProvider>
            <ConfigurationProvider>
                <ThemeProvider>
                    <UserProvider>
                        <UserAuthenticatedRequestsProvider>
                            <LanguageProvider>
                                <BrowserRouter>
                                    <AppNavigation />
                                </BrowserRouter>
                            </LanguageProvider>
                        </UserAuthenticatedRequestsProvider>
                    </UserProvider>
                </ThemeProvider>
            </ConfigurationProvider>
        </NotificationsProvider>
    );
};

export default App;
