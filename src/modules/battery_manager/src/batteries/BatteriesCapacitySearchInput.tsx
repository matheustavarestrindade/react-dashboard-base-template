import { MultiSelect, SelectItem } from "@mantine/core";
import { useEffect, useState } from "react";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
const BatteriesCapacitySearchInput = ({
    onChange,
    value,
}: {
    value?: { min: number | undefined; max: number | undefined };
    onChange?: ({ min, max }: { min: number | undefined; max: number | undefined }) => void;
}) => {
    const [capacitySearchValue, setCapacitySearchValue] = useState<string[]>([]);

    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix });
    const [max, setMax] = useState<number | undefined>(undefined);
    const [min, setMin] = useState<number | undefined>(undefined);
    const [capacityValues, setCapacityValues] = useState<SelectItem[]>([
        { label: "1000mAh", value: "min_1000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "2000mAh", value: "min_2000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "3000mAh", value: "min_3000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "4000mAh", value: "min_4000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "5000mAh", value: "min_5000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "6000mAh", value: "min_6000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "7000mAh", value: "min_7000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "8000mAh", value: "min_8000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "9000mAh", value: "min_9000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "10000mAh", value: "min_10000", group: t("batteries.search_card.search_by_min_capacity.title") },
        { label: "1000mAh", value: "max_1000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "2000mAh", value: "max_2000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "3000mAh", value: "max_3000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "4000mAh", value: "max_4000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "5000mAh", value: "max_5000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "6000mAh", value: "max_6000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "7000mAh", value: "max_7000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "8000mAh", value: "max_8000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "9000mAh", value: "max_9000", group: t("batteries.search_card.search_by_max_capacity.title") },
        { label: "10000mAh", value: "max_10000", group: t("batteries.search_card.search_by_max_capacity.title") },
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
            placeholder={t("batteries.search_card.search_by_capacity.placeholder")}
            label={t("batteries.search_card.search_by_capacity.title")}
            maxSelectedValues={2}
            data={capacityValues}
            defaultValue={capacitySearchValue}
            value={capacitySearchValue}
            onChange={setCapacitySearchValue}
        />
    );
};

export default BatteriesCapacitySearchInput;
