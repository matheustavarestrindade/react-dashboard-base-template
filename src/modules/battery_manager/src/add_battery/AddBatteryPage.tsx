import PageTitle from "../../../../components/PageTitle";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { Card, Grid, Space, Text } from "@mantine/core";
import { useState } from "react";
import QRCodeScanner from "./QRCodeScanner";
import BatteryInterface from "../BatteryInterface";
import ScannedBatteries from "./ScannedBatteries";

const AddBatteryPage = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const [scannedBatteries, setScannedBatteries] = useState<BatteryInterface[]>([
        {
            bat_id: 0,
            capacity: 1620,
            discharge_rate: 0.5,
            from: "hoverboard",
            initial_voltage: 2.4,
        },
    ]);

    return (
        <>
            <PageTitle>{t("add_battery.header")}</PageTitle>
            <Card>
                <Text weight={500}>{t("add_battery.scan_card.title")}</Text>
                <Grid>
                    <Grid.Col sm={12} md={6}>
                        <Text
                            sx={(theme) => ({
                                color: theme.colors["dark-gray"][0],
                            })}
                        >
                            {t("add_battery.scan_card.qr_tutorial")}
                        </Text>
                    </Grid.Col>
                    <QRCodeScanner setScannedBatteries={setScannedBatteries} scannedBatteries={scannedBatteries} />
                </Grid>
            </Card>
            <Space h="lg" />
            <Card>
                <Text weight={500}>{t("add_battery.result_card.title")}</Text>
                <ScannedBatteries batteries={scannedBatteries} setScannedBatteries={setScannedBatteries} />
            </Card>
        </>
    );
};

export default AddBatteryPage;
