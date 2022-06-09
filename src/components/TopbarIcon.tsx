import { createStyles } from "@mantine/core";
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
        backgroundColor: theme.colors["light-gray"][1],
        color: theme.colors["dark-gray"][0],
        justifyContent: "center",
        borderRadius: "50%",
        transition: "0.2s",
        "&:hover": {
            backgroundColor: theme.colorScheme === "light" ? theme.colors.blue[4] : theme.colors.grape[9],
            svg: {
                transition: "0.2s",
                color: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.gray[0],
            },
        },
        svg: {
            color: theme.colors["dark-gray"][0],
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
