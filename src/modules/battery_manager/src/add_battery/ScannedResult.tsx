import { ActionIcon, NumberInput, Select, Switch, TextInput } from "@mantine/core";
import useTranslation from "../../../../hooks/useTranslation";
import BatteryManagerModule from "../../BatteryManagerModule";
import { BatteryInterface } from "../BatteryTypes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@mantine/form";
const ScannedResult = ({
    battery,
    batteriesTypes,
    updateBatteryInformation,
    deleteBattery,
}: {
    batteriesTypes: { [key: string]: string };
    battery: BatteryInterface;
    updateBatteryInformation: (battery: BatteryInterface) => void;
    deleteBattery: (battery_id: number) => void;
}) => {
    const { t } = useTranslation({ prefix: BatteryManagerModule.module_translation_prefix + "add_battery.scanned_results" });
    const [updatedBattery, setUpdatedBattery] = useState<BatteryInterface>();
    const form = useForm({
        initialValues: {
            batteryId: battery.batteryId,
            batteryType: battery.batteryType,
            initialVoltage: battery.initialVoltage,
            dischargeRate: battery.dischargeRate,
            inUse: battery.inUse,
            capacitymAh: battery.capacitymAh,
            from: battery.from,
        },
    });

    useEffect(() => {
        if (!updatedBattery) return;
        if (Object.is(updatedBattery, battery)) return;
        const timeout = setTimeout(() => {
            updateBatteryInformation(updatedBattery);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [updatedBattery, battery, updateBatteryInformation]);

    return (
        <tr>
            <td>{form.getInputProps("batteryId").value}</td>
            <td>
                <NumberInput
                    variant="filled"
                    placeholder={t("battery_initial_voltage")}
                    value={form.getInputProps("initialVoltage").value}
                    precision={1}
                    onChange={(e) => {
                        form.setFieldValue("initialVoltage", e || 0);
                        setUpdatedBattery(form.values);
                    }}
                    parser={(value) => value && value.replace(/[^\d.]/g, "")}
                    formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}v` : "")}
                    hideControls
                />
            </td>
            <td>
                <NumberInput
                    variant="filled"
                    placeholder={t("battery_discharge_rate")}
                    precision={1}
                    value={form.getInputProps("dischargeRate").value}
                    onChange={(e) => {
                        form.setFieldValue("dischargeRate", e || 0);
                        setUpdatedBattery(form.values);
                    }}
                    parser={(value) => value && value.replace(/[^\d.]/g, "")}
                    formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}C` : "")}
                    hideControls
                />
            </td>
            <td>
                <NumberInput
                    variant="filled"
                    value={form.getInputProps("capacitymAh").value}
                    onChange={(e) => {
                        form.setFieldValue("capacitymAh", e || 0);
                        setUpdatedBattery(form.values);
                    }}
                    parser={(value) => value && value.replace(/\D/g, "")}
                    formatter={(value) => (value && !Number.isNaN(parseFloat(value)) ? `${value}mAh` : "")}
                    placeholder={t("battery_capacity")}
                    hideControls
                />
            </td>
            <td>
                <TextInput
                    variant="filled"
                    value={form.getInputProps("from").value}
                    placeholder={t("battery_from")}
                    onChange={(e) => {
                        form.setFieldValue("from", e.currentTarget.value);
                        setUpdatedBattery(form.values);
                    }}
                ></TextInput>
            </td>
            <td>
                <Select
                    variant="filled"
                    onChange={(e) => {
                        form.setFieldValue("batteryType", e || "LITHIUM_ION_18650");
                        setUpdatedBattery(form.values);
                    }}
                    placeholder={t("select_type_placeholder")}
                    searchable
                    nothingFound={t("select_type_nothing_found")}
                    defaultValue={form.getInputProps("batteryType").value}
                    data={Object.keys(batteriesTypes)
                        .map((key) => ({ value: key, label: batteriesTypes[key] }))
                        .sort((a, b) => a.value.localeCompare(b.value))}
                />
            </td>
            <td>
                <Switch
                    onLabel={t("switch_on")}
                    offLabel={t("switch_off")}
                    value={form.getInputProps("inUse").value}
                    onChange={(e) => {
                        console.log("changed");
                        form.setFieldValue("inUse", e.currentTarget.checked);
                        setUpdatedBattery(form.values);
                    }}
                    defaultChecked={battery.inUse}
                    size="lg"
                />
            </td>
            <td>
                <ActionIcon color={"red"} onClick={() => deleteBattery(battery.batteryId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </ActionIcon>
            </td>
        </tr>
    );
};

export default ScannedResult;
