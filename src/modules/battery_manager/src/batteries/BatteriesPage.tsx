import { Card, Grid, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import PageTitle from "../../../../components/PageTitle";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryInterface, BatteryOrganizedByTypes } from "../BatteryTypes";
import { EBatteryModel } from "../BatteryTypes";
import BatteriesSearchFilter from "./BatteriesSearchFilter";
import BatteriesSearchResult from "./BatteriesSearchResult";

const BatteriesPage = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const [batteries, setBatteries] = useState<BatteryOrganizedByTypes>({});
    const handleQueryResults = useCallback((batteries: BatteryInterface[]) => {
        const organizedBatteries: BatteryOrganizedByTypes = {};
        for (const battery of batteries) {
            const type: EBatteryModel = battery.batteryType as EBatteryModel;
            if (!organizedBatteries[type]) {
                organizedBatteries[type] = [];
            }
            organizedBatteries[type]?.push(battery);
        }
        setBatteries(organizedBatteries);
    }, []);

    return (
        <>
            <PageTitle>{t("batteries.header")}</PageTitle>
            <BatteriesSearchFilter handleQueryResults={handleQueryResults} />
            <BatteriesSearchResult batteries={batteries} />
        </>
    );
};

export default BatteriesPage;
