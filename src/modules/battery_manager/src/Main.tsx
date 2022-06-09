import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mantine/core";
import InfoCard from "../../../components/NumberInfoCard";
import PageTitle from "../../../components/PageTitle";
import useTranslation from "../../../hooks/useTranslation";
import BatteryManagerModule from "../BatteryManagerModule";

const Main = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });

    return (
        <>
            <PageTitle>{t("main.header")}</PageTitle>
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
