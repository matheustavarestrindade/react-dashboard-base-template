import React from "react";
import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";
import LanguageProvider from "./context/LanguageProvider";
import { BrowserRouter } from "react-router-dom";
import AppNavigation from "./AppNavigation";

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <LanguageProvider>
                    <BrowserRouter>
                        <AppNavigation />
                    </BrowserRouter>
                </LanguageProvider>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
