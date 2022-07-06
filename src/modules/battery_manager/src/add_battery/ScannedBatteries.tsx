import { faBattery0, faBatteryFull, faBolt, faCarBattery, faCheck, faExclamation, faGlobe, faHashtag, faQuestion, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, ScrollArea, Space, Table, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryAddToDatabaseQuery } from "../../queries/BatteryAddToDatabaseQuery";
import BatteryInterface from "../BatteryInterface";
import ScannedResult from "./ScannedResult";

const ScannedBatteries = ({
    batteries,
    batteriesTypes,
    setScannedBatteries,
}: {
    batteries: BatteryInterface[];
    batteriesTypes: { [key: string]: string };
    setScannedBatteries: React.Dispatch<React.SetStateAction<BatteryInterface[]>>;
}) => {
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();

    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "add_battery.save_to_database" });
    const updateBatteryInformation = useCallback(
        (battery: BatteryInterface) => {
            const updatedList = batteries.map((bat) => {
                if (bat.batteryId !== battery.batteryId) return bat;
                return battery;
            });
            setScannedBatteries(updatedList);
        },
        [batteries, setScannedBatteries]
    );

    const deleteBattery = useCallback(
        (battery_id: number) => {
            const updatedList = batteries.filter((bat) => bat.batteryId !== battery_id);
            setScannedBatteries(updatedList);
        },
        [batteries, setScannedBatteries]
    );

    const addBatteriesToDatabase = useCallback(async () => {
        const request = new BatteryAddToDatabaseQuery();
        request.setRequestBody(batteries);
        const response = await executeAuthenticatedRequest(request);

        if (response.hasError()) {
            showNotification({
                title: t("add_battery_error_title"),
                message: t("add_battery_error"),
                icon: <FontAwesomeIcon icon={faExclamation} />,
                color: "red",
            });
            return;
        }
        if (response.hasResult()) {
            const batteries_with_errors = response.getResult().already_in_database;
            if (batteries_with_errors.length !== 0) {
                showNotification({
                    title: t("add_battery_some_with_error_title"),
                    message: t("add_battery_some_with_error"),
                    icon: <FontAwesomeIcon icon={faQuestion} />,
                    color: "yellow",
                });
                setScannedBatteries((b) => {
                    return b.filter((battery) => batteries_with_errors.find((b2: BatteryInterface) => b2.batteryId === battery.batteryId) != null);
                });
                return;
            }
            showNotification({
                title: t("add_battery_success_title"),
                message: t("add_battery_success"),
                icon: <FontAwesomeIcon icon={faCheck} />,
                color: "green",
            });
            setScannedBatteries([]);
        }
    }, [batteries, executeAuthenticatedRequest, setScannedBatteries, t]);

    return (
        <>
            {batteries.length > 0 && (
                <>
                    <ScrollArea style={{ minWidth: 300 }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faHashtag} style={{ marginRight: "0.5rem" }} />
                                            {t("table.id")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faBattery0} style={{ marginRight: "0.5rem" }} />
                                            {t("table.initial_voltage")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faBolt} style={{ marginRight: "0.5rem" }} />
                                            {t("table.discharge_rate")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faBatteryFull} style={{ marginRight: "0.5rem" }} />
                                            {t("table.capacity_mah")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "0.5rem" }} />
                                            {t("table.from")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faCarBattery} style={{ marginRight: "0.5rem" }} />
                                            {t("table.type")}
                                        </Text>
                                    </th>
                                    <th>
                                        <Text style={{ whiteSpace: "nowrap" }} size={"sm"}>
                                            <FontAwesomeIcon icon={faToggleOff} style={{ marginRight: "0.5rem" }} />
                                            {t("table.in_use")}
                                        </Text>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {batteries &&
                                    batteries.map((battery, id) => {
                                        return (
                                            <ScannedResult
                                                key={id}
                                                batteriesTypes={batteriesTypes}
                                                battery={battery}
                                                updateBatteryInformation={updateBatteryInformation}
                                                deleteBattery={deleteBattery}
                                            />
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </ScrollArea>
                    <Space h="lg" />
                    <Box style={{ display: "flex" }}>
                        <Button style={{ marginLeft: "auto" }} onClick={addBatteriesToDatabase}>
                            {t("save_to_database_button")}
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

export default ScannedBatteries;
