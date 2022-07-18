import { MultiSelect, SelectItem } from "@mantine/core";
import { useEffect, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
const BatteriesVoltageSearchInput = ({
    value,
    onChange,
}: {
    value?: { min: number | undefined; max: number | undefined };
    onChange?: ({ min, max }: { min: number | undefined; max: number | undefined }) => void;
}) => {
    const [capacitySearchValue, setCapacitySearchValue] = useState<string[]>([]);

    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const [max, setMax] = useState<number | undefined>(undefined);
    const [min, setMin] = useState<number | undefined>(undefined);
    const [capacityValues, setCapacityValues] = useState<SelectItem[]>([
        { label: "1.0v", value: "min_1", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "2.0v", value: "min_2", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "3.0v", value: "min_3", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "4.0v", value: "min_4", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "5.0v", value: "min_5", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "6.0v", value: "min_6", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "7.0v", value: "min_7", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "8.0v", value: "min_8", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "9.0v", value: "min_9", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "10.0v", value: "min_10", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "11.0v", value: "min_11", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "12.0v", value: "min_12", group: t("batteries.search_card.search_by_min_voltage.title") },
        { label: "1.0v", value: "max_1", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "2.0v", value: "max_2", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "3.0v", value: "max_3", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "4.0v", value: "max_4", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "5.0v", value: "max_5", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "6.0v", value: "max_6", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "7.0v", value: "max_7", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "8.0v", value: "max_8", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "9.0v", value: "max_9", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "10.0v", value: "max_10", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "11.0v", value: "max_11", group: t("batteries.search_card.search_by_max_voltage.title") },
        { label: "12.0v", value: "max_12", group: t("batteries.search_card.search_by_max_voltage.title") },
    ]);

    useEffect(() => {
        setCapacityValues((a) =>
            a.map((item) => {
                item.disabled = false;
                if (capacitySearchValue.find((i) => (i.includes("min") && item.value.includes("min") && item.value !== i) || (i.includes("max") && item.value.includes("max") && item.value !== i))) {
                    item.disabled = true;
                }

                return item;
            })
        );
        let minValue = undefined;
        let maxValue = undefined;
        for (const value of capacitySearchValue) {
            if (value.includes("min")) {
                minValue = Number(value.replace("min_", ""));
            }
            if (value.includes("max")) {
                maxValue = Number(value.replace("max_", ""));
            }
        }
        setMin(minValue);
        setMax(maxValue);
    }, [capacitySearchValue, onChange]);

    useEffect(() => {
        if (typeof onChange === "function") onChange({ min, max });
    }, [min, max, onChange]);
    useEffect(() => {
        const capacityValues = [];
        if (value?.min) {
            capacityValues.push(`min_${value.min}`);
        }
        if (value?.max) {
            capacityValues.push(`max_${value.max}`);
        }
        setCapacitySearchValue(capacityValues);
    }, [value]);

    return (
        <MultiSelect
            placeholder={t("batteries.search_card.search_by_voltage.placeholder")}
            label={t("batteries.search_card.search_by_voltage.title")}
            maxSelectedValues={2}
            defaultValue={capacitySearchValue}
            value={capacitySearchValue}
            onChange={setCapacitySearchValue}
            data={capacityValues}
        />
    );
};

export default BatteriesVoltageSearchInput;
