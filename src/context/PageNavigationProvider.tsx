import { createContext, useContext, useState } from "react";
import { AppShell, Box, Burger, createStyles, Header, MediaQuery, Navbar } from "@mantine/core";
import TopbarIcon from "../components/TopbarIcon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";

const PageNavigationContext = createContext({});

const SIDEBAR_SM_WIDTH = 250;
const SIDEBAR_LG_WIDTH = 350;

export const usePageNavigation = () => {
    return useContext(PageNavigationContext);
};

export interface NavigationItem {
    icon: IconDefinition;
    to: string;
    description?: string;
}

export interface NavigationPage {
    name: string;
    icons?: NavigationItem[];
}

interface NavigationProps {
    children?: React.ReactNode;
    topbar_icons_right?: NavigationItem[];
    topbar_icons_left?: NavigationItem[];
    sidebar_icons?: NavigationPage[];
}

const useStyles = createStyles((theme, args, getRef) => ({
    sidebar_title: {
        fontSize: "0.9rem",
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: "1rem",
        paddingBottom: "0.5rem",
        margin: 0,
        color: theme.colors["dark-gray"][0],
    },
    sidebar_item: {
        display: "flex",
        alignItems: "center",
        color: theme.colors["dark-gray"][0],
        justifyContent: "start",
        transition: "0.2s",
        textDecoration: "none",
        borderLeft: "5px solid transparent",
        fontWeight: 500,
        paddingLeft: "0.4rem",
        ".description": {
            paddingLeft: "0.5rem",
        },
        [`& .${getRef("icon")}`]: {
            borderRadius: "5px",
            width: "32px",
            height: "32px",
            backgroundColor: "transparent",
            svg: {
                width: "18px",
                height: "18px",
                color: theme.colors["dark-gray"][0],
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
    topbar_icons_left: {
        marginRight: "auto",
        marginLeft: "1rem",
        display: "flex",
        alignItems: "center",
    },
    topbar_icons_right: {
        marginRight: "1rem",
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
    },
    header_styles: {
        borderBottom: "2px solid " + theme.colors["light-gray"][2],
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            // Type safe child reference in nested selectors via ref
            width: "calc(100vw - " + SIDEBAR_SM_WIDTH + "px)",
            left: SIDEBAR_SM_WIDTH,
        },
        [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
            // Type safe child reference in nested selectors via ref
            width: "calc(100vw - " + SIDEBAR_LG_WIDTH + "px)",
            left: SIDEBAR_LG_WIDTH,
        },
    },
    sidebar_styles: {
        borderRight: "2px solid " + theme.colors["light-gray"][2],

        height: "100vh",
        top: 0,
        ".title": {
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            maxHeight: 60,
            minHeight: 60,
            h2: {
                margin: 0,
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "0.5rem",
                borderBottom: "2px solid " + theme.colors["light-gray"][2],
            },
        },
        ".navbar-logo": {
            marginTop: "auto",
            img: {
                maxWidth: "100%",
                maxHeight: 60,
                display: "flex",
                margin: "auto",
            },
        },
    },
}));

const PageNavigationProvider = ({ children, topbar_icons_right, topbar_icons_left, sidebar_icons }: NavigationProps) => {
    const [navbarOpened, setNarbarOpened] = useState<boolean>(false);
    const [value, setValue] = useState<any>();
    const { t } = useTranslation();
    const { classes } = useStyles();

    return (
        <PageNavigationContext.Provider value={value}>
            <AppShell
                navbarOffsetBreakpoint="sm"
                navbar={
                    <Navbar className={classes.sidebar_styles} hiddenBreakpoint="sm" hidden={!navbarOpened} width={{ sm: SIDEBAR_SM_WIDTH, lg: SIDEBAR_LG_WIDTH }}>
                        <Box className="title">
                            <h2>{t("sidebar.navigation")}</h2>
                            {navbarOpened && (
                                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                                    <Burger opened={navbarOpened} style={{ marginLeft: "1rem", marginRight: "1rem" }} onClick={() => setNarbarOpened((o) => !o)} size="sm" mr="xl" />
                                </MediaQuery>
                            )}
                        </Box>
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
                                            <Link to={navigationIcon.to} key={id} className={classes.sidebar_item} onClick={() => setNarbarOpened(false)}>
                                                <TopbarIcon icon={navigationIcon.icon} />
                                                <span className="description">{navigationIcon.description}</span>
                                            </Link>
                                        );
                                    })
                                );
                                return icons;
                            })}
                        <div className="navbar-logo">
                            <img src="/home_quasar_logo.png" alt="" />
                        </div>
                    </Navbar>
                }
                header={
                    <Header height={60} className={classes.header_styles}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", height: "100%" }}>
                            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                                <Burger opened={navbarOpened} style={{ marginLeft: "1rem", marginRight: "1rem" }} onClick={() => setNarbarOpened((o) => !o)} size="sm" mr="xl" />
                            </MediaQuery>
                            <Box className={classes.topbar_icons_left}>
                                {topbar_icons_left &&
                                    topbar_icons_left.map((navigationIcon, id) => (
                                        <Link to={navigationIcon.to} key={id} style={{ marginRight: "1rem" }}>
                                            <TopbarIcon icon={navigationIcon.icon} />
                                        </Link>
                                    ))}
                            </Box>
                            <Box className={classes.topbar_icons_right}>
                                {topbar_icons_right &&
                                    topbar_icons_right.map((navigationIcon, id) => (
                                        <Link to={navigationIcon.to} key={id} style={{ marginLeft: "1rem" }}>
                                            <TopbarIcon icon={navigationIcon.icon} />
                                        </Link>
                                    ))}
                            </Box>
                        </div>
                    </Header>
                }
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors["light-gray"][0] },
                })}
                fixed
            >
                {children}
            </AppShell>
        </PageNavigationContext.Provider>
    );
};

export default PageNavigationProvider;
