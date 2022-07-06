import PageTitle from "../../../../components/PageTitle";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { Card, Grid, Space, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import QRCodeScanner from "./QRCodeScanner";
import BatteryInterface from "../BatteryInterface";
import ScannedBatteries from "./ScannedBatteries";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import { BatteryTypesQuery } from "../../queries/BatteryTypesQuery";
import { showNotification } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const AddBatteryPage = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();
    const [batteriesTypes, setBatteriesTypes] = useState<{ [key: string]: string }>({});
    const [scannedBatteries, setScannedBatteries] = useState<BatteryInterface[]>([
        {
            batteryId: 0,
            capacitymAh: 1620,
            dischargeRate: 0.5,
            from: "hoverboard",
            initialVoltage: 2.4,
            batteryType: "LITHIUM_ION_18650",
            inUse: false,
        },
        {
            batteryId: 1,
            capacitymAh: 1620,
            dischargeRate: 0.5,
            from: "hoverboard",
            initialVoltage: 2.4,
            batteryType: "LITHIUM_ION_18650",
            inUse: false,
        },
        {
            batteryId: 2,
            capacitymAh: 1620,
            dischargeRate: 0.5,
            from: "hoverboard",
            initialVoltage: 2.4,
            batteryType: "LITHIUM_ION_18650",
            inUse: false,
        },
        {
            batteryId: 3,
            capacitymAh: 1620,
            dischargeRate: 0.5,
            from: "hoverboard",
            initialVoltage: 2.4,
            batteryType: "LITHIUM_ION_18650",
            inUse: false,
        },
    ]);

    const addScannedBattery = useCallback((battery: BatteryInterface) => {
        setScannedBatteries((s) => {
            if (s.find((b) => b.batteryId === battery.batteryId)) {
                return s;
            }
            const newList = [...s];
            newList.push(battery);
            return newList;
        });
    }, []);

    const fetchBatteryTypes = useCallback(async () => {
        const request = await executeAuthenticatedRequest(new BatteryTypesQuery());
        if (request.hasError()) {
            showNotification({
                color: "red",
                title: t("add_battery.fetch_battery_types_error_title"),
                message: request.getError()?.message,
                icon: <FontAwesomeIcon icon={faExclamation} />,
            });
            return;
        }
        setBatteriesTypes(request.getResult());
    }, [executeAuthenticatedRequest, t]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchBatteryTypes();
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <QRCodeScanner addScannedBattery={addScannedBattery} />
                </Grid>
            </Card>
            <Space h="lg" />
            <Card>
                <Text weight={500}>
                    {t("add_battery.result_card.title")}: {scannedBatteries.length}
                </Text>
                <ScannedBatteries batteriesTypes={batteriesTypes} batteries={scannedBatteries} setScannedBatteries={setScannedBatteries} />
            </Card>
        </>
    );
};

export default AddBatteryPage;
