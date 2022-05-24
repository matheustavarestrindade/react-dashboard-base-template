import { MantineProvider } from "@mantine/core";

interface Props {
    children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    return <MantineProvider theme={{}}>{children}</MantineProvider>;
};

export default ThemeProvider;
