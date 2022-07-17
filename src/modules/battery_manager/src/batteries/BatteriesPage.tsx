import { faExclamation, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, Grid, LoadingOverlay, Radio, RadioGroup, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import PageTitle from "../../../../components/PageTitle";
import { useUserAuthenticatedRequest } from "../../../../context/UserAuthenticatedRequestsProvider";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteriesSearchQuery } from "../../queries/BatteriesSearchQuery";
import { BatteryTypesQuery } from "../../queries/BatteryTypesQuery";
import BatteriesCapacitySearchInput from "./BatteriesCapacitySearchInput";
import BatteriesVoltageSearchInput from "./BatteriesVoltageSearchInput";

const BatteriesPage = () => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const { executeAuthenticatedRequest } = useUserAuthenticatedRequest();
    const [loading, setLoading] = useState<boolean>(false);

    const [providers, setProviders] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    const [provider, setProvider] = useState<string | null>("");
    const [page, setPage] = useState<number>(1);
    const [capacity, setCapacity] = useState<{ min: number | undefined; max: number | undefined }>({ max: undefined, min: undefined });
    const [voltage, setVoltage] = useState<{ min: number | undefined; max: number | undefined }>({ max: undefined, min: undefined });

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
        setLoading(false);
    }, [capacity.max, capacity.min, executeAuthenticatedRequest, page, provider, t, voltage.max, voltage.min]);

    const loadTypesAndProviders = useCallback(async () => {}, [executeAuthenticatedRequest]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleDatabaseSearch();
        }, 500);
        return () => clearTimeout(debounce);
    }, []);

    return (
        <>
            <PageTitle>{t("batteries.header")}</PageTitle>
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
                        />
                    </Grid.Col>
                    <Grid.Col md={4} lg={3}>
                        <BatteriesCapacitySearchInput onChange={setCapacity} />
                    </Grid.Col>
                    <Grid.Col md={4} lg={3}>
                        <BatteriesVoltageSearchInput onChange={setVoltage} />
                    </Grid.Col>
                    <Grid.Col md={4} lg={3}>
                        <Select placeholder={t("batteries.search_card.search_by_type.placeholder")} label={t("batteries.search_card.search_by_type.title")} data={types} />
                    </Grid.Col>
                    <Grid.Col md={4} lg={3} style={{ display: "flex", alignItems: "center" }}>
                        <RadioGroup label={t("batteries.search_card.search_in_use.title")}>
                            <Radio value={"0"} label={t("batteries.search_card.search_in_use.both")} />
                            <Radio value={"1"} label={t("batteries.search_card.search_in_use.in_use")} />
                            <Radio value={"2"} label={t("batteries.search_card.search_in_use.not_in_use")} />
                        </RadioGroup>
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
                    <Button type="button" leftIcon={<FontAwesomeIcon icon={faSearch} />}>
                        {t("batteries.search_card.search_button")}
                    </Button>
                </Box>
            </Card>
            <Card mt={"lg"}>
                <Text weight={500} mb={"lg"}>
                    {t("batteries.display_card.title")}
                </Text>
                <Grid>
                    <h1>teste</h1>
                </Grid>
            </Card>
        </>
    );
};

export default BatteriesPage;
