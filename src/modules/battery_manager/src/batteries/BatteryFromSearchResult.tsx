import { faBatteryEmpty, faBatteryFull, faBatteryHalf, faBolt, faCheck, faEdit, faExclamation, faIdCard, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Text, Grid, Col, createStyles, RingProgress, Tooltip, Burger, Menu, LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryUpdateQuery } from "../../queries/BatteryUpdateQuery";
import { BatteryInterface } from "../BatteryTypes";
import BatteryEdit from "./BatteryEdit";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        position: "initial",
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
        display: "block",
    },

    lead: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },
    info_container: {
        display: "flex",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    },
    content: {
        flex: 1,
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            display: "flex",
            flexDirection: "column",
        },
    },
    ring: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingRight: "1rem",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
        },
    },
}));

const BatteryFromSearchResult = ({ battery: outBattery }: { battery: BatteryInterface }) => {
    const { classes, theme } = useStyles();
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "batteries.display_card.battery" });
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();
    const [battery, setBattery] = useState<BatteryInterface>(outBattery);
    const [helpOpen, setHelpOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const handleBatteryUpdate = useCallback(
        async ({
            dischargeRate,
            initialVoltage,
            capacitymAh,
            from,
            batteryType,
            inUse,
        }: {
            dischargeRate?: number;
            initialVoltage?: number;
            capacitymAh?: number;
            from?: string;
            batteryType?: string;
            inUse?: boolean;
        }) => {
            const updatedBattery: BatteryInterface = { ...battery };
            setLoading(true);
            if (dischargeRate !== undefined) updatedBattery.dischargeRate = dischargeRate;
            if (initialVoltage !== undefined) updatedBattery.initialVoltage = initialVoltage;
            if (capacitymAh !== undefined) updatedBattery.capacitymAh = capacitymAh;
            if (from !== undefined) updatedBattery.from = from;
            if (batteryType !== undefined) updatedBattery.batteryType = batteryType;
            if (inUse !== undefined) updatedBattery.inUse = inUse;

            const updateQuery = new BatteryUpdateQuery();
            updateQuery.setRequestBody(updatedBattery);

            const response = await executeAuthenticatedRequest(updateQuery);

            if (response.hasError()) {
                showNotification({
                    title: t("update_error.title"),
                    message: t("update_error.message"),
                    icon: <FontAwesomeIcon icon={faExclamation} />,
                    color: "red",
                });
                setLoading(false);
                return;
            }

            showNotification({
                title: t("update_success.title"),
                message: t("update_success.message"),
                icon: <FontAwesomeIcon icon={faCheck} />,
                color: "green",
            });
            console.log("Updated battery: ", updatedBattery);
            setBattery(updatedBattery);
            setLoading(false);
        },
        [battery, executeAuthenticatedRequest, t]
    );

    useEffect(() => {
        console.log("bat ", battery);
    }, [battery]);

    return (
        <Col span={12} sm={6} md={6} lg={4} p="lg" style={{ position: "relative" }}>
            <Card withBorder p="sm" radius="md" className={classes.card}>
                <LoadingOverlay visible={loading} />
                <div className={classes.info_container}>
                    <div className={classes.ring}>
                        <RingProgress
                            roundCaps
                            thickness={6}
                            size={60}
                            sections={[{ value: 100, color: battery.inUse ? theme.colors.red[9] : theme.colors.green[9] }]}
                            label={
                                <Tooltip label={battery.inUse ? t("in_use") : t("not_in_use")}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {battery.inUse ? <FontAwesomeIcon icon={faBatteryEmpty} color={theme.colors.red[9]} /> : <FontAwesomeIcon icon={faBatteryFull} color={theme.colors.green[9]} />}
                                    </div>
                                </Tooltip>
                            }
                        />
                    </div>
                    <Grid className={classes.content}>
                        <Col span={12} sm={6}>
                            <div style={{ marginTop: "1rem" }}>
                                <Text className={classes.label}>{battery.from}</Text>
                                <Text size="xs" color="dimmed">
                                    {t("subtitle.from")}
                                </Text>
                            </div>
                        </Col>
                        <Col span={12} sm={6}>
                            <div style={{ marginTop: "1rem" }}>
                                <Text className={classes.label}>{battery.capacitymAh}</Text>
                                <Text size="xs" color="dimmed">
                                    {t("subtitle.mah")}
                                </Text>
                            </div>
                        </Col>
                    </Grid>
                    <div style={{ position: "absolute", top: 30, right: 30 }}>
                        <Burger size={"sm"} opened={helpOpen} onClick={() => setHelpOpen((o) => !o)} />
                    </div>
                    <div style={{ position: "absolute", top: 60, right: 130, zIndex: 10, width: 100, height: 10 }}>
                        <Menu opened={helpOpen} width={200} shadow="md" zIndex={100} position={"bottom-end"}>
                            <Menu.Dropdown>
                                <Menu.Label>{t("subtitle.details")}</Menu.Label>
                                <Menu.Item icon={<FontAwesomeIcon icon={faIdCard} />}>ID: {battery.batteryId} </Menu.Item>
                                <Menu.Item icon={<FontAwesomeIcon icon={faBatteryHalf} />}>
                                    {t("dropdown.discharge_rate")}: {battery.dischargeRate} C
                                </Menu.Item>
                                <Menu.Item icon={<FontAwesomeIcon icon={faBolt} />}>
                                    {t("dropdown.initial_voltage")}: {battery.initialVoltage} V
                                </Menu.Item>
                                <Menu.Label>{t("subtitle.edit")}</Menu.Label>
                                <Menu.Item icon={<FontAwesomeIcon icon={faEdit} />} onClick={() => setEditing(true)}>
                                    {t("dropdown.edit")}
                                </Menu.Item>
                                <Menu.Item
                                    icon={<FontAwesomeIcon icon={faThumbTack} />}
                                    onClick={() => {
                                        setHelpOpen((o) => !o);
                                        handleBatteryUpdate({ inUse: !battery.inUse });
                                    }}
                                >
                                    {t(`dropdown.mark_as_${battery.inUse ? "free" : "used"}`)}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>
            </Card>
            {editing && (
                <BatteryEdit
                    battery={battery}
                    onBatteryEdit={(hasChanged: boolean, battery: BatteryInterface) => {
                        console.log(battery);
                        if (hasChanged) {
                            handleBatteryUpdate(battery);
                        }
                        setHelpOpen(false);
                        setEditing(false);
                    }}
                />
            )}
        </Col>
    );
};

export default BatteryFromSearchResult;
