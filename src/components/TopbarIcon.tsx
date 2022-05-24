import { createStyles, useMantineTheme } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface TopBarIconTypes {
    icon: IconDefinition;
}

const useStyles = createStyles((theme, args, getRef) => ({
    icon: {
        ref: getRef("icon"),
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.colorScheme === "light" ? theme.colors.dark[1] : theme.colors.gray[1],
        color: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[4],
        justifyContent: "center",
        borderRadius: "50%",
        transition: "0.2s",
        boxShadow: theme.shadows.md,
        "&:hover": {
            backgroundColor: theme.colorScheme === "light" ? theme.colors.blue[4] : theme.colors.blue[4],
        },
        svg: {
            color: theme.colors.gray[0],
        },
    },
}));

const TopbarIcon = ({ icon }: TopBarIconTypes) => {
    const { classes } = useStyles();

    return (
        <div className={classes.icon}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </div>
    );
};

export default TopbarIcon;