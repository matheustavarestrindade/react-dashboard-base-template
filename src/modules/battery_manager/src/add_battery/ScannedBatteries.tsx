import { faBattery0, faBatteryFull, faBold, faBolt, faEdit, faGlobe, faHashtag, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, ScrollArea, Space, Table, Text, ThemeIcon } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import BatteryInterface from "../BatteryInterface";
import ScannedResult from "./ScannedResult";

const ScannedBatteries = ({ batteries, setScannedBatteries }: { batteries: BatteryInterface[]; setScannedBatteries: React.Dispatch<React.SetStateAction<BatteryInterface[]>> }) => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const [batteriesList, setBatteriesList] = useState<BatteryInterface[]>([]);
    const updateBatteryInformation = useCallback(
        (battery: BatteryInterface) => {
            const updatedList = batteries.map((bat) => {
                if (bat.bat_id !== battery.bat_id) return bat;
                return battery;
            });
            setScannedBatteries(updatedList);
        },
        [batteries, setScannedBatteries]
    );

    useEffect(() => {
        setBatteriesList(batteries);
    }, [batteries]);

    return (
        <>
            <ScrollArea style={{ minWidth: 300 }}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                <Text style={{ whiteSpace: "nowrap" }}>
                                    <FontAwesomeIcon icon={faHashtag} style={{ marginRight: "0.5rem" }} />
                                    ID
                                </Text>
                            </th>
                            <th>
                                <Text style={{ whiteSpace: "nowrap" }}>
                                    <FontAwesomeIcon icon={faBattery0} style={{ marginRight: "0.5rem" }} />
                                    Initial Voltage
                                </Text>
                            </th>
                            <th>
                                <Text style={{ whiteSpace: "nowrap" }}>
                                    <FontAwesomeIcon icon={faBolt} style={{ marginRight: "0.5rem" }} />
                                    Discharge Rate
                                </Text>
                            </th>
                            <th>
                                <Text style={{ whiteSpace: "nowrap" }}>
                                    <FontAwesomeIcon icon={faBatteryFull} style={{ marginRight: "0.5rem" }} />
                                    Capacity Mah
                                </Text>
                            </th>
                            <th>
                                <Text>
                                    <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "0.5rem" }} />
                                    From
                                </Text>
                            </th>
                            <th>
                                <Text>
                                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: "0.5rem" }} />
                                    Edit
                                </Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {batteriesList.map((battery, id) => {
                            return <ScannedResult key={id} battery={battery} updateBatteryInformation={updateBatteryInformation} />;
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <Space h="lg" />
            <Box style={{ display: "flex" }}>
                <Button style={{ marginLeft: "auto" }}>{t("add_battery.scanned_batteries.save_to_database")}</Button>
            </Box>
        </>
    );
};

export default ScannedBatteries;
