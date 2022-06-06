import React from "react";
import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";
import LanguageProvider from "./context/LanguageProvider";
import PageNavigationProvider from "./context/PageNavigationProvider";
import { faCog, faDashboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <LanguageProvider>
                    <BrowserRouter>
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
                                    name: "Navigation",
                                    icons: [
                                        {
                                            icon: faDashboard,
                                            to: "/",
                                            description: "Dashboard",
                                        },
                                    ],
                                },
                            ]}
                        >
                            <h1>Page content</h1>
                        </PageNavigationProvider>
                    </BrowserRouter>
                </LanguageProvider>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
