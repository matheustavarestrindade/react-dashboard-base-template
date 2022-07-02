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
                <UserProvider>
                    <UserAuthenticatedRequestsProvider>
                        <BrowserRouter>
                            <AppNavigation />
                        </BrowserRouter>
                    </UserAuthenticatedRequestsProvider>
                </UserProvider>
            </ThemeProvider>
        </NotificationsProvider>
    );
};

export default App;
