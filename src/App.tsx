import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";
import LanguageProvider from "./context/LanguageProvider";
import { BrowserRouter } from "react-router-dom";
import AppNavigation from "./AppNavigation";
import { NotificationsProvider } from "@mantine/notifications";

const App = () => {
    return (
        <NotificationsProvider>
            <ThemeProvider>
                <UserProvider>
                    <LanguageProvider>
                        <BrowserRouter>
                            <AppNavigation />
                        </BrowserRouter>
                    </LanguageProvider>
                </UserProvider>
            </ThemeProvider>
        </NotificationsProvider>
    );
};

export default App;
