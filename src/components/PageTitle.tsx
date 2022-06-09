import { Title, createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((theme, getRef) => ({
    title: {
        fontWeight: "bold",
        paddingTop: "0.5rem",
        paddingBottom: "1.4rem",
        color: theme.colors["dark-gray"][0],
    },
}));

const PageTitle = ({ children }: { children: ReactNode }) => {
    const { classes } = useStyles();
    return (
        <Title order={3} className={classes.title}>
            {children}
        </Title>
    );
};

export default PageTitle;
