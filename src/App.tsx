import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";
import { BrowserRouter } from "react-router-dom";
import AppNavigation from "./AppNavigation";
import { NotificationsProvider } from "@mantine/notifications";
import UserAuthenticatedRequestsProvider from "./context/UserAuthenticatedRequestsProvider";

const App = () => {
    return (
        <NotificationsProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <UserProvider>
                        <UserAuthenticatedRequestsProvider>
                            <AppNavigation />
                        </UserAuthenticatedRequestsProvider>
                    </UserProvider>
                </BrowserRouter>
            </ThemeProvider>
        </NotificationsProvider>
    );
};

export default App;
