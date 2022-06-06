import { MantineProvider } from "@mantine/core";

interface Props {
    children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    return (
        <MantineProvider theme={{ colorScheme: "light" }} withNormalizeCSS withGlobalStyles>
            {children}
        </MantineProvider>
    );
};

export default ThemeProvider;
