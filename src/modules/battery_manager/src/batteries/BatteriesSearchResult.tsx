import { faBatteryEmpty, faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Text, Grid, Col, createStyles, Group, RingProgress, Tabs } from "@mantine/core";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryInterface, BatteryOrganizedByTypes } from "../BatteryTypes";
import { EBatteryModel } from "../BatteryTypes";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },

    lead: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },

    inner: {
        display: "flex",

        [theme.fn.smallerThan(350)]: {
            flexDirection: "column",
        },
    },

    ring: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",

        [theme.fn.smallerThan(350)]: {
            justifyContent: "center",
            marginTop: theme.spacing.md,
        },
    },
}));

const BatteriesSearchResult = ({ batteries }: { batteries?: BatteryOrganizedByTypes }) => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "batteries" });

    const { classes, theme } = useStyles();
    console.log(batteries);
    return (
        <Card mt={"lg"}>
            <Text weight={500} mb={"lg"}>
                {t("display_card.title")}
            </Text>

            <Tabs defaultValue={"first"}>
                <Tabs.List>
                    <Tabs.Tab value="first">a</Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <Grid>
                {batteries &&
                    Object.keys(batteries).map((key) =>
                        batteries[key as EBatteryModel]?.map((battery: BatteryInterface) => (
                            <Col span={12} sm={12} md={4} lg={3}>
                                <Card withBorder p="sm" radius="md" className={classes.card}>
                                    <div className={classes.inner}>
                                        <div>
                                            <Text size="md" className={classes.label}>
                                                ID {battery.batteryId}
                                            </Text>
                                            <div>
                                                <Text className={classes.lead} mt={15}>
                                                    {(EBatteryModel as any)[battery.batteryType]}
                                                </Text>
                                                <Text size="xs" color="dimmed">
                                                    {t("display_card.battery.subtitle.type")}
                                                </Text>
                                            </div>
                                            <Group mt="lg">
                                                <div>
                                                    <Text className={classes.label}>teste value</Text>
                                                    <Text size="xs" color="dimmed">
                                                        test label
                                                    </Text>
                                                </div>
                                            </Group>
                                        </div>

                                        <div className={classes.ring}>
                                            <RingProgress
                                                roundCaps
                                                thickness={6}
                                                size={100}
                                                sections={[{ value: 100, color: battery.inUse ? theme.colors.red[9] : theme.colors.green[9] }]}
                                                label={
                                                    <div>
                                                        <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 18 }}>
                                                            {battery.inUse ? t("display_card.battery.in_use") : t("display_card.battery.not_in_use")}
                                                        </Text>
                                                        <Text align="center" size="xs" color="dimmed">
                                                            {t("display_card.battery.subtitle.status")}
                                                        </Text>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    )}
            </Grid>
        </Card>
    );
};

export default BatteriesSearchResult;
