import { faExclamation, faSearch, faSoap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, Grid, LoadingOverlay, Radio, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteriesSearchQuery } from "../../queries/BatteriesSearchQuery";
import { BatteriesUserTypesAndProvidersQuery } from "../../queries/BatteriesUserTypesAndProvidersQuery";
import { BatteryInterface } from "../BatteryTypes";

import BatteriesCapacitySearchInput from "./BatteriesCapacitySearchInput";
import BatteriesVoltageSearchInput from "./BatteriesVoltageSearchInput";

const BatteriesSearchFilter = ({ handleQueryResults }: { handleQueryResults: (batteries: BatteryInterface[]) => void }) => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();
    const [loading, setLoading] = useState<boolean>(false);

    const [providers, setProviders] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    const [status, setStatus] = useState<string>("0");
    const [type, setType] = useState<string | null>("");
    const [provider, setProvider] = useState<string | null>("");
    const [page, setPage] = useState<number>(1);
    const [capacity, setCapacity] = useState<{ min: number | undefined; max: number | undefined }>({ max: undefined, min: undefined });
    const [voltage, setVoltage] = useState<{ min: number | undefined; max: number | undefined }>({ max: undefined, min: undefined });

    const handleClear = useCallback(() => {
        setProvider(null);
        setCapacity({ max: undefined, min: undefined });
        setVoltage({ max: undefined, min: undefined });
        setPage(1);
        setType(null);
        setStatus("0");
    }, []);

    const handleDatabaseSearch = useCallback(async () => {
        setLoading(true);
        const request = new BatteriesSearchQuery();
        request.setRequestBody({
            page,
            min_capacity: capacity.min,
            max_capacity: capacity.max,
            min_initial_voltage: voltage.min,
            max_initial_voltage: voltage.max,
            from: provider ? provider : undefined,
            batteryType: type ? type : undefined,
            inUse: status === "0" ? undefined : status === "1" ? true : false,
        });
        const response = await executeAuthenticatedRequest(request);
        if (response.hasError()) {
            showNotification({
                title: t("batteries.search_error.title"),
                message: t("batteries.search_error.message"),
                icon: <FontAwesomeIcon icon={faExclamation} />,
                color: "red",
            });
            setLoading(false);
            return;
        }
        handleQueryResults(response.getResult().batteries_found);
        setLoading(false);
    }, [capacity.max, capacity.min, executeAuthenticatedRequest, handleQueryResults, page, provider, status, t, type, voltage.max, voltage.min]);

    const loadTypesAndProviders = useCallback(async () => {
        setLoading(true);
        const request = new BatteriesUserTypesAndProvidersQuery();
        const response = await executeAuthenticatedRequest(request);
        if (response.hasError()) {
            showNotification({
                title: t("batteries.search_error.title"),
                message: t("batteries.search_error.message"),
                icon: <FontAwesomeIcon icon={faExclamation} />,
                color: "red",
            });
            setLoading(false);
            return;
        }
        const result = response.getResult();
        setProviders(result.user_providers);
        setTypes(result.user_types);
        setLoading(false);
    }, [executeAuthenticatedRequest, t]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            loadTypesAndProviders();
        }, 500);
        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <LoadingOverlay visible={loading} />
            <Text weight={500} mb={"lg"}>
                {t("batteries.search_card.title")}
            </Text>
            <Grid>
                <Grid.Col md={4} lg={3}>
                    <Select
                        placeholder={t("batteries.search_card.search_by_provider.placeholder")}
                        label={t("batteries.search_card.search_by_provider.title")}
                        onChange={setProvider}
                        data={providers}
                        value={provider}
                    />
                </Grid.Col>
                <Grid.Col md={4} lg={3}>
                    <BatteriesCapacitySearchInput value={capacity} onChange={setCapacity} />
                </Grid.Col>
                <Grid.Col md={4} lg={3}>
                    <BatteriesVoltageSearchInput value={voltage} onChange={setVoltage} />
                </Grid.Col>
                <Grid.Col md={4} lg={3}>
                    <Select placeholder={t("batteries.search_card.search_by_type.placeholder")} label={t("batteries.search_card.search_by_type.title")} data={types} onChange={setType} value={type} />
                </Grid.Col>
                <Grid.Col md={4} lg={3} style={{ display: "flex", alignItems: "center" }}>
                    <Radio.Group value={status} onChange={setStatus} label={t("batteries.search_card.search_in_use.title")}>
                        <Radio value={"0"} label={t("batteries.search_card.search_in_use.both")} />
                        <Radio value={"1"} label={t("batteries.search_card.search_in_use.in_use")} />
                        <Radio value={"2"} label={t("batteries.search_card.search_in_use.not_in_use")} />
                    </Radio.Group>
                </Grid.Col>
            </Grid>
            <Box
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "end",
                    width: "100%",
                    justifyContent: "flex-end",
                })}
            >
                <Button type="button" leftIcon={<FontAwesomeIcon icon={faSoap} />} mr={"sm"} onClick={handleClear}>
                    {t("batteries.search_card.search_clear_button")}
                </Button>
                <Button type="button" leftIcon={<FontAwesomeIcon icon={faSearch} />} onClick={handleDatabaseSearch}>
                    {t("batteries.search_card.search_button")}
                </Button>
            </Box>
        </Card>
    );
};

export default BatteriesSearchFilter;
