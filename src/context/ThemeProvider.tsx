import { MantineProvider } from "@mantine/core";

interface Props {
    children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    return (
        <MantineProvider
            theme={{
                colorScheme: "light",
                colors: {
                    "light-gray": ["#f4f7fd", "#f8f9fa", "#ebeaef"],
                    "dark-gray": ["#818d95"],
                },
            }}
            withNormalizeCSS
            withGlobalStyles
        >
            {children}
        </MantineProvider>
    );
};

export default ThemeProvider;
