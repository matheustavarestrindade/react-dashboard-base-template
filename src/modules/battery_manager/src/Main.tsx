import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Title, createStyles, Grid } from "@mantine/core";
import InfoCard from "../../../components/NumberInfoCard";
import useTranslation from "../../../hooks/useTranslation";

const useStyles = createStyles((theme, getRef) => ({
    title: {
        fontWeight: "bold",
        paddingTop: "0.5rem",
        paddingBottom: "1.4rem",
        color: theme.colors["dark-gray"][0],
    },
}));

const Main = () => {
    const { t } = useTranslation();
    const { classes } = useStyles();
    return (
        <>
            <Title order={3} className={classes.title}>
                {t("modules.battery_manager.main.header")}
            </Title>
            <Grid>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={"10"} header={"Batteries in Database"} icon={faDatabase} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={"10"} header={"Batteries in Database"} icon={faDatabase} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={"10"} header={"Batteries in Database"} icon={faDatabase} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Main;
