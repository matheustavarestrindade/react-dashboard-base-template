import { Card, Grid, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { BatteryInterface, BatteryOrganizedByTypes } from "../BatteryTypes";
import { EBatteryModel } from "../BatteryTypes";
import BatteryFromSearchResult from "./BatteryFromSearchResult";

const BatteriesSearchResult = ({ batteries }: { batteries?: BatteryOrganizedByTypes }) => {
    const [defaultTab, setDefaultTab] = useState<string | null>();

    useEffect(() => {
        if (!batteries) {
            setDefaultTab(null);
            return;
        }
        const value = Object.keys(batteries).length === 0 ? null : Object.keys(batteries)[0];
        setDefaultTab(value);
    }, [batteries]);

    return (
        <>
            {batteries && defaultTab && (
                <Card mt={"lg"} pb={50} style={{ overflow: "visible" }}>
                    <Tabs value={defaultTab} onTabChange={setDefaultTab}>
                        <Tabs.List>
                            {batteries &&
                                Object.keys(batteries).map((key) => (
                                    <Tabs.Tab value={key} key={key}>
                                        {(EBatteryModel as any)[key] as string}
                                    </Tabs.Tab>
                                ))}
                        </Tabs.List>
                        {batteries &&
                            Object.keys(batteries).map((key, id) => (
                                <Tabs.Panel value={key} key={id}>
                                    <Grid>
                                        {batteries[key as EBatteryModel]?.map((battery: BatteryInterface) => (
                                            <BatteryFromSearchResult battery={battery} key={battery.batteryId} />
                                        ))}
                                    </Grid>
                                </Tabs.Panel>
                            ))}
                    </Tabs>
                </Card>
            )}
        </>
    );
};

export default BatteriesSearchResult;
