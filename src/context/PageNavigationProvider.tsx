import { createContext, useContext, useState } from "react";
import { AppShell, Box, Burger, createStyles, Header, MediaQuery, Navbar, ScrollArea, ThemeIcon } from "@mantine/core";
import TopbarIcon from "../components/TopbarIcon";
import { faEarthAmerica, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "../hooks/useTranslation";

const PageNavigationContext = createContext({});

export const usePageNavigation = () => {
    return useContext(PageNavigationContext);
};

interface NavigationItem {
    icon: IconDefinition;
    to: string;
    description?: string;
}

interface NavigationPage {
    name: string;
    icons?: NavigationItem[];
}

interface NavigationProps {
    children?: React.ReactNode;
    topbar_icons?: NavigationItem[];
    sidebar_icons?: NavigationPage[];
}

const useStyles = createStyles((theme, args, getRef) => ({
    sidebar_title: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        margin: 0,
        color: theme.colorScheme === "light" ? theme.colors.dark[4] : theme.colors.gray[1],
    },
    sidebar_item: {
        display: "flex",
        alignItems: "center",
        color: theme.colorScheme === "light" ? theme.colors.dark[4] : theme.colors.gray[1],
        justifyContent: "start",
        transition: "0.2s",
        textDecoration: "none",
        borderLeft: "5px solid transparent",
        paddingLeft: "0.4rem",
        ".description": {
            paddingLeft: "0.5rem",
        },
        [`& .${getRef("icon")}`]: {
            borderRadius: "5px",
            width: "30px",
            height: "30px",
            backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[5] : theme.colors.gray[1],
            shadow: theme.shadows.lg,
            svg: {
                color: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.gray[0],
            },
        },

        "&:hover": {
            paddingLeft: "0.7rem",
            [`& .${getRef("icon")}`]: {
                transition: "0.2s",
                backgroundColor: theme.colorScheme === "light" ? theme.colors.blue[4] : theme.colors.grape[9],
            },
            [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                borderLeft: "5px solid " + (theme.colorScheme === "light" ? theme.colors.blue[4] : theme.colors.grape[9]),
            },
            color: theme.colorScheme === "light" ? theme.colors.blue[4] : theme.colors.grape[9],
            svg: {
                transition: "0.2s",
                color: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.gray[0],
            },
        },
    },
    topbar_title: {
        marginRight: "auto",
        marginLeft: "1rem",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            // Type safe child reference in nested selectors via ref
            marginLeft: "0",
        },
        svg: {
            paddingRight: "0.5rem",
            fontSize: "1.2rem",
        },
        color: theme.colorScheme === "light" ? theme.colors.dark[4] : theme.colors.gray[1],
    },
    header_styles: {
        borderColor: theme.colors.dark[1],
    },
    sidebar_styles: {
        borderColor: theme.colors.dark[1],
        height: "100vh",
        top: 0,
    },
}));

const PageNavigationProvider = ({ children, topbar_icons, sidebar_icons }: NavigationProps) => {
    const [navbarOpened, setNarbarOpened] = useState<boolean>(false);
    const [value, setValue] = useState<any>();
    const { t } = useTranslation();
    const { classes } = useStyles();

    return (
        <PageNavigationContext.Provider value={value}>
            <AppShell
                navbarOffsetBreakpoint="sm"
                navbar={
                    <Navbar className={classes.sidebar_styles} hiddenBreakpoint="sm" hidden={!navbarOpened} width={{ sm: 250, lg: 350 }}>
                        {sidebar_icons &&
                            sidebar_icons.map((navigationPage, id) => {
                                if (!navigationPage.icons) {
                                    return (
                                        <p className={classes.sidebar_title} key={id}>
                                            {navigationPage.name}
                                        </p>
                                    );
                                }
                                const icons = [];
                                icons.push(
                                    <p className={classes.sidebar_title} key={id}>
                                        {navigationPage.name}
                                    </p>
                                );
                                icons.push(
                                    navigationPage.icons.map((navigationIcon, id) => {
                                        return (
                                            <Link to={navigationIcon.to} key={id} className={classes.sidebar_item}>
                                                <TopbarIcon icon={navigationIcon.icon} />
                                                <span className="description">{navigationIcon.description}</span>
                                            </Link>
                                        );
                                    })
                                );
                                return icons;
                            })}
                    </Navbar>
                }
                header={
                    <Header height={60} className={classes.header_styles}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", height: "100%", paddingRight: "1rem" }}>
                            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                                <Burger opened={navbarOpened} style={{ marginLeft: "1rem", marginRight: "1rem" }} onClick={() => setNarbarOpened((o) => !o)} size="sm" mr="xl" />
                            </MediaQuery>
                            <Box className={classes.topbar_title}>
                                <FontAwesomeIcon icon={faEarthAmerica}></FontAwesomeIcon>
                                <span>{t("topbar.title")}</span>
                            </Box>
                            {topbar_icons &&
                                topbar_icons.map((navigationIcon, id) => (
                                    <Link to={navigationIcon.to} key={id} style={{ marginLeft: "1rem" }}>
                                        <TopbarIcon icon={navigationIcon.icon} />
                                    </Link>
                                ))}
                        </div>
                    </Header>
                }
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0] },
                })}
                fixed
            >
                {children}
            </AppShell>
        </PageNavigationContext.Provider>
    );
};

export default PageNavigationProvider;
