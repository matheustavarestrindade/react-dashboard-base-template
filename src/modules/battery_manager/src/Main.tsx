import { faBattery0, faBatteryFull, faBatteryHalf, faBox, faBoxOpen, faDatabase, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import InfoCard from "../../../components/NumberInfoCard";
import PageTitle from "../../../components/PageTitle";
import { useUserAuthenticatedRequest } from "../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../hooks/useTranslation";
import BatteryManagerModule from "../BatteryManagerModule";
import { BatteryResumeQuery, BatteryResumeQueryResults } from "../queries/BatteryResumeQuery";

const Main = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "main" });
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();

    const [batteryResume, setBatteryResume] = useState<BatteryResumeQueryResults>();

    const updateDashboardStatus = useCallback(async () => {
        const request = new BatteryResumeQuery();
        const response = await executeAuthenticatedRequest(request);

        if (response.hasError()) {
            showNotification({
                title: t("battery_fetch_resume_error_title"),
                message: t("battery_fetch_resume_error"),
                icon: <FontAwesomeIcon icon={faTimes} />,
                color: "red",
            });
            return;
        }

        const result = response.getResult();
        setBatteryResume(result);

        console.log(result);
    }, [executeAuthenticatedRequest, t]);

    useEffect(() => {
        updateDashboardStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageTitle>{t("header")}</PageTitle>
            <Grid>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.total_batteries : undefined} header={t("batteries_in_database_title")} icon={faDatabase} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.total_batteries_free_to_use : undefined} header={t("batteries_free_count_title")} icon={faBox} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.total_batteries_used : undefined} header={t("batteries_used_count_title")} icon={faBoxOpen} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.batteries_capacity_mah_total : undefined} header={t("batteries_total_mah_title")} icon={faBatteryFull} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.batteries_capacity_mah_unused : undefined} header={t("batteries_free_mah_title")} icon={faBatteryHalf} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={4}>
                    <InfoCard content={batteryResume ? batteryResume.batteries_capacity_mah_used : undefined} header={t("batteries_used_mah_title")} icon={faBattery0} />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Main;
